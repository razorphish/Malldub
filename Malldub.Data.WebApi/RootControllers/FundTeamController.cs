// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 09-12-2014
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-12-2014
// ***********************************************************************
// <copyright file="FundTeamController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Data.Objects.DataClasses;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Malldub.Data;
  using Malldub.Helper;
  using Malldub.WebApi.Models;

  using Mandrill;

  using Marasco.Azure.Storage.Business;

  using Microsoft.AspNet.Identity;

  #endregion

  /// <summary>
  /// Class FundTeamController.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  [RoutePrefix("api/fund/{fundId}/teams")]
  [Authorize]
  public class FundTeamController : ApiController
  {
    #region Fields

    /// <summary>
    /// The _context
    /// </summary>
    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPost]
    [Route("")]
    public HttpResponseMessage Post(int fundId, FundTeam value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var fund = CreateTeamFundraiser(value, "TeamPage", fundId);
      value.TeamFundId = fund.Identification;
      _context.FundActivity.AddObject(
        new FundActivity
        {
          Activity =
            new Activity
            {
              TypeId = "Create",
              Memo =
                string.Format("{0}: [{1}]", "A new team was created", value.Team.Name)
            },
          FundId = value.FundId,
          TypeId = "NewTeam",
        });
      _context.FundTeam.AddObject(value);
      _context.SaveChanges();


      var team =
        _context.FundTeam.Include("TeamFundFund")
                .Include("Team")
                .Include("TeamFundFund.DonationList")
                .Include("TeamFundFund.Item")
                .Include("TeamFundFund.Item.UploadList")
                .Include("TeamFundFund.Item.UploadList.Upload")
                .ByIdentification(value.Identification)
                .Select(
                  ft =>
                  new
                  {
                    ft.FundId,
                    ft.GoalAmount,
                    ft.Identification,
                    ft.TeamFundId,
                    ft.TeamId,
                    Fund =
                    new
                    {
                      ft.TeamFundFund.GoalAmount,
                      ft.TeamFundFund.Identification,
                      CommentList =
                    ft.TeamFundFund.FundCommentList.Select(
                      fcl => new { fcl.Comment.DateEntered, fcl.Comment.Post, fcl.Comment.UserId }),
                      DonationList =
                    ft.TeamFundFund.DonationList.Select(
                      dl => new { dl.BeneficiaryAmount, dl.DonorName, dl.Message, dl.DateEntered }),
                      DefaultImage =
                    ft.TeamFundFund.Item.ItemUploadList.Where(iu => iu.IsDefault ?? false)
                      .Select(
                        il =>
                        new
                        {
                          il.IsDefault,
                          il.UploadId,
                          il.ItemId,
                          Upload = new { il.Upload.Location, il.Upload.Name, il.Upload.ContainerName }
                        }),
                      Item =
                    new
                    {
                      ft.TeamFundFund.Item.Permalink,
                      ft.TeamFundFund.Item.Title,
                      ft.TeamFundFund.Item.Identification,
                      ft.TeamFundFund.Item.DateEntered,
                      ft.TeamFundFund.Item.Description,
                      ft.TeamFundFund.Item.EndDate,
                      ft.TeamFundFund.Item.StartDate
                    },
                      UserList =
                    ft.TeamFundFund.FundUserList.Select(
                      ful =>
                      new
                      {
                        ful.AspNetUser.FirstName,
                        ful.AspNetUser.LastName,
                        ful.AspNetUser.Email,
                        ful.AspNetUser.AvatarUploadTempLocation,
                        ful.UserTypeId,
                        FacebookProvider =
                        ful.AspNetUser.AspNetUserLoginList.Select(aull => new { aull.LoginProvider, aull.ProviderKey })
                           .FirstOrDefault(aul => aul.LoginProvider == "Facebook"),
                      }).Where(ful => ful.UserTypeId == "Beneficiary" || ful.UserTypeId == "Originator")
                    },
                    Team = new { ft.Team.Name, ft.Team.DateEntered, ft.TeamId, ft.Team.Identification }
                  }).First();


      var response = Request.CreateResponse(HttpStatusCode.Created, team);

      return response;
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="id">The identifier.</param>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPut]
    [Route("{id}")]
    public HttpResponseMessage Put(int fundId, int id, FundTeam value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var team = _context.Team.GetByKey(value.Team.Identification);
      var fundTeam = _context.FundTeam
        .Include("Team")
        .Include("FundTeamMemberList")
        .Include("FundFund")
        .Include("FundFund.Item")
        .GetByKey(id);

      var currentCaptain = fundTeam.FundTeamMemberList.FirstOrDefault(ft => ft.RoleId == "Captain");

      if (string.IsNullOrWhiteSpace(value.CaptainEmail))
      {
        if (currentCaptain != null)
        {
          _context.FundTeamMember.DeleteObject(currentCaptain);
        }
      } 
      else
      {
        var captain = _context.AspNetUser.ByEmail(value.CaptainEmail).SingleOrDefault();

        if (captain == null)
        {
          if (currentCaptain != null)
          {
            _context.FundTeamMember.DeleteObject(currentCaptain);
          }
        } 
        else
        {
          if (string.IsNullOrWhiteSpace(fundTeam.CaptainEmail))
          {
            _context.FundTeamMember.AddObject(
              new FundTeamMember
              {
                RoleId     = "Captain",
                UserId     = captain.Identification,
                FundTeamId = value.Identification
              });
          }
          else if (fundTeam.CaptainEmail != value.CaptainEmail)
          {            
            if (currentCaptain != null)
            {
              _context.FundTeamMember.DeleteObject(currentCaptain);
            }

            _context.FundTeamMember.AddObject(
              new FundTeamMember
              {
                RoleId     = "Captain", 
                UserId     = captain.Identification,
                FundTeamId = value.Identification
              });
          }
        }
      }

      if (fundTeam == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      var fundItem = _context.Item.GetByKey(fundTeam.TeamFundId);

      var newFund = fundItem;
      newFund.Permalink = string.Format("{0}-{1}", fundTeam.FundFund.Item.Permalink, StringUtilities.Slug(value.Team.Name));
      newFund.Title = value.Team.Name;
      _context.ApplyCurrentValues(fundItem.EntityKey.EntitySetName, newFund);                            
      _context.ApplyCurrentValues(team.EntityKey.EntitySetName, value.Team);
      _context.ApplyCurrentValues(fundTeam.EntityKey.EntitySetName, value);

      _context.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [HttpGet]
    [Route("")]
    [AllowAnonymous]
    public HttpResponseMessage ByFundId(int fundId)
    {
      var teams =
        _context.FundTeam.Include("TeamFundFund")
                .Include("Team")
                .Include("TeamFundFund.DonationList")
                .Include("TeamFundFund.Item")
                .Include("TeamFundFund.Item.UploadList")
                .Include("TeamFundFund.Item.UploadList.Upload")
                .ByFundId(fundId)
                .Select(
                  ft =>
                  new
                  {
                    ft.FundId,
                    ft.GoalAmount,
                    ft.Identification,
                    ft.TeamFundId,
                    ft.TeamId,
                    Fund =
                    new
                    {
                      ft.TeamFundFund.GoalAmount,
                      ft.TeamFundFund.Identification,
                      CommentList =
                        ft.TeamFundFund.FundCommentList.Select(
                          fcl => new { fcl.Comment.DateEntered, fcl.Comment.Post, fcl.Comment.UserId }),
                      DonationList =
                    ft.TeamFundFund.DonationList.Select(
                      dl => new { dl.BeneficiaryAmount, dl.DonorName, dl.Message, dl.DateEntered }),

                      Item =
                    new
                    {
                      ft.TeamFundFund.Item.Permalink,
                      ft.TeamFundFund.Item.Title,
                      ft.TeamFundFund.Item.Identification,
                      ft.TeamFundFund.Item.DateEntered,
                      ft.TeamFundFund.Item.Description,
                      ft.TeamFundFund.Item.EndDate,
                      ft.TeamFundFund.Item.StartDate,
                      ItemUploadList =
                      ft.TeamFundFund.Item.ItemUploadList.Select(
                      il =>
                      new
                      {
                        il.IsDefault,
                        Upload = new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                      })
                    },
                      UserList =
                    ft.TeamFundFund.FundUserList.Select(
                      ful =>
                      new
                      {
                        ful.AspNetUser.FirstName,
                        ful.AspNetUser.LastName,
                        ful.AspNetUser.Email,
                        ful.AspNetUser.AvatarUploadTempLocation,
                        ful.UserTypeId,
                        FacebookProvider =
                        ful.AspNetUser.AspNetUserLoginList.Select(aull => new { aull.LoginProvider, aull.ProviderKey })
                           .FirstOrDefault(aul => aul.LoginProvider == "Facebook"),
                      }).Where(ful => ful.UserTypeId == "Beneficiary" || ful.UserTypeId == "Originator")
                    },
                    Team = new { ft.Team.Name, ft.Team.DateEntered, ft.TeamId, ft.Team.Identification }
                  });
      
      var response = Request.CreateResponse(HttpStatusCode.OK, teams);

      return response;
    }

    [Route("{id}/join")]
    [HttpPost]
    public HttpResponseMessage Join(int id)
    {
      if (id == 0)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid or missing team id");
      }

      // Make sure user is not on team
      var userId = User.Identity.GetUserId();
      var fund = new Fund();

      var user = _context.FundTeamMember
        .ByUserId(userId)
        .ByFundTeamId(id)
        .SingleOrDefault();

      if (user != null)
      {
        return Request.CreateErrorResponse(HttpStatusCode.Conflict, "User is already assigned to this team");
      }

      var teamMember = new FundTeamMember
                       {
                         FundTeamId = id,
                         RoleId     = "TeamMember",
                         UserId     = userId
                       };

      var fundTeamMember = _context.AspNetUser.ByIdentification(userId).SingleOrDefault();
      var fundTeam =
        _context.FundTeam
                .Include("FundFund")
                .Include("FundFund.Item")
                .Include("FundFund.FundSetting")
                .Include("FundFund.FundUserList")
                .Include("FundFund.FundUserList.AspNetUser")
                .Include("Team")
                .Include("TeamFundFund.FundUserList")
                .Include("TeamFundFund.Item")
                .Include("TeamFundFund.Item.ItemUploadList")
                .Include("TeamFundFund.Item.ItemUploadList.Upload")
                .ByIdentification(id)
                .SingleOrDefault();

      // Check fund settings
      if (fundTeamMember != null && fundTeam != null)
      {
        var message = string.Format(
          "{0} {1} has joined your team, '{2}', from campaign {3}.",
          fundTeamMember.FirstName,
          fundTeamMember.LastName,
          fundTeam.Team.Name,
          fundTeam.FundFund.Item.Title);

        // Email originator that a new team member has joined
        EmailOriginatorTeamMemberJoined(
          fundTeam,
          new SupportFundModel { Message = message },
          fundTeam.FundFund,
          fundTeamMember);

        // Create fundraiser on teamMember behalf
        fund = CreateTeamFundraiser(
          fundTeam,
          "TeamMemberPage",
          fundTeam.TeamFundId,
          teamMember,
          fundTeamMember.FirstName,
          fundTeamMember.LastName);

        _context.FundActivity.AddObject(
          new FundActivity
          {
            Activity =
              new Activity
              {
                TypeId = "Create",
                Memo =
                  string.Format(
                    "{0} {1} has joined team: {2}",
                    fundTeamMember.FirstName,
                    fundTeamMember.LastName,
                    fundTeam.Team.Name)
              },
            TypeId = "NewTeamMember",
            FundId = fundTeam.FundFund.Identification
          });
        _context.SaveChanges();
      }

      var response = Request.CreateResponse(HttpStatusCode.Created, fund);

      return response;
    }

    #endregion

    #region Methods

    internal void AddNewUserToTeams(string email, string userId)
    {
      var fundTeams = _context.FundTeam.ByCaptainEmail(email);
      var number = 0;
      foreach (var fundTeam in fundTeams)
      {
        _context.FundTeamMember.AddObject(new FundTeamMember
        {
          FundTeamId = fundTeam.Identification,
          UserId = userId,
          RoleId = "Captain"
        });
        number++;
      }

      if (number > 0)
      {
        _context.SaveChanges();
      }
    }

    private static List<EmailResult> EmailOriginatorTeamMemberJoined(
      FundTeam team,
      SupportFundModel support,
      Fund fund,
      AspNetUser teamMember)
    {
      var originator = fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");
      if (!fund.FundSetting.EmailReceiveUserTeamMember || originator == null)
      {
        return new List<EmailResult>();
      }

      var subject = string.Format(
        "{0} {1} is now a member of your team '{2}'",
        teamMember.FirstName,
        teamMember.LastName,
        team.Team.Name);

      var result = MandrillController.SendSupport(
        support,
        teamMember,
        originator.AspNetUser,
        fund,
        "You have a new Team Member!",
        subject);
      return result;
    }

    /// <summary>
    /// Creates the team.
    /// </summary>
    /// <param name="fundTeam">The fund team.</param>
    /// <param name="fundType">Type of the fund.</param>
    /// <param name="originalFundId">The original fund identifier.</param>
    /// <param name="teamMember">The team member.</param>
    /// <param name="firstName">The first name.</param>
    /// <param name="lastName">The last name.</param>
    /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
    private Fund CreateTeamFundraiser(
      FundTeam fundTeam,
      string fundType,
      int originalFundId,
      FundTeamMember teamMember = null,
      string firstName = "",
      string lastName = "")
    {
      var fc = new FundDetailsController();
      var userId = User.Identity.GetUserId();

      var currentFund = fc.GetFundDetails(originalFundId);

      var permalink  = string.Empty;

      switch (fundType)
      {
        case "TeamPage":
          permalink = string.Format("{0}-{1}", currentFund.Item.Permalink, StringUtilities.Slug(fundTeam.Team.Name));
          break;
        case "TeamMemberPage":
          permalink = string.Format(
            "{0}-{1}-{2}",
            StringUtilities.Slug(firstName),
            StringUtilities.Slug(lastName),
            currentFund.Item.Permalink);
          break;
      }

      var newFund = new Fund
                    {
                      Item =
                        new Item
                        {
                          TypeId            = currentFund.Item.TypeId,
                          DateEntered       = DateTime.UtcNow,
                          DateUpdated       = DateTime.UtcNow,
                          UserId            = userId,
                          Permalink         = permalink,
                          ShortSummary      = currentFund.Item.ShortSummary,
                          Description       = currentFund.Item.Description,
                          Title             = fundTeam.Team.Name,
                          Featured          = false,
                          StatusId          = currentFund.Item.StatusId,
                          TransactionTypeId = "Donation"
                        },
                      GoalAmount          = fundTeam.GoalAmount,
                      TypeId              = fundType,
                      CategoryId          = currentFund.CategoryId,
                      EnableSocialSharing = currentFund.EnableSocialSharing,
                      PageColor           = currentFund.PageColor,
                      PageLayout          = currentFund.PageLayout,
                      PageSkin            = currentFund.PageSkin,
                      IsPrivate           = false
                    };

      foreach (var itemUpload in currentFund.Item.ItemUploadList)
      {
        var name             = itemUpload.Upload.Name;
        var description      = itemUpload.Upload.Description;
        var fileHttpLocation = itemUpload.Upload.LocationHttp;
        var location         = itemUpload.Upload.Location;
        var relativeLocation = itemUpload.Upload.RelativeLocation;

        if (itemUpload.Upload.TypeId == "web.Image")
        {
          name = CloudBlockBlobBusiness.BuildFileName(itemUpload.Upload.OriginalFileName);
          CloudBlockBlobBusiness.Copy(itemUpload.Upload.Name, name);
          description      = name;
          fileHttpLocation = fc.GetNewFileLocation(name, itemUpload.Upload.ContainerName, itemUpload.Upload);
          location         = fileHttpLocation;
          relativeLocation = string.Format("/{0}/{1}", itemUpload.Upload.ContainerName, name);
        }

        newFund.Item.ItemUploadList.Add(
          new ItemUpload
          {
            IsDefault = itemUpload.IsDefault,
            Upload =
              new Upload
              {
                Description      = description,
                IsPrivate        = itemUpload.Upload.IsPrivate,
                CategoryId       = itemUpload.Upload.CategoryId,
                Name             = name,
                OriginalFileName = itemUpload.Upload.OriginalFileName,
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
                             UserId         = userId,
                             FundId         = currentFund.Identification,
                             PostToFacebook = true,
                             AllowEmail     = true,
                             UserTypeId     = "Originator"
                           }
                         };

      var bene = currentFund.FundUserList.Any(user => user.UserTypeId == "Beneficiary");

      if (bene)
      {
        foreach (var user in currentFund.FundUserList.Where(user => user.UserTypeId == "Beneficiary"))
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
        var originator = currentFund.FundUserList.FirstOrDefault(user => user.UserTypeId == "Originator");

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

      if (teamMember != null)
      {
        var fundTeamMemberList = new EntityCollection<FundTeamMember> { teamMember };

        newFund.FundTeamMemberList = fundTeamMemberList;
      }

      newFund.FundUserList = fundUserList;
      newFund.FundSetting  = new FundSetting();
      newFund.FundActivityList.Add(
        new FundActivity
        {
          Activity = new Activity { TypeId = "Create", Memo = "New Campaign Created" },
          TypeId = "CampaignCreated"
        });
      _context.Fund.AddObject(newFund);
      _context.SaveChanges();

      return new Fund
             {
               Identification = newFund.Identification,
               Item = new Item
                      {
                        Permalink = newFund.Item.Permalink
                      }
             };
    }

    #endregion
  }
}