namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Net;
  using System.Net.Http;
  using System.Runtime.Remoting.Channels;
  using System.Web;
  using System.Web.Http;
  using System.Web.UI;

  using Malldub.Data;

  using Marasco.Analytics.GoogleAnalytics;
  using Marasco.Analytics.GoogleAnalytics.Model;

  #endregion

  [RoutePrefix("api/google")]
  public class GoogleController : BaseApiController
  {
    // GET api/<controller>
    #region Constructors and Destructors

    public GoogleController()
      : base(new MalldubDataContext()) {}

    #endregion

    #region Public Methods and Operators

    [Route("fundolo/page/{pageId}/{startDate}/{endDate}")]
    [HttpGet]
    public HttpResponseMessage GetAnalyticsByPermalink(string pageId, DateTime startDate, DateTime endDate)
    {
      try
      {
        // var keyFilePath = string.Format(@"c:\cert\{0}", ConfigurationManager.AppSettings["GoogleKeyFilePath"]);
        var keyFilePath =
          HttpContext.Current.Server.MapPath(
            string.Format("..\\..\\..\\..\\..\\..\\{0}", ConfigurationManager.AppSettings["GoogleKeyFilePath"]));

        var serviceAccountEmail = ConfigurationManager.AppSettings["GoogleServiceAccountEmail"];
        var googleReport = new GoogleAnalyticsApi(keyFilePath, serviceAccountEmail);
        var googleIds = ConfigurationManager.AppSettings["GoogleFundoloIds"];
        var response =
          googleReport.GetAnalyticsData(
            new PageViewsRequest
            {
              Dimensions = "ga:pagePath".Split(",".ToCharArray()),
              Filters = string.Format("ga:pagePath==/{0}", pageId),
              Metrics =
                "ga:pageviews,ga:uniquePageviews,ga:timeOnPage,ga:avgTimeOnPage, ga:pageviewsPerSession,ga:entranceRate,ga:entrances,ga:exits,ga:exitRate"
                .Split(",".ToCharArray()),
              Ids = googleIds,
              StartDate = startDate,
              EndDate = endDate,
              MaxResults = 50
            });

        return Request.CreateResponse(HttpStatusCode.OK, response.Data);
      }
      catch
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Data not available at this time");
      }
    }

    [Route("")]
    [HttpPost]
    public HttpResponseMessage Post()
    {
      return new HttpResponseMessage();
    }

    #endregion
  }
}