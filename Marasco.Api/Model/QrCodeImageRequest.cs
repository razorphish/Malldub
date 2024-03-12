namespace Marasco.Api.Model
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  public class QrCodeImageRequest
  {
    #region Public Properties

    [JsonProperty("value")]
    public string Value { get; set; }

    [JsonProperty("altTag")]
    public string AltTag { get; set; }

    #endregion
  }
}