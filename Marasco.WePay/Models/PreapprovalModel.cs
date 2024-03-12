// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="PreapprovalModel.cs" company="Maras, co">
//     Copyright © Maras, co 2013
// </copyright>
// ***********************************************************************
namespace Marasco.WePay
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  /// <summary>
  /// Class PreapprovalModel.
  /// </summary>
  public class PreapprovalModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the identifier.
    /// </summary>
    /// <value>The identifier.</value>
    [JsonProperty("id")]
    public long Id { get; set; }

    #endregion
  }
}