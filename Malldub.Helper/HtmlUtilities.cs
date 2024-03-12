// ***********************************************************************
// Assembly         : Malldub.Helper
// Author           : David Antonio Marasco
// Created          : 01-29-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 01-29-2017
// ***********************************************************************
// <copyright file="HtmlUtilities.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.Helper
{
    #region Directives

    using System.Diagnostics.CodeAnalysis;
    using System.Text.RegularExpressions;

    #endregion

    /// <summary>
    /// Class HtmlUtilities.
    /// </summary>
    public static class HtmlUtilities
    {
        #region Public Methods and Operators

        /// <summary>
        /// Uns the HTML.
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns>System.String.</returns>
        [SuppressMessage("StyleCop.CSharp.ReadabilityRules", "SA1122:UseStringEmptyForEmptyStrings", 
            Justification = "Reviewed. Suppression is OK here.")]
        public static string UnHtml(string input)
        {
            var noHtml = Regex.Replace(input, @"<[^>]+>|&nbsp;", string.Empty).Trim();
            var noHtmlNormalised = Regex.Replace(noHtml, @"\s{2,}", " ");

            return noHtmlNormalised;
        }

        #endregion
    }
}