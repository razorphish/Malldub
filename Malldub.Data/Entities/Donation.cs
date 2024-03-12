namespace Malldub.Data
{
  #region Directives

  using System;
  using System.Runtime.Serialization;

  #endregion

  partial class Donation
  {
    #region Constructors and Destructors

    public Donation()
    {
      DateEntered        = DateTime.UtcNow;
      SubscriptionTypeId = "None";
    }

    #endregion

    #region Public Properties

    [DataMember]
    public AspNetUser User { get; set; }
    #endregion
  }
}