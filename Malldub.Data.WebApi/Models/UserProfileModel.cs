namespace Malldub.WebApi.Models
{
  public class UserProfileModel
  {
    #region Public Properties

    public UserProfileAddress Address { get; set; }

    public UserProfileEmail Email { get; set; }

    public UserProfilePhone Phone { get; set; }

    #endregion

    public UserProfileModel()
    {
      Address = new UserProfileAddress();
      Email = new UserProfileEmail();
      Phone = new UserProfilePhone();
    }

    //[MaxLength(255)]
    //[DataType(DataType.ImageUrl)]
    //[Required]
    //public string AvatarImageUrl { get; set; }
  }
}