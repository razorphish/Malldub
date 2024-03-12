namespace Marasco.Api
{
  #region Directives

  using Marasco.Api.Model;

  #endregion

  public class IpApi
  {
    #region Public Methods and Operators

    public GeoIpApiResponse Get()
    {
      GeoIpApiResponse response;
      var req = new GeoIpApiRequest();
      try
      {
        response = new Client().Invoke<GeoIpApiRequest, GeoIpApiResponse>(req, req.ActionUrl);
      }
      catch (MarascoApiException ex)
      {
        response = new GeoIpApiResponse { Error = ex };
      }

      return response;
    }
    #endregion
  }
}