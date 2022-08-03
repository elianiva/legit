using Legit.DomainModels;

using Microsoft.Extensions.DependencyInjection;

namespace Legit.GitClient;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddGitClient(this IServiceCollection services)
	{
		services.AddTransient<IGitClient, Git>();
		return services;
	}
}
