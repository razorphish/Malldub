namespace Malldub.WebApi
{
  #region Directives

  using System;
  using System.Web;
  using System.Web.UI;

  #endregion

  /// <summary>
  /// This page will be used for Server-Side authentication in a POPUP window
  /// </summary>
  public partial class FacebookAuth : Page
  {
    #region Methods

    protected void Page_Load(object sender, EventArgs e)
    {
      var url = string.Format("~{0}", Request.QueryString["u"]);

      Response.Redirect(url, false);
      HttpContext.Current.ApplicationInstance.CompleteRequest();
    }

    #endregion
  }
}