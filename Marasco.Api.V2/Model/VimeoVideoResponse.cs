namespace Marasco.Api.Model
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  public class VimeoVideoResponse : IMarascoResponseModel
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string ActionUrl = @"http://vimeo.com/api/v2/video/{0}.json";

    #endregion

    #region Public Properties

    [JsonProperty("description")]
    public string Description { get; set; }

    [JsonProperty("duration")]
    public string Duration { get; set; }

    public MarascoApiException Error { get; set; }

    [JsonProperty("height")]
    public string Height { get; set; }

    [JsonProperty("id")]
    public string Id { get; set; }

    [JsonProperty("mobile_url")]
    public string MobileUrl { get; set; }

    [JsonProperty("stats_number_of_comments")]
    public string StatsNumberOfComments { get; set; }

    [JsonProperty("stats_number_of_likes")]
    public string StatsNumberOfLikes { get; set; }

    [JsonProperty("stats_number_of_plays")]
    public string StatsNumberOfPlays { get; set; }

    [JsonProperty("tags")]
    public string Tags { get; set; }

    [JsonProperty("thumbnail_large")]
    public string ThumbnailLarge { get; set; }

    [JsonProperty("thumbnail_medium")]
    public string ThumbnailMedium { get; set; }

    [JsonProperty("thumbnail_small")]
    public string ThumbnailSmall { get; set; }

    [JsonProperty("title")]
    public string Title { get; set; }

    [JsonProperty("upload_date")]
    public string UploadDate { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }

    [JsonProperty("user_id")]
    public string UserId { get; set; }

    [JsonProperty("user_name")]
    public string UserName { get; set; }

    [JsonProperty("user_portrait_huge")]
    public string UserPortraitHuge { get; set; }

    [JsonProperty("user_portrait_large")]
    public string UserPortraitLarge { get; set; }

    [JsonProperty("user_portrait_medium")]
    public string UserPortraitMedium { get; set; }

    [JsonProperty("user_portrait_small")]
    public string UserPortraitSmall { get; set; }

    [JsonProperty("user_url")]
    public string UserUrl { get; set; }

    [JsonProperty("width")]
    public string Width { get; set; }

    [JsonProperty("prerenderToken")]
    public string embed_privacy { get; set; }

    #endregion
  }
}