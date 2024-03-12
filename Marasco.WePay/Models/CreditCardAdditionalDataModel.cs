// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-30-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CreditCardAdditionalDataModel.cs" company="Maras, co">
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
    /// Class CreditCardAdditionalDataModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CreditCardAdditionalDataModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the emv receipt.
        /// </summary>
        /// <value>The emv receipt.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("emv_receipt")]
        public EmvReceiptModel EmvReceipt { get; set; }

        /// <summary>
        /// Gets or sets the signature URL.
        /// </summary>
        /// <value>The signature URL.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("signature_url")]
        [MaxLength(255)]
        public string SignatureUrl { get; set; }

        /// <summary>
        /// Gets or sets the transaction token.
        /// </summary>
        /// <value>The transaction token.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("transaction_token")]
        [MaxLength(255)]
        public string TransactionToken { get; set; }

        #endregion
    }
}