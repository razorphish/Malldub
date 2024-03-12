#region Directives

using Malldub.WebApi;

using Microsoft.Owin;

#endregion

[assembly: OwinStartup(typeof(Startup))]

namespace Malldub.WebApi
{
  #region Directives

  using Owin;

  #endregion

  public partial class Startup
  {
    #region Public Methods and Operators

    public void Configuration(IAppBuilder app)
    {
      ConfigureAuth(app);
    }

    #endregion
  }
}