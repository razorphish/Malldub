

namespace Marasco.WebApi.Helper
{
    #region Directives

    using System;
    using System.Configuration;
    using System.Net.Http;
    using System.Net.Http.Formatting;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Hosting;
    using System.Web.Http.Routing;
    using Helper.ContractResolvers;

    using Model;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    #endregion

    public class Utilities
    {
        /// <summary>
        /// Setups the controller for tests.
        /// </summary>
        /// <param name="controller">The controller.
        /// <example>http://localhost/euphony/messages</example></param>
        /// <param name="httpMethod">The HTTP method.</param>
        /// <param name="controllerName">Name of the controller.<example>message</example></param>
        /// <param name="url">The URL.</param>
        /// <param name="routeName">Name of the route.<example>DefaultApi</example></param>
        /// <param name="routeLocation">The route location.<example>api/{controller}/{id}</example></param>
        public static void SetupController(
            ApiController controller,
            HttpMethod httpMethod,
            string controllerName = "controllerName",
            string url = "http://localhost/",
            string routeName = "routeName",
            string routeLocation = "routelocation/")
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(httpMethod, url);
            var route = config.Routes.MapHttpRoute(routeName, routeLocation);
            var routeData = new HttpRouteData(route,
                                              new HttpRouteValueDictionary
                                              {
                                                  {
                                                      "controller", controllerName
                                                  }
                                              });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }

        /// <summary>
        /// Setups the controller for tests.
        /// </summary>
        /// <param name="setup">The setup.</param>
        public static void SetupController(ControllerSetup setup)
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(setup.HttpMethod, setup.Url);
            var route = config.Routes.MapHttpRoute(setup.RouteName, setup.RouteLocation);
            var routeData = new HttpRouteData(route,
                                              new HttpRouteValueDictionary
                                              {
                                                  {
                                                      "controller", setup.Name
                                                  }
                                              });

            setup.Controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            setup.Controller.Request = request;
            setup.Controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }
    }
}
