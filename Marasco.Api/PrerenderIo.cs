namespace Marasco.Api
{
  #region Directives

  using System.Drawing;

  using Model;

  #endregion

  public class PrerenderIo
  {
    #region Public Methods and Operators

    /// <summary>
    /// Posts the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>AccountCreateResponse.</returns>
    public string Post(ReCacheRequest req)
    {
      string response;
      try
      {
        req.PrerenderToken = Config.PrerenderToken;
        response = new Client().Invoke(req, req.ActionUrl);
      }
      catch (MarascoApiException ex)
      {
        response = ex.Message;
      }

      return response;
    }

    #endregion
  }
}