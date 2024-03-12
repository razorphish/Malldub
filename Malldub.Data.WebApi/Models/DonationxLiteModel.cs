// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DonationxLiteModel.cs" company="Maras, co">
//   Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>
//   
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  /// <summary>
  /// Class DonationxLiteModel.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class DonationxLiteModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the identifier.
    /// </summary>
    /// <value>The identifier.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    public int Identification { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this instance is private amount.
    /// </summary>
    /// <value><c>true</c> if this instance is private amount; otherwise, <c>false</c>.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    public bool IsPrivateAmount { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether [thank you note sent].
    /// </summary>
    /// <value><c>true</c> if [thank you note sent]; otherwise, <c>false</c>.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [MaxLength(500)]
    public string Message { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this instance is private donor name.
    /// </summary>
    /// <value><c>true</c> if this instance is private donor name; otherwise, <c>false</c>.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Required]
    public bool IsPrivateDonorName { get; set; }

    #endregion
  }
}