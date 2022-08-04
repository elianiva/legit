using System;
using System.Text;
using System.Threading.Tasks;

namespace Legit.DomainModels.RegistrationDomain;

public class Registration
{
	private readonly IGitClient _client;

	public Registration(IGitClient client)
	{
		_client = client;
	}

	/// <summary>
	/// Adds a git repository to the app.
	/// </summary>
	/// <param name="url">The repository url</param>
	/// <param name="baseDir">The base directory of cloned repository</param>
	/// <param name="onProgress">The action that will receive progress update when cloning</param>
	/// <returns>A unique ID of the repository URL with timestamp prefix using a format of Base64</returns>
	public string AddGitRepository(Uri url, string baseDir, Action<ProgressEvent> onProgress)
	{
		string cloneId = RepositoryUrlToBase64(url.OriginalString);
		Action cloneRepository = () => _client.CloneRepository(
			url,
			baseDir,
			onProgress: (progress) => onProgress.Invoke(new ProgressEvent(
				EventType: ProgressEventType.DATA,
				CloneId: cloneId,
				EventId: "",
				Message: progress
			)),
			onCompleted: () => onProgress.Invoke(new ProgressEvent(
				EventType: ProgressEventType.CLOSE,
				CloneId: cloneId,
				EventId: "",
				Message: ""
			)));
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
