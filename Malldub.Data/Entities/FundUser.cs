// ***********************************************************************
// Assembly         : Malldub.Data
// Author           : Antonio David Marasco
// Created          : 08-30-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 08-19-2014
// ***********************************************************************
// <copyright file="FundUser.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.Data
{
  #region Directives

  using System;
  using System.Runtime.Serialization;

  using Malldub.Data.Models;

  #endregion

  /// <summary>
  /// Class FundUser.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  partial class FundUser
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="FundUser"/> class.
    /// </summary>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public FundUser()
    {
      DateEntered = DateTime.UtcNow;
    }

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the geo.
    /// </summary>
    /// <value>The geo.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [DataMember]
    public GeoCode Geo { get; set; }

    [DataMember]
    public AspNetUser User { get; set; }

    #endregion
  }
}