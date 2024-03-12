namespace Marasco.TwitterApi.Models
{
  #region Directives

  using System;
  using System.Collections.Generic;

  using Newtonsoft.Json;

  using TweetSharp;

  #endregion

  public class TwitterStatusResponse
  {
    #region Constructors and Destructors

    public TwitterStatusResponse(TwitterStatus twitterStatus)
    {
      if (twitterStatus == null)
      {
        return;
      }

      Author = new TweeterResponse
               {
                 ScreenName = twitterStatus.Author.ScreenName, 
                 ProfileImageUrl = twitterStatus.Author.ProfileImageUrl
               };

      CreatedDate         = twitterStatus.CreatedDate;
      Entities            = new TwitterEntitiesResponse(twitterStatus.Entities);
      Id                  = twitterStatus.Id;
      IdStr               = twitterStatus.IdStr;
      InReplyToScreenName = twitterStatus.InReplyToScreenName;
      InReplyToStatusId   = twitterStatus.InReplyToStatusId;
      InReplyToUserId     = twitterStatus.InReplyToUserId;
      IsFavorited         = twitterStatus.IsFavorited;
      IsPossiblySensitive = twitterStatus.IsPossiblySensitive;
      IsTruncated         = twitterStatus.IsTruncated;
      Language            = twitterStatus.Language;
      Location            = new TwitterGeoLocationResponse(twitterStatus.Location);
      Place               = new TwitterPlaceResponse(twitterStatus.Place);
      RawSource           = twitterStatus.RawSource;
      RetweetCount        = twitterStatus.RetweetCount;
      Source              = twitterStatus.Source;
      Text                = twitterStatus.Text;
      TextAsHtml          = twitterStatus.TextAsHtml;
      TextDecoded         = twitterStatus.TextDecoded;
      User                = new TwitterUserResponse(twitterStatus.User);

      /* twitterStatus.RetweetedStatus*/
    }

    #endregion

    #region Public Properties

    public TweeterResponse Author { get; set; }

    public DateTime CreatedDate { get; set; }

    public TwitterEntitiesResponse Entities { get; set; }

    public long Id { get; set; }

    public string IdStr { get; set; }

    public string InReplyToScreenName { get; set; }

    public long? InReplyToStatusId { get; set; }

    public int? InReplyToUserId { get; set; }

    public bool IsFavorited { get; set; }

    public bool? IsPossiblySensitive { get; set; }

    public bool IsTruncated { get; set; }

    public string Language { get; set; }

    public TwitterGeoLocationResponse Location { get; set; }

    public TwitterPlaceResponse Place { get; set; }

    public string RawSource { get; set; }

    public int RetweetCount { get; set; }

    public string Source { get; set; }

    public string Text { get; set; }

    public string TextAsHtml { get; set; }

    public string TextDecoded { get; set; }

    public TwitterUserResponse User { get; set; }

    #endregion
  }

  public class TweeterResponse
  {
    #region Public Properties

    public string ProfileImageUrl { get; set; }

    public string ScreenName { get; set; }

    #endregion
  }

  public class TwitterEntitiesResponse
  {
    #region Constructors and Destructors

    public TwitterEntitiesResponse(TwitterEntities twitterEntities)
    {
      if (twitterEntities == null)
      {
        return;
      }

      foreach (var hashTag in twitterEntities.HashTags)
      {
        HashTags.Add(new TwitterHashTagResponse { Text = hashTag.Text });
      }

      foreach (var twitterMedia in twitterEntities.Media)
      {
        Media.Add(new TwitterMediaResponse(twitterMedia));
      }

      foreach (var mention in twitterEntities.Mentions)
      {
        Mentions.Add(new TwitterMentionResponse(mention));
      }
    }

    #endregion

    #region Public Properties

    [JsonProperty("hashtags")]
    public IList<TwitterHashTagResponse> HashTags { get; set; }

    [JsonProperty("media")]
    public IList<TwitterMediaResponse> Media { get; set; }

    [JsonProperty("user_mentions")]
    public IList<TwitterMentionResponse> Mentions { get; set; }

    [JsonProperty("urls")]
    public IList<TwitterUrlResponse> Urls { get; set; }

    #endregion
  }

  public class TwitterHashTagResponse
  {
    #region Public Properties

    [JsonProperty("text")]
    public string Text { get; set; }

    #endregion
  }

  public class TwitterMediaResponse
  {
    #region Constructors and Destructors

    public TwitterMediaResponse(TwitterMedia twitterMedia)
    {
      DisplayUrl = twitterMedia.DisplayUrl;
      ExpandedUrl = twitterMedia.ExpandedUrl;
      Id = twitterMedia.Id;
      IdAsString = twitterMedia.IdAsString;
      MediaType = twitterMedia.MediaType;
      MediaUrl = twitterMedia.MediaUrl;
      MediaUrlHttps = twitterMedia.MediaUrlHttps;
      Sizes = new TwitterMediaSizesResponse(twitterMedia.Sizes);
    }

    #endregion

    #region Public Properties

    [JsonProperty("display_url")]
    public string DisplayUrl { get; set; }

    [JsonProperty("expanded_url")]
    public string ExpandedUrl { get; set; }

    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("id_str")]
    public string IdAsString { get; set; }

    [JsonProperty("type")]
    public TwitterMediaType MediaType { get; set; }

    [JsonProperty("media_url")]
    public string MediaUrl { get; set; }

    [JsonProperty("media_url_https")]
    public string MediaUrlHttps { get; set; }

    [JsonProperty("sizes")]
    public TwitterMediaSizesResponse Sizes { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }

    #endregion
  }

  public class TwitterMediaSizesResponse
  {
    #region Constructors and Destructors

    public TwitterMediaSizesResponse(TwitterMediaSizes mediaSizes)
    {
      Large = new TwitterMediaSizeResponse(mediaSizes.Large);
      Medium = new TwitterMediaSizeResponse(mediaSizes.Medium);
      Small = new TwitterMediaSizeResponse(mediaSizes.Small);
      Thumb = new TwitterMediaSizeResponse(mediaSizes.Thumb);
    }

    #endregion

    #region Public Properties

    [JsonProperty("large")]
    public TwitterMediaSizeResponse Large { get; set; }

    [JsonProperty("medium")]
    public TwitterMediaSizeResponse Medium { get; set; }

    [JsonProperty("small")]
    public TwitterMediaSizeResponse Small { get; set; }

    [JsonProperty("thumb")]
    public TwitterMediaSizeResponse Thumb { get; set; }

    #endregion
  }

  public class TwitterMediaSizeResponse
  {
    #region Constructors and Destructors

    public TwitterMediaSizeResponse(TwitterMediaSize mediaSize)
    {
      Height = mediaSize.Height;
      Resize = mediaSize.Resize;
      Width = mediaSize.Width;
    }

    #endregion

    #region Public Properties

    [JsonProperty("h")]
    public int Height { get; set; }

    public string Resize { get; set; }

    [JsonProperty("w")]
    public int Width { get; set; }

    #endregion
  }

  public class TwitterMentionResponse
  {
    #region Constructors and Destructors

    public TwitterMentionResponse(TwitterMention twitterMention)
    {
      Id = twitterMention.Id;
      ScreenName = twitterMention.ScreenName;
      Name = twitterMention.Name;
    }

    #endregion

    #region Public Properties

    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("screen_name")]
    public string ScreenName { get; set; }

    #endregion
  }

  public class TwitterUrlResponse
  {
    #region Constructors and Destructors

    public TwitterUrlResponse(TwitterUrl twitterUrl)
    {
      Value = twitterUrl.Value;
      ExpandedValue = twitterUrl.ExpandedValue;
      DisplayUrl = twitterUrl.DisplayUrl;
    }

    #endregion

    #region Public Properties

    [JsonProperty("display_url")]
    public string DisplayUrl { get; set; }

    [JsonProperty("expanded_url")]
    public string ExpandedValue { get; set; }

    [JsonProperty("url")]
    public string Value { get; set; }

    #endregion
  }

  public class TwitterGeoLocationResponse
  {
    #region Constructors and Destructors

    public TwitterGeoLocationResponse(TwitterGeoLocation twitterGeoLocation)
    {
      if (twitterGeoLocation == null)
      {
        return;
      }

      Coordinates = new GeoCoordinates(twitterGeoLocation.Coordinates);
      RawSource = twitterGeoLocation.RawSource;
      Type = twitterGeoLocation.Type;
    }

    #endregion

    #region Public Properties

    public GeoCoordinates Coordinates { get; set; }

    public string RawSource { get; set; }

    public string Type { get; set; }

    #endregion

    public class GeoCoordinates
    {
      #region Constructors and Destructors

      public GeoCoordinates(TwitterGeoLocation.GeoCoordinates geoCoordinates)
      {
        Latitude = geoCoordinates.Latitude;
        Longitude = geoCoordinates.Longitude;
      }

      #endregion

      #region Public Properties

      public double Latitude { get; set; }

      public double Longitude { get; set; }

      #endregion
    }
  }

  public class TwitterPlaceResponse
  {
    #region Constructors and Destructors

    public TwitterPlaceResponse(TwitterPlace twitterPlace)
    {
      if (twitterPlace == null)
      {
        return;
      }

      Country = twitterPlace.Country;
      CountryCode = twitterPlace.CountryCode;
      FullName = twitterPlace.FullName;
      Id = twitterPlace.Id;
      Name = twitterPlace.Name;
      RawSource = twitterPlace.RawSource;
      Url = twitterPlace.Url;
    }

    #endregion

    #region Public Properties

    public IEnumerable<TwitterPlaceResponse> ContainedWithin { get; set; }

    public string Country { get; set; }

    public string CountryCode { get; set; }

    public string FullName { get; set; }

    public string Id { get; set; }

    public string Name { get; set; }

    public string RawSource { get; set; }

    public string Url { get; set; }

    #endregion
  }

  public class TwitterUserResponse
  {
    #region Constructors and Destructors

    public TwitterUserResponse(TwitterUser twitterUser)
    {
      if (twitterUser == null)
      {
        return;
      }

      ContributorsEnabled = twitterUser.ContributorsEnabled;
      CreatedDate = twitterUser.CreatedDate;
      Description = twitterUser.Description;
      FavouritesCount = twitterUser.FavouritesCount;
      FollowRequestSent = twitterUser.FollowRequestSent;
      FollowersCount = twitterUser.FollowersCount;
      FriendsCount = twitterUser.FriendsCount;
      Id = twitterUser.Id;
      IsDefaultProfile = twitterUser.IsDefaultProfile;
      IsGeoEnabled = twitterUser.IsGeoEnabled;
      IsProfileBackgroundTiled = twitterUser.IsProfileBackgroundTiled;
      IsProtected = twitterUser.IsProtected;
      IsTranslator = twitterUser.IsTranslator;
      IsVerified = twitterUser.IsVerified;
      ProfileBackgroundImageUrl = twitterUser.ProfileBackgroundImageUrl;
      ProfileBackgroundColor = twitterUser.ProfileBackgroundColor;
      ProfileBackgroundImageUrlHttps = twitterUser.ProfileBackgroundImageUrlHttps;
      ProfileImageUrl = twitterUser.ProfileImageUrl;
      ProfileImageUrlHttps = twitterUser.ProfileImageUrlHttps;
      ProfileLinkColor = twitterUser.ProfileLinkColor;
      ProfileSidebarBorderColor = twitterUser.ProfileSidebarBorderColor;
      ProfileSidebarFillColor = twitterUser.ProfileSidebarFillColor;
      ProfileTextColor = twitterUser.ProfileTextColor;
      RawSource = twitterUser.RawSource;
      ScreenName = twitterUser.ScreenName;
      Status = twitterUser.Status;
      StatusesCount = twitterUser.StatusesCount;
      TimeZone = twitterUser.TimeZone;
      Url = twitterUser.Url;
      UtcOffset = twitterUser.UtcOffset;
    }

    #endregion

    #region Public Properties

    public bool? ContributorsEnabled { get; set; }

    [JsonProperty("created_at")]
    public DateTime CreatedDate { get; set; }

    public string Description { get; set; }

    public int FavouritesCount { get; set; }

    public bool? FollowRequestSent { get; set; }

    public int FollowersCount { get; set; }

    public int FriendsCount { get; set; }

    public long Id { get; set; }

    [JsonProperty("default_profile")]
    public bool? IsDefaultProfile { get; set; }

    [JsonProperty("geo_enabled")]
    public bool? IsGeoEnabled { get; set; }

    [JsonProperty("profile_background_tile")]
    public bool IsProfileBackgroundTiled { get; set; }

    [JsonProperty("protected")]
    public bool? IsProtected { get; set; }

    public bool? IsTranslator { get; set; }

    [JsonProperty("verified")]
    public bool? IsVerified { get; set; }

    [JsonProperty("lang")]
    public string Language { get; set; }

    public int ListedCount { get; set; }

    public string Location { get; set; }

    public string Name { get; set; }

    public string ProfileBackgroundColor { get; set; }

    public string ProfileBackgroundImageUrl { get; set; }

    public string ProfileBackgroundImageUrlHttps { get; set; }

    public string ProfileImageUrl { get; set; }

    public string ProfileImageUrlHttps { get; set; }

    public string ProfileLinkColor { get; set; }

    public string ProfileSidebarBorderColor { get; set; }

    public string ProfileSidebarFillColor { get; set; }

    public string ProfileTextColor { get; set; }

    public string RawSource { get; set; }

    public string ScreenName { get; set; }

    public TwitterStatus Status { get; set; }

    public int StatusesCount { get; set; }

    public string TimeZone { get; set; }

    public string Url { get; set; }

    public string UtcOffset { get; set; }

    #endregion
  }
}