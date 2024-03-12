// ***********************************************************************
// Assembly         : Malldub.Data
// Author           : Antonio David Marasco
// Created          : 09-11-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-11-2014
// ***********************************************************************
// <copyright file="Team.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.Data
{
  #region Directives

  using System;

  #endregion

  /// <summary>
  /// Class Team.
  /// </summary>
  /// <remarks>Team Entity</remarks>
  partial class Team
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="Team"/> class.
    /// </summary>
    /// <remarks>Default Consturctor</remarks>
    public Team()
    {
      DateEntered = DateTime.UtcNow;
    }

    #endregion
  }
}