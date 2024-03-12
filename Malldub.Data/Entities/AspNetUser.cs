namespace Malldub.Data
{
  #region Directives

  using System;
  using System.Runtime.Serialization;

  #endregion

  partial class AspNetUser
  {
    #region Constructors and Destructors

    public AspNetUser()
    {
      var r = new Random();
      AvatarUploadTempLocation = string.Format("/img/avatar/{0}.jpg", r.Next(30));
    }

    #endregion

    #region Public Properties

    [DataMember]
    public AspNetUserLogin FacebookProvider { get; set; }

    #endregion
  }
}