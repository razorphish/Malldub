namespace Marasco.Api.Model
{
  #region Directives

  using System.Web;

  #endregion

  public class QrCodeImageResponse
  {
    #region Constructors and Destructors

    public QrCodeImageResponse(IHtmlString html)
    {
      Html = html.ToHtmlString();
    }

    #endregion

    #region Public Properties

    public string Html { get; set; }

    public string Src { get; set; }

    #endregion
  }
}