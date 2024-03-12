namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  public class FundStatusModel
  {
    #region Public Properties

    [Required]
    public int FundId { get; set; }

    [Required]
    public string StatusId { get; set; }

    #endregion
  }
}