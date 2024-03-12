namespace Malldub.Data.WebApi.Filters
{
    #region Directives

    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    #endregion

    /// <summary>
    /// Class RequireHttpsAttribute
    /// This will be used when we want to force the Https
    /// </summary>
    public class RequireHttpsAttribute : AuthorizationFilterAttribute
    {
        #region Public Methods and Operators

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var req = actionContext.Request;

          if (req.RequestUri.Scheme == Uri.UriSchemeHttps)
          {
            return;
          }

          const string HTML = "<p>Https is required</p>";
          if (req.Method.Method == "GET")
          {
            actionContext.Response = req.CreateResponse(HttpStatusCode.Found);
            actionContext.Response.Content = new StringContent(HTML, Encoding.UTF8, "text/html");
                    
            var uriBuilder = new UriBuilder(req.RequestUri)
            {
              Scheme = Uri.UriSchemeHttps, 
              Port = 443
            };

            actionContext.Response.Headers.Location = uriBuilder.Uri;
          }
          else
          {
            actionContext.Response = req.CreateResponse(HttpStatusCode.NotFound);
            actionContext.Response.Content = new StringContent(HTML, Encoding.UTF8, "text/html");
          }
        }

        #endregion
    }
}