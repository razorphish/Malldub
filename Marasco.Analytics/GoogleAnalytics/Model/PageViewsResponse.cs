// ***********************************************************************
// Assembly         : Marasco.Analytics
// Author           : Antonio David Marasco
// Created          : 01-31-2015
// Last Modified By : Antonio David Marasco
// Last Modified On : 01-31-2015
// ***********************************************************************
// <copyright file="PageViewsResponse.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Marasco.Analytics.GoogleAnalytics.Model
{
  /// <summary>
  /// Class PageViewResponse.
  /// </summary>
  public class PageViewResponse
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the average time on page.
    /// </summary>
    /// <value>The average time on page.</value>
    public decimal AverageTimeOnPage { get; set; }

    /// <summary>
    /// Gets or sets the entrance rate.
    /// </summary>
    /// <value>The entrance rate.</value>
    public float EntranceRate { get; set; }

    /// <summary>
    /// Gets or sets the entrances.
    /// </summary>
    /// <value>The entrances.</value>
    public int Entrances { get; set; }

    /// <summary>
    /// Gets or sets the exit rate.
    /// </summary>
    /// <value>The exit rate.</value>
    public decimal ExitRate { get; set; }

    /// <summary>
    /// Gets or sets the exits.
    /// </summary>
    /// <value>The exits.</value>
    public int Exits { get; set; }

    /// <summary>
    /// Gets or sets the page path.
    /// </summary>
    /// <value>The page path.</value>
    public string PagePath { get; set; }

    /// <summary>
    /// Gets or sets the page views.
    /// </summary>
    /// <value>The page views.</value>
    public int PageViews { get; set; }

    /// <summary>
    /// Gets or sets the page views per session.
    /// </summary>
    /// <value>The page views per session.</value>
    public float PageViewsPerSession { get; set; }

    /// <summary>
    /// Gets or sets the time on page.
    /// </summary>
    /// <value>The time on page.</value>
    public decimal TimeOnPage { get; set; }

    /// <summary>
    /// Gets or sets the unique page views.
    /// </summary>
    /// <value>The unique page views.</value>
    public int UniquePageViews { get; set; }

    #endregion
  }
}