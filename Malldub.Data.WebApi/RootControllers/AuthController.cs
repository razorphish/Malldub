// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-04-2013
// Last Modified By : Antonio David Marasco
// Last Modified On : 04-23-2014
// ***********************************************************************
// <copyright file="AccountController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.Controllers
{
    #region Directives

    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration;
    using System.Globalization;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Security;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    using System.Web.Http.Description;

    using Malldub.Data;
    using Malldub.Data.Models;
    using Malldub.Helper;
    using Malldub.WebApi.Models;
    using Malldub.WebApi.Providers;
    using Malldub.WebApi.Results;
    using Malldub.WebApi.RootControllers;

    using Marasco.MailChimpApi;
    using Marasco.MailChimpApi.Models;
    using Marasco.WePay;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Owin.Security;
    using Microsoft.Owin.Security.Cookies;
    using Microsoft.Owin.Security.OAuth;

    using Account = Malldub.Data.Account;

    #endregion

    /// <summary>
    /// Class AccountController.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    /// <remarks>Malldub.remarks</remarks>
    [Authorize]
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        #region Constants

        /// <summary>
        /// The local login provider
        /// </summary>
        private const string LocalLoginProvider = "Local";

        #endregion

        #region Fields

        /// <summary>
        /// The _context
        /// </summary>
        private readonly MalldubDataContext _context = new MalldubDataContext();

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthController" /> class.
        /// </summary>
        /// <remarks>Malldub.remarks</remarks>
        public AuthController()
            : this(Startup.UserManagerFactory(), Startup.OAuthOptions.AccessTokenFormat, Startup.RoleManagerFactory()) {}

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthController" /> class.
        /// </summary>
        /// <param name="userManager">The user manager.</param>
        /// <param name="accessTokenFormat">The access token format.</param>
        /// <param name="roleManager">The role manager.</param>
        /// <remarks>Malldub.remarks</remarks>
        public AuthController(
            UserManager<ApplicationUser> userManager, 
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat, 
            RoleManager<ApplicationRole> roleManager)
        {
            // This allows email address as usernames
            userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
                                        {
                                            AllowOnlyAlphanumericUserNames
                                                = false
                                        };

            UserManager = userManager;
            RoleManager = roleManager;
            AccessTokenFormat = accessTokenFormat;
        }

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets the access token format.
        /// </summary>
        /// <value>The access token format.</value>
        /// <remarks>Malldub.remarks</remarks>
        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        /// <summary>
        /// Gets the role manager.
        /// </summary>
        /// <value>The role manager.</value>
        /// <remarks>Default Blank Remakrs Test</remarks>
        public RoleManager<ApplicationRole> RoleManager { get; private set; }

        /// <summary>
        /// Gets the user manager.
        /// </summary>
        /// <value>The user manager.</value>
        /// <remarks>Malldub.remarks</remarks>
        public UserManager<ApplicationUser> UserManager { get; private set; }

        #endregion

        #region Properties

        /// <summary>
        /// Gets the authentication.
        /// </summary>
        /// <value>The authentication.</value>
        /// <remarks>Malldub.remarks</remarks>
        private IAuthenticationManager Authentication
        {
            get
            {
                return Request.GetOwinContext().Authentication;
            }
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Adds the external login.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/AddExternalLogin</remarks>
        [Route("AddExternalLogin")]
        public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            if (ticket == null || ticket.Identity == null
                || (ticket.Properties != null && ticket.Properties.ExpiresUtc.HasValue
                    && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            {
                return BadRequest("External login failure.");
            }

            ExternalLoginData externalData = ExternalLoginData.FromIdentity(ticket.Identity);

            if (externalData == null)
            {
                return BadRequest("The external login is already associated with an account.");
            }

            IdentityResult result =
                await
                UserManager.AddLoginAsync(
                    string.IsNullOrWhiteSpace(model.UserId) ? User.Identity.GetUserId() : model.UserId, 
                    new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        /// <summary>
        /// Adds the external login to internal user.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task&lt;System.String&gt;.</returns>
        /// <exception cref="System.Data.Entity.ModelConfiguration.ModelValidationException">Model not validated</exception>
        /// <exception cref="System.Security.SecurityException">Unable to login
        /// or
        /// The external login is already associated with an account.
        /// or</exception>
        /// <exception cref="ModelValidationException">Model not validated</exception>
        /// <exception cref="SecurityException">Unable to login
        /// or
        /// The external login is already associated with an account.
        /// or</exception>
        /// <remarks>Default Blank Remakrs Test</remarks>
        public async Task<string> AddExternalLoginToInternalUser(AddExternalLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelValidationException("Model not validated");
            }

            Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            if (ticket == null || ticket.Identity == null
                || (ticket.Properties != null && ticket.Properties.ExpiresUtc.HasValue
                    && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            {
                throw new SecurityException("Unable to login");
            }

            ExternalLoginData externalData = ExternalLoginData.FromIdentity(ticket.Identity);

            if (externalData == null)
            {
                throw new SecurityException("The external login is already associated with an account.");
            }

            IdentityResult result =
                await
                UserManager.AddLoginAsync(
                    string.IsNullOrWhiteSpace(model.UserId) ? User.Identity.GetUserId() : model.UserId, 
                    new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                throw new SecurityException(errorResult.ToString());
            }

            return "OK";
        }

        /// <summary>
        /// Add Role,
        /// If Role Added Successfully then returns Ok.
        /// If Role Added !Successfully then returns Role with same name already exsits.
        /// </summary>
        /// <param name="addrole">Role Details View Model</param>
        /// <returns>OK</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("addRole")]
        public async Task<IHttpActionResult> AddRole(RoleDetailsViewModel addrole)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var roleName = addrole.Name;

                var applicationDbContext = new ApplicationDbContext();
                var roleManager = new RoleManager<ApplicationRole>(new RoleStore<ApplicationRole>(applicationDbContext));

                if (!roleManager.RoleExists(roleName))
                {
                    var roleResult = await roleManager.CreateAsync(new ApplicationRole(roleName));

                    if (!roleResult.Succeeded)
                    {
                        return GetErrorResult(roleResult);
                    }
                }
                else
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Changes the password.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/ChangePassword</remarks>
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result =
                await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
            IHttpActionResult errorResult = GetErrorResult(result);

            return errorResult ?? Ok();
        }

        /// <summary>
        /// Gets the external login.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <param name="error">The error.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>GET api/Account/ExternalLogin</remarks>
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            if (error != null)
            {
                var url = ConfigurationManager.AppSettings["ExternalRedirectOnError"];
                return Redirect(url + "#error=" + Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                var cr = new ChallengeResult(provider, this);
                return cr;
            }

            var identity = User.Identity as ClaimsIdentity;
            var externalLogin = ExternalLoginData.FromIdentity(identity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            var user =
                await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                GetUserRoles(user);

                var oauthIdentity = await UserManager.CreateIdentityAsync(user, OAuthDefaults.AuthenticationType);

                var cookieIdentity =
                    await UserManager.CreateIdentityAsync(user, CookieAuthenticationDefaults.AuthenticationType);
                var properties = ApplicationOAuthProvider.CreateProperties(user, GetUserRoles(user.Id));

                oauthIdentity.AddClaims(GetCustomClaims(identity, oauthIdentity));

                Authentication.SignIn(properties, oauthIdentity, cookieIdentity);
            }
            else
            {
                IEnumerable<Claim> claims = externalLogin.GetClaims();
                var identityClaim = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                Authentication.SignIn(identityClaim);

                // AM 2 lines
                var temp =
                    _context.AspNetUsersTemp.ByIdentification(identity.FindFirstValue("urn:facebook:id"))
                            .FirstOrDefault();
                if (temp != null)
                {
                    return Ok();
                }

                _context.AspNetUsersTemp.AddObject(GetUserTemp(identity));
                _context.SaveChanges();
            }

            return Ok();
        }

        /// <summary>
        /// Gets the external logins.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <param name="returnUrl">The return URL.</param>
        /// <param name="generateState">if set to <c>true</c> [generate state].</param>
        /// <returns>IEnumerable{ExternalLoginViewModel}.</returns>
        /// <remarks>Malldub.remarks</remarks>
        [AllowAnonymous]
        [Route("SingleExternalLogin")]
        public IEnumerable<ExternalLoginViewModel> GetExternalLogins(
            string provider, 
            string returnUrl, 
            bool generateState = false)
        {
            IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();

            string state;

            if (generateState)
            {
                const int StrengthInBits = 256;
                state = RandomOAuthStateGenerator.Generate(StrengthInBits);
            }
            else
            {
                state = null;
            }

            var ret =
                descriptions.Select(
                    description =>
                    new ExternalLoginViewModel
                    {
                        Name = description.Caption, 
                        Url =
                            Url.Route(
                                "ExternalLogin", 
                                new
                                {
                                    provider = description.AuthenticationType, 
                                    response_type = "token", 
                                    client_id = Startup.PublicClientId, 
                                    redirect_uri =
                            new Uri(Request.RequestUri, returnUrl).AbsoluteUri, 
                                    state
                                }), 
                        State = state
                    }).Where(desc => desc.Name == provider).ToList();

            return ret;
        }

        /// <summary>
        /// Gets the external logins.
        /// </summary>
        /// <param name="returnUrl">The return URL.</param>
        /// <param name="generateState">if set to <c>true</c> [generate state].</param>
        /// <returns>IEnumerable{ExternalLoginViewModel}.</returns>
        /// <remarks>Malldub.remarks</remarks>
        [AllowAnonymous]
        [Route("ExternalLogins")]
        public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
        {
            IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();

            string state;

            if (generateState)
            {
                const int StrengthInBits = 256;
                state = RandomOAuthStateGenerator.Generate(StrengthInBits);
            }
            else
            {
                state = null;
            }

            var ret =
                descriptions.Select(
                    description =>
                    new ExternalLoginViewModel
                    {
                        Name = description.Caption, 
                        Url =
                            Url.Route(
                                "ExternalLogin", 
                                new
                                {
                                    provider = description.AuthenticationType, 
                                    response_type = "token", 
                                    client_id = Startup.PublicClientId, 
                                    redirect_uri =
                            new Uri(Request.RequestUri, returnUrl).AbsoluteUri, 
                                    state
                                }), 
                        State = state
                    }).ToList();

            return ret;
        }

        /// <summary>
        /// Gets the manage information.
        /// </summary>
        /// <param name="returnUrl">The return URL.</param>
        /// <param name="generateState">if set to <c>true</c> [generate state].</param>
        /// <returns>Task{ManageInfoViewModel}.</returns>
        /// <remarks>Malldub.remarks</remarks>
        [Route("ManageInfo")]
        public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
        {
            ApplicationUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            if (user == null)
            {
                return null;
            }

            var logins =
                user.Logins.Select(
                    linkedAccount =>
                    new UserLoginInfoViewModel
                    {
                        LoginProvider = linkedAccount.LoginProvider, 
                        ProviderKey = linkedAccount.ProviderKey
                    }).ToList();

            if (user.PasswordHash != null)
            {
                logins.Add(
                    new UserLoginInfoViewModel { LoginProvider = LocalLoginProvider, ProviderKey = user.UserName, });
            }

            return new ManageInfoViewModel
                   {
                       LocalLoginProvider = LocalLoginProvider, 
                       UserName = user.UserName, 
                       Logins = logins, 
                       ExternalLoginProviders = GetExternalLogins(returnUrl, generateState)
                   };
        }

        /// <summary>
        /// Get Details for user is currently logged in
        /// </summary>
        /// <returns>Details for user is currently logged in</returns>
        /// <remarks>Fill in the blank</remarks>
        [ResponseType(typeof(UserDetailsViewModel))]
        [AllowAnonymous]
        [Route("GetUserDetails")]
        public UserDetailsViewModel GetUserDetails()
        {
            try
            {
                var id = User.Identity.GetUserId();

                var objDbContext = new ApplicationDbContext();

                var userDetails =
                    objDbContext.Users.Where(x => x.Id == id)
                                .Select(
                                    x =>
                                    new UserDetailsViewModel
                                    {
                                        Email = x.Email, 
                                        FirstName = x.FirstName, 
                                        LastName = x.LastName, 
                                        UserName = x.UserName
                                    })
                                .SingleOrDefault();
                return userDetails;
            }
            // catch (Exception ex)
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Gets the user information.
        /// </summary>
        /// <returns>UserInfoViewModel.</returns>
        /// <remarks>GET api/Account/UserInfo</remarks>
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);
            var userName = User.Identity.GetUserName();

            if (string.IsNullOrWhiteSpace(userName) && externalLogin != null)
            {
                userName = externalLogin.Email;
            }

            var user = _context.AspNetUser.ByUserName(userName).Include("AspNetUserLoginList").FirstOrDefault();
            var facebookProvider = new ProviderModel();
            if (user != null)
            {
                var provider =
                    user.AspNetUserLoginList.Select(anul => new { anul.LoginProvider, anul.ProviderKey, })
                        .FirstOrDefault(anu => anu.LoginProvider == "Facebook");
                if (provider != null)
                {
                    facebookProvider = new ProviderModel
                                       {
                                           Provider = provider.LoginProvider, 
                                           ProviderKey = provider.ProviderKey, 
                                           Found = true
                                       };
                }
            }

            var userInfo = new UserInfoViewModel
                           {
                               UserName = userName, 
                               HasRegistered = user != null, 
                               HasRegisteredExternal = externalLogin == null, 
                               LoginProvider =
                                   externalLogin != null ? externalLogin.LoginProvider : null, 
                               LastName = user != null ? user.LastName : string.Empty, 
                               FirstName = user != null ? user.FirstName : string.Empty, 
                               IsAuthenticated = User.Identity.IsAuthenticated, 
                               Email = user != null ? user.Email : string.Empty, 
                               StatusId = user != null ? user.StatusId : null, 
                               FacebookProvider = facebookProvider, 
                               Identification = user != null ? user.Identification : null, 
                           };

            if (externalLogin == null)
            {
                return userInfo;
            }

            switch (externalLogin.LoginProvider)
            {
                case "Facebook":
                case "Google":
                    userInfo.Email = userInfo.Email.Length > 0 ? userInfo.Email : externalLogin.Email;
                    userInfo.LastName = userInfo.LastName.Length > 0 ? userInfo.LastName : externalLogin.LastName;
                    userInfo.FirstName = userInfo.FirstName.Length > 0 ? userInfo.FirstName : externalLogin.FirstName;
                    break;
            }

            return userInfo;
        }

        /// <summary>
        /// Determines whether [is in provider] [the specified provider].
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <returns>A provider</returns>
        /// <remarks>Default Blank Remakrs Test</remarks>
        [Route("IsInProvider")]
        [HttpGet]
        public HttpResponseMessage IsInProvider(string provider)
        {
            var userId = User.Identity.GetUserId();

            var logins = _context.AspNetUserLogin.ByUserId(userId);

            var check = logins.Any(l => l.LoginProvider == "Facebook");

            return Request.CreateResponse(HttpStatusCode.OK, new ProviderModel { Provider = provider, Found = check });
        }

        /// <summary>
        /// Logouts this instance.
        /// </summary>
        /// <returns>IHttpActionResult.</returns>
        /// <remarks>POST api/Account/Logout</remarks>
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        /// <summary>
        /// Posts the claim.
        /// </summary>
        /// <param name="claimRequest">The claim request.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Default Blank Remakrs Test</remarks>
        [Route("Claim")]
        [HttpPost]
        public async Task<IHttpActionResult> PostClaim(PostClaimRequest claimRequest)
        {
            var identity = User.Identity as ClaimsIdentity;
            const string CLAIM_TYPE = "urn:facebook:access_token";

            if (identity != null)
            {
                switch (claimRequest.ClaimType)
                {
                    case "Facebook":
                        var claims = _context.AspNetUserClaim.ByUserId(identity.GetUserId());
                        var exist = claims.Any(c => c.ClaimValue == claimRequest.Val && c.ClaimType == CLAIM_TYPE);

                        if (!exist)
                        {
                            if (claims.Any(c => c.ClaimType == CLAIM_TYPE))
                            {
                                _context.AspNetUserClaim.DeleteObject(
                                    claims.FirstOrDefault(c => c.ClaimType == CLAIM_TYPE));
                                _context.SaveChanges();
                            }

                            await
                                UserManager.AddClaimAsync(
                                    identity.GetUserId(), 
                                    new Claim(
                                        CLAIM_TYPE, 
                                        claimRequest.Val, 
                                        "http://www.w3.org/2001/XMLSchema#string", 
                                        "Facebook"));
                        }

                        break;
                    default:
                        return ResponseMessage(Request.CreateResponse(HttpStatusCode.NotFound, "claimType not found"));
                }
            }
            else
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.Forbidden));
            }

            return Ok();
        }

        /// <summary>
        /// Registers the specified model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/Register</remarks>
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser(model);
            var accountId = Guid.NewGuid().ToString();
            CreateAccount(accountId);
            user.AccountId = accountId;
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            // Must be created after user
            try
            {
                var ft = new FundTeamController();
                ft.AddNewUserToTeams(user.Email, user.Id);
                WePayController.CreateGateWayAccounts(accountId, user, model.Geo, true);

                // MandrillController.SendWelcomeMessage(new UserInfoViewModel
                //                                      {
                //                                          Email = user.Email,
                //                                          FirstName = user.FirstName,
                //                                          LastName = user.LastName
                //                                      });
                // Add to MailChimp
                var mc = new MailChimpController();
                await mc.CreateMailChimpSubscriber(
                  user, 
                  model.Geo,
                  workflowId: ConfigurationManager.AppSettings["MailChimpAutomationWelcome"],
                  workflowTriggerId: ConfigurationManager.AppSettings["MailChimpAutomationWelcomeTrigger1"]);
            }
            catch (WePayException we)
            {
                // Dont'throw error, just inform user
                Ok(we);
            }

            IHttpActionResult errorResult = GetErrorResult(result);

            return errorResult ?? Ok();
        }

        /// <summary>
        /// Registers the specified model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/Register</remarks>
        [AllowAnonymous]
        [Route("RegisterAnonymous")]
        public async Task<IHttpActionResult> RegisterAnonymous(RegisterAnonymousBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = new ApplicationUser(model);
                var accountId = Guid.NewGuid().ToString();
                CreateAccount(accountId);
                user.AccountId = accountId;

                IdentityResult result = await UserManager.CreateAsync(user);

                IHttpActionResult errorResult = GetErrorResult(result);

                if (errorResult != null)
                {
                    return errorResult;
                }

                // Add to MailChimp
                var mc = new MailChimpController();
                await mc.CreateMailChimpSubscriber(
                  user,
                  model.Geo,
                  workflowId: ConfigurationManager.AppSettings["MailChimpAutomationWelcome"],
                  workflowTriggerId: ConfigurationManager.AppSettings["MailChimpAutomationWelcomeTrigger1"]);

                // WePayController.CreateGateWayAccounts(accountId, user, model.Geo);
                return Ok(new RegisterAnonymousReturnModel { Identification = user.Id });
            }
            catch (Exception esException)
            {
                var message = esException.Message;
                throw;
            }
        }

        /// <summary>
        /// Registers the external.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/RegisterExternal</remarks>
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            // Check if user exists
            var existingUser = _context.AspNetUser.ByUserName(externalLogin.Email).FirstOrDefault();

            if (existingUser == null)
            {
                var user = new ApplicationUser(model);
                var accountId = Guid.NewGuid().ToString();
                CreateAccount(accountId);
                user.AccountId = accountId;

                user.Logins.Add(
                    new IdentityUserLogin
                    {
                        LoginProvider = externalLogin.LoginProvider, 
                        ProviderKey = externalLogin.ProviderKey
                    });
                IdentityResult result = await UserManager.CreateAsync(user, model.Password);
                IHttpActionResult errorResult = GetErrorResult(result);

                if (errorResult != null)
                {
                    return errorResult;
                }

                if (!model.DisableWePay)
                {
                    // Must be created after user
                    WePayController.CreateGateWayAccounts(accountId, user, model.Geo, true);
                }

                // Add to MailChimp
                var mc = new MailChimpController();
                await mc.CreateMailChimpSubscriber(
                  user,
                  model.Geo,
                  workflowId: ConfigurationManager.AppSettings["MailChimpAutomationWelcome"],
                  workflowTriggerId: ConfigurationManager.AppSettings["MailChimpAutomationWelcomeTrigger1"]);

                model.Token = GetUserTempToken(externalLogin, model);
                switch (externalLogin.LoginProvider)
                {
                    case "Facebook":
                        AddFacebookClaim(model.Token, user.Id);
                        break;
                }

                //MandrillController.SendWelcomeMessage(new UserInfoViewModel
                //{
                //    Email = user.Email,
                //    FirstName = user.FirstName,
                //    LastName = user.LastName
                //});
                return Ok();
            }

            var str =
                await
                AddExternalLoginToInternalUser(
                    new AddExternalLoginBindingModel
                    {
                        ExternalAccessToken = model.Token, 
                        UserId = existingUser.Identification
                    });
            return Ok(str);
        }

        /// <summary>
        /// Removes the login.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/RemoveLogin</remarks>
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
            }
            else
            {
                result =
                    await
                    UserManager.RemoveLoginAsync(
                        User.Identity.GetUserId(), 
                        new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        /// <summary>
        /// Resets the password.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task&lt;IHttpActionResult&gt;.</returns>
        /// <remarks>Default Blank Remakrs Test</remarks>
        [Route("ResetPassword")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _context.AspNetUser.ByEmail(model.Email).FirstOrDefault();

            if (user == null)
            {
                return BadRequest("User Not Found");
            }

            var r = new RandomStringGenerator(useSpecialCharacters: false);
            var password = r.Generate(6, 7);

            IdentityResult result = await UserManager.RemovePasswordAsync(user.Identification);
            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            // Determine if user password change was successful
            IdentityResult changeResult = await UserManager.AddPasswordAsync(user.Identification, password);
            IHttpActionResult errorChangeResult = GetErrorResult(changeResult);

            if (errorChangeResult != null)
            {
                return errorChangeResult;
            }

            // Email Success
            var results =
                MandrillController.SendPasswordReset(
                    new UserInfoViewModel { FirstName = user.FirstName, LastName = user.LastName, Email = user.Email }, 
                    password);

            return Ok();
        }

        /// <summary>
        /// Sets the password.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Task{IHttpActionResult}.</returns>
        /// <remarks>POST api/Account/SetPassword</remarks>
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);
            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        /// <summary>
        /// Update Role,
        /// If Role Updated Successfully then returns Ok.
        /// If Role Updated !Successfully then returns Role with same name already exsits.
        /// </summary>
        /// <param name="updaterole">update role model</param>
        /// <returns>Ok</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("UpdateRole")]
        public IHttpActionResult UpdateRole(UpdateRoleBindingModel updaterole)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var roleName = updaterole.name;
                var id = updaterole.id ?? updaterole.identification;

                var context = new ApplicationDbContext();
                var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
                var role = context.Roles.SingleOrDefault(x => x.Id == id);

                role.Name = updaterole.name;
                role.Id = updaterole.id ?? updaterole.identification;

                if (!roleManager.RoleExists(roleName))
                {
                    var roleResult = roleManager.Update(role);
                    if (!roleResult.Succeeded)
                    {
                        return GetErrorResult(roleResult);
                    }
                }
                else
                {
                    return BadRequest("Role with the same name already exist.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Update User By Id,
        /// If User Updated Successfully then returns Ok.
        /// If User Updated !Successfully then returns :
        /// 1. Email address already exists.
        /// 2. Minimum 2 characters are required for First Name/last Name.
        /// </summary>
        /// <param name="model">User binding Model</param>
        /// <returns>OK</returns>
        [AllowAnonymous]
        [Route("UpdateUserById")]
        public async Task<IHttpActionResult> UpdateUserById(UpdateUserBindingModel model)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

                if (user != null)
                {
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.Email = model.Email;
                }

                var result = await UserManager.UpdateAsync(user);

                return !result.Succeeded ? GetErrorResult(result) : Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Methods

        /// <summary>
        /// Adds the facebook claim.
        /// </summary>
        /// <param name="token">The token.</param>
        /// <param name="userId">The user identifier.</param>
        /// <exception cref="System.Web.Http.HttpResponseException"></exception>
        /// <exception cref="HttpResponseMessage"></exception>
        /// <remarks>Fill in the blank</remarks>
        internal void AddFacebookClaim(string token, string userId)
        {
            var claims = _context.AspNetUserClaim.ByUserId(userId);
            var exist = claims.Any(c => c.ClaimValue == token && c.ClaimType == FacebookController.CLAIM_TYPE);

            if (exist)
            {
                return;
            }

            if (claims.Any(c => c.ClaimType == FacebookController.CLAIM_TYPE))
            {
                var claim = claims.FirstOrDefault(c => c.ClaimType == FacebookController.CLAIM_TYPE);
                if (claim != null)
                {
                    var claimType = _context.AspNetUserClaim.GetByKey(claim.Identification);

                    if (claimType == null)
                    {
                        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
                    }

                    claim.ClaimValue = token;
                    _context.ApplyCurrentValues(claimType.EntityKey.EntitySetName, claim);
                }
            }
            else
            {
                _context.AspNetUserClaim.AddObject(
                    new AspNetUserClaim
                    {
                        ClaimType = FacebookController.CLAIM_TYPE, 
                        UserId = userId, 
                        ClaimValue = token
                    });
            }

            _context.SaveChanges();
        }

        /// <summary>
        /// Creates the account.
        /// </summary>
        /// <param name="accountId">The account identifier.</param>
        /// <remarks>Default Blank Remakrs Test</remarks>
        internal void CreateAccount(string accountId)
        {
            _context.Account.AddObject(new Account { StatusId = "Active", Identification = accountId });
            _context.SaveChanges();
        }

        /// <summary>
        /// Gets the user temporary.
        /// </summary>
        /// <param name="facebookIdentity">The facebook identity.</param>
        /// <returns>AspNetUsersTemp.</returns>
        /// <remarks>Fill in the blank</remarks>
        internal AspNetUsersTemp GetUserTemp(ClaimsIdentity facebookIdentity)
        {
            var facebookToken = facebookIdentity.FindFirstValue("urn:facebook:access_token");
            var facebookId = facebookIdentity.FindFirstValue("urn:facebook:id");

            return new AspNetUsersTemp { Identification = facebookId, Token = facebookToken };
        }

        /// <summary>
        /// Gets the error result.
        /// </summary>
        /// <param name="result">The result.</param>
        /// <returns>IHttpActionResult.</returns>
        /// <remarks>Malldub.remarks</remarks>
        protected internal IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        /// <summary>
        /// Releases the unmanaged resources that are used by the object and, optionally, releases the managed resources.
        /// </summary>
        /// <param name="disposing">true to release both managed and unmanaged resources; false to release only unmanaged resources.</param>
        /// <remarks>Malldub.remarks</remarks>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UserManager.Dispose();
            }

            base.Dispose(disposing);
        }

        /// <summary>
        /// Gets the custom claims.
        /// </summary>
        /// <param name="facebookIdentity">The facebookIdentity.</param>
        /// <param name="systemIdentity">The system identity.</param>
        /// <returns>IEnumerable&lt;Claim&gt;.</returns>
        /// <remarks>Default Blank Remakrs Test</remarks>
        private IEnumerable<Claim> GetCustomClaims(ClaimsIdentity facebookIdentity, ClaimsIdentity systemIdentity)
        {
            var claims = new List<Claim>();
            var facebookToken = facebookIdentity.FindFirstValue("urn:facebook:access_token");
            var facebookId = facebookIdentity.FindFirstValue("urn:facebook:id");

            var facebookClaim = new Claim("urn:facebook:access_token", facebookToken);
            var facebookIdClaim = new Claim("urn:facebook:id", facebookId);

            claims.Add(facebookClaim);
            claims.Add(facebookIdClaim);
            AddFacebookClaim(facebookToken, systemIdentity.GetUserId());

            return claims;
        }

        /// <summary>
        /// Gets the user roles.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>System.String.</returns>
        /// <remarks>Fill in the blank</remarks>
        private string GetUserRoles(string userId)
        {
            var sb = new StringBuilder();

            var user = _context.AspNetUser.Include("AspNetRoleList").GetByIdentification(userId);

            foreach (var role in user.AspNetRoleList)
            {
                sb.Append(sb.Length == 0 ? role.Name : string.Format(",{0}", role.Name));
            }

            return sb.ToString();
        }

        /// <summary>
        /// Gets the user roles.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <remarks>Default Blank Remakrs Test</remarks>
        private void GetUserRoles(ApplicationUser user)
        {
            var internalUser = _context.AspNetUser.ByIdentification(user.Id).Include("AspNetRoleList").FirstOrDefault();

            if (internalUser == null)
            {
                return;
            }

            foreach (var role in internalUser.AspNetRoleList)
            {
                user.Roles.Add(
                    new IdentityUserRole
                    {
                        Role = new IdentityRole(role.Name), 
                        User = user, 
                        UserId = user.Id, 
                        RoleId = role.Identification
                    });
            }
        }

        /// <summary>
        /// Gets the user temporary token.
        /// </summary>
        /// <param name="externalLogin">The external login.</param>
        /// <param name="model">The model.</param>
        /// <returns>System.String.</returns>
        /// <remarks>Fill in the blank</remarks>
        private string GetUserTempToken(ExternalLoginData externalLogin, RegisterExternalBindingModel model)
        {
            var user = _context.AspNetUsersTemp.ByIdentification(externalLogin.ProviderKey).FirstOrDefault();

            if (user == null)
            {
                return model.Token;
            }

            var token = user.Token;
            _context.AspNetUsersTemp.DeleteObject(user);
            _context.SaveChanges();
            return token;
        }

        #endregion

        /// <summary>
        /// Class RandomOAuthStateGenerator.
        /// </summary>
        /// <remarks>Malldub.remarks</remarks>
        private static class RandomOAuthStateGenerator
        {
            #region Static Fields

            /// <summary>
            /// The _random
            /// </summary>
            private static readonly RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            #endregion

            #region Public Methods and Operators

            /// <summary>
            /// Generates the specified strength information bits.
            /// </summary>
            /// <param name="strengthInBits">The strength information bits.</param>
            /// <returns>System.String.</returns>
            /// <exception cref="System.ArgumentException">strengthInBits must be evenly divisible by 8.;strengthInBits</exception>
            /// <exception cref="ArgumentException">strengthInBits must be evenly divisible by 8.;strengthInBits</exception>
            /// <remarks>Malldub.remarks</remarks>
            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                var data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }

            #endregion
        }

        /// <summary>
        /// Class ExternalLoginData.
        /// </summary>
        /// <remarks>Malldub.remarks</remarks>
        internal class ExternalLoginData
        {
            #region Public Properties

            /// <summary>
            /// Gets or sets the email.
            /// </summary>
            /// <value>The email.</value>
            /// <remarks>Default Blank Remakrs Test</remarks>
            public string Email { get; set; }

            /// <summary>
            /// Gets or sets the first name.
            /// </summary>
            /// <value>The first name.</value>
            /// <remarks>Default Blank Remakrs Test</remarks>
            public string FirstName { get; set; }

            /// <summary>
            /// Gets or sets the last name.
            /// </summary>
            /// <value>The last name.</value>
            /// <remarks>Default Blank Remakrs Test</remarks>
            public string LastName { get; set; }

            /// <summary>
            /// Gets or sets the login provider.
            /// </summary>
            /// <value>The login provider.</value>
            /// <remarks>Malldub.remarks</remarks>
            public string LoginProvider { get; set; }

            /// <summary>
            /// Gets or sets the provider key.
            /// </summary>
            /// <value>The provider key.</value>
            /// <remarks>Malldub.remarks</remarks>
            public string ProviderKey { get; set; }

            /// <summary>
            /// Gets or sets the name of the user.
            /// </summary>
            /// <value>The name of the user.</value>
            /// <remarks>Malldub.remarks</remarks>
            public string UserName { get; set; }

            #endregion

            #region Public Methods and Operators

            /// <summary>
            /// Froms the facebookIdentity.
            /// </summary>
            /// <param name="identity">The facebookIdentity.</param>
            /// <returns>ExternalLoginData.</returns>
            /// <remarks>Malldub.remarks</remarks>
            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || string.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || string.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return SetExternalLoginData(providerKeyClaim, identity);
            }

            /// <summary>
            /// Gets the claims.
            /// </summary>
            /// <returns>IList{Claim}.</returns>
            /// <remarks>Malldub.remarks</remarks>
            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                switch (LoginProvider)
                {
                    case "Facebook":
                        claims.Add(new Claim(ClaimTypes.Email, Email, null, LoginProvider));
                        claims.Add(new Claim("urn:facebook:first_name", FirstName, null, LoginProvider));
                        claims.Add(new Claim("urn:facebook:last_name", LastName, null, LoginProvider));
                        break;
                    case "Google":
                        claims.Add(new Claim(ClaimTypes.Email, Email, null, LoginProvider));
                        claims.Add(new Claim(ClaimTypes.GivenName, FirstName, null, LoginProvider));
                        claims.Add(new Claim(ClaimTypes.Surname, LastName, null, LoginProvider));
                        break;
                }

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            #endregion

            #region Methods

            /// <summary>
            /// Sets the external login data.
            /// </summary>
            /// <param name="providerKeyClaim">The provider key claim.</param>
            /// <param name="identity">The facebookIdentity.</param>
            /// <returns>ExternalLoginData.</returns>
            /// <remarks>Default Blank Remakrs Test</remarks>
            private static ExternalLoginData SetExternalLoginData(Claim providerKeyClaim, ClaimsIdentity identity)
            {
                var extData = new ExternalLoginData
                              {
                                  LoginProvider = providerKeyClaim.Issuer, 
                                  ProviderKey = providerKeyClaim.Value, 
                                  UserName = identity.FindFirstValue(ClaimTypes.Email), 
                                  Email = identity.FindFirstValue(ClaimTypes.Email)
                              };

                switch (providerKeyClaim.Issuer)
                {
                    case "Facebook":
                        extData.FirstName = identity.FindFirstValue("urn:facebook:first_name");
                        extData.LastName = identity.FindFirstValue("urn:facebook:last_name");
                        break;
                    case "Google":
                        extData.FirstName = identity.FindFirstValue(ClaimTypes.GivenName);
                        extData.LastName = identity.FindFirstValue(ClaimTypes.Surname);
                        break;
                }

                return extData;
            }

            #endregion
        }
    }
}