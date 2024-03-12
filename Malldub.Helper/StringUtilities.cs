// ***********************************************************************
// Assembly         : Malldub.Helper
// Author           : Antonio David Marasco
// Created          : 09-16-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-16-2014
// ***********************************************************************
// <copyright file="StringUtilities.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>String methods and utilities</summary>
// ***********************************************************************

namespace Malldub.Helper
{
  #region Directives

  using System.Net;
  using System.Text.RegularExpressions;

  #endregion

  /// <summary>
  /// Class StringUtilities.
  /// </summary>
  public static class StringUtilities
  {
    #region Public Methods and Operators

    /// <summary>
    /// Takes a string and converts it into a url slug (I am Happy to i-am-happy)
    /// </summary>
    /// <param name="name">The name.</param>
    /// <returns>System.String.</returns>
    public static string Slug(string name)
    {
      var rgx = new Regex("[^a-zA-Z0-9 -]");
      var permalinkName = name.ToLower().Replace(" ", "-");
      return rgx.Replace(permalinkName, string.Empty);
    }

    public static string StripHtml(string content)
    {
      var decoded    = Regex.Replace(content, "<[^>]*(>|$)", string.Empty).Trim();
      var normalized = Regex.Replace(decoded, @"[\s\r\n]+", string.Empty);
      var spacized   = Regex.Replace(normalized, @"\s{2,}", " ");

      return WebUtility.HtmlDecode(spacized);
    }
    #endregion
  }
}