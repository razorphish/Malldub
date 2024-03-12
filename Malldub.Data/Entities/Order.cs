namespace Malldub.Data
{
  using System;

  partial class Order
    {
      public Order()
      {
        DateEntered = DateTime.UtcNow;
        this.Guid = Guid.NewGuid();
      }
    }
}