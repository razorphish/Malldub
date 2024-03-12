namespace Marasco.WebApi.Helper.Model
{
    #region Directives

    using System.Net.Http;
    using System.Web.Http;

    #endregion

    public class ControllerSetup
    {
        #region Constructors and Destructors

        public ControllerSetup(
            ApiController controller,
            HttpMethod method,
            string url,
            string name,
            string routeName,
            string routeLocation)
            : this(controller, method, url)
        {
            Name = name;
            RouteName = routeName;
            RouteLocation = routeLocation;
        }

        public ControllerSetup(ApiController controller, HttpMethod method, string url)
        {
            Controller = controller;
            HttpMethod = method;
            Url = url;
        }

        public ControllerSetup(string url, string name, string routeName, string routeLocation)
        {
            Name = name;
            RouteName = routeName;
            RouteLocation = routeLocation;
            Url = url;
        }

        #endregion

        #region Public Properties

        public ApiController Controller { get; set; }
        public HttpMethod HttpMethod { get; set; }
        public string Name { get; set; }
        public string RouteLocation { get; set; }
        public string RouteName { get; set; }
        public string Url { get; set; }

        #endregion
    }
}