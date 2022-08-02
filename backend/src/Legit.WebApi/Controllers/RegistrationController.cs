using System;
using System.IO;

using Legit.Protos.Registration;
using Legit.RepositoryDALs;
using Legit.DomainServices.Registration;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Google.Protobuf;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Reactive.Subjects;
using System.Threading;
using System.Reactive.Linq;
using NuGet.Protocol;

namespace Legit.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly RegistrationService _registrationService;
    private readonly JsonFormatter _formatter;
    private readonly Subject<ProgressEvent> _progressSubject;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly string _cloneDirectory;


    public RegistrationController(
        RegistrationService registrationService,
        Subject<ProgressEvent> progressSubject,
        IHttpContextAccessor httpContextAccessor,
        JsonFormatter formatter,
        IOptions<LegitOptions> options
    )
    {
        _progressSubject = progressSubject;
        _httpContextAccessor = httpContextAccessor;
        _formatter = formatter;
        _registrationService = registrationService;
        _cloneDirectory = options.Value.CloneDirectory ?? throw new InvalidOperationException("LegitOptions:CloneDirectory is required");
    }

    [HttpPost("register")]
    public IActionResult Register(RegistrationRequest request)
    {
        Uri url = new(request.Url);
        string baseDirectory = Path.Combine(Environment.CurrentDirectory, _cloneDirectory);
        string cloneId = _registrationService.AddGitRepository(
            url,
            baseDirectory,
            onProgress: _progressSubject.OnNext
        );

        RegistrationResponse response = new() { CloneId = cloneId };
        return Ok(_formatter.Format(response));
    }

    [HttpGet("clone-progress/{cloneId}")]
    public async Task CloneProgress(string cloneId, CancellationToken cancellationToken)
    {
        HttpContext? context = _httpContextAccessor.HttpContext;
        if (context is null)
        {
            return;
        }

        await context.InitializeSseAsync();

        List<string> pastCloneProgress = _registrationService.GetCloneProgress(cloneId);
        string lastEventId = Request.Headers["Last-Event-ID"];
        int eventId;
        bool hasValidId = int.TryParse(lastEventId, out eventId);
        if (pastCloneProgress.Count() > 0 && hasValidId)
        {
            await context.SendSseEventAsync(lastEventId, "data", pastCloneProgress.Skip(eventId));
        }

        // honestly, I don't know if this is the right way to do it
        _progressSubject
            .TakeUntil(@event => cancellationToken.IsCancellationRequested)
            .Where(@event => @event.CloneId == cloneId)
            .Select(@event =>
            {
                Console.WriteLine(@event);
                if (@event.EventId is not null && @event.Message is not null)
                {
                    return Observable.FromAsync(() => context.SendSseEventAsync(@event.EventId, "data", @event.Message));
                }

                return Observable.FromAsync(() => context.SendSseEventAsync("", "close", ""));
            })
            .Concat()
            .Subscribe();
    }
}
