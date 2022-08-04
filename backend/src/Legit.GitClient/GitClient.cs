using System;
using System.IO;

using Legit.DomainModels;

using LibGit2Sharp;
using LibGit2Sharp.Handlers;

namespace Legit.GitClient;

public class Git : IGitClient
{
	/// <summary>
	/// Clones a repository to a path using this format:
	/// <c>{baseDir}/{owner}/{repository}</c>
	/// </summary>
	/// <param name="url">The repository URL</param>
	/// <param name="baseDir">The base directory of the clone target</param>
	/// <returns>The cloned repository path</returns>
	public string CloneRepository(Uri url, string baseDir, Action<string> onProgress, Action onCompleted)
	{
		// example url: https://github.com/teknologi-umum/blog
		string[] segments = url.AbsolutePath.Split("/");
		string owner = segments[1];
		string repository = segments[2];
		string cloneTarget = Path.Combine(baseDir, owner, repository);

		return Repository.Clone(url.ToString(), cloneTarget, new CloneOptions
		{
			// we just need the git information to analyse the repository, we don't need the files
			Checkout = false,
			OnProgress = (progress) =>
			{
				onProgress.Invoke(progress);
				return true;
			},
			RepositoryOperationCompleted = (_) => onCompleted.Invoke()
		});
	}
}
