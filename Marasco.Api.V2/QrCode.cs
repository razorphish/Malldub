namespace Marasco.Api
{
  #region Directives

  using System;
  using System.Drawing.Imaging;
  using System.IO;
  using System.Web;
  using System.Web.Mvc;

  using Model;

  using ZXing;
  using ZXing.Common;

  #endregion

  public static class QrCode
  {
    #region Public Methods and Operators

    /// <summary>
    /// Generates the relay qr code. for Html Image
    /// </summary>
    /// <param name="request">The request.</param>
    /// <param name="height">The height.</param>
    /// <param name="width">The width.</param>
    /// <param name="margin">The margin.</param>
    /// <returns>IHtmlString.</returns>
    public static QrCodeImageResponse GenerateRelayQrCodeImage(
      QrCodeImageRequest request,
      int height = 250, 
      int width = 250, 
      int margin = 0)
    {
      var barcodeWriter = new BarcodeWriter
          {
            Format = BarcodeFormat.QR_CODE, 
            Options =
              new EncodingOptions { Height = height, Width = width, Margin = margin }
          };

      using (var bitmap = barcodeWriter.Write(request.Value))
      using (var stream = new MemoryStream())
      {
        bitmap.Save(stream, ImageFormat.Gif);
        var src = string.Format("data:image/gif;base64,{0}", Convert.ToBase64String(stream.ToArray()));
        var img = new TagBuilder("img");
        img.MergeAttribute("alt", request.AltTag);
        img.Attributes.Add("src", src);

        var ret = new QrCodeImageResponse(MvcHtmlString.Create(img.ToString(TagRenderMode.SelfClosing))) { Src = src };

        return ret;
      }
    }

    #endregion
  }
}