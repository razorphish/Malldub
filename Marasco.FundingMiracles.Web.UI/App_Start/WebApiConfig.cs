namespace Marasco.FundingMiracles.Web.UI
{
  using System.Web.Http;

  #region Directives

    //using System.Web.Http;

    #endregion

    public static class WebApiConfig
    {
        #region Public Methods and Operators

      public static void Register(HttpConfiguration config)
      {
        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
            );

        // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
        // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
        // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
        //config.EnableQuerySupport();
      }

        #endregion
    }
}