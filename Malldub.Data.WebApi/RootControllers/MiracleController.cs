namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using CodeSmith.Data.Linq;

  using Data;

  using Mandrill;

  using Models;

  #endregion

  [Authorize]
  [RoutePrefix("api/miracle")]
  public class MiracleController : ApiController
  {
    #region Fields

    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    [AllowAnonymous]
    [Route("fundTypes")]
    public HttpResponseMessage GetFundTypes()
    {
      try
      {
        var types = _context.FundType.Select(ft => new { ft.FriendlyName, ft.Identification }).FromCache("XLongSliding");

        return Request.CreateResponse(HttpStatusCode.OK, types);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
      }
    }

    [AllowAnonymous]
    [Route("fundCategories")]
    public HttpResponseMessage GetFundCategories()
    {
      try
      {
        var types =
          _context.FundCategory.Include("FundList")
                  .Select(
                    ft =>
                    new
                    {
                      ft.FriendlyName,
                      ft.Identification,
                      fundCount =

                      // ft.FundList.Count(f => f.Item.EndDate > DateTime.UtcNow && !f.IsPrivate && f.TypeId == "Campaign")
                      ft.FundList.Count(f => !f.IsPrivate && f.Item.StatusId == "Active")
                    });

        return Request.CreateResponse(HttpStatusCode.OK, types);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
      }
    }

    [AllowAnonymous]
    [Route("states")]
    public HttpResponseMessage GetStates()
    {
      try
      {
        var types = _context.State.Select(ft => new { ft.Name, ft.Identification }).FromCache("XLongSliding");

        return Request.CreateResponse(HttpStatusCode.OK, types);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
      }
    }

    [AllowAnonymous]
    [Route("sendQuestion")]
    [HttpPost]
    public HttpResponseMessage SendQuestion(QuestionModel model)
    {
      try
      {
        _context.Note.AddObject(
          new Note
          {
            ApplicationId = model.ApplicationId,
            FirstName          = model.Name,
            Email         = model.Email,
            Comments      = model.Message,
            TypeId        = model.NoteTypeId,
            DateEntered   = DateTime.UtcNow,
            IsPrivate     = true,
            Subject       = model.Title,
          });
        _context.SaveChanges();

        var result = MandrillController.SendQuestion(model);
        return Request.CreateResponse(HttpStatusCode.OK, result);
      }
      catch (MandrillException mex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, mex);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
      }
    }

    #endregion
  }
}
