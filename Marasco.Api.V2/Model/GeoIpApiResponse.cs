namespace Marasco.Api
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  public class GeoIpApiResponse
  {
    #region Public Properties

    [JsonProperty("as")]
    public string As { get; set; }

    [JsonProperty("city")]
    public string City { get; set; }

    [JsonProperty("country")]
    public string Country { get; set; }

    [JsonProperty("countryCode")]
    public string CountryCode { get; set; }

    [JsonIgnore]
    public MarascoApiException Error { get; set; }

    [JsonProperty("isp")]
    public string Isp { get; set; }

    [JsonProperty("lat")]
    public string Lat { get; set; }

    [JsonProperty("lon")]
    public string Lon { get; set; }

    [JsonProperty("org")]
    public string Org { get; set; }

    [JsonProperty("query")]
    public string Query { get; set; }

    [JsonProperty("region")]
    public string Region { get; set; }

    [JsonProperty("regionName")]
    public string RegionName { get; set; }

    [JsonProperty("status")]
    public string Status { get; set; }

    [JsonProperty("timeZone")]
    public string TimeZone { get; set; }

    [JsonProperty("zip")]
    public string Zip { get; set; }

    #endregion
  }
}