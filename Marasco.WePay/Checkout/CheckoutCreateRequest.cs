// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
//
// Last Modified By : amarasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="Checkout.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Marasco.WePay.Models
{
    #region Directives

    using System.ComponentModel.DataAnnotations;

    using Newtonsoft.Json;

    #endregion

    public class CheckoutCreateRequest
    {
        #region Constants and Fields

        [JsonIgnore]
        public readonly string ActionUrl = @"checkout/create";

        #endregion

        #region Public Properties

        [JsonIgnore]
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("account_id")]
        [Required]
        public long AccountId { get; set; }

        [JsonProperty("amount")]
        [Required]
        public decimal Amount { get; set; }

        [JsonProperty("auto_release")]
        public bool AutoRelease { get; set; }

        [JsonProperty("callback_uri")]
        [MaxLength(2083)]
        public string CallBackUri { get; set; }

        [JsonProperty("currency")]
        [Required]
        [MaxLength(3)]
        public string Currency { get; set; }

        [JsonProperty("delivery_type")]
        [MaxLength(255)]
        public string DeliveryType { get; set; }

        [JsonProperty("email_message")]
        public EmailMessageModel EmailMessage { get; set; }

        [JsonProperty("fee")]
        public FeeModel Fee { get; set; }

        [JsonProperty("hosted_checkout")]
        public HostedCheckoutModel HostedCheckout { get; set; }

        [JsonProperty("long_description")]
        [MaxLength(2047)]
        public string LongDescription { get; set; }

        [JsonProperty("payment_method")]
        public PaymentMethodModel PaymentMethod { get; set; }

        [JsonProperty("reference_id")]
        [MaxLength(255)]
        public string ReferenceId { get; set; }


        [JsonProperty("short_description")]
        [Required]
        [MaxLength(255)]
        public string ShortDescription { get; set; }

        [JsonProperty("type")]
        [Required]
        [MaxLength(255)]
        public string Type { get; set; }

        [JsonProperty("unique_id")]
        [MaxLength(255)]
        public string UniqueId { get; set; }

        #endregion
    }
}