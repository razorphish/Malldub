namespace Malldub.Data.Controllers.API
{
  using System.Web.Http;

  [Authorize(Roles = "Administrator")]
  public partial class AspNetUserLoginController
  {
    // Place custom code here.
  }
}