namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Data;

  #endregion

  public class SupportFundModel
  {
    #region Constructors and Destructors

    public SupportFundModel()
    {
      UserTypeId = "Supporter";
    }

    #endregion

    #region Public Properties

    [Required]
    public bool AllowEmail { get; set; }

    [Required]
    public int FundId { get; set; }

    [Required]
    public bool PostToFacebook { get; set; }

    [MaxLength(128)]
    public string UserId { get; set; }

    [Required]
    public string UserTypeId { get; set; }

    [MaxLength(180)]
    public string Message { get; set; }

    #endregion
  }
}