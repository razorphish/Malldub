namespace Malldub.WebApi
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Drawing;
  using System.Drawing.Imaging;
  using System.IO;
  using System.Web.UI;

  using Malldub.WebApi.RootControllers;

  using WebsitesScreenshot;

  #endregion

  public partial class printFund : Page
  {
    #region Public Methods and Operators


    #endregion

    #region Methods

    protected void Page_Load(object sender, EventArgs e)
    {
      var image = MarascoController.PrintImage(Request.QueryString["f"]);

      Response.Clear();
      Response.ContentType = "image/png";
      Response.BinaryWrite(image);

      Response.End();
    }


    #endregion
  }
}