namespace Malldub.Data
{
  #region Directives

  using System;

  #endregion

  partial class Note
  {
    #region Constructors and Destructors

    public Note()
    {
      Viewed = false;
      IsPrivate = false;
      Sent = false;
      DateEntered = DateTime.UtcNow;
    }

    #endregion
  }
}