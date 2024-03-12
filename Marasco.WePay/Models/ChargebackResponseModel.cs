// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-21-2016
// ***********************************************************************
// <copyright file="ChargebackResponseModel.cs" company="Maras, co">
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
    /// Class ChargebackResponseModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class ChargebackResponseModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the amount charged back.
        /// </summary>
        /// <value>The amount charged back.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("amount_charged_back")]
        public decimal AmountChargedBack { get; set; }

        /// <summary>
        /// Gets or sets the dispute URI.
        /// </summary>
        /// <value>The dispute URI.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("dispute_uri")]
        public string DisputeUri { get; set; }

        #endregion
    }
}