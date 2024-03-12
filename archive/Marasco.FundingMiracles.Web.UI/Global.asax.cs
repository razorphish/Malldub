namespace Marasco.FundingMiracles.Web.UI
{
    #region Directives

    using System.Web;
    using System.Web.Http;

  //using System.Web.Http;

    // Note: For instructions on enabling IIS7 classic mode, 
    // visit http://go.microsoft.com/fwlink/?LinkId=301868

    #endregion

    public class Global : HttpApplication
    {
        #region Methods

        protected void Application_Start()
        {
           WebApiConfig.Register(GlobalConfiguration.Configuration);
        }

        #endregion
    }
}