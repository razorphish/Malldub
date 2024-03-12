namespace Malldub.Data
{
  #region Directives

  using System;

  #endregion

  partial class Comment
  {
    #region Constructors and Destructors

    public Comment()
    {
      DateEntered = DateTime.UtcNow;
      TotalLikes = 0;
    }

    #endregion
  }
}