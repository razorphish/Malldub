// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 01-30-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 01-30-2017
// ***********************************************************************
// <copyright file="TabController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Controllers
{
    #region Directives

    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Malldub.WebApi.RootControllers;

    #endregion

    /// <summary>
    /// Class TabController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    [RoutePrefix("api/admin/tab")]
    [AllowAnonymous]
    public class TabController : BaseApiController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Gets this instance.
        /// </summary>
        /// <returns>HttpResponseMessage.</returns>
        [Route("")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            var tabs = new List<Tab>
                       {
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Settings", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/settings/settings.controller.html", 
                               Icon = "cogs", 
                               Tooltip = "Fundraiser uploads", 
                               Index = 10
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Uploads", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/uploads/uploads.controller.html", 
                               Icon = "file-image-o", 
                               Tooltip = "Fundraiser uploads", 
                               Index = 20
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Posts", 
                               Active = false, 
                               Template = "app/admin/fundolo/fundraiser/posts/posts.controller.html", 
                               Icon = "bullhorn", 
                               Tooltip = "Fundraiser Updates/Posts", 
                               Index = 25
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Donations", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/donations/donations.controller.html", 
                               Icon = "heart", 
                               Tooltip = "Donations", 
                               Index = 30
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Users", 
                               Active = false, 
                               Template = "app/admin/fundolo/fundraiser/user/user.controller.html", 
                               Icon = "user", 
                               Tooltip = "List of users related to campaign", 
                               Index = 35
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Comments", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/comments/comments.controller.html", 
                               Icon = "microphone", 
                               Tooltip = "Comments left by donors", 
                               Index = 40
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Shares", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/shares/shares.controller.html", 
                               Icon = "share-alt", 
                               Tooltip = "Shares by users", 
                               Index = 45
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Teams", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/teams/teams.controller.html", 
                               Icon = "users", 
                               Tooltip = "Teams controller", 
                               Index = 46
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiser", 
                               Heading = "Activity", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/activity/activity.controller.html", 
                               Icon = "history", 
                               Tooltip = "Activity", 
                               Index = 50
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiserDonation", 
                               Heading = "Order", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/donations/order.controller.html", 
                               Icon = "history", 
                               Tooltip = "Order Info", 
                               Index = 0
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiserDonation", 
                               Heading = "User", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/donations/user.controller.html", 
                               Icon = "user", 
                               Tooltip = "User Info", 
                               Index = 10
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiserDonation", 
                               Heading = "Geo", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/donations/geo.controller.html", 
                               Icon = "globe", 
                               Tooltip = "Geographics", 
                               Index = 20
                           }, 
                           new Tab
                           {
                               TabSetName = "fundraiserComments", 
                               Heading = "Geo", 
                               Active = false, 
                               Template =
                                   "app/admin/fundolo/fundraiser/donations/geo.controller.html", 
                               Icon = "globe", 
                               Tooltip = "Geographics", 
                               Index = 0
                           }
                       };

            var response = Request.CreateResponse(HttpStatusCode.OK, tabs);

            return response;
        }

        #endregion

        /// <summary>
        /// Class Tab.
        /// </summary>
        public class Tab
        {
            #region Public Properties

            /// <summary>
            /// Gets or sets a value indicating whether this <see cref="Tab"/> is active.
            /// </summary>
            /// <value><c>true</c> if active; otherwise, <c>false</c>.</value>
            public bool Active { get; set; }

            /// <summary>
            /// Gets or sets the heading.
            /// </summary>
            /// <value>The heading.</value>
            public string Heading { get; set; }

            /// <summary>
            /// Gets or sets the icon.
            /// </summary>
            /// <value>The icon.</value>
            public string Icon { get; set; }

            /// <summary>
            /// Gets or sets the index.
            /// </summary>
            /// <value>The index.</value>
            public int Index { get; set; }

            /// <summary>
            /// Gets or sets the name of the tab set.
            /// </summary>
            /// <value>The name of the tab set.</value>
            public string TabSetName { get; set; }

            /// <summary>
            /// Gets or sets the template.
            /// </summary>
            /// <value>The template.</value>
            public string Template { get; set; }

            /// <summary>
            /// Gets or sets the tooltip.
            /// </summary>
            /// <value>The tooltip.</value>
            public string Tooltip { get; set; }

            #endregion
        }
    }
}