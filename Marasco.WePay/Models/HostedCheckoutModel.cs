// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="HostedCheckoutModel.cs" company="Maras, co">
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
  /// Class HostedCheckoutModel.
  /// </summary>
  public class HostedCheckoutModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the fallback URI.
    /// </summary>
    /// <value>The fallback URI.</value>
    [JsonProperty("fallback_uri")]
    [MaxLength(255)]
    public string FallbackUri { get; set; }

    /// <summary>
    /// Gets or sets the funding sources.
    /// </summary>
    /// <value>The funding sources.</value>
    [JsonProperty("funding_sources")]
    public string[] FundingSources { get; set; }

    /// <summary>
    /// Gets or sets the mode.
    /// </summary>
    /// <value>The mode.</value>
    [JsonProperty("mode")]
    [MaxLength(255)]
    public string Mode { get; set; }

    /// <summary>
    /// Gets or sets the prefill information model.
    /// </summary>
    /// <value>The prefill information model.</value>
    [JsonProperty("prefill_info")]
    public PrefillInfoModel PrefillInfoModel { get; set; }

    /// <summary>
    /// Gets or sets the redirect URI.
    /// </summary>
    /// <value>The redirect URI.</value>
    [JsonProperty("redirect_uri")]
    [MaxLength(2083)]
    public string RedirectUri { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether [require shipping].
    /// </summary>
    /// <value><c>true</c> if [require shipping]; otherwise, <c>false</c>.</value>
    [JsonProperty("require_shipping")]
    public bool RequireShipping { get; set; }

    /// <summary>
    /// Gets or sets the shipping fee.
    /// </summary>
    /// <value>The shipping fee.</value>
    [JsonProperty("shipping_fee")]
    public decimal ShippingFee { get; set; }

    /// <summary>
    /// Gets or sets the theme object.
    /// </summary>
    /// <value>The theme object.</value>
    [JsonProperty("theme_object")]
    public ThemeObjectModel ThemeObject { get; set; }

    #endregion
  }
}