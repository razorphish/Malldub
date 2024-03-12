namespace Marasco.Api.Model
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  public class ReCacheRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string ActionUrl = @"https://prerender.io/api/recache";

    #endregion

    #region Public Properties

    [JsonProperty("prerenderToken")]
    public string PrerenderToken { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }

    #endregion
  }
}