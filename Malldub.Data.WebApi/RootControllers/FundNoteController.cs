// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 06-25-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 07-06-2014
// ***********************************************************************
// <copyright file="FundNoteController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System.Data.Entity;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Malldub.Data;
  using Malldub.WebApi.Models;

  using Mandrill;

  #endregion

  /// <summary>
  /// Class FundNoteController.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  [RoutePrefix("api/fund/{fundId}/notes")]
  [Authorize]
  public class FundNoteController : BaseApiController
  {

    #region Public Methods and Operators

    public FundNoteController()
      : base(new MalldubDataContext())
    {
      
    }

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
      var result = TheContext.FundNote.Include("Note").ByFundId(fundId).Where(n => n.Note.IsPrivate == false);

      var count = result.Count();

      if (itemsPerPage > 0)
      {
        result =
          result.OrderByDescending(ft => ft.Note.DateEntered).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
      }

      var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };

      var response = Request.CreateResponse(HttpStatusCode.OK, ret);

      return response;
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [AllowAnonymous]
    [HttpPost]
    [Route("")]
    public HttpResponseMessage Post(int fundId, Note value)
    {
      value.Subject = "[Fundolo] Contact Fund Owner: {0} {1} - Fund: {2}";

      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var item = TheContext.Item.ByIdentification(fundId).Include("AspNetUser").FirstOrDefault();

      if (item == null)
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Fund user not found");
      }

      value.Subject             = string.Format(value.Subject, item.AspNetUser.FirstName, item.AspNetUser.LastName, item.Title);
      value.Subject             = value.Subject.Substring(0, value.Subject.Length >= 256 ? 256 : value.Subject.Length);
      value.ApplicationId       = "Fundolo";
      value.TypeId              = "Message";
      value.FundNote.FundUserId = item.UserId;


      var result =
        MandrillController.SendContactRequest(
          new FundContactRequestModel
          {
            ToFullName =
              string.Format("{0} {1}", item.AspNetUser.FirstName, item.AspNetUser.LastName), 
            ToEmail         = item.AspNetUser.Email, 
            Email           = value.Email, 
            FirstName       = value.FirstName, 
            LastName        = value.LastName, 
            FundTitle       = item.Title, 
            Message         = value.Comments, 
            FunderFirstName = item.AspNetUser.FirstName, 
            Permalink       = item.Permalink
          });
      if (result[0].Status == EmailResultStatus.Sent)
      {
        value.Sent = true;
      }

      TheContext.Note.AddObject(value);
      TheContext.SaveChanges();

      var response = Request.CreateResponse(HttpStatusCode.Created, value);

      return response;
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [AllowAnonymous]
    [HttpPost]
    [Route("{id}/respond")]
    public HttpResponseMessage Respond(Note value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var item = TheContext.Item.ByIdentification(value.FundNote.FundId).Include("AspNetUser").FirstOrDefault();

      if (item == null)
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Fund user not found");
      }

      value.Subject = "[Fundolo] Response to User: {0} {1} [{3}]- Fund: {2}";
      value.Subject = string.Format(value.Subject, value.FirstName, value.LastName, item.Title, value.Email);
      value.Subject = value.Subject.Substring(0, value.Subject.Length >= 256 ? 256 : value.Subject.Length);

      value.ApplicationId       = "Fundolo";
      value.TypeId              = "Response";
      value.IsPrivate           = true;
      value.FundNote.FundUserId = item.UserId;

      var result =
        MandrillController.SendContactRequest(
          new FundContactRequestModel
          {
            ToFullName      = string.Format("{0} {1}", value.FirstName, value.LastName), 
            ToEmail         = value.Email, 
            Email           = item.AspNetUser.Email, 
            FirstName       = item.AspNetUser.FirstName, 
            LastName        = item.AspNetUser.LastName, 
            FundTitle       = item.Title, 
            Message         = value.Comments, 
            FunderFirstName = value.FirstName, 
            Permalink       = item.Permalink
          });
      if (result[0].Status == EmailResultStatus.Sent)
      {
        value.Sent = true;
      }

      TheContext.Note.AddObject(value);
      TheContext.SaveChanges();

      var response = Request.CreateResponse(HttpStatusCode.Created, value);

      return response;
    }

    /// <summary>
    /// Updates the viewed.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [HttpPut]
    [Route("{id}/viewed")]
    public HttpResponseMessage UpdateViewed(int fundId, int id)
    {
      var note = TheContext.Note.GetByKey(id);

      if (note == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      var value = TheContext.Note.ByIdentification(id).FirstOrDefault();

      if (value == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      value.Viewed = true;

      TheContext.ApplyCurrentValues(note.EntityKey.EntitySetName, value);
      TheContext.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion

    #region Methods

    /// <summary>
    /// Adds the specified fund note.
    /// </summary>
    /// <param name="fundNote">The fund note.</param>
    /// <remarks>Default Blank Remakrs Test</remarks>
    internal void Add(FundNote fundNote)
    {
      TheContext.FundNote.AddObject(fundNote);
      TheContext.SaveChanges();
    }

    #endregion
  }
}