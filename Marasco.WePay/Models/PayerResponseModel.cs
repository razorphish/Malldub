// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="PayerResponseModel.cs" company="Maras, co">
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
  /// Class PayerResponseModel.
  /// </summary>
  public class PayerResponseModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    /// <value>The email.</value>
    [JsonProperty("email")]
    [MaxLength(255)]
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the home address.
    /// </summary>
    /// <value>The home address.</value>
    [JsonProperty("home_address")]
    [MaxLength(255)]
    public string HomeAddress { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty("name")]
    [MaxLength(255)]
    public string Name { get; set; }

    #endregion
  }
}