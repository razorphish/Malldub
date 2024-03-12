namespace Malldub.Data
{
  #region Directives

  using System;
  using System.Runtime.Serialization;

  #endregion

  partial class FundUpdate
  {
    #region Constructors and Destructors

    public FundUpdate()
    {
      Title       = string.Empty;
      DateEntered = DateTime.UtcNow;
      StatusId    = "Active";
    }

    #endregion

    #region Public Properties
    [DataMember]
    public AspNetUser User { get; set; }

    #endregion
  }
}