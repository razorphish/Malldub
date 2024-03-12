// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-04-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 11-04-2013
// ***********************************************************************
// <copyright file="WebApiConfig.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************

namespace Malldub.WebApi
{
  #region Directives

  using System.Web.Http;
  using System.Web.Http.Cors;
  using System.Web.Http.Validation;
  using System.Web.Http.Validation.Providers;

  using Malldub.Data.WebApi.Filters;

  using Microsoft.Owin.Security.OAuth;

  using Newtonsoft.Json.Converters;
  using Newtonsoft.Json.Serialization;

  #endregion

  /// <summary>
  /// Class WebApiConfig.
  /// </summary>
  public static class WebApiConfig
  {
    #region Public Methods and Operators

    /// <summary>
    /// Registers the specified configuration.
    /// </summary>
    /// <param name="config">The configuration.</param>
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services
      // Configure Web API to use only bearer token authentication.
      config.SuppressDefaultHostAuthentication();
      config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", new { id = RouteParameter.Optional });

      //// Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
      //// To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
      //// For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
      //// config.EnableQuerySupport();

      //// To disable tracing in your application, please comment out or remove the following line of code
      //// For more information, refer to: http://www.asp.net/web-api
      //// config.EnableSystemDiagnosticsTracing();
      config.Formatters.Remove(config.Formatters.XmlFormatter);

      var jsonFormatter = config.Formatters.JsonFormatter;

      jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

      // Gets string representation of Enums instead of values
      var enumConverter = new StringEnumConverter();
      jsonFormatter.SerializerSettings.Converters.Add(enumConverter);

      // Hostile change; we only do this because we have removed the Xmlformatter
      // This allows to use [Required] on value types (int, long, etc)
      config.Services.RemoveAll(typeof(ModelValidatorProvider), v => v is InvalidModelValidatorProvider);

#if (!DEBUG && !DEBUGRELEASE)
      //Require Https
      config.Filters.Add(new RequireHttpsAttribute());
#endif
      //Enable Cors
      //Enabled in Startup.Auth.cs
      //var cors = new EnableCorsAttribute("*", "*", "*");
      //config.EnableCors(cors);


#if DEBUG

      // Require Http on all controllers
      // config.Filters.Add(new RequireHttpsAttribute());
#endif
    }

    #endregion
  }
}