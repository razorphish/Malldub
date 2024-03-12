namespace Marasco.Api.Model
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  public class VimeoVideoRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string ActionUrl = @"http://vimeo.com/api/v2/video/{0}.json";

    #endregion
  }
}