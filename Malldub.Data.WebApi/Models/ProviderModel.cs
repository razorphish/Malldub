// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 04-23-2014
// Last Modified By : Antonio David Marasco
// Last Modified On : 04-23-2014
// ***********************************************************************
// <copyright file="ProviderModel.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Malldub.WebApi.Models
{
  /// <summary>
  /// Class ProviderModel.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class ProviderModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets a value indicating whether this <see cref="ProviderModel"/> is found.
    /// </summary>
    /// <value><c>true</c> if found; otherwise, <c>false</c>.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public bool Found { get; set; }

    /// <summary>
    /// Gets or sets the provider.
    /// </summary>
    /// <value>The provider.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public string Provider { get; set; }

    public string ProviderKey { get; set; }

    #endregion
  }
}