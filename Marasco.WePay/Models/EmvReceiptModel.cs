// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 02-06-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="EmvReceiptModel.cs" company="Maras, co">
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
    /// Class EmvReceiptModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
  public class EmvReceiptModel
  {
    #region Public Properties

      /// <summary>
      /// Gets or sets the application identifier.
      /// </summary>
      /// <value>The application identifier.</value>
      /// <remarks>Fill in the blank</remarks>
    [JsonProperty("application_identifier")]
    [MaxLength(64)]
    public string ApplicationIdentifier { get; set; }

    /// <summary>
    /// Gets or sets the application label.
    /// </summary>
    /// <value>The application label.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("application_label")]
    [MaxLength(64)]
    public string ApplicationLabel { get; set; }

    /// <summary>
    /// Gets or sets the authorization code.
    /// </summary>
    /// <value>The authorization code.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("authorization_code")]
    [MaxLength(6)]
    public string AuthorizationCode { get; set; }

    /// <summary>
    /// Gets or sets the merchant identifier.
    /// </summary>
    /// <value>The merchant identifier.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("merchant_id")]
    [MaxLength(64)]
    public string MerchantId { get; set; }

    /// <summary>
    /// Gets or sets the merchant namd.
    /// </summary>
    /// <value>The merchant namd.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("merchant_name")]
    [MaxLength(256)]
    public string MerchantName { get; set; }

    /// <summary>
    /// Gets or sets the terminal identification.
    /// </summary>
    /// <value>The terminal identification.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("terminal_identification")]
    [MaxLength(64)]
    public string TerminalIdentification { get; set; }

    /// <summary>
    /// Gets or sets the transaction certificate.
    /// </summary>
    /// <value>The transaction certificate.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("transaction_certificate")]
    [MaxLength(16)]
    public string TransactionCertificate { get; set; }

    /// <summary>
    /// Gets or sets the type of the transaction.
    /// </summary>
    /// <value>The type of the transaction.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("transaction_type")]
    [MaxLength(2)]
    public string TransactionType { get; set; }

    #endregion
  }
}