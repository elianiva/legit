using Legit.DomainModels.RegistrationDomain;
using Legit.DomainServices.Overview;
using Legit.DomainServices.RegistrationDomain;

using Microsoft.Extensions.DependencyInjection;

namespace Legit.DomainServices;

public static class ServiceCollectionExtensions
{
	public static IServiceCollection AddDomainServices(this IServiceCollection services)
	{
		services.AddTransient<Registration>();
		services.AddTransient<RegistrationService>();
		services.AddTransient<OverviewService>();
		return services;
	}
}
