// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-15-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="PaymentErrorModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay
{
    #region Directives

    using System.ComponentModel.DataAnnotations;

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class PaymentErrorModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class PaymentErrorModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the payment bank errror.
        /// </summary>
        /// <value>The payment bank errror.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("payment_bank")]
        public PaymentBankErrorModel PaymentBankErrror { get; set; }

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>The type.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("type")]
        [MaxLength(255)]
        public string Type { get; set; }

        #endregion
    }
}