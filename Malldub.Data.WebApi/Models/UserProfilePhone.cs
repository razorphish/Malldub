// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : Antonio David Marasco
// Created          : 12-29-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-29-2013
// ***********************************************************************
// <copyright file="UserProfilePhone.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  /// <summary>
  /// Class UserProfilePhone.
  /// </summary>
  public class UserProfilePhone : IUserProfile
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets a value indicating whether this instance is default.
    /// </summary>
    /// <value><c>true</c> if this instance is default; otherwise, <c>false</c>.</value>
    public bool IsDefault { get; set; }

    /// <summary>
    /// Gets or sets the number.
    /// </summary>
    /// <value>The number.</value>
    [MaxLength(20)]
    [DataType(DataType.PhoneNumber)]
    [Required]
    public string Number { get; set; }

    #endregion
  }
}