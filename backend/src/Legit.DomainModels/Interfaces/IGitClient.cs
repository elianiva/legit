using System;

namespace Legit.DomainModels;

public interface IGitClient
{
	public string CloneRepository(Uri url, string baseDir, Action<string> onProgress, Action onCompleted);
}
