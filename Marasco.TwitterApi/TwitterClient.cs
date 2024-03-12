namespace Marasco.TwitterApi
{
  #region Directives

  using System;
  using System.Collections;
  using System.Collections.Generic;
  using System.Configuration;

  using Models;

  using TweetSharp;

  #endregion

  public class TwitterClient
  {
    #region Fields

    private readonly TwitterService _service;

    #endregion

    #region Constructors and Destructors

    public TwitterClient()
    {
      _service = new TwitterService(
        ConfigurationManager.AppSettings["TwitterOauthConsumerKey"],
        ConfigurationManager.AppSettings["TwitterOauthConsumerSecret"],
        ConfigurationManager.AppSettings["TwitterOauthToken"],
        ConfigurationManager.AppSettings["TwitterOauthTokenSecret"]);
    }

    #endregion

    #region Public Methods and Operators

    public OAuthRequestTokenResponse Authenticate()
    {
      // Step 1: Retrieve oAuth request token
      var token =
        _service.GetRequestToken(
          string.Format("{0}/{1}", ConfigurationManager.AppSettings["CallbackUrl"], "/api/twitter/sign-in-with-twitter"));

      return new OAuthRequestTokenResponse(token);
    }

    public OAuthRequestTokenResponse Authenticate(string userId)
    {
      // Step 1: Retrieve oAuth request token
      var token =
        _service.GetRequestToken(
          string.Format(
            "{0}/{1}/{2}", 
            ConfigurationManager.AppSettings["CallbackUrl"], 
            "api/twitter/sign-in-with-twitter", 
            userId));

      return new OAuthRequestTokenResponse(token);
    }

    public Uri GetAuthorizationUrl(OAuthRequestTokenResponse requestToken)
    {
      var uri =
        _service.GetAuthorizationUri(
          new OAuthRequestToken
          {
            OAuthCallbackConfirmed = requestToken.OAuthCallbackConfirmed, 
            Token = requestToken.Token, 
            TokenSecret = requestToken.TokenSecret
          });

      return uri;
    }

    public OAuthAccessTokenResponse SignIn(string requestToken, string requestTokenSecret, string verifier)
    {
      // step 3 - Exchange request token for access token
      var access =
        _service.GetAccessToken(
          new OAuthRequestToken { Token = requestToken, TokenSecret = requestTokenSecret }, 
          verifier);

      // step 4 User Authenticates
      _service.AuthenticateWith(access.Token, access.TokenSecret);
      var user = _service.VerifyCredentials(new VerifyCredentialsOptions { IncludeEntities = true });

      return new OAuthAccessTokenResponse(access);
    }

    public TwitterStatusResponse Tweet(string accessToken, string accessTokenSecret, string status)
    {
      _service.AuthenticateWith(accessToken, accessTokenSecret);
      var user = _service.VerifyCredentials(new VerifyCredentialsOptions());
      var response = _service.SendTweet(new SendTweetOptions { Status = status });
      return new TwitterStatusResponse(response);
    }

    public TwitterUserResponse AuthenticateWithAndVerify(string accessToken, string accessTokenSecret)
    {
      _service.AuthenticateWith(accessToken, accessTokenSecret);

      var user = _service.VerifyCredentials(new VerifyCredentialsOptions());

      return new TwitterUserResponse(user);
    }

    public IEnumerable<TwitterStatus> ListTweetsOnUserTimeline(
      string screenName,
      int count = 10)
    {
      var options = new ListTweetsOnUserTimelineOptions { ScreenName = screenName, Count = count };
      return _service.ListTweetsOnUserTimeline(options);
    }

    public IEnumerable<TwitterStatus> ListTweetsMentioningMe(
      int count = 10)
    {
      var options = new ListTweetsMentioningMeOptions {Count = count, IncludeEntities = true};
      return _service.ListTweetsMentioningMe(options);
    }


    #endregion
  }
}