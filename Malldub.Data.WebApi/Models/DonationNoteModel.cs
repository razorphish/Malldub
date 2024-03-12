// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 04-25-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 04-25-2014
// ***********************************************************************
// <copyright file="DonationNoteModel.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  /// <summary>
  /// Class DonationNoteModel.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class DonationNoteModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the donation identifier.
    /// </summary>
    /// <value>The donation identifier.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    public int DonationId { get; set; }

    /// <summary>
    /// Gets or sets the name of the donor.
    /// </summary>
    /// <value>The name of the donor.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    [MaxLength(100)]
    public string DonorName { get; set; }

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    /// <value>The email.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    [MaxLength(100)]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the fund title.
    /// </summary>
    /// <value>The fund title.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [MaxLength(50)]
    public string FundTitle { get; set; }

    /// <summary>
    /// Gets or sets the message.
    /// </summary>
    /// <value>The message.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    [MaxLength(300)]
    public string Message { get; set; }

    /// <summary>
    /// Gets or sets the permalink.
    /// </summary>
    /// <value>The permalink.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [MaxLength(100)]
    public string Permalink { get; set; }

    /// <summary>
    /// Gets or sets the type identifier.
    /// </summary>
    /// <value>The type identifier.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    [MaxLength(20)]
    public string TypeId { get; set; }

    #endregion
  }
}