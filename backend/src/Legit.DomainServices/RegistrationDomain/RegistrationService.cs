using System;
using System.Collections.Generic;
using System.Linq;

using Legit.DomainModels;
using Legit.DomainModels.RegistrationDomain;

using Microsoft.Extensions.Caching.Memory;

namespace Legit.DomainServices.RegistrationDomain;

/// <summary>
/// This service provides anything related to registering a repository.
/// </summary>
public class RegistrationService
{
	private readonly Registration _registration;
	private readonly IProgressListRepository _repository;
	private readonly MemoryCacheEntryOptions _cacheOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromHours(1));

	public RegistrationService(IProgressListRepository repository, IGitClient gitClient)
	{
		_registration = new Registration(gitClient);
		_repository = repository;
	}

	public IEnumerable<string> GetCloneProgress(string cloneId)
	{
		return _repository.Get<string>(cloneId);
	}

	public string RegisterGitRepository(Uri url, string baseDir, Action<ProgressEvent> onProgress)
	{
		string cloneId = _registration.AddGitRepository(url, baseDir, (progress) =>
		{
			IEnumerable<string> cached = _repository.Append(progress.CloneId, progress.Message);
			onProgress.Invoke(progress.WithEventId(cached.Count().ToString()));
		});
		return cloneId;
	}
}
