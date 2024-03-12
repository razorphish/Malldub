namespace Marasco.Analytics
{
  #region Directives

  using System;
  using System.Configuration;

  using Segment;

  #endregion

  public abstract class AnalyticsBase : IAnalytics
  {
    #region Constructors and Destructors

    protected AnalyticsBase()
    {
      ProjectId = ConfigurationManager.AppSettings["SegmentProjectKey"];
      ReadKey = ConfigurationManager.AppSettings["SegmentReadKey"];
      WriteKey = ConfigurationManager.AppSettings["SegmentWriteKey"];

      var config = new Config()
        .SetAsync(true)
        .SetTimeout(TimeSpan.FromSeconds(30))
        .SetMaxQueueSize(10000);

      Analytics.Initialize(WriteKey, config);

    }

    #endregion

    #region Public Properties

    public string ProjectId { get; set; }

    public string ReadKey { get; set; }

    public string WriteKey { get; set; }

    #endregion
  }
}