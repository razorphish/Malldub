namespace Marasco.TwitterApi.Models
{
  #region Directives

  using TweetSharp;

  #endregion

  public class OAuthAccessTokenResponse
  {
    #region Constructors and Destructors

    public OAuthAccessTokenResponse(OAuthAccessToken accessToken)
    {
      ScreenName  = accessToken.ScreenName;
      Token       = accessToken.Token;
      TokenSecret = accessToken.TokenSecret;
      UserId      = accessToken.UserId;
    }

    #endregion

    #region Public Properties

    public string ScreenName { get; set; }

    public string Token { get; set; }

    public string TokenSecret { get; set; }

    public int UserId { get; set; }

    #endregion
  }
}