namespace Malldub.Data.Controllers.API
{
  #region Directives

  using System.Web.Http;

  #endregion

  [Authorize(Roles = "Administrator")]
  public partial class DefaultController
  {
    // Place custom code here.
  }
}