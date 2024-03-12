// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="FundController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.Data.Controllers.API
{
    #region Directives

    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Malldub.Helper;
    using Malldub.WebApi.Models;

    using Marasco.Api;
    using Marasco.Api.Model;
    using Marasco.Azure.Storage.Business;

    #endregion

    /// <summary>
    /// Class FundController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    /// <remarks>Fill in the blank</remarks>
    [Authorize]
    [RoutePrefix("api/admin/fund")]
    public partial class FundController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Histories/Activity the specified identifier.
        /// </summary>
        /// <param name="fundId">The identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("{fundId}/activity/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Activity(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result =
                TheContext.FundActivity.ByFundId(fundId)
                          .Include("Activity")
                          .Include("Activity.ActivityType")
                          .Include("FundActivityType");

            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.Activity.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }

        /// <summary>
        /// Histories/Activity the specified identifier.
        /// </summary>
        /// <param name="fundId">The identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("{fundId}/comments/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Comments(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result =
                TheContext.FundComment.ByFundId(fundId)
                          .Include(fc => fc.FundCommentOrigin)
                          .Include(c => c.Comment)
                          .Include(a => a.Comment.AspNetUser)
                          .Include(g => g.Comment.Geo);

            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.Comment.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }

        /// <summary>
        /// Histories/Activity the specified identifier.
        /// </summary>
        /// <param name="fundId">The identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("{fundId}/uploads/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Uploads(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result =
                _context.ItemUpload.ByItemId(fundId)
                          .Include("Upload")
                          .ToList()
                          .Select(u => TheModelFactory.Create(u));

            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result = result.OrderBy(i => i.SortOrder).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
            }
            else
            {
                result = result.OrderBy(i => i.SortOrder);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }


        /// <summary>
        /// Deletes the specified fundId.
        /// </summary>
        /// <param name="fundId">The fundId.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Delete from item Hierarchy (parent of fund</remarks>
        [Route("{fundId}")]
        [HttpDelete]
        public HttpResponseMessage Delete(int fundId)
        {
            AccessLevel("Administrator", "Admin");
            var item = _context.Fund.ByIdentification(fundId).Include("Item").SingleOrDefault();

            var uploads = new List<Upload>();
            var orders = new List<Order>();
            if (item == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            var itemUploads =
                _context.Item.ByIdentification(fundId)
                        .Include("ItemUploadList")
                        .Include("OrderItemList")
                        .FirstOrDefault();

            // Get items one layer removed
            // Orders and images
            if (itemUploads != null)
            {
                uploads.AddRange(
                    itemUploads.ItemUploadList.Select(itemUpload => _context.Upload.GetByKey(itemUpload.UploadId)));
                orders.AddRange(
                    itemUploads.OrderItemList.Select(itemOrder => _context.Order.GetByKey(itemOrder.OrderId)));
            }

            _context.Fund.DeleteObject(item);

            // Remove images from the cloud
            foreach (var upload in uploads)
            {
                _context.Upload.DeleteObject(upload);
            }

            // Remove orders
            foreach (var order in orders)
            {
                _context.Order.DeleteObject(order);
            }

            // If team page
            if (item.TypeId == "TeamPage" || item.TypeId == "TeamMemberPage")
            {
                var fundTeam = _context.FundTeam.ByTeamFundId(fundId).Single();
                _context.FundTeam.DeleteObject(fundTeam);
            }

            _context.SaveChanges();

            foreach (var upload in uploads.Where(upload => upload.TypeId == "web.Image"))
            {
                CloudBlockBlobBusiness.Delete(upload.Name.Split(",".ToCharArray()));
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        /// <summary>
        /// Alls this instance.
        /// </summary>
        /// <returns>IQueryable&lt;Fund&gt;.</returns>
        /// <remarks>Fill in the blank</remarks>
        [HttpGet]
        [Route("")]
        public IQueryable<Fund> Get()
        {
            AccessLevel("Administrator", "Admin");
            return _context.Fund
                .Include(i => i.Item)
                .Include(s => s.FundSetting)
                .AsQueryable();
        }

        /// <summary>
        /// Gets the categories.
        /// </summary>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("categories")]
        public HttpResponseMessage GetCategories()
        {
            try
            {
                var types = _context.FundCategory.Select(ft => new { ft.FriendlyName, ft.Identification });

                return Request.CreateResponse(HttpStatusCode.OK, types);
            }
            catch (Exception exc)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
            }
        }

        /// <summary>
        /// Gets the donations.
        /// </summary>
        /// <param name="fundId">The fund identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>IHttpActionResult.</returns>
        /// <remarks>Fill in the blank</remarks>
        [HttpGet]
        [Route("{fundId}/donations/{pageNumber}/{itemsPerPage}")]
        public IHttpActionResult GetDonations(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");

            var result =
                TheContext.Donation.ByFundId(fundId)
                    .Include("DonorUserAspNetUser")
                    .Include("DonorUserAspNetUser.AspNetUserLoginList")
                    .ToList()
                    .Select(d => TheModelFactory.Create(d));

            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result = result.OrderByDescending(ft => ft.DateEntered)
                    .Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result };
            return Ok(ret);
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
                var types = _context.ItemStatus.Select(ft => new { ft.FriendlyName, ft.Identification });

                return Request.CreateResponse(HttpStatusCode.OK, types);
            }
            catch (Exception exc)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
            }
        }

        /// <summary>
        /// Gets the categories.
        /// </summary>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("types")]
        public HttpResponseMessage GetTypes()
        {
            try
            {
                var types = _context.FundType.Select(ft => new { ft.FriendlyName, ft.Identification });

                return Request.CreateResponse(HttpStatusCode.OK, types);
            }
            catch (Exception exc)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
            }
        }

        /// <summary>
        /// Histories/Activity the specified identifier.
        /// </summary>
        /// <param name="fundId">The identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("{fundId}/posts/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Posts(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result = TheContext.FundUpdate.ByFundId(fundId)
                .Include(u => u.AspNetUser);

            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }

        /// <summary>
        /// Saves the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException"></exception>
        /// <exception cref="HttpResponseMessage"></exception>
        /// <remarks>Fill in the blank</remarks>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Save(Fund value)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            value.Item.UserId = value.Item.AspNetUser.Identification;
            value.Item.Permalink = GetPermalink();
            value.FundSetting = new FundSetting();
            value.Item.StatusId = "Preliminary";
            value.Item.ShortSummary = "I need your help!";
            value.Item.TypeId = "FundoloFund";
            value.Item.TransactionTypeId = "Donation";
            value.Item.Description =
                "I'm raising money for a cause that is dear to me and I need your help to reach my goal!  Please h"
                + "elp by becoming a supporter, subscriber, or fundraiser and share with your friends and family";

            // Set Defaults;
            value.FundActivityList.Add(
                new FundActivity
                {
                    Activity = new Activity { TypeId = "Create", Memo = "New Campaign Created" }, 
                    TypeId = "CampaignCreated"
                });

            value.FundUserList.Add(
                new FundUser
                {
                    AllowEmail = true, 
                    PostToFacebook = true, 
                    UserId = value.Item.UserId, 
                    UserTypeId = "Originator"
                });
            TheContext.Fund.AddObject(value);
            TheContext.SaveChanges();

            var response = Request.CreateResponse(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { value.Identification }));

#if !DEBUG
      Prerender(value.Item.Permalink);
#endif

            return response;
        }

        /// <summary>
        /// LOCK UNLOCK USER
        /// </summary>
        /// <param name="featured">The featured.</param>
        /// <returns>error in not succeeded else OK</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("setFeatured")]
        [HttpPost]
        public IHttpActionResult SetFeatured(FundFeatured featured)
        {
            AccessLevel("Administrator", "Admin");
            try
            {
                var oldItem = _context.Item.GetByKey(featured.Id);
                var newItem = _context.Item.ByIdentification(featured.Id).SingleOrDefault();

                if (newItem != null)
                {
                    newItem.Featured = featured.Featured;

                    _context.ApplyCurrentValues(oldItem.EntityKey.EntitySetName, newItem);
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Shareses the specified fund identifier.
        /// </summary>
        /// <param name="fundId">The fund identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        [Route("{fundId}/shares/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Shares(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result = TheContext.FundShare.ByFundId(fundId).Include(p => p.AspNetUser);


            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }

        [Route("{fundId}/teams/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Teams(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result =
                TheContext.FundTeam.ByFundId(fundId)
                          .Include(u => u.TeamFundFund)
                          .Include(t => t.Team)
                          .Include(m => m.FundTeamMemberList)
                          .Include(ut => ut.TeamFundFund.Item)
                          .Include(s => s.TeamFundFund.FundSetting);

            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.Team.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }

        /// <summary>
        /// Updates the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException">
        /// </exception>
        /// <exception cref="HttpResponseMessage">
        /// </exception>
        /// <remarks>Fill in the blank</remarks>
        [HttpPut]
        [Route("{fundId}")]
        public HttpResponseMessage Update(Fund value)
        {
            AccessLevel("Administrator", "Admin");

            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var fund = TheContext.Fund.Include("Item").GetByKey(value.Identification);

            var item = TheContext.Item.GetByKey(value.Item.Identification);
            var itemSettings = TheContext.FundSetting.GetByKey(value.Item.Identification);

            if (fund == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            if (item == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            // Check Duplication of permalink
            if (value.Item.Permalink != fund.Item.Permalink)
            {
                // Check if exists
                var permalinkExists = PermalinkExists(value.Item.Permalink);
                if (permalinkExists)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Duplicate permalinks not permitted.");
                }
            }

            value.Item.DateUpdated = DateTime.UtcNow;
            TheContext.ApplyCurrentValues(item.EntityKey.EntitySetName, value.Item);
            TheContext.ApplyCurrentValues(fund.EntityKey.EntitySetName, value);
            TheContext.ApplyCurrentValues(itemSettings.EntityKey.EntitySetName, value.FundSetting);
            TheContext.FundActivity.AddObject(
                new FundActivity
                {
                    Activity = new Activity
                               {
                                   TypeId = "Update", Memo = "Campaign updated", IsPrivate = true
                               }, 
                    TypeId = "CampaignUpdated", 
                    FundId = value.Identification
                });


            TheContext.SaveChanges();
#if !DEBUG
            Prerender(value.Item.Permalink);
#endif

            return Request.CreateResponse(HttpStatusCode.OK, value);
        }

        /// <summary>
        /// Userses the specified fund identifier.
        /// </summary>
        /// <param name="fundId">The fund identifier.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        [Route("{fundId}/users/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Users(int fundId, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result = TheContext.FundUser.ByFundId(fundId).Include(p => p.AspNetUser);


            var count = result.Count();

            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }
        #endregion

        #region Methods

        /// <summary>
        /// Prerenders the specified permalink.
        /// </summary>
        /// <param name="permalink">The permalink.</param>
        /// <returns>System.String.</returns>
        /// <remarks>Fill in the blank</remarks>
        private static string Prerender(string permalink)
        {
          var currentServer = ConfigurationManager.AppSettings["CurrentServer"];
          var url = string.Format("{0}/{1}", currentServer, permalink);

          var recache = new ReCacheRequest { Url = url };

          var prerender = new PrerenderIo();
          var post = prerender.Post(recache);
          return post;
        }

        /// <summary>
        /// Gets the permalink.
        /// </summary>
        /// <returns>System.String.</returns>
        /// <remarks>Default Blank Remakrs Test</remarks>
        private string GetPermalink()
        {
            var rs = new RandomStringGenerator(
                useSpecialCharacters: false, 
                useNumericCharacters: false, 
                useUpperCaseCharacters: false) {
                                                  RepeatCharacters = false 
                                               };

            var permalink = rs.Generate(6);

            bool permalinkExists;
            do
            {
                permalinkExists = PermalinkExists(permalink);
                if (permalinkExists)
                {
                    permalink = rs.Generate(6);
                }
            }
            while (permalinkExists);

            return permalink;
        }

        /// <summary>
        /// Permalinks the exists.
        /// </summary>
        /// <param name="permalink">The permalink.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        /// <remarks>Fill in the blank</remarks>
        private bool PermalinkExists(string permalink)
        {
            var item = TheContext.Item.ByPermalink(permalink).FirstOrDefault();
            var permalinkExists = item != null;
            return permalinkExists;
        }

        #endregion
    }
}