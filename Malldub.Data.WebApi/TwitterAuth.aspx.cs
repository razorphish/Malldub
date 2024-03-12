namespace Malldub.WebApi
{
  #region Directives

  using System;
  using System.Linq;
  using System.Text;
  using System.Web.UI;

  using Malldub.Data;
  using Malldub.WebApi.RootControllers;

  using Marasco.TwitterApi;
  using Marasco.TwitterApi.Models;

  using Microsoft.AspNet.Identity;

  using Newtonsoft.Json;

  using TweetSharp;

  #endregion

  public partial class TwitterAuth : Page
  {
    #region Fields

    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Methods

    protected void Page_Load(object sender, EventArgs e)
    {
      var twitterApi = new TwitterClient();
      var cs = Page.ClientScript;
      const string SCRIPT_NAME = "WindowCloseScript";
      var f = Request.QueryString["f"];
      var c = Request.QueryString["c"];
      try
      {
        if (!string.IsNullOrEmpty(c) && c == "1")
        {
          // Close Window
          cs.RegisterClientScriptBlock(GetType(), SCRIPT_NAME, WriteCloseWindowScript());
          return;
        }

        int fundId;
        if (string.IsNullOrWhiteSpace(f) || !int.TryParse(f, out fundId))
        {
          // Close Window
          cs.RegisterClientScriptBlock(GetType(), SCRIPT_NAME, WriteCloseWindowScript());
          return;
        }

        // Get user
        var userId = _context.Item.ByIdentification(fundId).Select(i => i.UserId).FirstOrDefault();

        var claims =
          _context.AspNetUserClaim.ByUserId(userId).ByClaimType(TwitterController.CLAIM_TYPE).FirstOrDefault();

        if (claims != null)
        {
          var access = JsonConvert.DeserializeObject<OAuthRequestTokenResponse>(claims.ClaimValue);
          var service = new TwitterClient();
          var user = service.AuthenticateWithAndVerify(access.Token, access.TokenSecret);

          if (user != null)
          {
            // Close Window
            cs.RegisterClientScriptBlock(GetType(), SCRIPT_NAME, WriteCloseWindowScript());
            return;
          }
        }

        if (string.IsNullOrWhiteSpace(userId))
        {
          // Close Window
          cs.RegisterClientScriptBlock(GetType(), SCRIPT_NAME, WriteCloseWindowScript());
          return;
        }

        var requestToken = twitterApi.Authenticate(userId);

        if (!requestToken.OAuthCallbackConfirmed)
        {
          // Close Window
          cs.RegisterClientScriptBlock(GetType(), SCRIPT_NAME, WriteCloseWindowScript());
          return;
        }

        var claim = new AspNetUserClaim
                    {
                       UserId = userId, 
                      ClaimType = TwitterController.CLAIM_TYPE, 
                      ClaimValue = JsonConvert.SerializeObject(requestToken),
                    };

        if (claims == null)
        {
          _context.AspNetUserClaim.AddObject(claim);
        }
        else
        {
          claim.Identification = claims.Identification;
          _context.ApplyCurrentValues(claims.EntityKey.EntitySetName, claim);
        }

        _context.SaveChanges();

        Response.Redirect(twitterApi.GetAuthorizationUrl(requestToken).ToString(), true);
        Context.ApplicationInstance.CompleteRequest();
      }
      catch (Exception)
      {
        // Close window, for now
        cs.RegisterClientScriptBlock(GetType(), SCRIPT_NAME, WriteCloseWindowScript());
      }
    }

    private static string WriteCloseWindowScript()
    {
      var sb = new StringBuilder();

      sb.Append("<script type=\"text/javascript\">window.close();</script>");

      return sb.ToString();
    }

    #endregion
  }
}