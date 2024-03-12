namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  public class PostClaimRequest
  {
    #region Public Properties

    [Required]
    public string ClaimType { get; set; }

    [Required]
    public string Val { get; set; }

    #endregion
  }
}