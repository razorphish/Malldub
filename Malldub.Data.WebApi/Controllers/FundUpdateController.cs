// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 01-28-2017
// ***********************************************************************
// <copyright file="FundUpdateController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.Data.Controllers.API
{
    #region Directives

    using System;
    using System.Configuration;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Malldub.WebApi.RootControllers;

    using Microsoft.AspNet.Identity;

    #endregion

    /// <summary>
    /// Class FundUpdateController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    [Authorize]
    [RoutePrefix("api/admin/item/{itemId}/update")]
    public partial class FundUpdateController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Posts the specified item identifier.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException"></exception>
        /// <exception cref="HttpResponseMessage"></exception>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(int itemId, [FromBody] FundUpdate value)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var fund =
                TheContext.Item.ByIdentification(itemId)
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

            var fc = new FundUpdateDetailsController();
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
                    FundId = itemId, 
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
                fc.PostToFacebook(value, permalink, title, defaultImage);
            }

            if (value.PostedToTwitter)
            {
                fc.PostToTwitter(value, permalink, title);
            }

            if (value.PostedToEmail)
            {
                fc.PostToEmail(itemId, value, permalink, title, defaultImage);
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
        /// Updates the specified value.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="updateId">The update identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException">
        /// </exception>
        /// <exception cref="HttpResponseMessage">
        /// </exception>
        /// <remarks>Fill in the blank</remarks>
        [Route("{updateId}")]
        [HttpPut]
        public HttpResponseMessage Update(int itemId, int updateId, FundUpdate value)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var current = _context.FundUpdate.GetByKey(value.Identification);
            if (current == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            var memo = string.Format("Fund Post by {0} {1} updated", value.User.FirstName, value.User.LastName);
            _context.FundActivity.AddObject(
                new FundActivity
                {
                    Activity = new Activity { TypeId = "Update", Memo = memo, IsPrivate = true }, 
                    TypeId = "CampaignUpdated", 
                    FundId = value.FundId
                });
            _context.ApplyCurrentValues(current.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        /// <summary>
        /// Gets the statuses.
        /// </summary>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [AllowAnonymous]
        [Route("statuses")]
        public HttpResponseMessage GetStatuses()
        {
            try
            {
                var items = _context.FundUpdateStatus.Select(ft => new { ft.FriendlyName, ft.Identification });

                return Request.CreateResponse(HttpStatusCode.OK, items);
            }
            catch (Exception exc)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
            }
        }
        #endregion
    }
}