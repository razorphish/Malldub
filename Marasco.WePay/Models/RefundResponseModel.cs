// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="RefundResponseModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// ***********************************************************************
namespace Marasco.WePay
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Newtonsoft.Json;

  #endregion

  /// <summary>
  /// Class RefundResponseModel.
  /// </summary>
  public class RefundResponseModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the amount refunded.
    /// </summary>
    /// <value>The amount refunded.</value>
    [JsonProperty("amount_refunded")]
    public decimal AmountRefunded { get; set; }

    /// <summary>
    /// Gets or sets the refund reason.
    /// </summary>
    /// <value>The refund reason.</value>
    [JsonProperty("refund_reason")]
    [MaxLength(255)]
    public string RefundReason { get; set; }

    #endregion
  }
}