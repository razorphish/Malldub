// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-30-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CreditCardRequestModel.cs" company="Maras, co">
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
    /// Class CreditCardRequestModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CreditCardRequestModel
    {
        #region Fields

        /// <summary>
        /// The action URL
        /// </summary>
        [JsonIgnore]
        public readonly string ActionUrl = @"creditCard";

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the credit card identifier.
        /// </summary>
        /// <value>The credit card identifier.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("creditCard_id")]
        public long CreditCardId { get; set; }

        #endregion
    }
}