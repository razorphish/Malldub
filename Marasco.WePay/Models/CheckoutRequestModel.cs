// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-30-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CheckoutRequestModel.cs" company="Maras, co">
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
    /// Class CheckoutRequestModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CheckoutRequestModel
    {
        #region Fields

        /// <summary>
        /// The action URL
        /// </summary>
        [JsonIgnore]
        public readonly string ActionUrl = @"checkout";

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the checkout identifier.
        /// </summary>
        /// <value>The checkout identifier.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("checkout_id")]
        public long CheckoutId { get; set; }

        #endregion
    }
}