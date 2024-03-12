// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : Antonio David Marasco
// Created          : 12-29-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-29-2013
// ***********************************************************************
// <copyright file="UserProfileAddress.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************

namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  /// <summary>
  /// Class UserProfileAddress.
  /// </summary>
  public class UserProfileAddress : IUserProfile
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the address1.
    /// </summary>
    /// <value>The address1.</value>
    [MaxLength(50)]
    [Required]
    public string Address1 { get; set; }

    /// <summary>
    /// Gets or sets the address2.
    /// </summary>
    /// <value>The address2.</value>
    [MaxLength(50)]
    public string Address2 { get; set; }

    /// <summary>
    /// Gets or sets the city.
    /// </summary>
    /// <value>The city.</value>
    [MaxLength(50)]
    [Required]
    public string City { get; set; }

    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    /// <value>The country.</value>
    [MaxLength(50)]
    public string Country { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this instance is default.
    /// </summary>
    /// <value><c>true</c> if this instance is default; otherwise, <c>false</c>.</value>
    public bool IsDefault { get; set; }

    /// <summary>
    /// Gets or sets the state.
    /// </summary>
    /// <value>The state.</value>
    [MaxLength(2)]
    [MinLength(2)]
    [Required]
    public string State { get; set; }

    /// <summary>
    /// Gets or sets the zip code.
    /// </summary>
    /// <value>The zip code.</value>
    [MaxLength(12)]
    [Required]
    public string ZipCode { get; set; }

    #endregion
  }
}