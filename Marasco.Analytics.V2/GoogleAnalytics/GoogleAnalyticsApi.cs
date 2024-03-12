// ***********************************************************************
// Assembly         : Marasco.Analytics
// Author           : Antonio David Marasco
// Created          : 01-31-2015
// Last Modified By : Antonio David Marasco
// Last Modified On : 01-31-2015
// ***********************************************************************
// <copyright file="GoogleAnalyticsAPI.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>Uses Google Core Reporting Api</summary>
// ***********************************************************************
namespace Marasco.Analytics.GoogleAnalytics
{
  #region Directives

  using System;
  using System.Linq;
  using System.Security.Cryptography.X509Certificates;

  using Google.Apis.Analytics.v3;
  using Google.Apis.Analytics.v3.Data;
  using Google.Apis.Auth.OAuth2;
  using Google.Apis.Services;

  using Marasco.Analytics.GoogleAnalytics.Model;

  #endregion

  /// <summary>
  /// Class GoogleAnalyticsAPI.
  /// </summary>
  public class GoogleAnalyticsApi
  {
    #region Constructors and Destructors

    public GoogleAnalyticsApi(string keyFilePath, string serviceAccountEmail)
    {
      var scopes = new[]
                   {
                     AnalyticsService.Scope.Analytics, // view and manage your analytics data
                     AnalyticsService.Scope.AnalyticsEdit, // edit management actives
                     AnalyticsService.Scope.AnalyticsManageUsers, // manage users
                     AnalyticsService.Scope.AnalyticsReadonly // View analytics data  
                   };

      // More info: http://stackoverflow.com/questions/16992031/google-analytics-api-on-azure
      var certificate = new X509Certificate2(keyFilePath, "notasecret", X509KeyStorageFlags.Exportable | X509KeyStorageFlags.MachineKeySet);
      var credential =
        new ServiceAccountCredential(
          new ServiceAccountCredential.Initializer(serviceAccountEmail) { Scopes = scopes }.FromCertificate(certificate));

      Service =
        new AnalyticsService(
          new BaseClientService.Initializer
          {
            HttpClientInitializer = credential, 
            ApplicationName = "MarascoAnalytics"
          });
    }

    #endregion

    #region Public Properties

    public AnalyticsService Service { get; set; }

    #endregion

    #region Public Methods and Operators

    public AnalyticDataPoint GetAnalyticsData(PageViewsRequest pageViewsRequest)
    {
      var data = new AnalyticDataPoint();
      if (!pageViewsRequest.Ids.Contains("ga:"))
      {
        pageViewsRequest.Ids = string.Format("ga:{0}", pageViewsRequest.Ids);
      }

      // Make initial call to service.
      // Then check if a next link exists in the response,
      // if so parse and call again using start index param.
      GaData response = null;
      do
      {
        var startIndex = 1;
        if (response != null && !string.IsNullOrEmpty(response.NextLink))
        {
          var uri = new Uri(response.NextLink);
          var paramerters = uri.Query.Split('&');
          var s = paramerters.First(i => i.Contains("start-index")).Split('=')[1];
          startIndex = int.Parse(s);
        }

        var request = BuildAnalyticRequest(
          pageViewsRequest.Ids, 
          pageViewsRequest.Dimensions, 
          pageViewsRequest.Metrics, 
          pageViewsRequest.StartDate, 
          pageViewsRequest.EndDate, 
          pageViewsRequest.Filters,
          startIndex);

        response = request.Execute();
        data.ColumnHeaders = response.ColumnHeaders;
        data.Rows.AddRange(response.Rows);
      }
      while (!string.IsNullOrEmpty(response.NextLink));

      return data;
    }

    #endregion

    #region Methods

    private DataResource.GaResource.GetRequest BuildAnalyticRequest(
      string profileId, 
      string[] dimensions, 
      string[] metrics, 
      DateTime startDate, 
      DateTime endDate, 
      string filters,
      int startIndex)
    {
      var request = Service.Data.Ga.Get(
        profileId, 
        startDate.ToString("yyyy-MM-dd"), 
        endDate.ToString("yyyy-MM-dd"), 
        string.Join(",", metrics));

      request.Dimensions = string.Join(",", dimensions);
      request.StartIndex = startIndex;
      request.Filters = filters;
      return request;
    }

    #endregion
  }
}