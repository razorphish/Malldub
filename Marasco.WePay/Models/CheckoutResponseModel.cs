// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CheckoutResponseModel.cs" company="Maras, co">
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
    /// Class CheckoutResponseModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
  public class CheckoutResponseModel
  {
    #region Public Properties

      /// <summary>
      /// Gets or sets the account identifier.
      /// </summary>
      /// <value>The account identifier.</value>
      /// <remarks>Fill in the blank</remarks>
    [JsonProperty("account_id")]
    public long AccountId { get; set; }

    /// <summary>
    /// Gets or sets the amount.
    /// </summary>
    /// <value>The amount.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("amount")]
    public decimal Amount { get; set; }


    /// <summary>
    /// Gets or sets the callback URI.
    /// </summary>
    /// <value>The callback URI.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("callback_uri")]
    [MaxLength(2083)]
    public string CallbackUri { get; set; }

    /// <summary>
    /// Gets or sets the chargeback.
    /// </summary>
    /// <value>The chargeback.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("chargeback")]
    public ChargebackResponseModel Chargeback { get; set; }

    /// <summary>
    /// Gets or sets the checkout identifier.
    /// </summary>
    /// <value>The checkout identifier.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("checkout_id")]
    public long CheckoutId { get; set; }

    /// <summary>
    /// Gets or sets the create time.
    /// </summary>
    /// <value>The create time.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("create_time")]
    public long CreateTime { get; set; }

    /// <summary>
    /// Gets or sets the currency.
    /// </summary>
    /// <value>The currency.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("currency")]
    [MaxLength(3)]
    public string Currency { get; set; }


    /// <summary>
    /// Gets or sets the type of the delivery.
    /// </summary>
    /// <value>The type of the delivery.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("delivery_type")]
    [MaxLength(255)]
    public string DeliveryType { get; set; }

    /// <summary>
    /// Gets or sets the email message.
    /// </summary>
    /// <value>The email message.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("email_message")]
    public EmailMessageModel EmailMessage { get; set; }

    /// <summary>
    /// Gets or sets the error.
    /// </summary>
    /// <value>The error.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonIgnore]
    public WePayException Error { get; set; }

    /// <summary>
    /// Gets or sets the fee.
    /// </summary>
    /// <value>The fee.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("fee")]
    public FeeModel Fee { get; set; }

    /// <summary>
    /// Gets or sets the gross.
    /// </summary>
    /// <value>The gross.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("gross")]
    public decimal Gross { get; set; }

    /// <summary>
    /// Gets or sets the hosted checkout.
    /// </summary>
    /// <value>The hosted checkout.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("hosted_checkout")]
    public HostedCheckoutResponseModel HostedCheckout { get; set; }


    /// <summary>
    /// Gets or sets a value indicating whether [in review].
    /// </summary>
    /// <value><c>true</c> if [in review]; otherwise, <c>false</c>.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("in_review")]
    public bool InReview { get; set; }

    /// <summary>
    /// Gets or sets the long description.
    /// </summary>
    /// <value>The long description.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("long_description")]
    [MaxLength(2047)]
    public string LongDescription { get; set; }

    /// <summary>
    /// Gets or sets the long description.
    /// </summary>
    /// <value>The long description.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("npo_information")]
    public NonProfitInformationModel NpoInformation { get; set; }

    /// <summary>
    /// Gets or sets the payer.
    /// </summary>
    /// <value>The payer.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("payer")]
    public PayerResponseModel Payer { get; set; }

    /// <summary>
    /// Gets or sets the payment method.
    /// </summary>
    /// <value>The payment method.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("payment_method")]
    public PaymentMethodModel PaymentMethod { get; set; }

    /// <summary>
    /// Gets or sets the payment error.
    /// </summary>
    /// <value>The payment error.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("payment_error")]
    public PaymentErrorModel PaymentError { get; set; }

    /// <summary>
    /// Gets or sets the reference identifier.
    /// </summary>
    /// <value>The reference identifier.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("reference_id")]
    [MaxLength(255)]
    public string ReferenceId { get; set; }

    /// <summary>
    /// Gets or sets the refund.
    /// </summary>
    /// <value>The refund.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("refund")]
    public RefundResponseModel Refund { get; set; }

    /// <summary>
    /// Gets or sets the short description.
    /// </summary>
    /// <value>The short description.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("short_description")]
    [MaxLength(255)]
    public string ShortDescription { get; set; }

    /// <summary>
    /// Gets or sets the soft descriptor.
    /// </summary>
    /// <value>The soft descriptor.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("soft_descriptor")]
    [MaxLength(255)]
    public string SoftDescriptor { get; set; }

    /// <summary>
    /// Gets or sets the state.
    /// </summary>
    /// <value>The state.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("state")]
    [MaxLength(255)]
    public string State { get; set; }

    /// <summary>
    /// Gets or sets the type.
    /// </summary>
    /// <value>The type.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("type")]
    [MaxLength(255)]
    public string Type { get; set; }

    /// <summary>
    /// Gets or sets the unique identifier.
    /// </summary>
    /// <value>The unique identifier.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("unique_id")]
    [MaxLength(255)]
    public string UniqueId { get; set; }

    #endregion
  }
}