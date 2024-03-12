using System;

namespace Malldub.Data.Controllers.API
{
  using System.Web.Http;

  [Authorize(Roles = "Administrator")]
    public partial class PhoneController
    {
        // Place custom code here.
    }
}