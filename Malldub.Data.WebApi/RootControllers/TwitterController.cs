// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 06-01-2014
// Last Modified By : Antonio David Marasco
// Last Modified On : 06-01-2014
// ***********************************************************************
// <copyright file="TwitterController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Security.Claims;
  using System.Web.Http;
  using System.Web.WebPages;

  using Malldub.Data;

  using Marasco.TwitterApi;
  using Marasco.TwitterApi.Models;

  using Microsoft.AspNet.Identity;

  using Newtonsoft.Json;

  #endregion

  /// <summary>
  /// Class TwitterController.
  /// </summary>
  /// <remarks>Twitter Api</remarks>
  [RoutePrefix("api/twitter")]
  public class TwitterController : ApiController
  {
    #region Constants

    public const string CLAIM_TYPE = "urn:twitter:access_token";

    #endregion

    #region Fields

    /// <summary>
    /// The _context
    /// </summary>
    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    [Route("authenticate")]
    [HttpGet]
    public HttpResponseMessage RequestToken()
    {
      var twitterApi = new TwitterClient();
      var identity = User.Identity as ClaimsIdentity;

      try
      {
        var token = twitterApi.Authenticate();

        if (!token.OAuthCallbackConfirmed)
        {
          return Request.CreateResponse(HttpStatusCode.BadRequest, "Callback not confirmed");
        }

        var claims = _context.AspNetUserClaim.ByUserId(identity.GetUserId()).ByClaimType(CLAIM_TYPE).FirstOrDefault();
        var claim = new AspNetUserClaim
                    {
                      UserId = User.Identity.GetUserId(), 
                      ClaimType = CLAIM_TYPE, 
                      ClaimValue = JsonConvert.SerializeObject(token)
                    };

        if (claims == null)
        {
          _context.AspNetUserClaim.AddObject(claim);
        }
        else
        {
          _context.ApplyCurrentValues(claims.EntityKey.EntitySetName, claim);
        }

        _context.SaveChanges();

        // or HttpStatusCode.Moved
        var response = Request.CreateResponse(HttpStatusCode.Redirect, token);

        response.Headers.Location = new Uri("https://api.twitter.com/oauth/authenticate");
        return response;
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exc);
      }
    }

    [Route("sign-in-with-twitter/{userId}")]
    [HttpGet]
    public IHttpActionResult SignIn(string userId, string oauth_token, string oauth_verifier)
    {
      var twitterApi = new TwitterClient();

      try
      {
        // Check that token is same as requesting {requesttoken{
        var claims = _context.AspNetUserClaim
          .ByUserId(userId)
          .ByClaimType(CLAIM_TYPE)
          .FirstOrDefault();

        if (claims == null)
        {
          // TODO: Handle this with elegance
          // Means we have a rogue account so just ignore and don't post to twitter
          return Ok(new { error = "Claim missing", error_description = "Claim not found." });
        }

        // Claim found now run some checks
        var access = JsonConvert.DeserializeObject<OAuthRequestTokenResponse>(claims.ClaimValue);

        // Check
        if (access.Token != oauth_token)
        {
          return Ok(new { error = "Token Mismatch", error_description = "The token return does not match internal" });
        }

        var accessToken = twitterApi.SignIn(access.Token, access.TokenSecret, oauth_verifier);

        if (string.IsNullOrWhiteSpace(accessToken.TokenSecret) || string.IsNullOrWhiteSpace(accessToken.Token))
        {
          return Ok(new { error = "Signin Fail", error_description = "Twitter signin failed" });
        }

        var claim = new AspNetUserClaim
                    {
                      UserId = userId,
                      ClaimType = CLAIM_TYPE,
                      ClaimValue = JsonConvert.SerializeObject(accessToken),
                      Identification = claims.Identification
                    };

        // OK
        _context.ApplyCurrentValues(claims.EntityKey.EntitySetName, claim);
        _context.SaveChanges();

        // Ahh, made it
        return Redirect(string.Format("{0}/{1}", ConfigurationManager.AppSettings["CallbackUrl"], "twitterauth.aspx?c=1"));
      }
      catch (Exception exc)
      {
        return Ok(new { error = exc.Message, error_description = exc.StackTrace });
      }


    }

    [Route("user_timeline/{screenName}")]
    [HttpGet]
    public HttpResponseMessage UserTimeline(string screenName)
    {
      var twitterApi = new TwitterClient();

      var twitterStatii = twitterApi.ListTweetsOnUserTimeline(screenName);

      return Request.CreateResponse(HttpStatusCode.OK, twitterStatii);
    }


    [Route("mentions_timeline")]
    [HttpGet]
    public HttpResponseMessage MentionsTimeline()
    {
      var twitterApi = new TwitterClient();

      var twitterStatii = twitterApi.ListTweetsMentioningMe();

      return Request.CreateResponse(HttpStatusCode.OK, twitterStatii);
    }
    #endregion
  }
}