// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 01-10-2017
// ***********************************************************************
// <copyright file="DonationController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.Data.Controllers.API
{
    #region Directives

    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    #endregion

    /// <summary>
    /// Class DonationController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    /// <remarks>Fundraiser donation</remarks>
    [Authorize]
    [RoutePrefix("api/admin/item/{itemId}/donation")]
    public partial class DonationController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Gets the order.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="donationId">The donation identifier.</param>
        /// <param name="orderId">The order identifier.</param>
        /// <returns>IHttpActionResult.</returns>
        [HttpGet]
        [Route("{donationId}/order/{orderId}")]
        public IHttpActionResult GetOrder(int itemId, int donationId, int orderId)
        {
            AccessLevel("Administrator", "Admin");

            var result =
                TheContext.Order.ByIdentification(orderId)
                          .Include(baa => baa.BillingAddressAddress)
                          .Include(g => g.Geo)
                          .SingleOrDefault();

            return Ok(result);
        }

        /// <summary>
        /// Updates the specified value.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="donationId">The donation identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException">
        /// </exception>
        /// <exception cref="HttpResponseMessage">
        /// </exception>
        /// <remarks>Fill in the blank</remarks>
        [Route("{donationId}")]
        [HttpPut]
        public HttpResponseMessage Update(int itemId, int donationId, Donation value)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var current = _context.Donation.GetByKey(value.Identification);
            if (current == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            var memo = string.Format("Donation by {0} updated", value.DonorName);
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

        #endregion
    }
}