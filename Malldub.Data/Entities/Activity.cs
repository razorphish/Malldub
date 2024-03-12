namespace Malldub.Data
{
  using System;

  partial class Activity
    {
      public Activity()
      {
        DateEntered = DateTime.UtcNow;
        IsPrivate = false;
      }
    }
}