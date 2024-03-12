namespace Malldub.Data
{
  using System;

  partial class AspNetUserGateway
    {
      public AspNetUserGateway()
        {
            DateEntered = DateTime.UtcNow;
            DateUpdated = DateTime.UtcNow;
        }
    }
}