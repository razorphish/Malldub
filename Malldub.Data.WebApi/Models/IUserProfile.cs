// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : Antonio David Marasco
// Created          : 12-29-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-29-2013
// ***********************************************************************
// <copyright file="IUserProfile.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Models
{
  /// <summary>
  /// Interface IUserProfile
  /// </summary>
  public interface IUserProfile
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets a value indicating whether this instance is default.
    /// </summary>
    /// <value><c>true</c> if this instance is default; otherwise, <c>false</c>.</value>
    bool IsDefault { get; set; }

    #endregion
  }
}