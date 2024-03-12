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

  using Data;

  using Malldub.Helper;
  using Malldub.WebApi.Models;

  using Marasco.FacebookApi;
  using Marasco.FacebookApi.Models;

  using Microsoft.AspNet.Identity;

  #endregion

  /// <summary>
  /// Class FacebookController.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  [RoutePrefix("api/facebook")]
  [Authorize]
  public class FacebookController : ApiController
  {
    #region Constants

    public const string CLAIM_TYPE = "urn:facebook:access_token";

    #endregion

    #region Fields

    /// <summary>
    /// The _access token
    /// </summary>
    private readonly string _accessToken = ConfigurationManager.AppSettings["Facebook"];

    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Basics the feed.
    /// </summary>
    /// <param name="feedRequest">The feed request.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.ArgumentException">Invalid facebook token</exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    [Route("feed")]
    [HttpPost]
    public HttpResponseMessage BasicFeed(FeedRequest feedRequest)
    {
      var fb = new Graph();

      try
      {
        var identity = User.Identity as ClaimsIdentity;
        if (identity != null)
        {
          var facebookToken = identity.Claims.FirstOrDefault(c => c.Type == "urn:facebook:access_token");

          if (facebookToken == null)
          {
            throw new ArgumentException("Invalid facebook token");
          }

          feedRequest.accessToken = facebookToken.Value;
        }

        var ret = fb.PostFeed(feedRequest);
        return Request.CreateResponse(HttpStatusCode.OK, new { status = "ok" });
      }
      catch (Exception exc)
      {
        return Request.CreateResponse(HttpStatusCode.InternalServerError, new { error_description = exc.Message });
      }
    }

    #endregion

    #region Methods

    internal dynamic PostToFacebook(
      string content, 
      string message, 
      string permalink, 
      string title, 
      ItemUpload defaultImage)
    {
      // Use current logged in user
      var identity = User.Identity as ClaimsIdentity;
      if (identity == null)
      {
        return new { Warning = "User does not have access to perform this operation" };
      }

      string accessTokenValue;

      if (GetClaim(identity, CLAIM_TYPE, out accessTokenValue))
      {
        return new { Warning = "User does not have a Facebook Login" };
      }

      return PostToFacebook(content, message, permalink, title, defaultImage, accessTokenValue);
    }

      internal dynamic PostToFacebook(
      string content, 
      string message, 
      string permalink, 
      string title, 
      ItemUpload defaultImage,
      string accessToken)
      {

        var currentServer = ConfigurationManager.AppSettings["CurrentServer"];
        var imageLocation = string.Empty;

        if (defaultImage != null)
        {
          imageLocation = defaultImage.Upload.TypeId == "web.Image"
                                ? string.Format(
                                  "{0}/azure/img/{1}?height=150&width=230&mode=crop",
                                  currentServer,
                                  defaultImage.Upload.Name)
                                : defaultImage.Upload.Name;
        }
        var graph = new Graph();
      var ret =
        graph.PostFeed(
          new FeedRequest
          {
            accessToken = accessToken, 
            caption     = "WWW.FUNDINGMIRACLES.COM", 
            description = content, 
            link        = string.Format("{0}/{1}", currentServer, permalink),
            message     = StringUtilities.StripHtml(message), 
            name        = title,
            picture     = imageLocation
          });

        return ret;
    }

    private bool GetClaim(ClaimsIdentity identity, string claimType, out string accessTokenValue)
    {
      var accessToken = identity.Claims.FirstOrDefault(c => c.Type == claimType);
      accessTokenValue = string.Empty;

      if (accessToken == null)
      {
        var userClaim =
          _context.AspNetUserClaim.ByUserId(identity.GetUserId()).FirstOrDefault(c => c.ClaimType == claimType);
        if (userClaim != null)
        {
          accessTokenValue = userClaim.ClaimValue;
        }
      }
      else
      {
        accessTokenValue = accessToken.Value;
      }

      return string.IsNullOrEmpty(accessTokenValue);
    }
    #endregion
  }
}