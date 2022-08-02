using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using Legit.DomainServices.Utilities;
using Legit.GitClient;

using Microsoft.Extensions.Caching.Memory;

namespace Legit.DomainServices.Registration;

public record ProgressEvent(string CloneId, string? EventId, string? Message);

/// <summary>
/// This service provides anything related to registering a repository.
/// </summary>
public class RegistrationService
{
    private readonly IMemoryCache _cache;
    private readonly MemoryCacheEntryOptions _cacheOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromHours(1));
    private readonly Git _git;

    public RegistrationService(IMemoryCache cache, Git gitClient)
    {
        _cache = cache;
        _git = gitClient;
    }

    public List<string> GetCloneProgress(string cloneId)
    {
        List<string> value;
        bool isNotEmpty = _cache.TryGetValue(cloneId, out value);
        return isNotEmpty ? value : new List<string>();
    }

    public string AddGitRepository(Uri url, string baseDir, Action<ProgressEvent> onProgress)
    {
        string cloneId = RepositoryUrlToBase64(url.OriginalString);
        Action cloneRepository = () => _git.CloneRepository(
            url,
            baseDir, 
            onComplete: () => onProgress.Invoke(new ProgressEvent(
                CloneId: cloneId,
                EventId: null,
                Message: null
            )),
            onProgress: (progress) =>
            {
                // append the progress to memory cache so we can get past progress when we reconnected
                List<string> cachedProgress = _cache.GetOrCreate<List<string>>(cloneId, (_) => new());
                cachedProgress.Append(progress);
                _cache.Set(cloneId, cachedProgress, _cacheOptions);

                onProgress.Invoke(new ProgressEvent(
                    CloneId: cloneId,
                    EventId: cachedProgress.Count().ToString(),
                    Message: progress
                ));

                // NOTE: might want to control this using cancellation token but for now this is fine
                return true;
            });
        Task.Run(cloneRepository).Ignore();

        return cloneId;
    }

    // convert repository url to base64 with timestamp prefix as a unique identifier
    // we use base64 because we want to decode it back on the frontend
    private string RepositoryUrlToBase64(string url)
    {
        byte[] prefixedUrlBytes = Encoding.UTF8.GetBytes($"{DateTimeOffset.Now.UtcTicks.ToString()}|{url}");
        return Convert.ToBase64String(prefixedUrlBytes);
    }
}
