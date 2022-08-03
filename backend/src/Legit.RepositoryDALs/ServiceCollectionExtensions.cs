using Legit.DomainModels;

using Microsoft.Extensions.DependencyInjection;

namespace Legit.RepositoryDALs;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddRepositoryDALs(this IServiceCollection services)
	{
		services.AddSingleton<IProgressListRepository, ProgressListRepository>();
		return services;
	}
}
