// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-30-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-30-2016
// ***********************************************************************
// <copyright file="CreditCardResponseModel.cs" company="Maras, co">
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
    /// Class CreditCardResponseModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CreditCardResponseModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the error.
        /// </summary>
        /// <value>The error.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonIgnore]
        public WePayException Error { get; set; }

        #endregion
    }
}