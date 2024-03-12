namespace Malldub.Data
{
  #region Directives

  using System;

  #endregion

  partial class Upload
  {
    #region Constructors and Destructors

    public Upload()
    {
      DateEntered = DateTime.UtcNow;
      DateUpdated = DateTime.UtcNow;
    }

    #endregion
  }
}