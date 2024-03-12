// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Configuration.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The configuration.</summary>
// ***********************************************************************

namespace Mandrill
{
  /// <summary>
  /// The configuration.
  /// </summary>
  internal static class Configuration
  {
    #region Static Fields


    /// <summary>
    /// The base secure URL
    /// </summary>
    public static string BaseSecureUrl = "https://mandrillapp.com/api/1.0/";



    /// <summary>
    /// The base URL
    /// </summary>
    public static string BaseUrl = "http://mandrillapp.com/api/1.0/";



    /// <summary>
    /// The date time format string
    /// </summary>
    public static string DateTimeFormatString = "yyyy-MM-dd HH:mm:ss";

    #endregion
  }
}