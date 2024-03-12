namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Drawing;
  using System.Drawing.Imaging;
  using System.IO;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Marasco.Api;
  using Marasco.Api.Model;
  using Marasco.WePay;

  using WebsitesScreenshot;

  using ErrorResponse = Marasco.WePay.ErrorResponse;

  #endregion

  [RoutePrefix("api/marasco")]
  public class MarascoController : ApiController
  {
    #region Public Methods and Operators

    public static byte[] ImageToByte2(Image img)
    {
      var byteArray = new byte[0];
      using (var stream = new MemoryStream())
      {
        img.Save(stream, ImageFormat.Png);
        stream.Close();

        byteArray = stream.ToArray();
      }

      return byteArray;
    }

    [Route("qrcode")]
    public HttpResponseMessage QrCodeImg(QrCodeImageRequest value)
    {
      try
      {
        var img = QrCode.GenerateRelayQrCodeImage(value);
        var ret = Request.CreateResponse(HttpStatusCode.OK, img);

        return ret;
      }
      catch (Exception we)
      {
        return Request.CreateResponse(HttpStatusCode.BadRequest, we);
      }
    }

    [Route("recache")]
    public HttpResponseMessage ReCache(ReCacheRequest value)
    {
      try
      {
        var prerender = new PrerenderIo();
        prerender.Post(value);

        return Request.CreateResponse(HttpStatusCode.OK);
      }
      catch (WePayException we)
      {
        return Request.CreateResponse(
          HttpStatusCode.BadRequest, 
          new ErrorResponse
          {
            Error = we.Error, 
            ErrorCode = we.ErrorCode, 
            ErrorDescription = we.ErrorDescription, 
            ErrorMessage = we.ErrorMessage
          });
      }
    }

    [Route("ipapi")]
    public HttpResponseMessage GetGeoFromIpApi()
    {
      try
      {
        var ipapi = new IpApi();
        var resp = ipapi.Get();

        return Request.CreateResponse(HttpStatusCode.OK, resp);
      }
      catch (MarascoApiException we)
      {
        return Request.CreateResponse(
          HttpStatusCode.BadRequest,
          new ErrorResponse
          {
            Error            = we.Error,
            ErrorCode        = we.ErrorCode,
            ErrorDescription = we.ErrorDescription,
            ErrorMessage     = we.ErrorMessage
          });
      }
    }

    #endregion

    #region Methods

    internal static byte[] PrintImage(string permalink)
    {
      byte[] image = {};
      using (var websitesScreenshot = new WebsitesScreenshot())
      {
        websitesScreenshot.ImageHeight = 1010;
        websitesScreenshot.ImageWidth = 800;
        websitesScreenshot.PreserveAspectRatio = true;

        var result =
          websitesScreenshot.CaptureWebpage(
            string.Format("{0}/print.aspx?f={1}", ConfigurationManager.AppSettings["CurrentApiServer"], permalink));

        switch (result)
        {
          case WebsitesScreenshot.Result.Captured:
            image = ImageToByte2(websitesScreenshot.GetImage());

            break;
          case WebsitesScreenshot.Result.Failed:

            // TODO: Create image
            break;
          case WebsitesScreenshot.Result.Timeout:

            // TODO: Create Image
            break;
        }
      }

      return image;
    }

    #endregion
  }
}