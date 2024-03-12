namespace Malldub.WebApi.Providers
{
    #region Directives

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Malldub.Data;
    using Malldub.WebApi.Models;

    using Microsoft.AspNet.Identity;
    using Microsoft.Owin.Security;
    using Microsoft.Owin.Security.Cookies;
    using Microsoft.Owin.Security.OAuth;

    using ServiceStack;

    #endregion

    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        #region Fields

        private readonly string _publicClientId;

        private readonly Func<UserManager<ApplicationUser>> _userManagerFactory;

        private readonly MalldubDataContext _context = new MalldubDataContext();

        #endregion

        #region Constructors and Destructors

        public ApplicationOAuthProvider(string publicClientId, Func<UserManager<ApplicationUser>> userManagerFactory)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            if (userManagerFactory == null)
            {
                throw new ArgumentNullException("userManagerFactory");
            }

            _publicClientId = publicClientId;
            _userManagerFactory = userManagerFactory;
        }

        #endregion

        #region Public Methods and Operators

        public static AuthenticationProperties CreateProperties(ApplicationUser user, string roles)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
                                               {
                                                   { "userName", user.UserName }, 
                                                   { "firstName", user.FirstName },
                                                   { "lastName", user.LastName},
                                                   { "email", user.Email },
                                                   { "userRole", "user" }, 
                                                   { "roles", roles }
                                               };

            return new AuthenticationProperties(data);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (UserManager<ApplicationUser> userManager = _userManagerFactory())
            {
                ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                ClaimsIdentity oAuthIdentity =
                    await userManager.CreateIdentityAsync(user, context.Options.AuthenticationType);
                ClaimsIdentity cookiesIdentity =
                    await userManager.CreateIdentityAsync(user, CookieAuthenticationDefaults.AuthenticationType);
                AuthenticationProperties properties = CreateProperties(user, GetUserRoles(user.Id));
                AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
                context.Validated(ticket);
                context.Request.Context.Authentication.SignIn(cookiesIdentity);
            }
        }

        private string GetUserRoles(string userId)
        {
            var sb = new StringBuilder();

            var user =
                _context.AspNetUser
                       .Include("AspNetRoleList")
                       .GetByIdentification(userId);

            foreach (var role in user.AspNetRoleList)
            {
                sb.Append(sb.Length == 0 ? role.Name : string.Format(",{0}", role.Name));
            }

            return sb.ToString();
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId != _publicClientId)
            {
                return Task.FromResult<object>(null);
            }

            var expectedRootUri = new Uri(context.Request.Uri, "/");

            if (expectedRootUri.AbsoluteUri == context.RedirectUri)
            {
                context.Validated();
            }
            else
            {
                switch (context.RedirectUri)
                {
                    case "http://local.miracleofmiracles.org/authenticate":
                    case "http://miracles.azurewebsites.net/authenticate":

                    case "http://www.miracleofmiracles.org/authenticate":
                    case "https://www.miracleofmiracles.org/authenticate":

                    case "http://local.fundingmiracles.com/authenticate":
                    case "http://www.fundingmiracles.com/authenticate":
                    case "http://staging.fundingmiracles.com/authenticate":

                    case "http://local.admin.fundingmiracles.com/authenticate":
                    case "http://admin.fundingmiracles.com/authenticate":
                    case "http://admin-staging.fundingmiracles.com/authenticate":

                    case "https://www.fundingmiracles.com/authenticate":
                    case "https://admin.fundingmiracles.com/authenticate":
                    case "https://staging.fundingmiracles.com/authenticate":

                        context.Validated();
                        break;
                }

                // Or by host
                var redirectUri = new Uri(context.RedirectUri);
                switch (redirectUri.DnsSafeHost)
                {
                    case "local.fundingmiracles.com":
                    case "qa.fundingmiracles.com":
                    case "staging.fundingmiracles.com":
                    case "www.fundingmiracles.com":
                        context.Validated();
                        break;
                }
            }

            return Task.FromResult<object>(null);
        }

        #endregion
    }
}