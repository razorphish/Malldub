// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 12-27-2016
// ***********************************************************************
// <copyright file="CreditCardModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay.Models
{
  #region Directives

    using System.ComponentModel.DataAnnotations;
    using System.Runtime.CompilerServices;
    using System.Security.Permissions;

  using Newtonsoft.Json;

  #endregion

    /// <summary>
    /// Class CreditCardModel.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
  public class CreditCardModel
  {
    #region Public Properties

      /// <summary>
      /// Gets or sets the identifier.
      /// </summary>
      /// <value>The identifier.</value>
      /// <remarks>Fill in the blank</remarks>
    [JsonProperty("id")]
    [Required]
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the data.
    /// </summary>
    /// <value>The data.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("data")]
    public CreditCardAdditionalDataModel Data { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether [automatic capture].
    /// </summary>
    /// <value><c>true</c> if [automatic capture]; otherwise, <c>false</c>.</value>
    /// <remarks>Fill in the blank</remarks>
    [JsonProperty("auto_capture")]
    public bool AutoCapture { get; set; }

    #endregion
  }
}