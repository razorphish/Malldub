// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="HostedCheckoutResponseModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// ***********************************************************************
namespace Marasco.WePay
{
    #region Directives

    using System.ComponentModel.DataAnnotations;

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class HostedCheckoutResponseModel.
    /// </summary>
    public class HostedCheckoutResponseModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the checkout URL.
        /// </summary>
        /// <value>The checkout URL.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("checkout_uri")]
        [MaxLength(2083)]
        public string CheckoutUrl { get; set; }

        /// <summary>
        /// Gets or sets the mode.
        /// </summary>
        /// <value>The mode.</value>
        [JsonProperty("mode")]
        [MaxLength(255)]
        public string Mode { get; set; }

        /// <summary>
        /// Gets or sets the redirect URI.
        /// </summary>
        /// <value>The redirect URI.</value>
        [JsonProperty("redirect_uri")]
        [MaxLength(2083)]
        public string RedirectUri { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [require shipping].
        /// </summary>
        /// <value><c>true</c> if [require shipping]; otherwise, <c>false</c>.</value>
        [JsonProperty("require_shipping")]
        public bool RequireShipping { get; set; }

        /// <summary>
        /// Gets or sets the shipping address.
        /// </summary>
        /// <value>The shipping address.</value>
        [JsonProperty("shipping_address")]
        public ShippingAddressModel ShippingAddress { get; set; }

        /// <summary>
        /// Gets or sets the shipping fee.
        /// </summary>
        /// <value>The shipping fee.</value>
        [JsonProperty("shipping_fee")]
        public decimal ShippingFee { get; set; }

        /// <summary>
        /// Gets or sets the theme object.
        /// </summary>
        /// <value>The theme object.</value>
        [JsonProperty("theme_object")]
        public ThemeObjectModel ThemeObject { get; set; }

        #endregion
    }
}