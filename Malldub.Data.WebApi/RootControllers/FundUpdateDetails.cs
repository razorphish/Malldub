// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 01-28-2017
// ***********************************************************************
// <copyright file="FundUpdateDetails.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
    #region Directives

    using System.Configuration;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Security.Claims;
    using System.Web.Http;

    using Malldub.Data;
    using Malldub.WebApi.Models;

    using Mandrill;

    using Marasco.FacebookApi;
    using Marasco.FacebookApi.Models;
    using Marasco.TwitterApi;
    using Marasco.TwitterApi.Models;

    using Microsoft.AspNet.Identity;

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class FundUpdateDetailsController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    [RoutePrefix("api/fund/{fundId}/updates")]
    [Authorize]
    public class FundUpdateDetailsController : BaseApiController
    {
        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="FundUpdateDetailsController"/> class.
        /// </summary>
        /// <remarks>Fill in the blank</remarks>
        public FundUpdateDetailsController()
            : base(new MalldubDataContext()) {}

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Gets the by status identifier.
        /// </summary>
        /// <param name="fundId">The fund identifier.</param>
        /// <param name="id">The identifier.</param>
        /// <returns>HttpResponseMessage.</returns>
        [HttpGet]
        [Route("status/{id}")]
        public HttpResponseMessage GetByStatusId(int fundId, string id)
        {
            var updates =
                TheContext.FundUpdate.ByFundId(fundId)
                          .Include("AspNetUser")
                          .Include("AspNetUser.AspNetUserLoginList")
                          .Where(f => f.StatusId == id)
                          .ToList()
                          .Select(u => TheModelFactory.Create(u));

            return Request.CreateResponse(HttpStatusCode.OK, updates);
        }

        /// <summary>
        /// Posts the specified fund identifier.
        /// </summary>
        /// <param name="fundId">The fund identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException"></exception>
        /// <exception cref="HttpResponseMessage"></exception>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(int fundId, [FromBody] FundUpdate value)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var fund =
                TheContext.Item.ByIdentification(fundId)
                          .Include("ItemUploadList")
                          .Include("ItemUploadList.Upload")
                          .ToList()
                          .Select(f => f)
                          .FirstOrDefault();

            // Get variables before we destroy fund object
            if (fund == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Unable to find fund");
            }

            var permalink = fund.Permalink;
            var title = fund.Title;
            var defaultImage = fund.ItemUploadList.FirstOrDefault(img => img.IsDefault == true || img.SortOrder == 0)
                               ?? new ItemUpload
                                  {
                                      Upload =
                                          new Upload
                                          {
                                              Name =
                                                  ConfigurationManager.AppSettings[
                                                      "DefaultUpdateImage"]
                                          }
                                  };

            value.Fund = null;
            value.UserId = User.Identity.GetUserId();
            TheContext.FundActivity.AddObject(
                new FundActivity
                {
                    TypeId = "NewUpdate", 
                    FundId = fundId, 
                    Activity =
                        new Activity
                        {
                            TypeId = "Create", 
                            Memo = "A new update has been added to campaign"
                        }
                });
            TheContext.FundUpdate.AddObject(value);
            TheContext.SaveChanges();

            if (value.PostedToFacebook)
            {
                PostToFacebook(value, permalink, title, defaultImage);
            }

            if (value.PostedToTwitter)
            {
                PostToTwitter(value, permalink, title);
            }

            if (value.PostedToEmail)
            {
                PostToEmail(fundId, value, permalink, title, defaultImage);
            }

            var fundUpdate =
                TheContext.FundUpdate.ByIdentification(value.Identification)
                          .Include("AspNetUser")
                          .Include("AspNetUser.AspNetUserLoginList")
                          .ToList()
                          .Select(u => TheModelFactory.Create(u));

            return Request.CreateResponse(HttpStatusCode.OK, fundUpdate.First());
        }

        /// <summary>
        /// Puts the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException">
        /// </exception>
        /// <exception cref="HttpResponseMessage">
        /// </exception>
        [HttpPut]
        [Route("{id}")]
        public HttpResponseMessage Put(int id, FundUpdate value)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var fundUpdate = TheContext.FundUpdate.GetByKey(id);
            if (fundUpdate == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            TheContext.ApplyCurrentValues(fundUpdate.EntityKey.EntitySetName, value);
            TheContext.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        #endregion

        #region Methods

        /// <summary>
        /// Posts to email.
        /// </summary>
        /// <param name="fundId">The fund identifier.</param>
        /// <param name="value">The value.</param>
        /// <param name="permalink">The permalink.</param>
        /// <param name="title">The title.</param>
        /// <param name="defaultImage">The default image.</param>
        internal void PostToEmail(int fundId, FundUpdate value, string permalink, string title, ItemUpload defaultImage)
        {
            var users =
                TheContext.FundUser.ByFundId(fundId)
                          .Include(u => u.AspNetUser)
                          .ToList()
                          .Select(u => TheModelFactory.Create(u));

            var model = new FundUpdateModel(users)
                        {
                            Title     = "A New Update!", 
                            SubTitle  = string.Format("Click on the link below to view!"), 
                            FirstName = "Subscriber", 
                            LastName  = string.Empty, 
                            Body      = value.Content, 
                            Permalink = permalink, 
                            FundTitle = title
                        };

            var result = MandrillController.SendOnUpdate(model);

            if (result[0].Status != EmailResultStatus.Sent)
            {
                // TODO
                // Log error
            }
        }

        /// <summary>
        /// Posts to facebook.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="permalink">The permalink.</param>
        /// <param name="title">The title.</param>
        /// <param name="defaultImage">The default image.</param>
        internal void PostToFacebook(FundUpdate value, string permalink, string title, ItemUpload defaultImage)
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return;
            }

            string accessTokenValue;
            if (GetClaim(value, identity, FacebookController.CLAIM_TYPE, out accessTokenValue))
            {
                return;
            }

            var currentServer = ConfigurationManager.AppSettings["CurrentServer"];

            var graph = new Graph();
            graph.PostFeed(
                new FeedRequest
                {
                    accessToken = accessTokenValue, 
                    caption     = "WWW.FUNDINGMIRACLES.COM", 
                    description = Helper.HtmlUtilities.UnHtml(value.Content), 
                    link        = string.Format("{0}/{1}", currentServer, permalink), 
                    message     = "A new update has been added to " + title, 
                    name        = title, 
                    picture     =
                        string.Format(
                            "{0}/azure/img/{1}?height=150&width=230&mode=crop", 
                            currentServer, 
                            defaultImage.Upload.Name)
                });
        }

        /// <summary>
        /// Posts to twitter.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="permalink">The permalink.</param>
        /// <param name="title">The title.</param>
        internal void PostToTwitter(FundUpdate value, string permalink, string title)
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return;
            }

            string accessTokenValue;
            if (GetClaim(value, identity, TwitterController.CLAIM_TYPE, out accessTokenValue))
            {
                return;
            }

            var access = JsonConvert.DeserializeObject<OAuthRequestTokenResponse>(accessTokenValue);

            var currentServer = ConfigurationManager.AppSettings["CurrentServer"];
            var link = string.Format("{0}/{1}", currentServer, permalink);
            var status = string.Format("{0} {1} {2}", "A new update has been added to", title, link);
            var twitterApi = new TwitterClient();

            var response = twitterApi.Tweet(access.Token, access.TokenSecret, status);
        }

        /// <summary>
        /// Gets the claim.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="identity">The identity.</param>
        /// <param name="claimType">Type of the claim.</param>
        /// <param name="accessTokenValue">The access token value.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        private bool GetClaim(FundUpdate value, ClaimsIdentity identity, string claimType, out string accessTokenValue)
        {
            var accessToken = identity.Claims.FirstOrDefault(c => c.Type == claimType);
            accessTokenValue = string.Empty;

            if (accessToken == null)
            {
                var userClaim =
                    TheContext.AspNetUserClaim.ByUserId(value.UserId).FirstOrDefault(c => c.ClaimType == claimType);
                if (userClaim != null)
                {
                    accessTokenValue = userClaim.ClaimValue;
                }
            }
            else
            {
                accessTokenValue = accessToken.Value;
            }

            return string.IsNullOrEmpty(accessTokenValue);
        }

        #endregion
    }
}