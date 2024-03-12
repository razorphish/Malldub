// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 09-15-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 09-15-2015
// ***********************************************************************
// <copyright file="ThemeObjectModel.cs" company="Maras, co">
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
  /// Class ThemeObjectModel.
  /// </summary>
  public class ThemeObjectModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the color of the background.
    /// </summary>
    /// <value>The color of the background.</value>
    [JsonProperty("background_color")]
    [MaxLength(6)]
    public string BackgroundColor { get; set; }

    /// <summary>
    /// Gets or sets the color of the button.
    /// </summary>
    /// <value>The color of the button.</value>
    [JsonProperty("button_color")]
    [MaxLength(6)]
    public string ButtonColor { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty("name")]
    [MaxLength(64)]
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets the color of the primary.
    /// </summary>
    /// <value>The color of the primary.</value>
    [JsonProperty("primary_color")]
    [MaxLength(6)]
    public string PrimaryColor { get; set; }

    /// <summary>
    /// Gets or sets the color of the secondary.
    /// </summary>
    /// <value>The color of the secondary.</value>
    [JsonProperty("secondary_color")]
    [MaxLength(6)]
    public string SecondaryColor { get; set; }

    /// <summary>
    /// Gets or sets the theme identifier.
    /// </summary>
    /// <value>The theme identifier.</value>
    [JsonProperty("theme_id")]
    public long ThemeId { get; set; }

    #endregion
  }
}