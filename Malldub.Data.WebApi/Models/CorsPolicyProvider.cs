namespace Malldub.WebApi.Models
{
  #region Directives

  using System.Threading.Tasks;
  using System.Web.Cors;

  using Microsoft.Owin;
  using Microsoft.Owin.Cors;

  #endregion

  public class MalldubCorsPolicyProvider : ICorsPolicyProvider
  {
    #region Fields

    private readonly CorsPolicy _policy;

    #endregion

    #region Constructors and Destructors

    public MalldubCorsPolicyProvider()
    {
      // Create a CORS policy.
      _policy = new CorsPolicy { AllowAnyMethod = true, AllowAnyHeader = true };

      // Add allowed origins.

      // Azure
      _policy.Origins.Add("http://miracles.azurewebsites.net");
      _policy.Origins.Add("http://miracles-admin.azurewebsites.net");

      // miracleofmiracles.org
      _policy.Origins.Add("http://local.miracleofmiracles.org");
      _policy.Origins.Add("http://www.miracleofmiracles.org");
      _policy.Origins.Add("http://miracleofmiracles.org");

      // fundingmiracles.com [Local]
      _policy.Origins.Add("http://localhost:45402");
      _policy.Origins.Add("http://localhost:38903");
      _policy.Origins.Add("http://local.fundingmiracles.com");
      _policy.Origins.Add("https://local.fundingmiracles.com");

      // fundingmiracles.com ADMIN [Local]
      _policy.Origins.Add("http://local.admin.fundingmiracles.com");
      _policy.Origins.Add("https://local.admin.fundingmiracles.com");
      _policy.Origins.Add("http://localhost:8001");
      _policy.Origins.Add("https://localhost:8001");
      _policy.Origins.Add("http://admin-staging.fundingmiracles.com");
      _policy.Origins.Add("https://admin-staging.fundingmiracles.com");
      _policy.Origins.Add("http://admin.fundingmiracles.com");
      _policy.Origins.Add("https://admin.fundingmiracles.com");

      // fundingmiracles.com [Production]
      _policy.Origins.Add("http://www.fundingmiracles.com");
      _policy.Origins.Add("http://fundingmiracles.com");
      _policy.Origins.Add("https://www.fundingmiracles.com");
      _policy.Origins.Add("https://fundingmiracles.com");

      // fundingmiracles.com ADMIN [Production]
      _policy.Origins.Add("http://admin.fundingmiracles.com");
      _policy.Origins.Add("https://admin.fundingmiracles.com");

      // fundingmiracles.com [Staging]
      _policy.Origins.Add("http://staging.fundingmiracles.com");
      _policy.Origins.Add("https://staging.fundingmiracles.com");

      // fundingmiracles.com ADMIN [Staging]
      _policy.Origins.Add("http://admin-staging.fundingmiracles.com");
      _policy.Origins.Add("https://admin-staging.fundingmiracles.com");

      _policy.SupportsCredentials = true;
    }

    #endregion

    #region Public Methods and Operators

    public Task<CorsPolicy> GetCorsPolicyAsync(IOwinRequest request)
    {
      return Task.FromResult(_policy);
    }

    #endregion
  }
}