// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : Antonio David Marasco
// Created          : 12-29-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-29-2013
// ***********************************************************************
// <copyright file="UserProfileEmail.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  #endregion

  /// <summary>
  /// Class UserProfileEmail.
  /// </summary>
  public class UserProfileEmail : IUserProfile
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the email address.
    /// </summary>
    /// <value>The email address.</value>
    [MaxLength(100)]
    [DataType(DataType.EmailAddress)]
    [Required]
    public string EmailAddress { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this instance is default.
    /// </summary>
    /// <value><c>true</c> if this instance is default; otherwise, <c>false</c>.</value>
    public bool IsDefault { get; set; }

    #endregion
  }
}