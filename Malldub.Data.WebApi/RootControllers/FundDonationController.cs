// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 12-26-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-26-2014
// ***********************************************************************
// <copyright file="FundDonationController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Data.Entity;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Malldub.Data;
  using Malldub.WebApi.Models;

  using Microsoft.AspNet.Identity;

  #endregion

  [RoutePrefix("api/fund/{fundId}/donations")]
  [Authorize]
  public class FundDonationController : BaseApiController
  {

    #region Public Methods and Operators

    public FundDonationController()
      : base(new MalldubDataContext()) {}

    /// <summary>
    /// Bies the fund identifier.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="itemsPerPage">The items per page.</param>
    /// <returns>HttpResponseMessage.</returns>
    [HttpGet]
    [Route("{pageNumber}/{itemsPerPage}")]
    [AllowAnonymous]
    public HttpResponseMessage ByFundId(int fundId, int pageNumber = 1, int itemsPerPage = 10)
    {
      var result =
        TheContext.Donation
                .Include("DonorUserAspNetUser")
                .Include("DonorUserAspNetUser.AspNetUserLoginList")
                .ByFundId(fundId)
                .ToList()
                .Select(
                  d => TheModelFactory.Create(d));

      var count = result.Count();

      if (itemsPerPage > 0)
      {
        result = result.OrderByDescending(ft => ft.DateEntered).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
      }

      var ret = new { Count = count, Data = result };

      var response = Request.CreateResponse(HttpStatusCode.OK, ret);

      return response;
    }

    [HttpPost]
    [Route("offline")]
    public HttpResponseMessage PostOffline(int fundId, Donation value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }
      value.DonorUserId = User.Identity.GetUserId();

      TheContext.Donation.AddObject(value);

      TheContext.FundActivity.AddObject(new FundActivity
      {
        Activity =
          new Activity
          {
            TypeId = "Update",
            Memo = string.Format("An offline donation from {0} in the amount of ${1} was posted.",  value.DonorName, value.BeneficiaryAmount)
          },
        TypeId = "OfflineDonation",
        FundId = fundId
      });


      TheContext.SaveChanges();

      var response = Request.CreateResponse(HttpStatusCode.Created, value);

      return response;
    }

    [Route("xlite/{id}")]
    [HttpPut]
    public HttpResponseMessage UpdateLite(int fundId, int id, DonationxLiteModel value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var donation = TheContext.Donation.GetByKey(id);
      if (donation == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      var donationChanged = donation;

      donationChanged.IsPrivateAmount    = value.IsPrivateAmount;
      donationChanged.IsPrivateDonorName = value.IsPrivateDonorName;
      donationChanged.Message            = value.Message;

      TheContext.ApplyCurrentValues(donation.EntityKey.EntitySetName, donationChanged);

      TheContext.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [HttpPost]
    [Route("")]
    public HttpResponseMessage Post(int fundId, Donation value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      value.DonorUserId = User.Identity.GetUserId();

      TheContext.Donation.AddObject(value);

      TheContext.FundActivity.AddObject(new FundActivity
      {
        Activity =
          new Activity
          {
            TypeId = "Update",
            Memo = string.Format("A donation from {0} in the amount of ${1} was received.", value.DonorName, value.BeneficiaryAmount)
          },
        TypeId = "DonationReceived",
        FundId = fundId
      });


      TheContext.SaveChanges();

      var response = Request.CreateResponse(HttpStatusCode.Created, value);
      response.Headers.Location = new Uri(Url.Link("DefaultApi", new { value.Identification }));

      return response;
    }

    [Authorize(Roles = "Admin")]
    public HttpResponseMessage Put(Donation value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var donation = TheContext.Donation.GetByKey(value.Identification);
      if (donation == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      TheContext.ApplyCurrentValues(donation.EntityKey.EntitySetName, value);
      TheContext.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [Route("{id}/sendnote")]
    [HttpPost]
    public HttpResponseMessage SendNote(int fundId, int id, DonationNoteModel value)
    {

      TheContext.DonationNote.AddObject(new DonationNote
      {
        DonationId = id,
        Message    = value.Message,
        TypeId     = value.TypeId,
      });

      var donation = TheContext.Donation.ByIdentification(id)
        .Include("Fund")
        .Include("Fund.Item");

      var origDonation = donation.FirstOrDefault();
      var changedDonation = origDonation;
      if (changedDonation == null)
      {
        return Request.CreateResponse(
          HttpStatusCode.InternalServerError,
          new { error_description = "Donation not found", error = "Donation Not found" });
      }

      changedDonation.ThankYouNoteSent = true;
      value.Email                      = origDonation.Email;
      value.FundTitle                  = origDonation.Fund.Item.Title;
      value.Permalink                  = origDonation.Fund.Item.Permalink;
      value.DonorName                  = origDonation.IsPrivateDonorName ? "Anonymous" : origDonation.DonorName;

      TheContext.ApplyCurrentValues(origDonation.EntityKey.EntitySetName, changedDonation);
      TheContext.SaveChanges();

      // Now Send Email
      MandrillController.SendThankYou(value);

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion
  }
}