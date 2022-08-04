using Legit.DomainServices.RegistrationDomain;

using Xunit;

namespace Legit.DomainServices.Tests;

public class RegistrationServiceTests
{
    [Fact]
    public void CanRegisterNewRepository()
    {
		RegistrationService registrationService = new();
    }
}
