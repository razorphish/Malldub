// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="ShippingAddressModel.cs" company="Maras, co">
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
  /// Class ShippingAddressModel.
  /// </summary>
  public class ShippingAddressModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the address1.
    /// </summary>
    /// <value>The address1.</value>
    [JsonProperty("address1")]
    [MaxLength(60)]
    public string Address1 { get; set; }

    /// <summary>
    /// Gets or sets the address2.
    /// </summary>
    /// <value>The address2.</value>
    [JsonProperty("address2")]
    [MaxLength(60)]
    public string Address2 { get; set; }

    /// <summary>
    /// Gets or sets the city.
    /// </summary>
    /// <value>The city.</value>
    [JsonProperty("city")]
    [MaxLength(30)]
    public string City { get; set; }

    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    /// <value>The country.</value>
    [JsonProperty("country")]
    [MaxLength(2)]
    public string Country { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty("name")]
    [MaxLength(255)]
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets the postcode.
    /// </summary>
    /// <value>The postcode.</value>
    [JsonProperty("postcode")]
    [MaxLength(14)]
    public string Postcode { get; set; }

    /// <summary>
    /// Gets or sets the region.
    /// </summary>
    /// <value>The region.</value>
    [JsonProperty("region")]
    [MaxLength(30)]
    public string Region { get; set; }

    #endregion
  }
}