namespace Malldub.WebApi.Filters
{
  #region Directives

  using System.Net;
  using System.Net.Http;
  using System.Security;
  using System.Web.Http.Filters;

  #endregion

  public class SecurityExceptionHandler : ExceptionFilterAttribute
  {
    #region Public Methods and Operators

    /// <summary>
    /// Raises the exception event.
    /// </summary>
    /// <param name="actionExecutedContext">The context for the action.</param>
    /// <remarks>Place in global.asax(ConfigureGlobal) = globalConfig.Filters.Add(new SecurityExceptionFilter())</remarks>
    public override void OnException(HttpActionExecutedContext actionExecutedContext)
    {
      //base.OnException(actionExecutedContext);
      if (!(actionExecutedContext.Exception is SecurityException))
      {
        return;
      }

      var response = new HttpResponseMessage(HttpStatusCode.Unauthorized)
      {
        Content = new StringContent(actionExecutedContext.Exception.Message)
      };
      //log exception details
      actionExecutedContext.Response = response;
    }

    #endregion
  }
}