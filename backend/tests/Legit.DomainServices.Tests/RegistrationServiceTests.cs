using System;
using System.Linq;
using System.Text;

using Legit.DomainModels;
using Legit.DomainModels.RegistrationDomain;
using Legit.DomainServices.RegistrationDomain;
using Legit.RepositoryDALs;

using Microsoft.Extensions.DependencyInjection;

using Moq;
using FluentAssertions;
using Xunit;
using System.Collections.Generic;

namespace Legit.DomainServices.Tests;

public class RegistrationServiceTests
{
	private const string REPOSITORY_URL = "https://github.com/teknologi-umum/blog";
	private const int PROGRESS_COUNT = 20;
	private readonly Uri repositoryUrl = new(REPOSITORY_URL);
	private IServiceProvider ServiceProvider { get; }

	public RegistrationServiceTests()
	{
		Mock<IGitClient> mockGitClient = new();
		mockGitClient.Setup(client => client.CloneRepository(repositoryUrl, It.IsAny<string>(), It.IsAny<Action<string>>(), It.IsAny<Action>()))
					 .Callback((Uri url, string baseDir, Action<string> onProgress, Action onCompleted) =>
					 {
						 for (int i = 0; i < PROGRESS_COUNT; i++)
						 {
							 onProgress.Invoke($"Progress: {i}");
						 }
						 onCompleted.Invoke();
					 });

		ServiceCollection services = new();
		services.AddMemoryCache();
		services.AddRepositoryDALs();
		services.AddDomainServices();
		services.AddTransient<IGitClient>((_) => mockGitClient.Object);

		ServiceProvider = services.BuildServiceProvider();
	}

	[Fact]
	public void CanGetTheCorrectCloneId()
	{
		var registrationService = ServiceProvider.GetRequiredService<RegistrationService>();
		string cloneIdBase64 = registrationService.RegisterGitRepository(repositoryUrl, "./foo/bar", (_) => { /* noop */ });
		byte[] cloneIdBytes = Convert.FromBase64String(cloneIdBase64);
		string cloneId = Encoding.UTF8.GetString(cloneIdBytes);

		// see notes in Legit.DomainModels.Tests/RegistrationTests.cs:33
		cloneId.Split("|").Last().Should().Be(REPOSITORY_URL);
	}

	[Fact]
	public void ShouldCloseProgressWhenItsDone()
	{
		var registrationService = ServiceProvider.GetRequiredService<RegistrationService>();
		registrationService.RegisterGitRepository(repositoryUrl, "./foo/bar", (progress) =>
		{
			if (progress.EventType == ProgressEventType.CLOSE)
			{
				progress.EventId.Should().Be(PROGRESS_COUNT.ToString());
			}
		});
	}

	[Fact]
	public void ShouldCacheTheProgress()
	{
		var registrationService = ServiceProvider.GetRequiredService<RegistrationService>();
		string cloneId = registrationService.RegisterGitRepository(repositoryUrl, "./foo/bar", (progress) =>
		{
			if (progress.EventType == ProgressEventType.CLOSE)
			{
				IEnumerable<string> cloneProgress = registrationService.GetCloneProgress(progress.CloneId);
				cloneProgress.Count().Should().Be(PROGRESS_COUNT);
			}
		});
	}

	// TODO: - check if the history are actually cached
	//         gonna skip this for now since I've no idea why the memory cache doesn't store anything
	//         when it's executed using xUnit
	//       - also check if all items that are cached are the same items that were emitted
	//         not gonna do this either for now
}
