// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-15-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="PaymentBankErrorModel.cs" company="Maras, co">
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
    /// Class PaymentBankErrorModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class PaymentBankErrorModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the code.
        /// </summary>
        /// <value>The code.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("code")]
        [MaxLength(255)]
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>The description.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("description")]
        [MaxLength(255)]
        public string Description { get; set; }

        #endregion
    }
}