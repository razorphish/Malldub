namespace Malldub.Data.WebApi.Filters
{
    #region Directives

    using System;
    using System.Net;
    using System.Net.Cache;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Web;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    #endregion

    public class MalldubAuthorizeAttribute : AuthorizationFilterAttribute
    {
        private bool _perUser;

        /// <summary>
        /// Initializes a new instance of the <see cref="MalldubAuthorizeAttribute"/> class.
        /// </summary>
        /// <param name="perUser">if set to <c>true</c> [per user]. when false it will be for Api Users not web users</param>
        public MalldubAuthorizeAttribute(bool perUser = true)
        {
            _perUser = perUser;
        }

      public override void OnAuthorization(HttpActionContext actionContext)
      {
        base.OnAuthorization(actionContext);
      }

      //public override void OnAuthorization(HttpActionContext actionContext)
        //{
        //    //const string APIKEYNAME = "apikey";
        //    //const string TOKENNAME = "token";

        //    //var query = HttpUtility.ParseQueryString(actionContext.Request.RequestUri.Query);

        //    //if (!string.IsNullOrWhiteSpace(query[APIKEYNAME]) && !string.IsNullOrWhiteSpace(query[TOKENNAME]))
        //    //{
        //    //    var apikey = query[APIKEYNAME];
        //    //    var token = query[TOKENNAME];

        //    //    var authToken = new AuthToken();

        //    //    if (authToken != null && authToken.ApiUser.AppId == apikey && authToken.Expiration > DateTime.UtcNow)
        //    //    {
        //    //        if (_perUser)
        //    //        {
        //    //            if (BasicAuthorization(actionContext)) return;
        //    //        }
        //    //        else
        //    //        {
        //    //            return;
        //    //        }
        //    //    }

        //    //}

        //    //HandleUnauthorized(actionContext);
        //}

        private static bool BasicAuthorization(HttpActionContext actionContext)
        {
            if (Thread.CurrentPrincipal.Identity.IsAuthenticated)
            {
                return true;
            }

            var authHeader = actionContext.Request.Headers.Authorization;

            if (authHeader != null)
            {
                if (authHeader.Scheme.Equals("basic", StringComparison.OrdinalIgnoreCase)
                    && !string.IsNullOrWhiteSpace(authHeader.Parameter))
                {
                    var rawCredentials = authHeader.Parameter;
                    var encoding = Encoding.GetEncoding("iso-8859-1");
                    var credentials = encoding.GetString(Convert.FromBase64String(rawCredentials));
                    var split = credentials.Split(':');
                    var username = split[0];
                    var password = split[1];

                    //WebMatrix.WebData Credential check
                    //if (WebSecurity.Initialized) 
                    //{ WebSecurity.InitializeDatabaseConnection("DefaultConnection", "UserProfile", "UserId")}
                    //if (WebSecurity.Login(username, password))
                    //{
                    // var principal = new GenericPrincipal(new GenericIdentity(username), null)
                    // Thread.CurrentPrincipal = principal;
                    // return;
                    //}
                }
            }
            return false;
        }

        private void HandleUnauthorized(HttpActionContext actionContext)
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            if (_perUser)
            {
                actionContext.Response.Headers.Add(
                    "WWW-Authenticate",
                    "Basic Schema='Malldub' location=http://local.malldub.com/login");
            }
        }
    }
}