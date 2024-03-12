namespace Malldub.Data.Controllers.API
{
  #region Directives

  using System;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Malldub.WebApi.Exceptions;

  #endregion

  [Authorize(Roles = "Administrator")]
  [RoutePrefix("api/note")]
  public partial class NoteController
  {
    #region Public Methods and Operators

    [Route("applications")]
    [HttpGet]
    public HttpResponseMessage ByAllApplications()
    {
      try
      {
        var notes =
          _context.Note.AsQueryable()
                  .Where(n => n.Viewed == false)
                  .OrderByDescending(n => n.DateEntered)
                  .GroupBy(info => info.ApplicationId)
                  .Select(group => new { group.FirstOrDefault().ApplicationId, Quantity = group.Count() });

        return Request.CreateResponse(HttpStatusCode.OK, notes);
      }
      catch (MalldubWebApiException mdeException)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, mdeException);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(
          HttpStatusCode.InternalServerError, 
          new MalldubWebApiException
          {
            ErrorMessage = exc.Message, 
            Error = exc.StackTrace, 
            ErrorDescription = exc.Message
          });
      }
    }

    [Route("application/{applicationId}")]
    [HttpGet]
    public HttpResponseMessage ByApplication(string applicationId)
    {
      try
      {
        if (string.IsNullOrWhiteSpace(applicationId))
        {
          throw new MalldubWebApiException
                {
                  Error = "Application Id", 
                  ErrorCode = "2000", 
                  ErrorDescription = "Invalid or missing application Id", 
                  ErrorMessage = "Please provide a valid application Id"
                };
        }

        var notes = _context.Note.ByApplicationId(applicationId).OrderByDescending(n => n.DateEntered);

        return Request.CreateResponse(HttpStatusCode.OK, notes);
      }
      catch (MalldubWebApiException mdeException)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, mdeException);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(
          HttpStatusCode.InternalServerError, 
          new MalldubWebApiException
          {
            ErrorMessage = exc.Message, 
            Error = exc.StackTrace, 
            ErrorDescription = exc.Message
          });
      }
    }

    #endregion
  }
}