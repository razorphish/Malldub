// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-15-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="PaymentBankModel.cs" company="Maras, co">
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
    /// Class PaymentBankModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class PaymentBankModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("id")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

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