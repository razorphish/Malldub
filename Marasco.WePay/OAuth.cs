// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : Antonio David Marasco
// Created          : 10-22-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 10-22-2013
// ***********************************************************************
// <copyright file="OAuth.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Marasco.WePay
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  /// <summary>
  /// Class OAuth
  /// </summary>
  /// <code>
  /// https://stage.wepay.com/v2/oauth2/authorize
  /// ?client_id=181045
  /// &redirect_uri=http://local.fundingmiracles.com/wepay/authenticate
  /// &scope=manage_accounts,view_balance,collect_payments,refund_payments,view_user,preapprove_payments,send_money,manage_subscriptions
  /// </code>
  public class OAuth
  {
    #region Public Methods and Operators

    /// <summary>
    /// Authorizes the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>TokenResponse.</returns>
    public TokenResponse Authorize(TokenRequest req)
    {
      TokenResponse response;
      try
      {
        response = new WePayClient().Invoke<TokenRequest, TokenResponse>(req, req.ActionUrl);
      }
      catch (WePayException ex)
      {
        response = new TokenResponse { AccessToken = "error", Error = ex };
      }

      return response;
    }

    #endregion
  }

  /// <summary>
  /// Class TokenRequest
  /// </summary>
  public class TokenRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public string ActionUrl = @"oauth2/token";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the callback URI.
    /// </summary>
    /// <value>The callback URI.</value>
    [JsonProperty("callback_uri")]
    public string CallbackUri { get; set; }

    /// <summary>
    /// Gets or sets the client identifier.
    /// </summary>
    /// <value>The client identifier.</value>
    [JsonProperty("client_id")]
    public int ClientId { get; set; }


    /// <summary>
    /// Gets or sets the client secret.
    /// </summary>
    /// <value>The client secret.</value>
    [JsonProperty("client_secret")]
    public string ClientSecret { get; set; }


    /// <summary>
    /// Gets or sets the code.
    /// </summary>
    /// <value>The code.</value>
    [JsonProperty("code")]
    public string Code { get; set; }


    /// <summary>
    /// Gets or sets the redirect URI.
    /// </summary>
    /// <value>The redirect URI.</value>
    [JsonProperty("redirect_uri")]
    public string RedirectUri { get; set; }

    #endregion
  }

  /// <summary>
  /// Class TokenResponse
  /// </summary>
  public class TokenResponse
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the error.
    /// </summary>
    /// <value>The error.</value>
    [JsonIgnore]
    public WePayException Error { get; set; }

    /// <summary>
    /// Gets or sets the access_token.
    /// </summary>
    /// <value>The access_token.</value>
    [JsonProperty("access_token")]
    public string AccessToken { get; set; }

    /// <summary>
    /// Gets or sets the expires in.
    /// </summary>
    /// <value>The expires in.</value>
    [JsonProperty("expires_in")]
    public long ExpiresIn { get; set; }

    /// <summary>
    /// Gets or sets the token_type.
    /// </summary>
    /// <value>The token_type.</value>
    [JsonProperty("token_type")]
    public string TokenType  { get; set; }

    /// <summary>
    /// Gets or sets the user_id.
    /// </summary>
    /// <value>The user_id.</value>
    [JsonProperty("user_id")]
    public long UserId { get; set; }

    #endregion
  }
}