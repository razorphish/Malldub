// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-21-2016
// ***********************************************************************
// <copyright file="FeeResponseModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Marasco.WePay.Models
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Newtonsoft.Json;

  #endregion

    /// <summary>
    /// Class FeeResponseModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
  public class FeeModel
  {
    #region Public Properties

      /// <summary>
      /// Gets or sets the application fee.
      /// </summary>
      /// <value>The application fee.</value>
      /// <remarks>Fill in the blank</remarks>
    [JsonProperty("app_fee")]
    public decimal AppFee { get; set; }

    /// <summary>
    /// Gets or sets the fee payer.
    /// </summary>
    /// <value>The fee payer.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("fee_payer")]
    [MaxLength(255)]
    public string FeePayer { get; set; }

    #endregion
  }
}