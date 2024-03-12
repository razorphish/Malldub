// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : Antonio David Marasco
// Created          : 11-16-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-31-2013
// ***********************************************************************
// <copyright file="UserDetailsController.cs" company="Maras, co">
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

  using Data;

  using Microsoft.AspNet.Identity;

  using Models;

  #endregion

  /// <summary>
  /// Class UserDetailsController.
  /// </summary>
  [RoutePrefix("api/UserDetails")]
  [Authorize]
  public class UserDetailsController : ApiController
  {
    #region Fields

    /// <summary>
    /// The _context
    /// </summary>
    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Gets the name of the by user.
    /// </summary>
    /// <param name="userName">Name of the user.</param>
    /// <returns>UserInfoViewModel.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    [AllowAnonymous]
    public UserInfoViewModel GetByUserName(string userName)
    {
      if (string.IsNullOrWhiteSpace(userName))
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var user = _context.AspNetUser.ByUserName(userName).FirstOrDefault();

      if (user == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      var userInfo = new UserInfoViewModel
      {
        UserName       = userName,
        LastName       = user.LastName,
        FirstName      = user.FirstName,
        Identification = user.Identification
      };

      return userInfo;
    }

    /// <summary>
    /// Gets the user donations.
    /// </summary>
    /// <returns>IQueryable.</returns>
    [HttpGet]
    [Route("donations")]
    public IQueryable GetUserDonations()
    {
      var userId = User.Identity.GetUserId();
      var query =
        _context.Donation.ByDonorUserId(userId)
                .Include("Fund")
                .Include("Fund.Item")
                .Include("Fund.Item.ItemUploadList")
                .Select(
                  d =>
                  new
                  {
                    d.Amount,
                    d.BeneficiaryAmount,
                    d.DateEntered,
                    d.DonationFeeType,
                    d.DonorName,
                    d.Email,
                    d.Identification,
                    d.IsPrivateAmount,
                    d.IsPrivateDonorName,
                    d.Message,
                    d.OfflineDonation,
                    Fund = new
                    {
                      Item = new
                      {
                        d.Fund.Item.DateEntered,
                        d.Fund.Item.Description,
                        d.Fund.Item.EndDate,
                        d.Fund.Item.Identification,
                        d.Fund.Item.Permalink,
                        d.Fund.Item.StartDate,
                        d.Fund.Item.Title,
                        ItemUploadList = d.Fund.Item.ItemUploadList.Select(
                        il => new
                        {
                          il.IsDefault,
                          Upload = new
                                   {
                                     il.Upload.ContainerName, 
                                     il.Upload.Name, 
                                     il.Upload.LocationHttp,
                                     il.Upload.TypeId
                                   }
                        })
                      }
                    }
                  });

      return query;
    }

    /// <summary>
    /// Gets the user profile.
    /// </summary>
    /// <returns>HttpResponseMessage.</returns>
    [HttpGet]
    public HttpResponseMessage GetUserProfile()
    {
      var userName = User.Identity.GetUserName();

      var user =
        _context.AspNetUser.ByUserName(userName)
                .Include("UserAddressList")
                .Include("UserAddressList.Address")
                .Include("UserPhoneList")
                .Include("UserPhoneList.Phone")
                .Select(
                  ual =>
                  new
                  {
                    Upload = new { ual.Upload.Location },
                    Phone =
                    ual.UserPhoneList.Select(pl => new { pl.IsDefault, pl.Phone.Number })
                       .FirstOrDefault(p => p.IsDefault),
                    Email =
                    ual.UserEmailList.Select(em => new { em.IsDefault, EmailAddress = em.Email.Address })
                       .FirstOrDefault(em => em.IsDefault),
                    Address =
                    ual.UserAddressList.Select(
                      a =>
                      new
                      {
                        a.IsDefault,
                        a.Address.Address1,
                        a.Address.Address2,
                        a.Address.City,
                        a.Address.State,
                        a.Address.ZipCode,
                        a.Address.Country
                      }).FirstOrDefault(a => a.IsDefault)
                  })
                .FirstOrDefault();

      return Request.CreateResponse(HttpStatusCode.OK, user);
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
    public HttpResponseMessage Put(UserInfoViewModel value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var userdetails = _context.AspNetUser.ByUserName(value.UserName).FirstOrDefault();
      if (userdetails != null)
      {
        userdetails.FirstName = value.FirstName;
        userdetails.LastName  = value.LastName;
        userdetails.StatusId  = value.StatusId;

        var user = _context.AspNetUser.GetByIdentification(userdetails.Identification);

        if (user == null)
        {
          throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        _context.ApplyCurrentValues(user.EntityKey.EntitySetName, userdetails);
      }
      _context.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    /// <summary>
    /// Updates the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    [HttpPut]
    [Route("update")]
    public HttpResponseMessage Update(UserProfileModel value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      //First update all of the user's default
      var userId      = User.Identity.GetUserId();
      var userEmails  = _context.UserEmail.ByUserId(userId).Include("Email");
      var userPhone   = _context.UserPhone.ByUserId(userId).Include("Phone");
      var userAddress = _context.UserAddress.ByUserId(userId).Include("Address");

      var emailExists   = false;
      var addressExists = false;
      var phoneExists   = false;

      #region Update current emails

      foreach (var userEmail in userEmails)
      {
        if (userEmail.Email.Address == value.Email.EmailAddress)
        {
          emailExists = true;
          userEmail.IsDefault = true;
        }
        else
        {
          userEmail.IsDefault = false;
        }

        _context.ApplyCurrentValues(userEmail.EntityKey.EntitySetName, userEmail);
      }

      foreach (var address in userAddress)
      {
        if (address.Address.Address1 == value.Address.Address1 && address.Address.City == value.Address.City
            && address.Address.State == value.Address.State && address.Address.ZipCode == value.Address.ZipCode)
        {
          addressExists = true;
          address.IsDefault = true;
        }
        else
        {
          address.IsDefault = false;
        }
        _context.ApplyCurrentValues(address.EntityKey.EntitySetName, address);
      }

      foreach (var phone in userPhone)
      {
        if (phone.Phone.Number == value.Phone.Number)
        {
          phoneExists = true;
          phone.IsDefault = true;
        }
        else
        {
          phone.IsDefault = false;
        }
        _context.ApplyCurrentValues(phone.EntityKey.EntitySetName, phone);
      }

      #endregion


      if (!emailExists)
      {
        _context.UserEmail.AddObject(new UserEmail
        {
          IsDefault = true,
          UserId    = userId,
          Email     = new Email { Address = value.Email.EmailAddress }
        });
      }

      if (!phoneExists)
      {
        //Todo: Remove the hard-coded hack "Mobile"
        _context.UserPhone.AddObject(new UserPhone
        {
          IsDefault = true,
          UserId    = userId,
          Phone     = new Phone { Number = value.Phone.Number, TypeId = "Mobile" }
        });
      }

      if (!addressExists)
      {
        _context.UserAddress.AddObject(new UserAddress
        {
          IsDefault = true,
          UserId = userId,
          Address =
            new Address
            {
              Address1 = value.Address.Address1,
              Address2 = value.Address.Address2,
              City     = value.Address.City,
              State    = value.Address.State,
              ZipCode  = value.Address.ZipCode
            }
        });
      }

      try
      {
        _context.SaveChanges();
        //Save new 
        return Request.CreateResponse(HttpStatusCode.OK);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(
          HttpStatusCode.InternalServerError,
          "There was an error saving user profile: " + exc.Message);
      }
    }

    /// <summary>
    /// Updates the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    [HttpPut]
    [Route("updateBasics")]
    public HttpResponseMessage UpdateBasics(UserProfileBasics value)
    {
      var userId = User.Identity.GetUserId();

      var userdetails = _context.AspNetUser.ByIdentification(userId).FirstOrDefault();
      if (userdetails != null)
      {
        userdetails.FirstName = value.FirstName;
        userdetails.LastName = value.LastName;
        var user = _context.AspNetUser.GetByIdentification(userId);

        if (user == null)
        {
          throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        _context.ApplyCurrentValues(user.EntityKey.EntitySetName, userdetails);
      }
      _context.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [HttpPut]
    [Route("updatestatus")]
    public HttpResponseMessage UpdateStatus(UserProfileStatus value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }
      var userId = User.Identity.GetUserId();

      var userdetails = _context.AspNetUser.ByIdentification(userId).FirstOrDefault();
      if (userdetails != null)
      {
        userdetails.StatusId = value.Status;
        var user = _context.AspNetUser.GetByIdentification(userId);

        if (user == null)
        {
          throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        _context.ApplyCurrentValues(user.EntityKey.EntitySetName, userdetails);
      }
      _context.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion
  }
}