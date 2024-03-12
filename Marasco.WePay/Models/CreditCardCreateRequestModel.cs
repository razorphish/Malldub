// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-30-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CreditCardCreateRequestModel.cs" company="Maras, co">
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
    /// Class CreditCardCreateRequestModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CreditCardCreateRequestModel
    {
        #region Fields

        /// <summary>
        /// The action URL
        /// </summary>
        [JsonIgnore]
        public readonly string ActionUrl = @"credit_card/create";

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the access token.
        /// </summary>
        /// <value>The access token.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonIgnore]
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        /// <summary>
        /// Gets or sets the address.
        /// </summary>
        /// <value>The address.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("address")]
        [Required]
        public AddressModel Address { get; set; }

        /// <summary>
        /// Gets or sets the callback URI.
        /// </summary>
        /// <value>The callback URI.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("callback_uri")]
        [MaxLength(2083)]
        public string CallbackUri { get; set; }

        /// <summary>
        /// Gets or sets the client identifier.
        /// </summary>
        /// <value>The client identifier.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("client_id")]
        [Required]
        public long ClientId { get; set; }

        /// <summary>
        /// Gets or sets the credit card number.
        /// </summary>
        /// <value>The credit card number.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("cc_number")]
        [MaxLength(255)]
        [Required]
        public string CreditCardNumber { get; set; }

        /// <summary>
        /// Gets or sets the CVV.
        /// </summary>
        /// <value>The CVV.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("cvv")]
        public string Cvv { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>The email.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("email")]
        [MaxLength(255)]
        [Required]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the expiration month.
        /// </summary>
        /// <value>The expiration month.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("expiration_month")]
        [Required]
        public int ExpirationMonth { get; set; }

        /// <summary>
        /// Gets or sets the expiration year.
        /// </summary>
        /// <value>The expiration year.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("expiration_year")]
        [Required]
        public int ExpirationYear { get; set; }

        /// <summary>
        /// Gets or sets the original device.
        /// </summary>
        /// <value>The original device.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("original_device")]
        public string OriginalDevice { get; set; }

        /// <summary>
        /// Gets or sets the original ip.
        /// </summary>
        /// <value>The original ip.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("original_ip")]
        [MaxLength(16)]
        public string OriginalIp { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [payment request flag].
        /// </summary>
        /// <value><c>true</c> if [payment request flag]; otherwise, <c>false</c>.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("payment_request_flag")]
        public bool PaymentRequestFlag { get; set; }

        /// <summary>
        /// Gets or sets the reference identifier.
        /// </summary>
        /// <value>The reference identifier.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("reference_id")]
        [MaxLength(255)]
        public string ReferenceId { get; set; }

        /// <summary>
        /// Gets or sets the name of the user.
        /// </summary>
        /// <value>The name of the user.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("user_name")]
        [MaxLength(255)]
        [Required]
        public string UserName { get; set; }

        #endregion
    }
}