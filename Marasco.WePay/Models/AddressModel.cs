// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-27-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="AddressModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay.Models
{
    #region Directives

    using System.ComponentModel.DataAnnotations;

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class AddressModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class AddressModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the address1.
        /// </summary>
        /// <value>The address1.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("address1")]
        [MaxLength(60)]
        public string Address1 { get; set; }

        /// <summary>
        /// Gets or sets the address2.
        /// </summary>
        /// <value>The address2.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("address2")]
        [MaxLength(60)]
        public string Address2 { get; set; }

        /// <summary>
        /// Gets or sets the city.
        /// </summary>
        /// <value>The city.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("city")]
        [MaxLength(30)]
        public string City { get; set; }

        /// <summary>
        /// Gets or sets the country.
        /// </summary>
        /// <value>The country.</value>
        /// <remarks>Fill in the blank</remarks>
        [MaxLength(2)]
        [JsonProperty("country")]
        public string Country { get; set; }

        /// <summary>
        /// Gets or sets the postal code.
        /// </summary>
        /// <value>The postal code.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("postal_code")]
        [MaxLength(14)]
        [Required]
        public string PostalCode { get; set; }

        /// <summary>
        /// Gets or sets the region.
        /// </summary>
        /// <value>The region.</value>
        /// <remarks>Fill in the blank</remarks>
        [MaxLength(30)]
        [JsonProperty("region")]
        public string Region { get; set; }

        #endregion
    }
}