namespace Malldub.Data
{
  using System;

  partial class OrderItem
    {
      public OrderItem()
      {
        ItemOrderGuid = Guid.NewGuid();
      }
    }
}