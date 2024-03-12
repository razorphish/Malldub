namespace Malldub.WebApi.Models
{
  #region Directives

  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  using Mandrill;

  #endregion

  public class ShareFundModel
  {
    #region Public Properties

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public string FromEmail { get; set; }

    [Required]
    public string FundDescription { get; set; }

    [Required]
    public string FundDonateUrl { get; set; }

    [Required]
    public int FundId { get; set; }

    [Required]
    public string FundImageUrl { get; set; }

    [Required]
    [MaxLength(50)]
    public string FundTitle { get; set; }

    [Required]
    public string FundUrl { get; set; }

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; }

    [Required]
    public IEnumerable<EmailAddress> ToEmails { get; set; }

    #endregion
  }
}