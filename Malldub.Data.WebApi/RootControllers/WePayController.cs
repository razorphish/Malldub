// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 01-03-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 02-26-2015
// ***********************************************************************
// <copyright file="WePayController.cs" company="Maras, co">
//     Copyright (c) Maras,co. All rights reserved.
// </copyright>
// <summary>The we pay controller.</summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Globalization;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web;
    using System.Web.Http;

    using Malldub.Data;
    using Malldub.Data.Models;
    using Malldub.Helper;
    using Malldub.WebApi.Models;

    using Marasco.WePay;
    using Marasco.WePay.Models;

    using Microsoft.Ajax.Utilities;
    using Microsoft.AspNet.Identity;

    using Newtonsoft.Json;

    using Account = Marasco.WePay.Account;

    #endregion

  /// <summary>
  /// The we pay controller.
  /// </summary>
  [RoutePrefix("api/wepay")]
  [Authorize]
  public class WePayController : ApiController
  {
    #region Fields

    /// <summary>
    /// The _context
    /// </summary>
    private readonly MalldubDataContext _context = new MalldubDataContext();

    private const string GATEWAY_ID = "WePay";

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// The authorize.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>The <see cref="HttpResponseMessage" />.</returns>
    [Route("authorize")]
    public HttpResponseMessage Authorize(TokenRequest value)
    {
      try
      {
        value.ClientSecret = WePayConfig.clientSecret;
        value.ClientId = WePayConfig.clientId;
        Process(value);

        return Request.CreateResponse(HttpStatusCode.OK);
      }
      catch (WePayException we)
      {
        return Request.CreateResponse(
          HttpStatusCode.BadRequest, 
          new ErrorResponse
          {
            Error            = we.Error, 
            ErrorCode        = we.ErrorCode, 
            ErrorDescription = we.ErrorDescription, 
            ErrorMessage     = we.ErrorMessage
          });
      }
    }

    /// <summary>
    /// The get account.
    /// </summary>
    /// <returns>The <see cref="HttpResponseMessage" />.</returns>
    [Route("account")]
    [HttpGet]
    public HttpResponseMessage GetAccount()
    {
      var gatewayUser = _context
        .AspNetUserGateway
        .ByAspNetUserId(User.Identity.GetUserId())
        .ByGatewayId(GATEWAY_ID)
        .FirstOrDefault();

      if (gatewayUser == null)
      {
        return Request.CreateResponse(
          HttpStatusCode.NotFound, 
          new { Email = string.Empty, UserState = "not registered" });
      }

      try
      {
        var accountId = Convert.ToInt64(gatewayUser.AccountId);
        var res = GetAccount(accountId, gatewayUser.AccessToken);
        return Request.CreateResponse(HttpStatusCode.OK, res);
      }
      catch (WePayException we)
      {
        return Request.CreateResponse(
          HttpStatusCode.BadRequest, 
          new ErrorResponse
          {
            Error = we.Error, 
            ErrorCode = we.ErrorCode, 
            ErrorDescription = we.ErrorDescription, 
            ErrorMessage = we.ErrorMessage
          });
      }
      catch (Exception exc)
      {
        if (exc is FormatException || exc is OverflowException)
        {
          return Request.CreateResponse(
            HttpStatusCode.BadRequest, 
            new ErrorResponse
            {
              Error = "Invalid account Id", 
              ErrorCode = "1006", 
              ErrorDescription = "Missing or corrupt account Id", 
              ErrorMessage = exc.Message
            });
        }

        return Request.CreateResponse(HttpStatusCode.InternalServerError);
      }
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <param name="query">The query.</param>
    /// <returns>HttpResponseMessage.</returns>
    [HttpPost]
    // [Route("ipn/{:userId?}")]
    [Route("ipn")]
    [AllowAnonymous]
    public HttpResponseMessage Ipn([FromBody] WePayIpnModel value, [FromUri] WePayIpnQuery query)
    {

        var objectAction = DetermineAction(value);

        value.reference_id = HttpUtility.HtmlEncode(value.reference_id);

        HttpResponseMessage response;

        switch (objectAction)
        {
            case "account":
                if (IpnNotificationForAccount(value, out response))
                {
                    return response;
                }

                break;
            case "withdrawal":
                if (IpnNotificationForWithdrawal(value, out response))
                {
                    return response;
                }

                break;
        }

        return Request.CreateResponse(HttpStatusCode.OK);
    }

      /// <summary>
    /// The resend confirmation.
    /// </summary>
    /// <returns>The <see cref="HttpResponseMessage" />.</returns>
    [Route("resendConfirmation")]
    public HttpResponseMessage ResendConfirmation()
    {
      var gatewayUser = _context
        .AspNetUserGateway
        .ByAspNetUserId(User.Identity.GetUserId())
        .ByGatewayId(GATEWAY_ID)
        .FirstOrDefault();

      if (gatewayUser == null)
      {
        return Request.CreateResponse(
          HttpStatusCode.NotFound, 
          new { Email = string.Empty, UserState = "not registered" });
      }

      try
      {
        var response =
          UserResendConfirmation(
            new UserResendConfirmationRequest
            {
              accessToken = gatewayUser.AccessToken, 
              EmailMessage =
                ConfigurationManager.AppSettings["WePayUserResendConfirmationMessage"]
            });

        return Request.CreateResponse(HttpStatusCode.OK, response);
      }
      catch (WePayException we)
      {
        return Request.CreateResponse(
          HttpStatusCode.BadRequest, 
          new ErrorResponse
          {
            Error = we.Error, 
            ErrorCode = we.ErrorCode, 
            ErrorDescription = we.ErrorDescription, 
            ErrorMessage = we.ErrorMessage
          });
      }
    }

    /// <summary>
    /// The verify.
    /// </summary>
    /// <returns>The <see cref="HttpResponseMessage" />.</returns>
    [Route("verify")]
    [AllowAnonymous]
    public HttpResponseMessage Verify()
    {
      if (!User.Identity.IsAuthenticated)
      {
        return Request.CreateResponse(
          HttpStatusCode.NotFound,
          new { Email = string.Empty, UserState = "not registered" });
      }

      var user = _context
        .AspNetUserGateway
        .ByAspNetUserId(User.Identity.GetUserId())
        .ByGatewayId(GATEWAY_ID)
        .FirstOrDefault();

      if (user == null)
      {
        return Request.CreateResponse(
          HttpStatusCode.NotFound, 
          new { Email = string.Empty, UserState = "not registered" });
      }

      var resp = SaveChanges(user);

      // Now check the account
      return resp.WePayUser.State == user.UserState
         ? Request.CreateResponse(HttpStatusCode.OK, resp)
         : Request.CreateResponse(
           HttpStatusCode.InternalServerError,
           new
           {
             resp.WePayUser.State,
             resp.WePayUser.Error.ErrorCode,
             resp.WePayUser.Error.Error,
             resp.WePayUser.Error.ErrorDescription,
             resp.WePayUser.Error.ErrorMessage
           });
    }

    /// <summary>
    /// The withdraw.
    /// </summary>
    /// <returns>The <see cref="HttpResponseMessage" />.</returns>
    [Route("withdraw")]
    [HttpPost]
    public HttpResponseMessage Withdraw()
    {
      var gatewayUser = _context
        .AspNetUserGateway
        .ByAspNetUserId(User.Identity.GetUserId())
        .ByGatewayId(GATEWAY_ID)
        .FirstOrDefault();

      if (gatewayUser == null)
      {
        return Request.CreateResponse(
          HttpStatusCode.NotFound, 
          new { Email = string.Empty, UserState = "not registered" });
      }

      try
      {
        var accountId = Convert.ToInt64(gatewayUser.AccountId);

        var withdrawReq = new WithdrawalCreateRequest
                          {
                            AccountId = accountId, 
                            accessToken = gatewayUser.AccessToken, 
                            Currency = "USD", 
                            Note = "Withdrawing from the Funding Miracles platform", 
                            RedirectUri =
                              ConfigurationManager.AppSettings["WePayWithdrawRedirect"], 
                            CallbackUri =
                              ConfigurationManager.AppSettings["WePayWithdrawCallback"], 
                            FallbackUri =
                              ConfigurationManager.AppSettings["WePayWithdrawFallback"]
                          };

        var res = WithdrawalCreate(withdrawReq);
        return Request.CreateResponse(HttpStatusCode.OK, res);
      }
      catch (WePayException we)
      {
        return Request.CreateResponse(
          HttpStatusCode.BadRequest, 
          new ErrorResponse
          {
            Error = we.Error, 
            ErrorCode = we.ErrorCode, 
            ErrorDescription = we.ErrorDescription, 
            ErrorMessage = we.ErrorMessage
          });
      }
    }

    #endregion

    #region Methods

    /// <summary>
    /// The create account.
    /// </summary>
    /// <param name="user">The user.</param>
    /// <param name="accessToken">The access token.</param>
    /// <returns>The <see cref="AccountResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static AccountResponse CreateAccount(UserResponse user, TokenResponse accessToken)
    {
      // Process Authorization
      var account = new Account();
      var gaqdomains = new List<string> { ConfigurationManager.AppSettings["GaqDomains"] };

      var accountRequest = new AccountCreateRequest
                           {
                             AccessToken = accessToken.AccessToken, 
                             Type        = "personal", 
                               
                             // TODO: Defined by user [nonprofit, personal, business]
                             Description = string.Format("Funding Miracles donation system for {0} {1}", user.FirstName, user.LastName), 
                             Name        = "Funding Miracles", 
                             Mcc         = "7299", // Donations/personal use
                             CallbackUri = ConfigurationManager.AppSettings["WePayAccountCreateCallback"], 
                             ImageUri    = ConfigurationManager.AppSettings["WePayAccountImageUri"], 
                             ReferenceId = Guid.NewGuid().ToString(), 
                             Country     = "US", 
                             Theme       = new Theme(),
                             GaqDomains  = gaqdomains
                           };
      var res = account.Post(accountRequest);

      if (res.Error != null)
      {
        throw res.Error;
      }

      // Until this gets fixed on Wepay side
      res.ReferenceId = accountRequest.ReferenceId;

      return res;
    }

    /// <summary>
    /// The create gate way accounts.
    /// </summary>
    /// <param name="accountId">The account id.</param>
    /// <param name="user">The user.</param>
    /// <param name="geoCode">The geo code.</param>
    /// <param name="createWePayAccount">The create we pay account.</param>
    internal static void CreateGateWayAccounts(
      string accountId, 
      ApplicationUser user, 
      GeoCode geoCode, 
      bool createWePayAccount = false)
    {
      if (!createWePayAccount)
      {
        return;
      }

      var userToken =
        UserRegister(
          new UserRegisterRequest
          {
            ClientId       = WePayConfig.clientId, 
            ClientSecret   = WePayConfig.clientSecret, 
            Scope          = WePayConfig.authScope, 
            FirstName      = user.FirstName, 
            LastName       = user.LastName, 
            Email          = user.Email, 
            OriginalDevice = geoCode.OriginalDevice, 
            OriginalIp     = geoCode.Host, 
            CallbackUri    = ConfigurationManager.AppSettings["WePayUserRegisterCallback"], 
            RedirectUri    = ConfigurationManager.AppSettings["WePayUserRegisterRedirect"],
            TermsOfServiceAcceptanceTime = DateTime.UtcNow.ToUnixTimeStamp()
          });

      var userResponse =
        UserResendConfirmation(
          new UserResendConfirmationRequest
          {
            accessToken = userToken.AccessToken, 
            EmailMessage =
              ConfigurationManager.AppSettings["WePayUserResendConfirmationMessage"]
          });
      var ctrl = new WePayController();
      ctrl.SaveUser(userToken, userResponse);
    }

    /// <summary>
    /// The get account.
    /// </summary>
    /// <param name="accountId">The account id.</param>
    /// <param name="accessToken">The access token.</param>
    /// <returns>The <see cref="AccountResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static AccountResponse GetAccount(long accountId, string accessToken)
    {
      // Process Authorization
      var account = new Account();
      var accountRequest = new AccountRequest { accessToken = accessToken, AccountId = accountId };
      var res = account.Get(accountRequest);

      if (res.Error != null)
      {
        throw res.Error;
      }

      return res;
    }

    /// <summary>
    /// The process authorization.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>The <see cref="TokenResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static TokenResponse ProcessAuthorization(TokenRequest value)
    {
      // Process Authorization
      var req = new OAuth();
      var res = req.Authorize(value);

      if (res.Error != null)
      {
        throw res.Error;
      }

      return res;
    }

    /// <summary>
    /// The process credit card.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>The <see cref="CreditCardCreateResponseModel" />.</returns>
    internal static CreditCardCreateResponseModel ProcessCreditCard(Order value)
    {
      var cc = new CreditCardCreateRequestModel
               {
                 AccessToken = WePayConfig.accessToken, 
                 ClientId    = WePayConfig.clientId, 
                 UserName    = value.CardName, 
                 Address     =
                   new AddressModel
                   {
                     Address1   = value.BillingAddressAddress.Address1, 
                     Address2   = value.BillingAddressAddress.Address2, 
                     City       = value.BillingAddressAddress.City, 
                     Region     = value.BillingAddressAddress.State, 
                     PostalCode = value.BillingAddressAddress.ZipCode, 
                     Country    = value.BillingAddressAddress.Country
                   }, 
                 CreditCardNumber = value.CardNumber, 
                 Cvv              = value.CardCvv2, 
                 Email            = value.AspNetUser.Email, 
                 ExpirationMonth  = Convert.ToInt16(value.CardExpirationMonth), 
                 ExpirationYear   = Convert.ToInt16(value.CardExpirationYear),
                 CallbackUri      = ConfigurationManager.AppSettings["WePayCreditCardCreateCallback"]
               };

      var req = new CreditCard();

      var res = req.Post(cc);
      value.AuthorizationTransactionCode = res.CreditCardId.ToString(CultureInfo.CurrentCulture);

      return res;
    }

    /// <summary>
    /// The user find.
    /// </summary>
    /// <param name="authorization">The authorization.</param>
    /// <returns>The <see cref="UserResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static UserResponse UserFind(TokenResponse authorization)
    {
      var user = new User();
      var userRes = user.GetUser(authorization.AccessToken);

      if (userRes.Error != null)
      {
        throw userRes.Error;
      }

      return userRes;
    }

    /// <summary>
    /// The user register.
    /// </summary>
    /// <param name="userRequest">The user request.</param>
    /// <returns>The <see cref="UserRegisterResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static UserRegisterResponse UserRegister(UserRegisterRequest userRequest)
    {
      var user = new User();
      var res = user.Register(userRequest);

      if (res.Error != null)
      {
        throw res.Error;
      }

      return res;
    }

    /// <summary>
    /// The user resend confirmation.
    /// </summary>
    /// <param name="resendRequest">The resend request.</param>
    /// <returns>The <see cref="UserResendConfirmationResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static UserResendConfirmationResponse UserResendConfirmation(UserResendConfirmationRequest resendRequest)
    {
      var user = new User();
      var res = user.ResendConfirmation(resendRequest);

      if (res.Error == null)
      {
        return res;
      }

      if (res.Error.ErrorCode == "7002")
      {
        // This means that user already exists so get user call
        var newrew = user.GetUser(resendRequest.accessToken);
        res = new UserResendConfirmationResponse
              {
                Email     = newrew.Email, 
                FirstName = newrew.FirstName, 
                LastName  = newrew.LastName, 
                State     = newrew.State, 
                UserId    = newrew.UserId, 
                Error     = newrew.Error
              };
      }
      else
      {
        throw res.Error;
      }

      return res;
    }

    /// <summary>
    /// The withdrawal create.
    /// </summary>
    /// <param name="request">The request.</param>
    /// <returns>The <see cref="WithdrawalCreateResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal static WithdrawalCreateResponse WithdrawalCreate(WithdrawalCreateRequest request)
    {
      var with = new Withdrawal();
      var res = with.Post(request);

      if (res.Error != null)
      {
        throw res.Error;
      }

      return res;
    }

    /// <summary>
    /// The find account.
    /// </summary>
    /// <param name="accessToken">The access token.</param>
    /// <returns>List&lt;AccountResponse&gt;.</returns>
    internal List<AccountResponse> FindAccount(string accessToken)
    {
      var account = new Account();
      var req = new AccountFindRequest { accessToken = accessToken };
      var res = account.Find(req);

      return res;
    }

    /// <summary>
    /// The process account.
    /// </summary>
    /// <param name="authorization">The authorization.</param>
    /// <param name="user">The user.</param>
    /// <param name="dbuser">The dbuser.</param>
    /// <returns>The <see cref="AccountResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal AccountResponse ProcessAccount(TokenResponse authorization, UserResponse user, AspNetUserGateway dbuser)
    {
      AccountResponse account;
      if (dbuser == null || string.IsNullOrWhiteSpace(dbuser.AccountId) || dbuser.AccountId == "0")
      {
        account = CreateAccount(user, authorization);
        if (account.Error != null)
        {
          throw account.Error;
        }
      }
      else
      {
        account = new AccountResponse
                  {
                    AccountId = Convert.ToInt64(dbuser.AccountId), 
                    ReferenceId = dbuser.AccountReferenceId
                  };
      }

      return account;
    }

    /// <summary>
    /// The process account.
    /// </summary>
    /// <param name="userToken">The user token.</param>
    /// <param name="userConfirmation">The user confirmation.</param>
    /// <param name="dbuser">The dbuser.</param>
    /// <returns>The <see cref="AccountResponse" />.</returns>
    /// <exception cref="WePayException"></exception>
    internal AccountResponse ProcessAccount(
      UserRegisterResponse userToken, 
      UserResendConfirmationResponse userConfirmation, 
      AspNetUserGateway dbuser)
    {
      AccountResponse account;
      var authorization = new TokenResponse
                          {
                            AccessToken = userToken.AccessToken, 
                            ExpiresIn   = userToken.ExpiresIn, 
                            TokenType   = userToken.TokenType, 
                            UserId      = userToken.UserId
                          };

      var user = new UserResponse
                 {
                   Email     = userConfirmation.Email, 
                   FirstName = userConfirmation.FirstName, 
                   LastName  = userConfirmation.LastName, 
                   State     = userConfirmation.State, 
                   UserId    = userConfirmation.UserId, 
                 };
      if (dbuser == null || string.IsNullOrWhiteSpace(dbuser.AccountId) || dbuser.AccountId == "0")
      {
        account = CreateAccount(user, authorization);
        if (account.Error != null)
        {
          throw account.Error;
        }
      }
      else
      {
        account = new AccountResponse
                  {
                    AccountId = Convert.ToInt64(dbuser.AccountId), 
                    ReferenceId = dbuser.AccountReferenceId
                  };
      }

      return account;
    }

    /// <summary>
    /// The save user.
    /// </summary>
    /// <param name="userToken">The user token.</param>
    /// <param name="user">The user.</param>
    /// <exception cref="WePayException">
    /// </exception>
    internal void SaveUser(UserRegisterResponse userToken, UserResendConfirmationResponse user)
    {
      var internalUser = _context.AspNetUser.ByUserName(user.Email).FirstOrDefault();
      if (internalUser == null)
      {
        throw new WePayException
              {
                Error = "save user error", 
                ErrorDescription = "unable to save data into database", 
                ErrorMessage = "User is not registered with the system", 
                ErrorCode = "md1002", 
                Source = "wepaycontroller.saveuser"
              };
      }

      var userId = internalUser.Identification;
      var dbuser = _context
          .AspNetUserGateway
          .ByAspNetUserId(userId)
          .ByGatewayId(GATEWAY_ID)
          .FirstOrDefault();
      var account = ProcessAccount(userToken, user, dbuser);

      try
      {
        var gatewayUser = new AspNetUserGateway
                          {
                            AspNetUserId    = userId, 
                            AccessToken     = userToken.AccessToken, 
                            TokenExpiration =
                              userToken.ExpiresIn.ToString(CultureInfo.CurrentCulture), 
                            TokenType          = userToken.TokenType, 
                            FirstName          = user.FirstName, 
                            LastName           = user.LastName, 
                            Email              = user.Email, 
                            UserState          = user.State, 
                            GatewayId          = GATEWAY_ID, 
                            GatewayUserId      = user.UserId.ToString(CultureInfo.CurrentCulture), 
                            AccountId          = account.AccountId.ToString(CultureInfo.CurrentCulture), 
                            AccountReferenceId = account.ReferenceId, 
                            AccountState       = account.State
                          };

        if (dbuser == null)
        {
          _context.AspNetUserGateway.AddObject(gatewayUser);
        }
        else
        {
          gatewayUser.Identification = dbuser.Identification;
          gatewayUser.DateUpdated = dbuser.DateEntered;
          _context.ApplyCurrentValues(dbuser.EntityKey.EntitySetName, gatewayUser);
        }

        _context.SaveChanges();
      }
      catch (Exception e)
      {
        throw new WePayException
              {
                Error            = "save user error", 
                ErrorDescription = "unable to save data into datbase", 
                ErrorMessage     = e.Message, 
                ErrorCode        = "md0001", 
                Source           = "wepaycontroller.saveuser"
              };
      }
    }

    /// <summary>
    /// The save user.
    /// </summary>
    /// <param name="authorization">The authorization.</param>
    /// <param name="user">The user.</param>
    /// <exception cref="WePayException"></exception>
    internal void SaveUser(TokenResponse authorization, UserResponse user)
    {
      var userId = User.Identity.GetUserId();
      var dbuser = _context
        .AspNetUserGateway
        .ByAspNetUserId(userId)
        .ByGatewayId(GATEWAY_ID)
        .FirstOrDefault();

      var account = ProcessAccount(authorization, user, dbuser);
      try
      {
        var gatewayUser = new AspNetUserGateway
                          {
                            AspNetUserId       = userId, 
                            AccessToken        = authorization.AccessToken, 
                            TokenExpiration    = authorization.ExpiresIn.ToString(CultureInfo.CurrentCulture), 
                            TokenType          = authorization.TokenType, 
                            FirstName          = user.FirstName, 
                            LastName           = user.LastName, 
                            Email              = user.Email, 
                            UserState          = user.State, 
                            GatewayId          = GATEWAY_ID, 
                            GatewayUserId      = user.UserId.ToString(CultureInfo.CurrentCulture), 
                            AccountId          = account.AccountId.ToString(CultureInfo.CurrentCulture), 
                            AccountReferenceId = account.ReferenceId, 
                            AccountState       = account.State
                          };

        if (dbuser == null)
        {
          _context.AspNetUserGateway.AddObject(gatewayUser);
        }
        else
        {
          gatewayUser.Identification = dbuser.Identification;
          gatewayUser.DateUpdated = dbuser.DateEntered;
          _context.ApplyCurrentValues(dbuser.EntityKey.EntitySetName, gatewayUser);
        }

        _context.SaveChanges();
      }
      catch (Exception e)
      {
        throw new WePayException
              {
                Error            = "save user error", 
                ErrorDescription = "unable to save data into datbase", 
                ErrorMessage     = e.Message, 
                ErrorCode        = "md0001", 
                Source           = "wepaycontroller.saveuser"
              };
      }
    }

    /// <summary>
    /// Compares the status.
    /// </summary>
    /// <param name="state">The state from wePay.</param>
    /// <param name="accountState">State of the account from internal database.</param>
    /// <returns>System.String.</returns>
    private static string CompareStatus(string state, string accountState)
    {
        var status = "StatusChanged";

        if (state == accountState)
        {
            return status;
        }

        switch (state)
        {
            case "deleted":
                status = "AccountDeleted";
                break;
            case "active":
                status = "AccountVerified";
                break;
            default:
                status = "StatusChanged";
                break;
        }

        return status;
    }

    /// <summary>
    /// Determines the action.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>System.String.</returns>
    private static string DetermineAction(WePayIpnModel value)
    {

        if (value.withdrawal_id.HasValue)
        {
            return "withdrawal";
        }

        if (value.account_id > 0)
        {
            return "account";
        }

        if (value.checkout_id > 0)
        {
            return "checkout";
        }

        return value.credit_card_id > 0? "creditcard" : string.Empty;
    }

    /// <summary>
    /// Ipns the notification for account.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <param name="response">The response.</param>
    /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
    private bool IpnNotificationForAccount(WePayIpnModel value, out HttpResponseMessage response)
    {
        // Check Account Verification
        if (value.account_id == 0)
        {
            {
                response = Request.CreateResponse(HttpStatusCode.OK, "Internal account not found");
                return true;
            }
        }

        var accountId = (int)value.account_id;

        // Will only be available when account is verified or disabled
        // https://developer.wepay.com/api-calls/account#create
        // Checks state
        var gateway = _context
          .AspNetUserGateway
          .ByAccountId(accountId.ToString(CultureInfo.CurrentCulture))
          .ByGatewayId(GATEWAY_ID)
          .SingleOrDefault();

        if (gateway == null || gateway.GatewayId != GATEWAY_ID)
        {
            {
                response = Request.CreateResponse(HttpStatusCode.OK, "Cannot find gateway by reference Id");
                return true;
            }
        }

        // Get account from Wepay
        var account = GetAccount(accountId, gateway.AccessToken);

        var compareResult = CompareStatus(account.State, gateway.AccountState);

        // Finally check
        if (compareResult.Length > 0)
        {
            gateway.AccountState = account.State;

            var originalGateway = _context.AspNetUserGateway.GetByKey(gateway.Identification);
            if (originalGateway == null)
            {
                response = Request.CreateResponse(HttpStatusCode.OK, "Gateway not found");
                return true;
            }

            _context.ApplyCurrentValues(originalGateway.EntityKey.EntitySetName, gateway);
        }

        // Add note about transaction
        _context.AspNetUserGatewayActivity.AddObject(
            new AspNetUserGatewayActivity
            {
                AspNetUserGatewayId = gateway.Identification,
                TypeId = compareResult,
                Activity =
                    new Activity
                    {
                        TypeId = "Update",
                        Memo =
                            string.Format(
                                "WePay has made a changed the status to: {0}",
                                account.State)
                    }
            });

        _context.SaveChanges();

        response = Request.CreateResponse(HttpStatusCode.OK);
        return true;
    }

    /// <summary>
    /// Ipns the notification for account.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <param name="response">The response.</param>
    /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
    private bool IpnNotificationForWithdrawal(WePayIpnModel value, out HttpResponseMessage response)
    {
        response = Request.CreateResponse(HttpStatusCode.OK);
        return true;
    }

    /// <summary>
    /// The process.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>The <see cref="TokenResponse" />.</returns>
    private TokenResponse Process(TokenRequest value)
    {
      var authorization = ProcessAuthorization(value);
      var user = UserFind(authorization);

      SaveUser(authorization, user);

      return authorization;
    }

    /// <summary>
    /// Saves the changes.
    /// </summary>
    /// <param name="user">The user.</param>
    /// <returns>VerifyResponse.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private VerifyResponse SaveChanges(AspNetUserGateway user)
    {
      var saveChanges = false;
      AspNetUserGateway dbuser = null;

      var temp = new User();
      var wepayUser = temp.GetUser(user.AccessToken);

      // Update if necessary
      if (wepayUser.State != user.UserState)
      {
        dbuser = _context
          .AspNetUserGateway
          .ByAspNetUserId(User.Identity.GetUserId())
          .ByGatewayId(GATEWAY_ID)
          .FirstOrDefault();

        if (dbuser != null)
        {
          dbuser.UserState = wepayUser.State;

          saveChanges = true;
        }
      }

      var accountId = Convert.ToInt64(user.AccountId);
      var wepayAccount = GetAccount(accountId, user.AccessToken);

      // Update if necessary
      if (wepayAccount.State != user.AccountState)
      {
        if (dbuser == null)
        {
          dbuser = _context
            .AspNetUserGateway
            .ByAspNetUserId(User.Identity.GetUserId())
            .ByGatewayId(GATEWAY_ID)
            .FirstOrDefault();
        }

        if (dbuser != null)
        {
          dbuser.AccountState = wepayAccount.State;
          saveChanges = true;
        }          
      }

      if (saveChanges)
      {
        _context.ApplyCurrentValues(user.EntityKey.EntitySetName, dbuser);
        _context.SaveChanges();
      }

      var resp = new VerifyResponse
                 {
                   AccountState  = dbuser == null ? user.AccountState : dbuser.AccountState, 
                   UserState     = dbuser == null ? user.UserState : dbuser.UserState, 
                   ActionReasons = wepayAccount.ActionReasons,
                   Balances      = wepayAccount.Balance,
                   WePayUser     = wepayUser
                 };
      return resp;
    }

    #endregion

    public class WePayIpnModel
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the account identifier.
        /// </summary>
        /// <value>The account identifier.</value>
        public int account_id { get; set; }

        /// <summary>
        /// Gets or sets the check out identifier.
        /// </summary>
        /// <value>The check out identifier.</value>
        public int checkout_id { get; set; }

        /// <summary>
        /// Gets or sets the credit card identifier.
        /// </summary>
        /// <value>The credit card identifier.</value>
        public int credit_card_id { get; set; }

        /// <summary>
        /// Gets or sets the reference identifier.
        /// </summary>
        /// <value>The reference identifier.</value>
        public string reference_id { get; set; }

        /// <summary>
        /// Gets or sets the withdrawal identifier.
        /// </summary>
        /// <value>The withdrawal identifier.</value>
        public int? withdrawal_id { get; set; }
        #endregion
    }

    public class WePayIpnQuery
    {
        /// <summary>
        /// Gets or sets the user identifier.
        /// </summary>
        /// <value>The user identifier.</value>
        public string UserId { get; set; }
    }
  }
}