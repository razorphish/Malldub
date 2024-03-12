namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Newtonsoft.Json;

  #endregion

  public class FundContactRequestModel
  {
    #region Public Properties

    [Required]
    [MaxLength(100)]
    public string Email { get; set; }

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [JsonIgnore]
    public string FullName
    {
      get
      {
        return string.Format("{0} {1}", FirstName, LastName);
      }
    }

    [Required]
    public string FundTitle { get; set; }

    public string FunderFirstName { get; set; }

    [Required]
    [MaxLength]
    public string LastName { get; set; }

    [Required]
    public string Message { get; set; }

    [Required]
    public string Permalink { get; set; }

    [Required]
    [MaxLength(100)]
    [JsonIgnore]
    public string ToEmail { get; set; }

    [JsonIgnore]
    public string ToFullName { get; set; }

    #endregion
  }
}