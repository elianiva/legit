using System;
using System.IO;

using LibGit2Sharp;
using LibGit2Sharp.Handlers;

namespace Legit.GitClient;

public class Git
{
    /// <summary>
    /// Clones a repository to a path using this format:
    /// <c>{baseDir}/{owner}/{repository}</c>
    /// </summary>
    /// <param name="url">The repository URL</param>
    /// <param name="baseDir">The base directory of the clone target</param>
    /// <returns>The cloned repository path</returns>
    public string CloneRepository(Uri url, string baseDir, ProgressHandler onProgress, Action onComplete)
    {
        // example url: https://github.com/teknologi-umum/blog
        string[] segments = url.AbsolutePath.Split("/");
        string owner = segments[1];
        string repository = segments[2];
        string cloneTarget = Path.Combine(baseDir, owner, repository);

        return Repository.Clone(url.ToString(), cloneTarget, new CloneOptions
        {
            OnProgress = onProgress,
            OnTransferProgress = (progress) => onProgress.Invoke($"Cloning... ({progress.ReceivedObjects}/{progress.TotalObjects})"),
            RepositoryOperationCompleted = (_) => onComplete.Invoke()
        });
    }
}
