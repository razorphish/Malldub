// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="PaymentMethodModel.cs" company="Maras, co">
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
  /// Class PaymentMethodModel.
  /// </summary>
  public class PaymentMethodModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the credit card.
    /// </summary>
    /// <value>The credit card.</value>
    [JsonProperty("credit_card")]
    public CreditCardModel CreditCard { get; set; }

    [JsonProperty("payment_bank")]
    public PaymentBankModel PaymentBank { get; set; }

    /// <summary>
    /// Gets or sets the preapproval.
    /// </summary>
    /// <value>The preapproval.</value>
    [JsonProperty("preapproval")]
    public PreapprovalModel Preapproval { get; set; }

    /// <summary>
    /// Gets or sets the type.
    /// </summary>
    /// <value>The type.</value>
    [JsonProperty("type")]
    [MaxLength(255)]
    public string Type { get; set; }

    #endregion
  }
}