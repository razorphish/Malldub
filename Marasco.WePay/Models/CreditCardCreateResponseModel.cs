// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-30-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CreditCardCreateResponseModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay.Models
{
    #region Directives

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class CreditCardCreateResponseModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CreditCardCreateResponseModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the credit card identifier.
        /// </summary>
        /// <value>The credit card identifier.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("credit_card_id")]
        public long CreditCardId { get; set; }

        /// <summary>
        /// Gets or sets the error.
        /// </summary>
        /// <value>The error.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonIgnore]
        public WePayException Error { get; set; }

        /// <summary>
        /// Gets or sets the state.
        /// </summary>
        /// <value>The state.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("state")]
        public string State { get; set; }

        #endregion
    }
}