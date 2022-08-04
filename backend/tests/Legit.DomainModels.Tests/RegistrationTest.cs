using Xunit;
using Moq;
using FluentAssertions;
using Legit.DomainModels.RegistrationDomain;
using System;
using System.Text;
using System.Linq;

namespace Legit.DomainModels.Tests;

public class RegistrationTests
{
	private readonly Mock<IGitClient> _mockGitClient;
	private const string REPOSITORY_URL = "https://github.com/teknologi-umum/blog";

	public RegistrationTests()
	{
		_mockGitClient = new();
	}

	[Fact]
	public void ReturnsAValidCloneIdWhenRegistering()
	{
		Uri repositoryUrl = new(REPOSITORY_URL);
		_mockGitClient.Setup(client => client.CloneRepository(repositoryUrl, It.IsAny<string>(), It.IsAny<Action<string>>(), It.IsAny<Action>()))
					  .Callback((Uri uri, string baseDir, Action<string> onProgress, Action onCompleted) => onProgress.Invoke("bruh"));

		Registration registration = new(_mockGitClient.Object);
		string cloneIdBase64 = registration.AddGitRepository(repositoryUrl, "./foo/bar", onProgress: (progress) => { });
		byte[] cloneIdBytes = Convert.FromBase64String(cloneIdBase64);
		string cloneId = Encoding.UTF8.GetString(cloneIdBytes);

		// split the result by `|` because there's a timestamp prefix that I don't know how to test because
		// it requires mocking DateTime.Now, there are just too many ways out there to mock datetime
		// and I'd rather to just ignore it for now
		cloneId.Split("|").Last().Should().Be(REPOSITORY_URL);
	}
}
