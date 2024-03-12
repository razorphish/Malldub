namespace Marasco.Website
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Drawing;
  using System.Drawing.Imaging;
  using System.IO;
  using System.Web.UI;

  using WebsitesScreenshot;

  #endregion

  public partial class printFund : Page
  {
    #region Public Methods and Operators

    public static byte[] ImageToByte2(Image img)
    {
      byte[] byteArray;
      using (var stream = new MemoryStream())
      {
        img.Save(stream, ImageFormat.Png);
        stream.Close();

        byteArray = stream.ToArray();
      }

      return byteArray;
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
            throw new Exception("it failed");
          case WebsitesScreenshot.Result.Timeout:
            throw new Exception("it timed out");
        }
      }

      return image;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
      var imageId = Request.QueryString["f"];

      var image = PrintImage(imageId);

      Response.Clear();
      Response.ContentType = "image/png";
      Response.BinaryWrite(image);

      //Response.Write(string.Format("{0}/print.aspx?f={1}", ConfigurationManager.AppSettings["CurrentApiServer"], imageId));
      Response.End();
    }

    #endregion
  }
}