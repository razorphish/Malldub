using System;

namespace Malldub.Data.Controllers.API
{
  using System.Web.Http;

  [Authorize(Roles = "Administrator")]
    public partial class PaymentMethodController
    {
        // Place custom code here.
    }
}