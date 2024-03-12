namespace Malldub.WebApi.Models
{
  using System.ComponentModel.DataAnnotations;

  #region Directives

  using System.Collections.Generic;

  #endregion

  // Models returned by AccountController actions.

  public class ExternalLoginViewModel
  {
    #region Public Properties

    public string Name { get; set; }

    public string State { get; set; }

    public string Url { get; set; }

    #endregion
  }

  public class ManageInfoViewModel
  {
    #region Public Properties

    public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }

    public string LocalLoginProvider { get; set; }

    public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

    public string UserName { get; set; }

    #endregion
  }

  public class UserInfoViewModel
  {
    #region Public Properties

    [DataType(DataType.Text)]
    [Display(Name = "FirstName")]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [DataType(DataType.Text)]
    [Display(Name = "LastName")]
    [MaxLength(50)]
    public string LastName { get; set; }

    public string AvatarUploadTempLocation { get; set; }

    public string Email { get; set; }

    public ProviderModel FacebookProvider { get; set; }

    public bool HasRegistered { get; set; }

    public bool HasRegisteredExternal { get; set; }

    public string Identification { get; set; }

    public bool IsAuthenticated { get; set; }

    public string LoginProvider { get; set; }

    [Required]
    public string StatusId { get; set; }

    public string UserName { get; set; }


    #endregion
  }

  public class UserLoginInfoViewModel
  {
    #region Public Properties

    public string LoginProvider { get; set; }

    public string ProviderKey { get; set; }

    #endregion
  }
}