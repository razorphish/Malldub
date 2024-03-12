// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-21-2016
// ***********************************************************************
// <copyright file="EmailMessageModel.cs" company="Maras, co">
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
    /// Class EmailMessageModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
  public class EmailMessageModel
  {
    #region Public Properties

      /// <summary>
      /// Gets or sets to payee.
      /// </summary>
      /// <value>To payee.</value>
      /// <remarks>Fill in the blank</remarks>
    [JsonProperty("to_payee")]
    public string ToPayee { get; set; }

    /// <summary>
    /// Gets or sets to payer.
    /// </summary>
    /// <value>To payer.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("to_payer")]
    public string ToPayer { get; set; }

    #endregion
  }
}