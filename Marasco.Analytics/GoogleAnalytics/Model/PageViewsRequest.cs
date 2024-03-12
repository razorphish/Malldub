// ***********************************************************************
// Assembly         : Marasco.Analytics
// Author           : Antonio David Marasco
// Created          : 01-31-2015
// Last Modified By : Antonio David Marasco
// Last Modified On : 01-31-2015
// ***********************************************************************
// <copyright file="PageViewsRequest.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.Analytics.GoogleAnalytics.Model
{
  #region Directives

  using System;

  #endregion

  public class PageViewsRequest
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the dimensions.
    /// </summary>
    /// <value>ga:pagePath</value>
    public string[] Dimensions { get; set; }

    /// <summary>
    /// Gets or sets the end date.
    /// </summary>
    /// <value>2015-01-31</value>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets the filters.
    /// </summary>
    /// <value>ga:pagePath==/[Permalink]</value>
    public string Filters { get; set; }

    /// <summary>
    /// Gets or sets the ids.
    /// </summary>
    /// <value>default ga:96935910</value>
    public string Ids { get; set; }

    /// <summary>
    /// Gets or sets the maximum results.
    /// </summary>
    /// <value>Default is 50</value>
    public int MaxResults { get; set; }

    /// <summary>
    /// Gets or sets the metrics. The metrics are the query parameters
    /// </summary>
    /// <value>ga:pageviews,ga:uniquePageviews,ga:timeOnPage,ga:avgTimeOnPage,
    /// ga:pageviewsPerSession,ga:entranceRate,ga:entrances,ga:exits,ga:exitRate</value>
    public string[] Metrics { get; set; }

    /// <summary>
    /// Gets or sets the segment.
    /// </summary>
    /// <value></value>
    public string Segment { get; set; }

    /// <summary>
    /// Gets or sets the sort.
    /// </summary>
    /// <value></value>
    public string Sort { get; set; }

    /// <summary>
    /// Gets or sets the start date.
    /// </summary>
    /// <value>2015-01-17</value>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the start index.
    /// </summary>
    /// <value></value>
    public int StartIndex { get; set; }

    #endregion
  }
}