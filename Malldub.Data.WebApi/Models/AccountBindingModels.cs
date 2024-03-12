namespace Malldub.WebApi.Models
{
    #region Directives

    using System;

    #region Directives

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Malldub.Data;
    using Malldub.Data.Models;

    #endregion

    #endregion

    public interface IBindingModel
    {
        #region Public Properties

        string Email { get; set; }

        string FirstName { get; set; }

        string LastName { get; set; }

        string StatusId { get; set; }

        string UserName { get; set; }

        #endregion
    }

    // Models used as parameters to AccountController actions.
    public class AddExternalLoginBindingModel
    {
        #region Public Properties

        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }

        public string UserId { get; set; }

        #endregion
    }

    public class ChangePasswordBindingModel
    {
        #region Public Properties

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        #endregion
    }

    public class RegisterBindingModel : IBindingModel
    {
        #region Public Properties

        public int? AvatarUploadId { get; set; }

        public string AvatarUploadTempLocation { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Confirm email")]
        [Compare("Email", ErrorMessage = "The email and confirmation email do not match.")]
        public string ConfirmEmail { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        [MaxLength(100)]
        public string Email { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "FirstName")]
        [MaxLength(50)]
        public string FirstName { get; set; }

        public GeoCode Geo { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "LastName")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "StatusId")]
        [MaxLength(20)]
        public string StatusId { get; set; }

        public List<Address> UserAddressList { get; set; }

        public List<Email> UserEmailList { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        public List<Phone> UserPhoneList { get; set; }

        #endregion
    }

    public class RegisterAnonymousBindingModel : IBindingModel
    {
        #region Constructors and Destructors

        public RegisterAnonymousBindingModel()
        {
            // TODO : Decide whether to keep random password
            // var rs = new RandomStringGenerator
            // {
            // UseSpecialCharacters = false,
            // RepeatCharacters     = false
            // };
            // Password = rs.Generate(7);
            StatusId = "Pending";
        }

        #endregion

        #region Public Properties

        public int? AvatarUploadId { get; set; }

        public string AvatarUploadTempLocation { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        [MaxLength(100)]
        public string Email { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "FirstName")]
        [MaxLength(50)]
        public string FirstName { get; set; }

        public GeoCode Geo { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "LastName")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "StatusId")]
        [MaxLength(20)]
        public string StatusId { get; set; }

        public List<Address> UserAddressList { get; set; }

        public List<Email> UserEmailList { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        public List<Phone> UserPhoneList { get; set; }

        #endregion
    }

    public class RegisterAnonymousReturnModel
    {
        #region Public Properties

        public string Identification { get; set; }

        #endregion
    }

    public class RegisterExternalBindingModel : IBindingModel
    {
        #region Public Properties

        public int? AvatarUploadId { get; set; }

        public string AvatarUploadTempLocation { get; set; }

        public bool DisableWePay { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        [MaxLength(100)]
        public string Email { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "FirstName")]
        [MaxLength(50)]
        public string FirstName { get; set; }

        public GeoCode Geo { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "LastName")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "StatusId")]
        [MaxLength(20)]
        public string StatusId { get; set; }

        public string Token { get; set; }

        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        #endregion
    }

    public class RemoveLoginBindingModel
    {
        #region Public Properties

        [Required]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [Required]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }

        #endregion
    }

    public class SetPasswordBindingModel
    {
        #region Public Properties

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        #endregion
    }

    public class ResetPasswordBindingModel
    {
        #region Public Properties

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        [MaxLength(100)]
        public string Email { get; set; }

        #endregion
    }

    public class UpdateRoleBindingModel
    {
        #region Fields

        public string id;

        public string identification;

        public string name;

        #endregion
    }

    public class RoleDetailsViewModel
    {
        #region Public Properties

        public string Id { get; set; }

        public string Identification { get; set; }

        public string Name { get; set; }

        #endregion
    }

    public class UserDetailsViewModel
    {
        // public string Id { get; set; }
        #region Public Properties

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string Id { get; set; }

        public string LastName { get; set; }

        //public bool LockoutEnabled { get; set; }

        public string UserName { get; set; }

        public DateTime DateEntered { get; set; }

        #endregion
    }

    public class UpdateUserBindingModel
    {
        #region Public Properties

        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 4)]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        public IEnumerable<RoleDetailsViewModel> UserRoles { get; set; }

        #endregion
    }
}