using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Legit.Protos.Overview;
using Google.Protobuf;

namespace Legit.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OverviewController : ControllerBase
{
    private readonly JsonFormatter _formatter;

    public OverviewController(JsonFormatter formatter)
    {
        _formatter = formatter;
    }

    public IActionResult OverviewAsync()
    {
        GitOverviewResponse overview = new GitOverviewResponse
        {
            Url = "https://github.com/teknologi-umum/blog.git",
            TotalFiles = 92,
            TotalCommits = 291,
            TotalAuthors = 28,
            Age = new Age
            {
                Days = 346,
                Hours = 1,
                Minutes = 57,
                Seconds = 22
            },
            Lines = new Lines
            {
                Total = 16686,
                Added = 20903,
                Deleted = 4217
            }
        };

        return Ok(_formatter.Format(overview));
    }
}
