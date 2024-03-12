// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 02-10-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 02-10-2017
// ***********************************************************************
// <copyright file="CountryOptionsModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// ***********************************************************************
namespace Marasco.WePay.Models
{
    #region Directives

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class CountryOptionsModel.
    /// </summary>
    public class CountryOptionsModel
    {
        #region Public Properties


        /// <summary>
        /// Gets or sets a value indicating whether [debit opt in].
        /// </summary>
        /// <value><c>true</c> if [debit opt in]; otherwise, <c>false</c>.</value>
        [JsonProperty("debit_opt_in")]
        public bool DebitOptIn { get; set; }

        #endregion
    }
}