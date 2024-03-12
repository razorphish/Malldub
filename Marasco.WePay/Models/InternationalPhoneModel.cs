// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 02-10-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 02-10-2017
// ***********************************************************************
// <copyright file="InternationalPhoneModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// ***********************************************************************
namespace Marasco.WePay.Models
{
    #region Directives

    using System.ComponentModel.DataAnnotations;

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class InternationalPhoneModel.
    /// </summary>
    public class InternationalPhoneModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the country code.
        /// </summary>
        /// <value>The country code.</value>
        [JsonProperty("country_code")]
        [MaxLength(255)]
        public string CountryCode { get; set; }

        /// <summary>
        /// Gets or sets the support contact number.
        /// </summary>
        /// <value>The support contact number.</value>
        [JsonProperty("phone_number")]
        [MaxLength(255)]
        public string SupportContactNumber { get; set; }

        #endregion
    }
}