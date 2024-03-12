namespace Malldub.Data.Controllers.API
{
  #region Directives

  using System.Web.Http;

  #endregion

  /// <summary>
  /// </summary>
  [Authorize(Roles = "Administrator")]
  public partial class MetaKeyController
  {
    // Place custom code here.
  }
}