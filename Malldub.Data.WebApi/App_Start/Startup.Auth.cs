namespace Malldub.WebApi
{
  #region Directives

  using System;
  using System.Security.Claims;
  using System.Threading.Tasks;

  using Malldub.WebApi.Controllers;

  using Microsoft.AspNet.Identity;
  using Microsoft.AspNet.Identity.EntityFramework;
  using Microsoft.Owin;
  using Microsoft.Owin.Cors;
  using Microsoft.Owin.Security.Cookies;
  using Microsoft.Owin.Security.Facebook;
  using Microsoft.Owin.Security.OAuth;
  using Microsoft.Owin.Security.Twitter;

  using Models;

  using Owin;

  using Providers;

  #endregion

  public partial class Startup
  {
    #region Constants

    private const string XML_SCHEMA_STRING = "http://www.w3.org/2001/XMLSchema#string";

    private const string IGNORE_CLAIM_PREFIX = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims";

    #endregion

    #region Constructors and Destructors

    static Startup()
    {
      PublicClientId = "self";
      UserManagerFactory = () => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>());
      RoleManagerFactory = () => new RoleManager<ApplicationRole>(new RoleStore<ApplicationRole>());

      CrossOriginOptions = new CorsOptions { PolicyProvider = new MalldubCorsPolicyProvider() };

      var provider = new ApplicationOAuthProvider(PublicClientId, UserManagerFactory);

      OAuthOptions = new OAuthAuthorizationServerOptions
      {
        TokenEndpointPath         = new PathString("/Token"),
        Provider                  = provider,
        AuthorizeEndpointPath     = new PathString("/api/auth/ExternalLogin"),
        AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
        AllowInsecureHttp         = true
      };
    }

    #endregion

    #region Public Properties

    public static CorsOptions CrossOriginOptions { get; set; }

    public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

    public static string PublicClientId { get; private set; }

    public static Func<UserManager<ApplicationUser>> UserManagerFactory { get; set; }

    public static Func<RoleManager<ApplicationRole>> RoleManagerFactory { get; set; } 

    #endregion

    // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864

    #region Public Methods and Operators

    public void ConfigureAuth(IAppBuilder app)
    {
      // Enable Cross origin resource sharing
      app.UseCors(CrossOriginOptions);

      // Enable the application to use a cookie to store information for the signed in user
      // and to use a cookie to temporarily store information about a user logging in with a third party login provider
      app.UseCookieAuthentication(new CookieAuthenticationOptions());
      app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

      // Enable the application to use bearer tokens to authenticate users
      app.UseOAuthBearerTokens(OAuthOptions);

      // Uncomment the following lines to enable logging in with third party login providers
      //https://account.live.com/developers/applications/index
      //app.UseMicrosoftAccountAuthentication("0000000040119362", "QsuUVQWnmMQ6PqxU4qERnIt0TLHR39AD");

      //Twitter does not support returning email in claims
      //app.UseTwitterAuthentication(GetTwitterAuthenticationOptions());

      app.UseFacebookAuthentication(GetFacebookAuthenticationOptions());

      //app.UseGoogleAuthentication();
    }

    #endregion

    #region Methods

    private FacebookAuthenticationOptions GetFacebookAuthenticationOptions()
    {
      var facebookOptions = new FacebookAuthenticationOptions
      {
        AppId = "140316459192",
        AppSecret = "e5a0360925fbe6218279dd2018aa2856",
        Provider = new FacebookAuthenticationProvider
        {
          OnAuthenticated = context =>
          {
            context.Identity.AddClaim(
              new Claim("urn:facebook:access_token", context.AccessToken, XML_SCHEMA_STRING, "Facebook"));
            foreach (var x in context.User)
            {
              var claimType = string.Format("urn:facebook:{0}", x.Key);
              var claimValue = x.Value.ToString();
              if (!context.Identity.HasClaim(claimType, claimValue))
              {
                context.Identity.AddClaim(new Claim(claimType, claimValue, XML_SCHEMA_STRING, "Facebook"));
              }
            }

            return Task.FromResult(0);
          }
        },
      };
      facebookOptions.Scope.Add("email");
      facebookOptions.Scope.Add("publish_actions");
      facebookOptions.Scope.Add("user_photos");
      /*
       * Facebook has removed this option
       * facebookOptions.Scope.Add("friends_photos");
        */
      return facebookOptions;
    }

    private TwitterAuthenticationOptions GetTwitterAuthenticationOptions()
    {
      var twitterOptions = new TwitterAuthenticationOptions
      {
        ConsumerKey = "uPE3OOs0cOl05lhJdTbpja0AZ",
        ConsumerSecret = "88Sa3p17xkteATBQOdtunxmjMWIQ956wXcV4ejc8korJOPdHH7",
        Provider = new TwitterAuthenticationProvider
        {
          OnAuthenticated = context =>
          {
            var s = context.ScreenName;

            return Task.FromResult(0);
          }
        },
        Caption = "This is a caption"
      };

      return twitterOptions;
    }

    #endregion
  }
}