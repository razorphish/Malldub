// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-04-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 11-04-2013
// ***********************************************************************
// <copyright file="Global.asax.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi
{
    #region Directives

    using System;
    using System.Configuration;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using Data.WebApi;

    using Marasco.Api;
    using Marasco.WePay;

    #endregion

    /// <summary>
    /// Class WebApiApplication.
    /// </summary>
    public class WebApiApplication : HttpApplication
    {
        #region Methods

        /// <summary>
        /// Application_s the start.
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            GetWePayConfiguration();
          GetPrerenderIoConfiguratin();
        }

      private static void GetPrerenderIoConfiguratin()
      {
        Config.PrerenderToken = ConfigurationManager.AppSettings["PrerenderToken"];
      }

      /// <summary>
        /// Gets the we pay configuration.
        /// </summary>
        private static void GetWePayConfiguration()
        {
            // GlobalVars.hostUrl = this.Context.Request.Url.Scheme + "://" + this.Context.Request.Url.Authority;
            WePayConfig.productionMode = Convert.ToBoolean(ConfigurationManager.AppSettings["ProductionMode"]);

            if (WePayConfig.productionMode)
            {
                WePayConfig.accessToken  = ConfigurationManager.AppSettings["WepayAccessToken"];
                WePayConfig.accountId    = Convert.ToInt32(ConfigurationManager.AppSettings["WepayAccountId"]);
                WePayConfig.clientId     = Convert.ToInt32(ConfigurationManager.AppSettings["WepayClientId"]);
                WePayConfig.clientSecret = ConfigurationManager.AppSettings["WepayClientSecret"];
            }
            else
            {
                WePayConfig.accessToken  = ConfigurationManager.AppSettings["WepayAccessToken_Staging"];
                WePayConfig.accountId    = Convert.ToInt32(ConfigurationManager.AppSettings["WepayAccountId_Staging"]);
                WePayConfig.clientId     = Convert.ToInt32(ConfigurationManager.AppSettings["WepayClientId_Staging"]);
                WePayConfig.clientSecret = ConfigurationManager.AppSettings["WepayClientSecret_Staging"];
            }
        }

        #endregion
    }
}