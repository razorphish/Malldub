namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Newtonsoft.Json.Linq;

  #endregion

  public class QuestionModel
  {
    #region Public Properties

    [MaxLength(120)]
    [Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [MaxLength(120)]
    [Required]
    public string Name { get; set; }

    [MaxLength(256)]
    [Required]
    public string Message { get; set; }

    [MaxLength(20)]
    [Required]
    public string ApplicationId { get; set; }

    [MaxLength(20)]
    [Required]
    public string NoteTypeId { get; set; }

    [MaxLength(50)]
    [Required]
    public string Title { get; set; }

    #endregion
  }
}