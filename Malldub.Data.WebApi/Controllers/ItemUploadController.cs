// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 01-03-2017
// ***********************************************************************
// <copyright file="ItemUploadController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.Data.Controllers.API
{
    #region Directives

    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Marasco.Azure.Storage.Business;
    using Marasco.Azure.Storage.Models;

    #endregion

    /// <summary>
    /// Class ItemUploadController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    /// <seealso cref="System.Web.Http.ApiController" />
    /// <remarks>Fill in the blank</remarks>
    [Authorize]
    [RoutePrefix("api/admin/item/{itemId}/upload")]
    public partial class ItemUploadController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Deletes the item.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="uploadId">The upload identifier.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [HttpDelete]
        [Route("{uploadId}")]
        public HttpResponseMessage DeleteItem(int itemId, int uploadId)
        {
            try
            {
                var upload = TheContext.Upload.GetByKey(uploadId);
                if (upload == null)
                {
                    return Request.CreateErrorResponse(
                        HttpStatusCode.NotFound,
                        string.Format(
                            "Could not find the item upload - Item uploadId : {0}, Upload Id : {1}",
                            itemId, 
                            uploadId));
                }

                var memo = string.Format("Campaign image deleted: [{0}][{1}]", upload.Identification, upload.Name); 

                TheContext.Upload.DeleteObject(upload);
                TheContext.FundActivity.AddObject(
                new FundActivity
                {
                    Activity = new Activity { TypeId = "Delete", Memo = memo, IsPrivate = true},
                    TypeId = "CampaignImageDeleted",
                    FundId = itemId
                });
                TheContext.SaveChanges();

                CloudBlockBlobBusiness.Delete(upload.Name.Split(",".ToCharArray()));

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// Gets the specified item identifier.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get(int itemId)
        {
            AccessLevel("Administrator", "Admin");

            var result =
                _context.ItemUpload.ByItemId(itemId).Include("Upload").ToList().Select(u => TheModelFactory.Create(u));

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// Gets the by identifier.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="uploadId">The upload identifier.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Fill in the blank</remarks>
        [HttpGet]
        [Route("{uploadId}")]
        public HttpResponseMessage GetById(int itemId, int uploadId)
        {
            AccessLevel("Administrator", "Admin");

            var result = _context.ItemUpload.ByUploadId(uploadId).Include("Upload").SingleOrDefault();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// Saves the specified item upload.
        /// </summary>
        /// <param name="itemUpload">The item upload.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException"></exception>
        /// <exception cref="HttpResponseMessage"></exception>
        /// <remarks>Fill in the blank</remarks>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Save(ItemUpload itemUpload)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            _context.ItemUpload.AddObject(itemUpload);
            var memo = string.Format("Image: {0} has been added to the campaign", itemUpload.Upload.Name);
            _context.FundActivity.AddObject(
                new FundActivity
                {
                    Activity = new Activity { TypeId = "Create", Memo = memo, IsPrivate = true },
                    TypeId = "NewImage",
                    FundId = itemUpload.ItemId
                });
            _context.SaveChanges();

            var response = Request.CreateResponse(HttpStatusCode.Created, itemUpload);

            // response.Headers.Location = new Uri(Url.Link("DefaultApi", new { itemUpload.ItemId, itemUpload.UploadId }));
            return response;
        }

        /// <summary>
        /// Sets the default.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="uploadId">The upload identifier.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException">
        /// </exception>
        /// <exception cref="HttpResponseMessage">
        /// </exception>
        /// <remarks>Fill in the blank</remarks>
        [HttpGet]
        [Route("{uploadId}/default")]
        public HttpResponseMessage SetDefault(int itemId, int uploadId)
        {
            AccessLevel("Administrator", "Admin");

            var itemUpload = _context.ItemUpload.GetByKey(itemId, uploadId);
            var value = _context.ItemUpload.ByUploadId(uploadId).SingleOrDefault();

            if (itemUpload == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            if (value == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            // All this just to change the default
            value.IsDefault = !value.IsDefault;

            _context.ApplyCurrentValues(itemUpload.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, value);
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
        [Route("{uploadId}")]
        [HttpPut]
        public HttpResponseMessage Update(ItemUpload value)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var itemUpload = _context.ItemUpload.GetByKey(value.ItemId, value.UploadId);
            if (itemUpload == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            _context.ApplyCurrentValues(itemUpload.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
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
        [Route("")]
        [HttpPut]
        public HttpResponseMessage UpdateSort(List<ItemUpload> value)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var i = 0;
            foreach (var itemUpload in value)
            {
                var olditemUpload = _context.ItemUpload.GetByKey(itemUpload.ItemId, itemUpload.UploadId);
                if (olditemUpload == null)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                }

                itemUpload.SortOrder = i;

                _context.ApplyCurrentValues(olditemUpload.EntityKey.EntitySetName, itemUpload);
                _context.SaveChanges();

                i++;
            }

            var response = Request.CreateResponse(HttpStatusCode.OK, value);
            return response;
        }

        /// <summary>
        /// Uploaders this instance.
        /// </summary>
        /// <returns>Task&lt;List&lt;FileDetails&gt;&gt;.</returns>
        /// <remarks>Fill in the blank</remarks>
        [HttpPost]
        [Route("uploader")]
        public Task<List<FileDetails>> Uploader()
        {
            return CloudBlockBlobBusiness.Post(Request);
        }

        #endregion
    }
}