// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : David Antonio Marasco
// Created          : 12-15-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="NonProfitInformationModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay
{
    #region Directives

    using Newtonsoft.Json;

    #endregion

    /// <summary>
    /// Class NonProfitInformationModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class NonProfitInformationModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the ein.
        /// </summary>
        /// <value>The ein.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("ein")]
        public string Ein { get; set; }

        /// <summary>
        /// Gets or sets the name of the legal.
        /// </summary>
        /// <value>The name of the legal.</value>
        /// <remarks>Fill in the blank</remarks>
        [JsonProperty("legal_name")]
        public string LegalName { get; set; }

        #endregion
    }
}