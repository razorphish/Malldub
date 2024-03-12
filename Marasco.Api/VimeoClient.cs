namespace Marasco.Api
{
  #region Directives

  using System.Collections.Generic;

  using Marasco.Api.Model;

  #endregion

  public static class VimeoClient
  {
    #region Public Methods and Operators

    public static List<VimeoVideoResponse> Get(string id)
    {
      List<VimeoVideoResponse> response;
      var req = new VimeoVideoRequest();
      try
      {
        response = new Client().Invoke<VimeoVideoRequest, List<VimeoVideoResponse>>(req, string.Format(req.ActionUrl, id));
      }
      catch (MarascoApiException ex)
      {
        response = new List<VimeoVideoResponse>
                   {
                     new VimeoVideoResponse
                     {
                       Error = ex
                     }
                   };
      }

      return response;
    }

    #endregion
  }
}