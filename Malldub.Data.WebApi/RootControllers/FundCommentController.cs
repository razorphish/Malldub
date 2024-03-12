// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 10-17-2014
// Last Modified By : Antonio David Marasco
// Last Modified On : 11-15-2014
// ***********************************************************************
// <copyright file="FundCommentController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Data.Entity;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Security.Claims;
  using System.Threading.Tasks;
  using System.Web.Http;

  using Malldub.Data;

  using Marasco.FacebookApi;
  using Marasco.FacebookApi.Models;

  using Microsoft.AspNet.Identity;

  #endregion

  /// <summary>
  /// Class FundCommentController.
  /// </summary>
  [RoutePrefix("api/fund/{fundId}/comments")]
  [Authorize]
  public class FundCommentController : BaseApiController
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="FundCommentController"/> class.
    /// </summary>
    public FundCommentController()
      : base(new MalldubDataContext()) {}

    #endregion

    #region Public Methods and Operators

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
      var commentResult =
        TheContext.FundComment
                  .Include("Donation")
                  .Include("Comment")
                  .Include("Comment.Geo")
                  .Include("Comment.AspNetUser")
                  .ByFundId(fundId)
                  .Select(
                    ft =>
                    new
                    {
                      ft.Identification, 
                      ft.FundId, 
                      ft.OriginId, 
                      ft.CommentId, 
                      ft.Comment.DateEntered, 
                      ft.DonationId,
                      Comment =
                      new
                      {
                        ft.Comment.Identification, 
                        ft.Comment.Post, 
                        ft.Comment.DateEntered, 
                        ft.Comment.Name, 
                        ft.Comment.Title, 
                        ft.Comment.TotalLikes, 
                        ft.Comment.UserId, 
                      }, 
                      Donation = new
                                 {
                                   Identification = (int?)ft.Donation.Identification,
                                   IsPrivateAmount = (bool?)ft.Donation.IsPrivateAmount,
                                   IsPrivateDonorName = (bool?)ft.Donation.IsPrivateDonorName
                                 },
                      Geo =
                      new
                      {
                        ft.Comment.Geo.Alias, 
                        ft.Comment.Geo.City, 
                        ft.Comment.Geo.CountryCode, 
                        ft.Comment.Geo.IpAddress, 
                        ft.Comment.Geo.Isp, 
                        ft.Comment.Geo.Latitude, 
                        ft.Comment.Geo.Longitude, 
                        ft.Comment.Geo.Organization, 
                        ft.Comment.Geo.Region, 
                        ft.Comment.Geo.RegionName, 
                        ft.Comment.Geo.Status, 
                        ft.Comment.Geo.TimeZone, 
                        ft.Comment.Geo.Zip
                      }, 
                      AspNetUser =
                      new
                      {
                        ft.Comment.AspNetUser.FirstName, 
                        ft.Comment.AspNetUser.LastName, 
                        ft.Comment.AspNetUser.Email, 
                        ft.Comment.AspNetUser.AvatarUploadTempLocation, 
                        ft.Comment.AspNetUser.Identification, 
                        FacebookProvider =
                      ft.Comment.AspNetUser.AspNetUserLoginList.Select(
                        aull => new { aull.LoginProvider, aull.ProviderKey })
                        .FirstOrDefault(aul => aul.LoginProvider == "Facebook"), 
                      }
                    });

      var count = commentResult.Count();

      commentResult =
        commentResult.OrderByDescending(ft => ft.DateEntered).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);

      var ret = new { Count = count, Data = commentResult };

      var response = Request.CreateResponse(HttpStatusCode.OK, ret);

      return response;
    }

    /// <summary>
    /// Deletes the specified identifier.
    /// </summary>
    /// <param name="id">The identifier.</param>
    public void Delete(int id) {}

    /// <summary>
    /// Gets this instance.
    /// </summary>
    /// <returns>HttpResponseMessage.</returns>
    [HttpGet]
    [Route("")]
    public HttpResponseMessage Get()
    {
      return Request.CreateResponse(HttpStatusCode.NotAcceptable);
    }

    /// <summary>
    /// Likes the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    [HttpPost]
    [Route("like")]
    [AllowAnonymous]
    public HttpResponseMessage Like(FundComment value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var comment = TheContext.Comment.GetByKey(value.CommentId);
      if (comment == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      TheContext.ApplyCurrentValues(comment.EntityKey.EntitySetName, value.Comment);
      TheContext.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    [HttpPost]
    [Route("")]
    public HttpResponseMessage Post(int fundId, FundComment value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var user = TheContext.AspNetUser.GetByIdentification(User.Identity.GetUserId());

      value.Comment.UserId = user.Identification;
      value.Comment.Name = string.Format("{0} {1}", user.FirstName, user.LastName);

      var fund = TheContext.Fund.ByIdentification(fundId)
        .Include("Item")
        .Include("Item.ItemUploadList")
        .Include("Item.ItemUploadList.Upload")
        .Include("FundSetting").SingleOrDefault();

      if (fund == null)
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Fund not found.  Cannot proceed");
      }

      if (!fund.FundSetting.AllowCommenting)
      {
        return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Comments not allowed for this fund");
      }

      // Add fund activity
      TheContext.FundActivity.AddObject(
        new FundActivity
        {
          Activity = new Activity { TypeId = "Create", Memo = "A new comment was posted" }, 
          FundId = fundId, 
          TypeId = "NewComment", 
        });

      // Add fund notification
      TheContext.FundNote.AddObject(
        new FundNote
        {
          Note =
            new Note
            {
              Subject = "[Fundolo] Comment", 
              Comments = value.Comment.Post, 
              Sent = false, 
              Viewed = false, 
              ApplicationId = "Fundolo", 
              TypeId = "System", 
              FirstName = user.FirstName, 
              LastName = user.LastName, 
              Email = user.Email
            }, 
          TypeId = "Comment", 
          FundId = fundId, 
          FundUserId = fund.Item.UserId
        });

      var originator =
        TheContext.FundUser.ByFundId(fund.Identification)
                  .ByUserTypeId("Originator")
                  .Include("AspNetUser")
                  .Include("AspNetUser.AspNetUserClaimList")
                  .FirstOrDefault();

      TheContext.FundComment.AddObject(value);
      TheContext.SaveChanges();

      var response = new HttpResponseMessage();

      Parallel.Invoke(
        () => PostToMyFacebook(value, fund, originator), 
        () => PostToFundFacebook(value, fund, originator), 
        () => { response = GetComment(value.CommentId); });

      return response;
    }

    /// <summary>
    /// Puts the specified identifier.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="value">The value.</param>
    public void Put(int fundId, [FromBody] string value) {}

    #endregion

    #region Methods

    /// <summary>
    /// Gets the claim.
    /// </summary>
    /// <param name="identity">The identity.</param>
    /// <param name="claimType">Type of the claim.</param>
    /// <param name="originator">The originator.</param>
    /// <param name="accessTokenValue">The access token value.</param>
    /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
    private static bool GetClaim(
      ClaimsIdentity identity, 
      string claimType, 
      FundUser originator, 
      out string accessTokenValue)
    {
      var accessToken = identity.Claims.FirstOrDefault(c => c.Type == claimType);
      accessTokenValue = string.Empty;

      if (accessToken == null)
      {
        var facebookProvider =
          originator.AspNetUser.AspNetUserClaimList.Select(cl => new { cl.ClaimValue, cl.UserId, cl.ClaimType })
                    .FirstOrDefault(cl => cl.ClaimType == FacebookController.CLAIM_TYPE);

        if (facebookProvider != null)
        {
          accessTokenValue = facebookProvider.ClaimValue;
        }
      }
      else
      {
        accessTokenValue = accessToken.Value;
      }

      return string.IsNullOrEmpty(accessTokenValue);
    }

    /// <summary>
    /// Posts to fund facebook.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <param name="fund">The fund.</param>
    /// <param name="originator">The originator.</param>
    private static void PostToFundFacebook(FundComment value, Fund fund, FundUser originator)
    {
      if (!fund.FundSetting.FacebookPostUserComment)
      {
        return;
      }

      // Get Fund originator's facebook id, if applicable
      if (originator == null)
      {
        return;
      }

      var facebookProvider =
        originator.AspNetUser.AspNetUserClaimList.Select(cl => new { cl.ClaimValue, cl.UserId, cl.ClaimType })
                  .FirstOrDefault(cl => cl.ClaimType == FacebookController.CLAIM_TYPE);

      if (facebookProvider == null)
      {
        return;
      }

      bool isDefaultImage;
      var defaultImage = GetDefaultImage(value, out isDefaultImage);

      var currentServer = ConfigurationManager.AppSettings["CurrentServer"];

      var graph = new Graph();
      try
      {
        graph.PostFeed(
          new FeedRequest
          {
            accessToken = facebookProvider.ClaimValue, 
            caption = "WWW.FUNDINGMIRACLES.COM", 
            description = value.Comment.Post, 
            link = string.Format("{0}/{1}", currentServer, fund.Item.Permalink), 
            message = "A new comment has been added to " + fund.Item.Title, 
            name = value.Comment.Title, 
            picture = isDefaultImage ? defaultImage.Upload.Name :
              string.Format(
                "{0}/azure/img/{1}?height=150&width=230&mode=crop", 
                currentServer, 
                defaultImage.Upload.Name)
          });
      }
      catch (Exception)
      {
        // Suppress the error and move on
        // TODO ADD LOGGING
      }
    }

    /// <summary>
    /// Gets the claim.
    /// </summary>
    /// <param name="userId">The user identifier.</param>
    /// <param name="identity">The identity.</param>
    /// <param name="claimType">Type of the claim.</param>
    /// <param name="accessTokenValue">The access token value.</param>
    /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
    private bool GetClaim(string userId, ClaimsIdentity identity, string claimType, out string accessTokenValue)
    {
      var accessToken = identity.Claims.FirstOrDefault(c => c.Type == claimType);
      accessTokenValue = string.Empty;

      if (accessToken == null)
      {
        var userClaim = TheContext.AspNetUserClaim.ByUserId(userId).FirstOrDefault(c => c.ClaimType == claimType);
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

    /// <summary>
    /// Gets the comment.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    private HttpResponseMessage GetComment(int id)
    {
      var comment =
        TheContext.FundComment.Include("Comment")
                  .Include("Comment.Geo")
                  .Include("Comment.AspNetUser")
                  .ByCommentId(id)
                  .Select(
                    ft =>
                    new
                    {
                      ft.Identification, 
                      ft.FundId, 
                      ft.OriginId, 
                      ft.CommentId, 
                      ft.Comment.DateEntered, 
                      Comment =
                      new
                      {
                        ft.Comment.Identification, 
                        ft.Comment.Post, 
                        ft.Comment.DateEntered, 
                        ft.Comment.Name, 
                        ft.Comment.Title, 
                        ft.Comment.TotalLikes, 
                        ft.Comment.UserId, 
                      }, 
                      Geo =
                      new
                      {
                        ft.Comment.Geo.Alias, 
                        ft.Comment.Geo.City, 
                        ft.Comment.Geo.CountryCode, 
                        ft.Comment.Geo.IpAddress, 
                        ft.Comment.Geo.Isp, 
                        ft.Comment.Geo.Latitude, 
                        ft.Comment.Geo.Longitude, 
                        ft.Comment.Geo.Organization, 
                        ft.Comment.Geo.Region, 
                        ft.Comment.Geo.RegionName, 
                        ft.Comment.Geo.Status, 
                        ft.Comment.Geo.TimeZone, 
                        ft.Comment.Geo.Zip
                      }, 
                      AspNetUser =
                      new
                      {
                        ft.Comment.AspNetUser.FirstName, 
                        ft.Comment.AspNetUser.LastName, 
                        ft.Comment.AspNetUser.Email, 
                        ft.Comment.AspNetUser.AvatarUploadTempLocation, 
                        ft.Comment.AspNetUser.Identification, 
                        FacebookProvider =
                      ft.Comment.AspNetUser.AspNetUserLoginList.Select(
                        aull => new { aull.LoginProvider, aull.ProviderKey })
                        .FirstOrDefault(aul => aul.LoginProvider == "Facebook"), 
                      }
                    })
                  .SingleOrDefault();
      return Request.CreateResponse(HttpStatusCode.Created, comment);
    }

    /// <summary>
    /// Posts to my facebook.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <param name="fund">The fund.</param>
    /// <param name="originator">The originator.</param>
    private void PostToMyFacebook(FundComment value, Fund fund, FundUser originator)
    {
      if (!value.Comment.PostToFacebook)
      {
        return;
      }

      var identity = User.Identity as ClaimsIdentity;
      if (identity == null)
      {
        return;
      }

      bool isDefaultImage;
      var defaultImage = GetDefaultImage(value, out isDefaultImage);

      string accessTokenValue;
      if (GetClaim(identity, FacebookController.CLAIM_TYPE, originator, out accessTokenValue))
      {
        return;
      }

      var currentServer = ConfigurationManager.AppSettings["CurrentServer"];

      var graph = new Graph();
      try
      {
        graph.PostFeed(
          new FeedRequest
          {
            accessToken = accessTokenValue, 
            caption = "WWW.FUNDINGMIRACLES.COM", 
            description = value.Comment.Post, 
            link = string.Format("{0}/{1}", currentServer, fund.Item.Permalink), 
            message = "I just added a comment to " + fund.Item.Title, 
            name = value.Comment.Title, 
            picture = isDefaultImage ? defaultImage.Upload.Name :
              string.Format(
                "{0}/azure/img/{1}?height=150&width=230&mode=crop", 
                currentServer, 
                defaultImage.Upload.Name)
          });
      }
      catch (Exception)
      {
        // Suppress error and move on
        // TODO: Add Logging
      }
    }

    private static ItemUpload GetDefaultImage(FundComment value, out bool isDefaultImage)
    {
      var defaultImage = value.Fund.Item.ItemUploadList.OrderByDescending(img => img.IsDefault).FirstOrDefault();

      isDefaultImage = false;

      if (defaultImage == null)
      {
        isDefaultImage = true;
        defaultImage = new ItemUpload { Upload = new Upload { Name = ConfigurationManager.AppSettings["DefaultImage"] } };
      }

      if (string.IsNullOrWhiteSpace(defaultImage.Upload.Name))
      {
        defaultImage.Upload.Name = ConfigurationManager.AppSettings["DefaultImage"];
      }
      return defaultImage;
    }

    #endregion
  }
}