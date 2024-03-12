// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-08-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 04-02-2017
// ***********************************************************************
// <copyright file="FundDetailsController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Configuration;
  using System.Data.Entity;
  using System.Data.Objects.DataClasses;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Net.Http.Headers;
  using System.Threading.Tasks;
  using System.Web.Http;

  using Malldub.Data;
  using Malldub.Data.Models;
  using Malldub.Helper;
  using Malldub.WebApi.Controllers;
  using Malldub.WebApi.Models;

  using Mandrill;

  using Marasco.Api;
  using Marasco.Api.Model;
  using Marasco.Azure.Storage.Business;

  using Microsoft.AspNet.Identity;

  using ServiceStack;

  #endregion

  /// <summary>
  /// Class FundDetailsController.
  /// </summary>
  /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
  /// <remarks>Default Blank Remakrs Test</remarks>
  [RoutePrefix("api/funddetails")]
  [Authorize]
  public class FundDetailsController : BaseApiController
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="FundDetailsController" /> class.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public FundDetailsController()
      : base(new MalldubDataContext()) {}

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Copies the fund.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPost]
    [Route("copy/{id}")]
    public HttpResponseMessage Copy(int id)
    {
      var newFund = Copyfundraiser(id);

      var response = Request.CreateResponse(HttpStatusCode.Created, newFund);

      return response;
    }

    /// <summary>
    /// Copies the fund.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPost]
    [Route("copy2/{id}")]
    public HttpResponseMessage Copy2(int id)
    {
      var newFund = Copyfundraiser(id, "Campaign", true);

      var response = Request.CreateResponse(HttpStatusCode.Created, newFund);

      return response;
    }

    /// <summary>
    /// Gets the by user identifier type identifier.
    /// </summary>
    /// <param name="typeId">The type identifier.</param>
    /// <returns>IQueryable.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public IQueryable GetByUserIdTypeId(string typeId)
    {
      var userId = User.Identity.GetUserId();
      var query =
        TheContext.Fund.Include("Item")
                  .Include("DonationList")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("FundNoteList")
                  .Where(g => g.Item.UserId == userId && g.TypeId == typeId)
                  .OrderBy(d => d.Item.DateEntered)
                  .Select(
                    f =>
                    new
                    {
                      f.Identification, 
                      f.EnableSocialSharing, 
                      f.GoalAmount, 
                      f.IsPrivate, 
                      f.PageColor, 
                      f.PageLayout, 
                      f.PageSkin, 
                      f.TypeId, 
                      f.CategoryId, 
                      FundNoteCount =
                      f.FundNoteList.Count(fn => fn.Note.Viewed == false && fn.Note.IsPrivate == false), 
                      DonationList =
                      f.DonationList.Select(
                        dl =>
                        new
                        {
                          dl.Amount, 
                          dl.BeneficiaryAmount, 
                          dl.DonorName, 
                          dl.Email, 
                          dl.IsPrivateAmount, 
                          dl.IsPrivateDonorName, 
                          dl.Message, 
                          dl.DateEntered
                        }), 
                      Item =
                      new
                      {
                        f.Item.DateEntered, 
                        f.Item.Description, 
                        f.Item.EndDate, 
                        f.Item.Identification, 
                        f.Item.Permalink, 
                        f.Item.StartDate, 
                        f.Item.Title, 
                        f.Item.StatusId, 
                        f.Item.TypeId, 
                        ItemUploadList =
                      f.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                      }
                    });

      return query;
    }

    /// <summary>
    /// Gets the completed funds where the goal was reached.
    /// </summary>
    /// <param name="numberToTake">The number automatic take.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>var objectQuery = obj as System.Data.Objects.ObjectQuery;
    /// Console.WriteLine(objectQuery.ToTraceString());</remarks>
    [Route("completed")]
    [AllowAnonymous]
    [HttpGet]
    public HttpResponseMessage GetCompletedFunds(int numberToTake)
    {
      if (numberToTake < 1)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fund Id not valid");
      }

      var obj =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("DonationList")
                  .Include("FundCategory")
                  .Where(
                    f =>
                    f.GoalAmount <= f.DonationList.Sum(d => d.BeneficiaryAmount) && !f.IsPrivate
                    && f.Item.StatusId == "Active" && f.Item.StatusId != "Expired")
                  .ToList()
                  .OrderBy(r => Guid.NewGuid())
                  .Take(numberToTake)
                  .Select(
                    f =>
                    new
                    {
                      f.Identification, 
                      f.EnableSocialSharing, 
                      f.GoalAmount, 
                      f.IsPrivate, 
                      f.PageColor, 
                      f.PageLayout, 
                      f.PageSkin, 
                      f.TypeId, 
                      f.CategoryId, 
                      f.FundCategory.FriendlyName, 
                      DonationList =
                      f.DonationList.Select(
                        dl =>
                        new
                        {
                          dl.Amount, 
                          dl.BeneficiaryAmount, 
                          dl.DonorName, 
                          dl.Email, 
                          dl.IsPrivateAmount, 
                          dl.IsPrivateDonorName, 
                          dl.Message, 
                          dl.DateEntered
                        }), 
                      Item =
                      new
                      {
                        f.Item.DateEntered, 
                        f.Item.Description, 
                        f.Item.EndDate, 
                        f.Item.Identification, 
                        f.Item.Permalink, 
                        f.Item.StartDate, 
                        f.Item.Title, 
                        f.Item.StatusId, 
                        ItemUploadList =
                      f.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                      }
                    });

      return Request.CreateResponse(HttpStatusCode.OK, obj);
    }

    /// <summary>
    /// Gets the featured funds.
    /// </summary>
    /// <param name="numberToTake">The number automatic take.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>var objectQuery = obj as System.Data.Objects.ObjectQuery;
    /// Console.WriteLine(objectQuery.ToTraceString());</remarks>
    [Route("featured")]
    [AllowAnonymous]
    [HttpGet]
    public HttpResponseMessage GetFeaturedFunds(int numberToTake)
    {
      if (numberToTake < 1)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fund Id not valid");
      }

      var obj =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("DonationList")
                  .Include("FundCategory")
                  .Where(
                    f =>
                    f.Item.Featured && f.Item.EndDate > DateTime.UtcNow && !f.IsPrivate && f.Item.StatusId == "Active"
                    && f.Item.StatusId != "Expired")
                  .ToList()
                  .OrderBy(r => Guid.NewGuid())
                  .Take(numberToTake)
                  .Select(
                    f =>
                    new
                    {
                      f.Identification, 
                      f.EnableSocialSharing, 
                      f.GoalAmount, 
                      f.IsPrivate, 
                      f.PageColor, 
                      f.PageLayout, 
                      f.PageSkin, 
                      f.TypeId, 
                      f.CategoryId, 
                      f.FundCategory.FriendlyName, 
                      DonationList =
                      f.DonationList.Select(
                        dl =>
                        new
                        {
                          dl.Amount, 
                          dl.BeneficiaryAmount, 
                          dl.DonorName, 
                          dl.Email, 
                          dl.IsPrivateAmount, 
                          dl.IsPrivateDonorName, 
                          dl.Message, 
                          dl.DateEntered
                        }), 
                      Item =
                      new
                      {
                        f.Item.DateEntered, 
                        f.Item.Description, 
                        f.Item.EndDate, 
                        f.Item.Identification, 
                        f.Item.Permalink, 
                        f.Item.StartDate, 
                        f.Item.Title, 
                        f.Item.StatusId, 
                        ItemUploadList =
                      f.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                      }
                    });

      return Request.CreateResponse(HttpStatusCode.OK, obj);
    }

    /// <summary>
    /// Gets the fund basic by identifier.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("basic/{id}")]
    [AllowAnonymous]
    public HttpResponseMessage GetFundBasicById(int id)
    {
      if (id < 1)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fund Id is not valid");
      }

      var ret =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .ByIdentification(id)
                  .Select(
                    f =>
                    new
                    {
                      f.GoalAmount, 
                      f.Identification, 
                      f.IsPrivate, 
                      f.PageColor, 
                      f.PageLayout, 
                      f.PageSkin, 
                      f.TypeId, 
                      f.CategoryId, 
                      Settings = f.FundSetting, 
                      Item =
                      new
                      {
                        f.Item.Description, 
                        f.Item.EndDate, 
                        f.Item.Featured, 
                        f.Item.Permalink, 
                        f.Item.StartDate, 
                        f.Item.Title, 
                        f.Item.StatusId, 
                        ItemUploadList =
                      f.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                       .FirstOrDefault(ul => ul.IsDefault == true)
                      }
                    });

      return ret.Any()
               ? Request.CreateResponse(HttpStatusCode.OK, ret)
               : Request.CreateResponse(HttpStatusCode.NotFound);
    }

    /// <summary>
    /// Gets the fund summary.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("summary/{id}")]
    public HttpResponseMessage GetFundSummary(int id)
    {
      var userId = User.Identity.GetUserId();

      if (id == 0)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fund Id not valid");
      }

      var obj =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("Item.AspNetUser")
                  .Include("FundUserList")
                  .Include("FundUserList.AspNetUser")
                  .Include("FundSetting")
                  .ByIdentification(id)
                  .Where(
                    f =>
                    f.FundUserList.Any(
                      ful => ful.UserId == userId && (ful.UserTypeId == "Originator" || ful.UserTypeId == "TeamManager")))
                  .Select(
                    f =>
                    new
                    {
                      f.Identification, 
                      f.EnableSocialSharing, 
                      f.GoalAmount, 
                      f.IsPrivate, 
                      f.PageColor, 
                      f.PageLayout, 
                      f.PageSkin, 
                      f.TypeId, 
                      f.CategoryId, 
                      SupporterList =
                      f.FundUserList.Select(
                        ful =>
                        new
                        {
                          ful.DateEntered, 
                          ful.AllowEmail, 
                          ful.UserTypeId, 
                          AspNetUser =
                          new
                          {
                            ful.AspNetUser.FirstName, 
                            ful.AspNetUser.LastName, 
                            ful.AspNetUser.Email, 
                            ful.AspNetUser.AvatarUploadTempLocation, 
                            FacebookProvider =
                          ful.AspNetUser.AspNetUserLoginList.Select(
                            aull => new { aull.LoginProvider, aull.ProviderKey })
                             .FirstOrDefault(aul => aul.LoginProvider == "Facebook"), 
                          }
                        }).Where(fuser => fuser.UserTypeId == "Supporter"), 
                      Item =
                      new
                      {
                        f.Item.DateEntered, 
                        f.Item.Description, 
                        f.Item.EndDate, 
                        f.Item.Identification, 
                        f.Item.Permalink, 
                        f.Item.StartDate, 
                        f.Item.Title, 
                        f.Item.UserId, 
                        f.Item.TypeId, 
                        f.Item.ShortSummary, 
                        f.Item.StatusId, 
                        ItemUploadList =
                      f.Item.ItemUploadList.Select(
                        il => new { il.IsDefault, il.UploadId, il.ItemId, il.SortOrder, il.Upload })
                      }, 
                      Originator =
                      new
                      {
                        f.Item.AspNetUser.FirstName, 
                        f.Item.AspNetUser.LastName, 
                        FullName = f.Item.AspNetUser.FirstName + " " + f.Item.AspNetUser.LastName, 
                        f.Item.AspNetUser.AvatarUploadTempLocation, 
                        f.Item.AspNetUser.AvatarUploadId
                      }, 
                      UserList =
                      f.FundUserList.Select(
                        ful =>
                        new
                        {
                          ful.AspNetUser.FirstName, 
                          ful.AspNetUser.LastName, 
                          ful.AspNetUser.Email, 
                          ful.AspNetUser.AvatarUploadTempLocation, 
                          ful.UserTypeId, 
                          FacebookProvider =
                          ful.AspNetUser.AspNetUserLoginList.Select(
                            aull => new { aull.LoginProvider, aull.ProviderKey })
                             .FirstOrDefault(aul => aul.LoginProvider == "Facebook"), 
                        }).Where(ful => ful.UserTypeId == "Beneficiary" || ful.UserTypeId == "Originator"), 
                      Settings = f.FundSetting
                    });

      return obj.Any()
               ? Request.CreateResponse(HttpStatusCode.OK, obj)
               : Request.CreateResponse(HttpStatusCode.NotFound);
    }

    /// <summary>
    /// Gets the fund summary by permalink.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("permalink/{id}")]
    [AllowAnonymous]
    public HttpResponseMessage GetFundSummaryByPermalink(string id)
    {
      if (string.IsNullOrWhiteSpace(id))
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Permalink not valid");
      }

      var obj = TheContext.Item.ByPermalink(id);

      var firstOrDefault = obj.FirstOrDefault();

      if (firstOrDefault == null)
      {
        return Request.CreateResponse(HttpStatusCode.NotFound);
      }

      var strippedDescription = StringUtilities.StripHtml(firstOrDefault.Description);

      var ret =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("FundUpdateList")
                  .Include("Item.AspNetUser")
                  .Include("Item.AspNetUser.AspNetUserGatewayList")
                  .Include("FundUser")
                  .Include("FundTeamList")
                  .Include("FundTeamList.Team")
                  .ByIdentification(firstOrDefault.Identification)
                  .Select(
                    f =>
                    new
                    {
                      f.Identification, 
                      f.EnableSocialSharing, 
                      f.GoalAmount, 
                      f.IsPrivate, 
                      f.PageColor, 
                      f.PageLayout, 
                      f.PageSkin, 
                      f.TypeId, 
                      f.CategoryId, 
                      CategoryName = f.FundCategory.FriendlyName, 
                      FundTeamList =
                      f.FundTeamList.Select(
                        ftl =>
                        new
                        {
                          ftl.GoalAmount, 
                          ftl.Identification, 
                          ftl.TeamId, 
                          ftl.TeamFundId, 
                          ftl.FundId, 
                          ftl.CaptainEmail, 
                          Team = new { ftl.Team.Name, ftl.Team.DateEntered, ftl.Team.Identification }
                        }), 
                      FundUpdateList =
                      f.FundUpdateList.Select(
                        ul =>
                        new { ul.DateEntered, ul.Content, ul.StatusId, ul.AspNetUser.FirstName, ul.AspNetUser.LastName })
                       .Where(
                         ul =>
                         ul.StatusId.Equals("Active", StringComparison.OrdinalIgnoreCase)
                         || ul.StatusId.Equals("Preliminary", StringComparison.OrdinalIgnoreCase)), 
                      Item =
                      new
                      {
                        f.Item.DateEntered, 
                        f.Item.Description, 
                        SoftDescription = strippedDescription, 
                        f.Item.ShortSummary, 
                        SoftShortSummary = f.Item.ShortSummary, 
                        f.Item.EndDate, 
                        f.Item.Identification, 
                        f.Item.Permalink, 
                        f.Item.StartDate, 
                        f.Item.Title, 
                        f.Item.StatusId, 
                        f.Item.TypeId, 
                        f.Item.TransactionTypeId, 
                        f.Item.Featured, 
                        f.Item.DateUpdated, 
                        ItemUploadList =
                      f.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          il.UploadId, 
                          il.ItemId, 
                          il.SortOrder, 
                          Upload =
                          new
                          {
                            il.Upload.CategoryId, 
                            il.Upload.ContainerName, 
                            il.Upload.ContentLength, 
                            il.Upload.ContentType, 
                            il.Upload.DateEntered, 
                            il.Upload.DateUpdated, 
                            il.Upload.Description, 
                            il.Upload.Identification, 
                            il.Upload.IsPrivate, 
                            il.Upload.Location, 
                            il.Upload.LocationHttp, 
                            il.Upload.Name, 
                            il.Upload.OriginalFileName, 
                            il.Upload.RelativeLocation, 
                            il.Upload.TypeId
                          }
                        })
                      }, 
                      Originator =
                      new
                      {
                        f.Item.AspNetUser.FirstName, 
                        f.Item.AspNetUser.LastName, 
                        FullName = f.Item.AspNetUser.FirstName + " " + f.Item.AspNetUser.LastName, 
                        f.Item.AspNetUser.AvatarUploadTempLocation, 
                        f.Item.AspNetUser.AvatarUploadId, 
                        GatewayList =
                      f.Item.AspNetUser.AspNetUserGatewayList.Select(gl => new { gl.GatewayId, gl.UserState })
                      }, 
                      Beneficiary =
                      f.FundUserList.Select(
                        fu =>
                        new
                        {
                          fu.UserTypeId, 
                          fu.AspNetUser.FirstName, 
                          fu.AspNetUser.LastName, 
                          FullName = fu.AspNetUser.FirstName + " " + fu.AspNetUser.LastName
                        })
                       .FirstOrDefault(fi => fi.UserTypeId == "Beneficiary"), 
                      Settings = f.FundSetting
                    });

      return Request.CreateResponse(HttpStatusCode.OK, ret);
    }

    /// <summary>
    /// Gets the fund support by user.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpGet]
    [Route("support/{id}")]
    public HttpResponseMessage GetFundSupportByUser(int id)
    {
      var userId = User.Identity.GetUserId();

      var fund = GetFundDetails(id);

      // Check for duplicate
      if (fund.FundUserList.Any(fi => fi.UserTypeId == "Supporter" && fi.UserId == userId))
      {
        return Request.CreateResponse(HttpStatusCode.Conflict, new { isSupporting = true });
      }

      var response = Request.CreateResponse(HttpStatusCode.Created, new { isSupporting = false });

      return response;
    }

    /// <summary>
    /// Gets the fund supports by user.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpGet]
    [Route("supports/{id}")]
    public HttpResponseMessage GetFundSupportsByUser(int id)
    {
      var userId = User.Identity.GetUserId();

      var fund = GetFundDetails(id);

      var supports =
        fund.FundUserList.Select(f => new { f.AllowEmail, f.PostToFacebook, f.UserTypeId, f.FundId, f.UserId })
            .Where(fu => fu.UserId == userId);

      var response = Request.CreateResponse(HttpStatusCode.Created, supports);

      return response;
    }

    /// <summary>
    /// Histories the specified identifier.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="itemsPerPage">The items per page.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Fill in the blank</remarks>
    [Route("history/{id}/{pageNumber}/{itemsPerPage}")]
    [HttpGet]
    public HttpResponseMessage History(int id, int pageNumber = 1, int itemsPerPage = 10)
    {
      var result =
        TheContext.FundActivity.ByFundId(id)
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
    /// Determines whether [is my fund] [the specified identifier].
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>Action result</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("myfund/{id}")]
    [HttpGet]
    public IHttpActionResult IsMyFund(int id)
    {
      var userId = User.Identity.GetUserId();

      var found =
        TheContext.FundUser.ByFundId(id)
                  .ByUserId(userId)
                  .Any(fu => fu.UserTypeId == "Originator" || fu.UserTypeId == "TeamMember");

      if (found)
      {
        return Ok();
      }

      return NotFound();
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public HttpResponseMessage Post(Fund value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      value.Item.UserId            = User.Identity.GetUserId();
      value.Item.Permalink         = GetPermalink();
      value.FundSetting            = new FundSetting();
      value.Item.StatusId          = "Preliminary";
      value.Item.ShortSummary      = "I need your help!";
      value.Item.TypeId            = "FundoloFund";
      value.Item.TransactionTypeId = "Donation";
      value.Item.Description       =
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
        new FundUser { AllowEmail = true, PostToFacebook = true, UserId = value.Item.UserId, UserTypeId = "Originator" });
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
    /// Puts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("update")]
    public async Task<IHttpActionResult> Put(Fund value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var fund =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("Item.AspNetUser")
                  .GetByKey(value.Identification);

      // Make sure user is allowed to update this
      if (fund.Item.AspNetUser.Identification != User.Identity.GetUserId())
      {
        return Unauthorized();
      }

      var item = TheContext.Item.GetByKey(value.Item.Identification);
      if (fund == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      if (item == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      foreach (var itemUpload in value.Item.ItemUploadList.Where(itemUpload => itemUpload.Upload.Identification > 0))
      {
        var entity = TheContext.ItemUpload.GetByKey(itemUpload.ItemId, itemUpload.UploadId);
        TheContext.ApplyCurrentValues(entity.EntityKey.EntitySetName, itemUpload);
      }

      foreach (var image in value.Item.ItemUploadList.Where(image => image.Upload.Identification == 0))
      {
        TheContext.ItemUpload.AddObject(CreateImageObject(image, fund.Identification));
      }

      var fundState = fund.Item.StatusId;
      value.Item.Featured = item.Featured;
      value.Item.DateUpdated = DateTime.UtcNow;
      TheContext.ApplyCurrentValues(item.EntityKey.EntitySetName, value.Item);
      TheContext.ApplyCurrentValues(fund.EntityKey.EntitySetName, value);
      TheContext.FundActivity.AddObject(
        new FundActivity
        {
          Activity = new Activity { TypeId = "Update", Memo = "Campaign updated" }, 
          TypeId = "CampaignUpdated", 
          FundId = value.Identification
        });

      TheContext.SaveChanges();

      // Send to Prerender
      Prerender(value.Item.Permalink);

      // Send to Mailchimp (if necessary)
      if (!fundState.EqualsIgnoreCase("Preliminary") || !value.Item.StatusId.EqualsIgnoreCase("Active"))
      {
        return Ok();
      }

      var mc = new MailChimpController();
      var workflowId = ConfigurationManager.AppSettings["MailChimpAutomationFundraiserActive"];
      var triggerId = ConfigurationManager.AppSettings["MailChimpAutomationFundraiserActiveTrigger1"];
      await mc.AutomateAsync(workflowId, triggerId, fund.Item.AspNetUser.Email);

      return Ok();
    }

    /// <summary>
    /// Saves the fund image.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPost]
    [Route("fundImage")]
    public HttpResponseMessage SaveFundImage(Fund value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      foreach (var itemUpload in value.Item.ItemUploadList.Where(itemUpload => itemUpload.Upload.Identification > 0))
      {
        var entity = TheContext.ItemUpload.GetByKey(itemUpload.ItemId, itemUpload.UploadId);
        TheContext.ApplyCurrentValues(entity.EntityKey.EntitySetName, itemUpload);
      }

      foreach (var image in value.Item.ItemUploadList.Where(image => image.Upload.Identification == 0))
      {
        TheContext.ItemUpload.AddObject(CreateImageObject(image, value.Identification));
      }

      TheContext.SaveChanges();

      var query =
        TheContext.ItemUpload.Include("Upload")
                  .ByItemId(value.Identification)
                  .ToList()
                  .Select(iu => TheModelFactory.Create(iu));

      return Request.CreateResponse(HttpStatusCode.OK, query);
    }

    /// <summary>
    /// Saves the status.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    /// <remarks>Default Blank Remarks Test</remarks>
    [HttpPost]
    [Route("Status")]
    public HttpResponseMessage SaveStatus(FundStatusModel value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var item = TheContext.Item.GetByKey(value.FundId);
      if (item == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      var newItem = item;
      newItem.StatusId = value.StatusId;

      TheContext.ApplyCurrentValues(item.EntityKey.EntitySetName, newItem);
      TheContext.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    /// <summary>
    /// Shares the campaign.
    /// </summary>
    /// <param name="model">The model.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [AllowAnonymous]
    [HttpPost]
    [Route("share")]
    public HttpResponseMessage ShareCampaign(ShareFundModel model)
    {
      if (!ModelState.IsValid)
      {
        return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState.Values);
      }

      // Check emails
      foreach (var emailAddress in model.ToEmails)
      {
        if (EmailValidator.IsValidEmail(emailAddress.email))
        {
          emailAddress.email = emailAddress.email.Trim();

          // TODO Check if user has unsubscribed.  If so remove from list
          // Check if they have unsubscribed
        }
        else
        {
          return Request.CreateErrorResponse(
            HttpStatusCode.BadRequest, 
            string.Format("Invalid email format {0}", emailAddress.email));
        }
      }

      try
      {
        var result = MandrillController.SendShareCampaign(model);
        if (result[0].Status != EmailResultStatus.Sent)
        {
          return Request.CreateResponse(HttpStatusCode.InternalServerError, result);
        }

        var recipients = from emailResult in result select emailResult.Email;
        var user = TheContext.AspNetUser.ByEmail(model.FromEmail).FirstOrDefault();

        TheContext.FundShare.AddObject(
          new FundShare
          {
            FundId      = model.FundId, 
            SocialId    = result[0].Id, 
            FirstName   = model.FirstName, 
            LastName    = model.LastName, 
            Email       = model.FromEmail, 
            Recipients  = string.Join(",", recipients.ToArray()), 
            ShareTypeId = "Email", 
            UserId      = user == null ? string.Empty : user.Identification
          });
        TheContext.SaveChanges();
        return Request.CreateResponse(HttpStatusCode.OK, result);
      }
      catch (MandrillException mex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, mex);
      }
    }

    /// <summary>
    /// Subscribes the specified value.
    /// </summary>
    /// <param name="model">The model.</param>
    /// <returns>HttpResponseMessage.</returns>
    [HttpPost]
    [Route("subscribe")]
    [AllowAnonymous]
    public async Task<IHttpActionResult> Subscribe(SubscribeFundModel model)
    {
      var currentUser = TheContext.AspNetUser.ByEmail(model.Email).FirstOrDefault();

      string userId;
      var auth = new AuthController();

      if (currentUser == null)
      {
        var accountId = Guid.NewGuid().ToString();
        auth.CreateAccount(accountId);

        currentUser = new AspNetUser
                      {
                        FirstName = "Fund", 
                        LastName  = "Subscriber", 
                        Email     = model.Email, 
                        UserName  = model.Email, 
                        StatusId  = "Pending", 
                        AccountId = accountId
                      };

        TheContext.AspNetUser.AddObject(currentUser);
        userId = currentUser.Identification;
      }
      else
      {
        userId = currentUser.Identification;
      }

      var mc = new MailChimpController();
      await
        mc.CreateMailChimpSubscriber(
          new ApplicationUser
          {
            Id        = userId, 
            Email     = currentUser.Email, 
            FirstName = currentUser.FirstName, 
            LastName  = currentUser.LastName, 
          }, 
          model.Geo);

      var fund = GetFundDetails(model.FundId);
      var originator = fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");

      var fundUser = new FundUser
                     {
                       UserId         = userId, 
                       FundId         = model.FundId, 
                       PostToFacebook = false, 
                       AllowEmail     = true, 
                       UserTypeId     = "Subscriber"
                     };

      // Check if its the originator
      if (originator != null && originator.AspNetUser.Identification == userId)
      {
        fundUser.UserTypeId = "Originator";
        return BadRequest("Originator cannot be subscriber");
      }

      // Check for duplicate
      if (fund.FundUserList.Any(fi => fi.UserTypeId == "Subscriber" && fi.UserId == userId))
      {
        return BadRequest("User has already subscribed.");
      }

      const string MESSAGE = "You have a new subscriber";

      AddSupportNote(new SupportFundModel { AllowEmail = false, Message = MESSAGE }, fund, currentUser, "Subscribe");

      TheContext.FundActivity.AddObject(
        new FundActivity
        {
          TypeId   = "NewSupporter", 
          FundId   = fund.Identification, 
          Activity = new Activity { TypeId = "Create", Memo = "A new subscription has been requested" }
        });

      TheContext.FundUser.AddObject(fundUser);
      TheContext.SaveChanges();

      return Ok();
    }

    /// <summary>
    /// Supports the fund.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPost]
    [Route("support")]
    public HttpResponseMessage Support(SupportFundModel value)
    {
      value.UserId = User.Identity.GetUserId();

      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var fund = GetFundDetails(value.FundId);
      var originator = fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");
      var fundUser = new FundUser
                     {
                       UserId         = value.UserId, 
                       FundId         = value.FundId, 
                       PostToFacebook = value.PostToFacebook, 
                       AllowEmail     = value.AllowEmail, 
                       UserTypeId     = "Supporter"
                     };

      // Check if its the originator
      if (originator != null && originator.AspNetUser.Identification == value.UserId)
      {
        fundUser.UserTypeId = "Originator";
        return Request.CreateResponse(HttpStatusCode.BadRequest, fundUser);
      }

      // Check for duplicate
      if (fund.FundUserList.Any(fi => fi.UserTypeId == "Supporter" && fi.UserId == value.UserId))
      {
        return Request.CreateResponse(HttpStatusCode.Conflict, fundUser);
      }

      // Check for duplicate
      if (fund.FundUserList.Any(fi => fi.UserTypeId == "Fundraiser" && fi.UserId == value.UserId))
      {
        fundUser.UserTypeId = "Fundraiser";
        return Request.CreateResponse(HttpStatusCode.Conflict, fundUser);
      }

      var supporter = TheContext.AspNetUser.GetByIdentification(User.Identity.GetUserId());

      // POST publicly
      try
      {
        PostSupportToFacebook(value, fund, supporter);
        EmailSupport(value, fund, supporter);
        EmailSupporter(value, fund, supporter);
        AddSupportNote(value, fund, supporter, "Support");
      }
      catch (Exception exc)
      {
        // TODO: Log error
        var str = exc.Message;
      }

      TheContext.FundActivity.AddObject(
        new FundActivity
        {
          TypeId   = "NewSupporter", 
          FundId   = fund.Identification, 
          Activity = new Activity { TypeId = "Create", Memo = "A new Supporter has joined campaign" }
        });

      TheContext.FundUser.AddObject(fundUser);
      TheContext.SaveChanges();

      var response = Request.CreateResponse(HttpStatusCode.Created, value);

      return response;
    }

    /// <summary>
    /// Gets all the supporters of a particular fund
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="itemsPerPage">The items per page.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("Supporters/{id}/{pageNumber}/{itemsPerPage}")]
    [HttpGet]
    [AllowAnonymous]
    public HttpResponseMessage Supporters(int id, int pageNumber = 1, int itemsPerPage = 10)
    {
      var details = GetFundDetails(id);
      var result =
        TheContext.FundUser.Include("AspNetUser")
                  .Include("Fund")
                  .Include("AspNetUser.AspNetUserLoginList")
                  .Where(
                    fu =>
                    (fu.UserTypeId == "Supporter" || fu.UserTypeId == "Donor" || fu.UserTypeId == "Fundraiser"
                     || fu.UserTypeId == "TeamMember") && fu.FundId == id)
                  .Select(
                    f =>
                    new
                    {
                      Fund = new { f.FundFund.PageColor, f.FundFund.PageLayout, f.FundFund.PageSkin }, 
                      f.AspNetUser.FirstName, 
                      f.AspNetUser.LastName, 
                      f.AspNetUser.Email, 
                      f.AspNetUser.AvatarUploadTempLocation, 
                      f.AspNetUser.Identification, 
                      f.UserTypeId, 
                      f.DateEntered, 
                      FacebookProvider =
                      f.AspNetUser.AspNetUserLoginList.Select(anul => new { anul.LoginProvider, anul.ProviderKey, })
                       .FirstOrDefault(anu => anu.LoginProvider == "Facebook")
                    });

      var count = result.Count();

      if (itemsPerPage > 0)
      {
        result = result.OrderByDescending(ft => ft.DateEntered).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
      }

      var ret =
        new
        {
          Count = count, 
          Data = result, 
          details.PageColor, 
          details.PageLayout, 
          details.PageSkin, 
          details.Identification, 
          Item = new { details.Item.Permalink, details.Item.Title }, 
        };

      return Request.CreateResponse(HttpStatusCode.OK, ret);
    }

    /// <summary>
    /// Get all the funds that the current logged on user supports
    /// </summary>
    /// <returns>IQueryable.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("Supporting")]
    [HttpGet]
    public HttpResponseMessage Supporting()
    {
      var query = GetUserCampaignsByUserType("Supporter");

      return Request.CreateResponse(HttpStatusCode.OK, query);
    }

    /// <summary>
    /// Gets all the supporters of a particular fund
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("TeamMembers/{id}")]
    [HttpGet]
    public HttpResponseMessage TeamMembers(int id)
    {
      var fund = GetUserTypeCampaignsByFundId(id, "TeamMember");

      return Request.CreateResponse(HttpStatusCode.OK, fund);
    }

    /// <summary>
    /// Get all the funds that the current logged on user is teamed up with
    /// </summary>
    /// <returns>IQueryable.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("TeamedUp")]
    [HttpGet]
    public HttpResponseMessage TeamedUp()
    {
      var query = GetUserCampaignsByTeamUserRole("TeamMember");

      return Request.CreateResponse(HttpStatusCode.OK, query);
    }

    #endregion

    #region Methods

    /// <summary>
    /// Gets the fund details.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <returns>Fund.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    internal Fund GetFundDetails(int fundId)
    {
      var fund =
        TheContext.Fund.Include("Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Include("Item.AspNetUser")
                  .Include("Item.AspNetUser.AspNetUserClaimList")
                  .Include("FundUserList")
                  .Include("FundUserList.AspNetUser")
                  .Include("FundSetting")
                  .Include("FundTeamList")
                  .Include("FundTeamList.Team")
                  .GetByIdentification(fundId);
      return fund;
    }

    /// <summary>
    /// Gets the new file location.
    /// </summary>
    /// <param name="newName">The new name.</param>
    /// <param name="container">The container.</param>
    /// <param name="upload">The upload.</param>
    /// <returns>System.String.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    internal string GetNewFileLocation(string newName, string container, Upload upload)
    {
      var uri = new Uri(upload.LocationHttp);
      return string.Format("{0}://{1}/{2}/{3}", uri.Scheme, uri.Host, container, newName);
    }

    /// <summary>
    /// Adds the support note.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <param name="fund">The fund.</param>
    /// <param name="supporter">The supporter.</param>
    /// <param name="fundNoteTypeId">The fund note type identifier.</param>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private static void AddSupportNote(
      SupportFundModel value, 
      Fund fund, 
      AspNetUser supporter, 
      string fundNoteTypeId = "Supporter")
    {
      const string TEMPLATE = "[Fundolo] Fund {3}: {0} {1} - Fund: {2}";
      var subject = string.Format(
        TEMPLATE, 
        fund.Item.AspNetUser.FirstName, 
        fund.Item.AspNetUser.LastName, 
        fund.Item.Title, 
        fundNoteTypeId);

      subject = subject.Substring(0, subject.Length >= 256 ? 256 : subject.Length);
      var fundNote = new FundNote
                     {
                       FundId = fund.Item.Identification, 
                       TypeId = fundNoteTypeId, 
                       FundUserId = fund.Item.UserId, 
                       Note =
                         new Note
                         {
                           Subject       = subject, 
                           ApplicationId = "Fundolo", 
                           TypeId        = "Message", 
                           Comments      = value.Message, 
                           Email         = supporter.Email, 
                           FirstName     = supporter.FirstName, 
                           LastName      = supporter.LastName, 
                           Sent          = value.AllowEmail, 
                           Viewed        = false
                         }
                     };
      var controller = new FundNoteController();
      controller.Add(fundNote);
    }

    /// <summary>
    /// Creates the image object.
    /// </summary>
    /// <param name="image">The image.</param>
    /// <param name="identification">The identification.</param>
    /// <returns>ItemUpload.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private static ItemUpload CreateImageObject(ItemUpload image, int identification)
    {
      var itemUpload = new ItemUpload
                       {
                         ItemId    = identification, 
                         IsDefault = image.IsDefault, 
                         SortOrder = image.SortOrder, 
                         Upload    =
                           new Upload
                           {
                             CategoryId       = image.Upload.CategoryId, 
                             ContainerName    = image.Upload.ContainerName, 
                             ContentLength    = image.Upload.ContentLength, 
                             ContentType      = image.Upload.ContentType, 
                             Description      = image.Upload.Description, 
                             DateEntered      = image.Upload.DateEntered, 
                             DateUpdated      = image.Upload.DateUpdated, 
                             IsPrivate        = false, 
                             Extension        = image.Upload.Extension, 
                             Location         = image.Upload.Location, 
                             LocationHttp     = image.Upload.LocationHttp, 
                             Name             = image.Upload.Name, 
                             OriginalFileName = image.Upload.OriginalFileName, 
                             RelativeLocation = image.Upload.RelativeLocation, 
                             TypeId           = image.Upload.TypeId, 
                           }
                       };

      return itemUpload;
    }

    /// <summary>
    /// Emails the support.
    /// </summary>
    /// <param name="support">The support model</param>
    /// <param name="fund">The fund.</param>
    /// <param name="supporter">The supporter.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private static List<EmailResult> EmailFundraiser(SupportFundModel support, Fund fund, AspNetUser supporter)
    {
      var originator = fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");
      if (!fund.FundSetting.EmailReceiveUserSupport || originator == null)
      {
        return new List<EmailResult>();
      }

      var subject = string.Format("{0} {1} has become a fundraiser!", supporter.FirstName, supporter.LastName);
      var result = MandrillController.SendSupport(
        support, 
        supporter, 
        originator.AspNetUser, 
        fund, 
        "You have a new Fundraiser!", 
        subject);
      return result;
    }

    /// <summary>
    /// Emails the support.
    /// </summary>
    /// <param name="support">The support model</param>
    /// <param name="fund">The fund.</param>
    /// <param name="supporter">The supporter.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private static List<EmailResult> EmailSupport(SupportFundModel support, Fund fund, AspNetUser supporter)
    {
      var originator = fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");
      if (!fund.FundSetting.EmailReceiveUserSupport || originator == null)
      {
        return new List<EmailResult>();
      }

      var subject = string.Format("{0} {1} now supports your campaign!", supporter.FirstName, supporter.LastName);
      var result = MandrillController.SendSupport(
        support, 
        supporter, 
        originator.AspNetUser, 
        fund, 
        "You have a new Supporter!", 
        subject);
      return result;
    }

    /// <summary>
    /// Emails the support.
    /// </summary>
    /// <param name="support">The support model</param>
    /// <param name="fund">The fund.</param>
    /// <param name="supporter">The supporter.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private static List<EmailResult> EmailSupporter(SupportFundModel support, Fund fund, AspNetUser supporter)
    {
      var originator = new AspNetUser
                       {
                         Email = supporter.Email, 
                         FirstName = supporter.FirstName, 
                         LastName = supporter.LastName
                       };

      if (support.AllowEmail)
      {
        return new List<EmailResult>();
      }

      const string SUBJECT = "Thank you for supporting our campaign!";
      var result = MandrillController.SendSupport(
        support, 
        supporter, 
        originator, 
        fund, 
        "Thank you for your support", 
        SUBJECT);

      return result;
    }

    /// <summary>
    /// Posts the support to facebook.
    /// </summary>
    /// <param name="model">The model.</param>
    /// <param name="fund">The fund.</param>
    /// <param name="supporter">The supporter.</param>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private static void PostSupportToFacebook(SupportFundModel model, Fund fund, AspNetUser supporter)
    {
      var controller = new FacebookController();
      var defaultImage =
        fund.Item.ItemUploadList.OrderByDescending(img => img.IsDefault)
            .ThenBy(img => img.SortOrder)
            .ThenBy(img => img.UploadId)
            .FirstOrDefault();
      var originator = fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");

      if (originator == null)
      {
        return;
      }

      var accessToken =
        originator.AspNetUser.AspNetUserClaimList.FirstOrDefault(cl => cl.ClaimType == FacebookController.CLAIM_TYPE);

      const string USER_MESSAGE = "I supported {0} by {1} {2}. Please join me in supporting this campaign.";

      if (model.PostToFacebook)
      {
        controller.PostToFacebook(
          fund.Item.Description, 
          string.IsNullOrEmpty(model.Message) ? fund.Item.ShortSummary : model.Message, 
          fund.Item.Permalink, 
          string.Format(USER_MESSAGE, fund.Item.Title, originator.AspNetUser.FirstName, originator.AspNetUser.LastName), 
          defaultImage);
      }

      if (fund.FundSetting.FacebookPostUserSupport && accessToken != null)
      {
        controller.PostToFacebook(
          fund.Item.Description, 
          string.Format("{0} {1} is now supporting our campaign.  Thank you!", supporter.FirstName, supporter.LastName), 
          fund.Item.Permalink, 
          fund.Item.Title, 
          defaultImage, 
          accessToken.ClaimValue);
      }
    }

    /// <summary>
    /// Prerenders the specified permalink.
    /// </summary>
    /// <param name="permalink">The permalink.</param>
    /// <returns>System.String.</returns>
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
    /// Copyfundraisers the specified identifier.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="fundTypeId">The fund type identifier.</param>
    /// <param name="childFund">The child fund.</param>
    /// <returns>Fund.</returns>
    private Fund Copyfundraiser(int id, string fundTypeId = "", bool childFund = false)
    {
      var supporter = TheContext.AspNetUser.GetByIdentification(User.Identity.GetUserId());
      var oldFund = GetFundDetails(id);

      var newFund = new Fund
                    {
                      Item =
                        new Item
                        {
                          TypeId            = oldFund.Item.TypeId, 
                          DateEntered       = DateTime.UtcNow, 
                          DateUpdated       = DateTime.UtcNow, 
                          UserId            = supporter.Identification, 
                          Permalink         = GetPermalink(), 
                          ShortSummary      = oldFund.Item.ShortSummary, 
                          Description       = oldFund.Item.Description, 
                          Title             = oldFund.Item.Title, 
                          Featured          = oldFund.Item.Featured, 
                          StatusId          = oldFund.Item.StatusId, 
                          StartDate         = oldFund.Item.StartDate, 
                          EndDate           = oldFund.Item.EndDate, 
                          TransactionTypeId = "Donation"
                        }, 
                      GoalAmount          = oldFund.GoalAmount, 
                      TypeId              = string.IsNullOrWhiteSpace(fundTypeId) ? oldFund.TypeId : fundTypeId, 
                      CategoryId          = oldFund.CategoryId, 
                      EnableSocialSharing = oldFund.EnableSocialSharing, 
                      PageColor           = oldFund.PageColor, 
                      PageLayout          = oldFund.PageLayout, 
                      PageSkin            = oldFund.PageSkin, 
                      IsPrivate           = oldFund.IsPrivate
                    };

      foreach (var itemUpload in oldFund.Item.ItemUploadList)
      {
        var name             = itemUpload.Upload.Name;
        var description      = itemUpload.Upload.Description;
        var fileHttpLocation = itemUpload.Upload.LocationHttp;
        var location         = itemUpload.Upload.Location;
        var relativeLocation = itemUpload.Upload.RelativeLocation;

        if (itemUpload.Upload.TypeId == "web.Image")
        {
          name        = CloudBlockBlobBusiness.BuildFileName(itemUpload.Upload.OriginalFileName);
          description = name;
          CloudBlockBlobBusiness.Copy(itemUpload.Upload.Name, name);
          fileHttpLocation = GetNewFileLocation(name, itemUpload.Upload.ContainerName, itemUpload.Upload);
          location         = fileHttpLocation;
          relativeLocation = string.Format("/{0}/{1}", itemUpload.Upload.ContainerName, name);
        }

        newFund.Item.ItemUploadList.Add(
          new ItemUpload
          {
            IsDefault = itemUpload.IsDefault, 
            Upload    =
              new Upload
              {
                Description      = description, 
                IsPrivate        = itemUpload.Upload.IsPrivate, 
                CategoryId       = itemUpload.Upload.CategoryId, 
                Name             = name, 
                OriginalFileName = itemUpload.Upload.Name, 
                Location         = location, 
                RelativeLocation = relativeLocation, 
                Extension        = itemUpload.Upload.Extension, 
                ContentLength    = itemUpload.Upload.ContentLength, 
                ContentType      = itemUpload.Upload.ContentType, 
                LocationHttp     = fileHttpLocation, 
                ContainerName    = itemUpload.Upload.ContainerName, 
                TypeId           = itemUpload.Upload.TypeId, 
                DateEntered      = DateTime.UtcNow, 
                DateUpdated      = DateTime.UtcNow
              }
          });
      }

      var fundUserList = new EntityCollection<FundUser>
                         {
                           new FundUser
                           {
                             UserTypeId     = "Originator", 
                             UserId         = supporter.Identification, 
                             PostToFacebook = true, 
                             AllowEmail     = true
                           }
                         };

      var bene = oldFund.FundUserList.Any(user => user.UserTypeId == "Beneficiary");

      if (bene)
      {
        foreach (var user in oldFund.FundUserList.Where(user => user.UserTypeId == "Beneficiary"))
        {
          fundUserList.Add(
            new FundUser
            {
              FundId         = user.FundId, 
              UserId         = user.UserId, 
              AllowEmail     = user.AllowEmail, 
              UserTypeId     = user.UserTypeId, 
              PostToFacebook = user.PostToFacebook
            });
          break;
        }
      }
      else
      {
        // Use originator
        var originator = oldFund.FundUserList.FirstOrDefault(user => user.UserTypeId == "Originator");

        if (originator != null)
        {
          fundUserList.Add(
            new FundUser
            {
              FundId         = originator.FundId, 
              UserId         = originator.UserId, 
              AllowEmail     = originator.AllowEmail, 
              UserTypeId     = "Beneficiary", 
              PostToFacebook = originator.PostToFacebook
            });
        }
      }

      newFund.FundUserList = fundUserList;
      newFund.FundSetting = new FundSetting();

      var fundUser = new FundUser
                     {
                       UserId         = supporter.Identification, 
                       FundId         = oldFund.Identification, 
                       PostToFacebook = true, 
                       AllowEmail     = true, 
                       UserTypeId     = "Fundraiser", 
                       UserFundId     = childFund ? newFund.Identification : (int?)null
                     };

      AddSupportNote(
        new SupportFundModel { AllowEmail = true, Message = "NEW FUNDRAISER" }, 
        oldFund, 
        supporter, 
        "Joined");
      TheContext.FundActivity.AddObject(
        new FundActivity
        {
          TypeId = "NewFundraiser", 
          FundId = oldFund.Identification, 
          Activity = new Activity { TypeId = "Create", Memo = "A new Fundraiser has joined campaign" }
        });

      TheContext.Fund.AddObject(newFund);

      try
      {
        TheContext.SaveChanges();

        if (childFund)
        {
          fundUser.UserFundId = newFund.Identification;
        }

        TheContext.FundUser.AddObject(fundUser);
        TheContext.SaveChanges();
        PostFundraiserToFacebook(newFund, oldFund);
        EmailFundraiser(new SupportFundModel { Message = string.Empty }, oldFund, supporter);
        return newFund;
      }
      catch (Exception exc)
      {
        var message = exc.Message;
        throw;
      }
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
        var item = TheContext.Item.ByPermalink(permalink).FirstOrDefault();
        if (item != null)
        {
          permalink = rs.Generate(6);
          permalinkExists = true;
        }
        else
        {
          permalinkExists = false;
        }
      }
      while (permalinkExists);

      return permalink;
    }

    /// <summary>
    /// Gets the user campaigns by team user role.
    /// </summary>
    /// <param name="roleId">The role identifier.</param>
    /// <returns>IQueryable.</returns>
    private IQueryable GetUserCampaignsByTeamUserRole(string roleId)
    {
      var userId = User.Identity.GetUserId();
      var query =
        TheContext.FundTeamMember.Include("FundTeam.TeamFundFund")
                  .Include("FundTeam.TeamFundFund.Item")
                  .Include("Fund.Item.ItemUploadList")
                  .Include("Fund.Item.ItemUploadList.Upload")
                  .Where(f => f.UserId == userId && f.RoleId == roleId)
                  .Select(
                    f =>
                    new
                    {
                      f.FundTeam.TeamFundFund.Identification, 
                      f.FundTeam.TeamFundFund.EnableSocialSharing, 
                      f.FundTeam.TeamFundFund.GoalAmount, 
                      f.FundTeam.TeamFundFund.IsPrivate, 
                      f.FundTeam.TeamFundFund.TypeId, 
                      f.FundTeam.TeamFundFund.CategoryId, 
                      Item =
                      new
                      {
                        f.FundTeam.TeamFundFund.Item.Description, 
                        f.FundTeam.TeamFundFund.Item.EndDate, 
                        f.FundTeam.TeamFundFund.Item.Identification, 
                        f.FundTeam.TeamFundFund.Item.Permalink, 
                        f.FundTeam.TeamFundFund.Item.StartDate, 
                        f.FundTeam.TeamFundFund.Item.Title, 
                        f.FundTeam.TeamFundFund.Item.StatusId, 
                        f.FundTeam.TeamFundFund.Item.TypeId, 
                        ItemUploadList =
                      f.FundTeam.TeamFundFund.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                      }
                    });
      return query;
    }

    /// <summary>
    /// Gets the type of the user campaigns by user.
    /// </summary>
    /// <param name="userTypeId">The user type identifier.</param>
    /// <returns>IQueryable.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private IQueryable GetUserCampaignsByUserType(string userTypeId)
    {
      var userId = User.Identity.GetUserId();
      var query =
        TheContext.FundUser.Include("Fund.Item")
                  .Include("Item.ItemUploadList")
                  .Include("Item.ItemUploadList.Upload")
                  .Where(g => g.UserId == userId && g.UserTypeId == userTypeId)
                  .OrderBy(d => d.FundFund.Item.DateEntered)
                  .Select(
                    f =>
                    new
                    {
                      f.FundFund.Identification, 
                      f.FundFund.EnableSocialSharing, 
                      f.FundFund.GoalAmount, 
                      f.FundFund.IsPrivate, 
                      f.FundFund.TypeId, 
                      f.FundFund.CategoryId, 
                      Item =
                      new
                      {
                        f.FundFund.Item.Description, 
                        f.FundFund.Item.EndDate, 
                        f.FundFund.Item.Identification, 
                        f.FundFund.Item.Permalink, 
                        f.FundFund.Item.StartDate, 
                        f.FundFund.Item.Title, 
                        f.FundFund.Item.StatusId, 
                        f.FundFund.Item.TypeId, 
                        ItemUploadList =
                      f.FundFund.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault, 
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                      }
                    });
      return query;
    }

    /// <summary>
    /// Gets the user type campaigns by fund identifier.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="userTypeId">The user type identifier.</param>
    /// <param name="pageNumber">The page number.</param>
    /// <param name="itemsPerPage">The items per page.</param>
    /// <returns>System.Object.</returns>
    private object GetUserTypeCampaignsByFundId(int id, string userTypeId, int pageNumber = 1, int itemsPerPage = 10)
    {
      var details = GetFundDetails(id);
      var result =
        TheContext.FundUser.Include("AspNetUser")
                  .Include("Fund")
                  .Include("AspNetUser.AspNetUserLoginList")
                  .Where(fu => (fu.UserTypeId == userTypeId) && fu.FundId == id)
                  .Select(
                    f =>
                    new
                    {
                      Fund = new { f.FundFund.PageColor, f.FundFund.PageLayout, f.FundFund.PageSkin }, 
                      f.AspNetUser.FirstName, 
                      f.AspNetUser.LastName, 
                      f.AspNetUser.Email, 
                      f.AspNetUser.AvatarUploadTempLocation, 
                      f.AspNetUser.Identification, 
                      f.UserTypeId, 
                      f.DateEntered, 
                      FacebookProvider =
                      f.AspNetUser.AspNetUserLoginList.Select(anul => new { anul.LoginProvider, anul.ProviderKey, })
                       .FirstOrDefault(anu => anu.LoginProvider == "Facebook")
                    });

      var count = result.Count();

      if (itemsPerPage > 0)
      {
        result = result.OrderByDescending(ft => ft.DateEntered).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
      }

      var ret =
        new
        {
          Count = count, 
          Data = result, 
          details.PageColor, 
          details.PageLayout, 
          details.PageSkin, 
          details.Identification, 
          Item = new { details.Item.Permalink, details.Item.Title }, 
        };

      return ret;
    }

    /// <summary>
    /// Posts the support to facebook.
    /// </summary>
    /// <param name="newFund">The fund.</param>
    /// <param name="oldFund">The old fund.</param>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private void PostFundraiserToFacebook(Fund newFund, Fund oldFund)
    {
      var controller = new FacebookController();
      var defaultImage =
        newFund.Item.ItemUploadList.OrderByDescending(img => img.IsDefault)
               .ThenBy(img => img.SortOrder)
               .ThenBy(img => img.UploadId)
               .FirstOrDefault();
      var originator = oldFund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");

      if (originator == null)
      {
        return;
      }

      var accessToken =
        originator.AspNetUser.AspNetUserClaimList.FirstOrDefault(cl => cl.ClaimType == FacebookController.CLAIM_TYPE);

      const string USER_MESSAGE =
        "I have joined the '{0}' team. This is something I truly care about so please join me in supporting this cause";

      controller.PostToFacebook(
        newFund.Item.Description, 
        newFund.Item.ShortSummary, 
        newFund.Item.Permalink, 
        string.Format(USER_MESSAGE, newFund.Item.Title), 
        defaultImage);

      if (!newFund.FundSetting.FacebookPostUserFundraiser || accessToken == null)
      {
        return;
      }

      var supporter = TheContext.AspNetUser.GetByIdentification(User.Identity.GetUserId());
      var message = string.Format(
        "{0} {1} has joined our team and is supporting our campaign.  Thank you!", 
        supporter.FirstName, 
        supporter.LastName);
      if (oldFund.FundSetting.FacebookPostUserFundraiser)
      {
        controller.PostToFacebook(
          newFund.Item.Description, 
          message, 
          newFund.Item.Permalink, 
          newFund.Item.Title, 
          defaultImage, 
          accessToken.ClaimValue);
      }
    }

    #endregion
  }

  /// <summary>
  /// Class SubscribeFundModel.
  /// </summary>
  public class SubscribeFundModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    /// <value>The email.</value>
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the fund identifier.
    /// </summary>
    /// <value>The fund identifier.</value>
    public int FundId { get; set; }

    /// <summary>
    /// Gets or sets the geo.
    /// </summary>
    /// <value>The geo.</value>
    public GeoCode Geo { get; set; }

    #endregion
  }
}