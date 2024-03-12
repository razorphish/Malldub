namespace Marasco.Api.Model
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  public class GeoIpApiRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string ActionUrl = @"http://ip-api.com/json";

    #endregion

  }
}