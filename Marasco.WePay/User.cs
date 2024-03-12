// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
//
// Last Modified By : amarasco
// Last Modified On : 10-22-2013
// ***********************************************************************
// <copyright file="User.cs" company="Maras, co">
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
  /// Class User
  /// </summary>
  public class User
  {
    #region Public Methods and Operators

    /// <summary>
    /// Gets the user.
    /// </summary>
    /// <param name="accessToken">The access token.</param>
    /// <returns>UserResponse.</returns>
    public UserResponse GetUser(string accessToken)
    {
      var req = new UserRequest { accessToken = accessToken };
      UserResponse response;
      try
      {
        response = new WePayClient().Invoke<UserRequest, UserResponse>(req, req.actionUrl, accessToken);
      }
      catch (WePayException ex)
      {
        response = new UserResponse { State = "error", Error = ex };
      }

      return response;
    }

    /// <summary>
    /// Registers the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>UserRegisterResponse.</returns>
    public UserRegisterResponse Register(UserRegisterRequest req)
    {
      UserRegisterResponse response;
      try
      {
        response = new WePayClient().Invoke<UserRegisterRequest, UserRegisterResponse>(req, req.actionUrl);
      }
      catch (WePayException ex)
      {
        response = new UserRegisterResponse { AccessToken = "error", Error = ex };
      }

      return response;
    }

    /// <summary>
    /// For users who were registered via the /user/register call, this API call lets you resend the API registration confirmation email.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>UserResendConfirmationResponse.</returns>
    public UserResendConfirmationResponse ResendConfirmation(UserResendConfirmationRequest req)
    {
      UserResendConfirmationResponse response;
      try
      {
        response = new WePayClient().Invoke<UserResendConfirmationRequest, UserResendConfirmationResponse>(req, req.actionUrl, req.accessToken);
      }
      catch (WePayException ex)
      {
        response = new UserResendConfirmationResponse { UserId = 0, Error = ex };
      }

      return response;
    }

    #endregion
  }

  public class UserResendConfirmationRequest
  {
    [JsonIgnore]
    public string accessToken { get; set; }

    [JsonIgnore]
    public string actionUrl = @"user/resend_confirmation";

    [JsonProperty("email_message")]
    public string EmailMessage { get; set; }

  }

  public class UserResendConfirmationResponse
  {
    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("user_id")]
    public long UserId { get; set; }

    [JsonProperty("first_name")]
    public string FirstName { get; set; }

    [JsonProperty("last_name")]
    public string LastName { get; set; }

    [JsonProperty("email")]
    public string Email { get; set; }

    [JsonProperty("state")]
    public string State { get; set; }
  }

  public class UserRegisterRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public string actionUrl = @"user/register";

    #endregion

    #region Public Properties

    [JsonProperty("callback_uri")]
    public string CallbackUri { get; set; }

    [JsonProperty("client_id")]
    public long ClientId { get; set; }

    [JsonProperty("client_secret")]
    public string ClientSecret { get; set; }

    [JsonProperty("email")]
    public string Email { get; set; }

    [JsonProperty("first_name")]
    public string FirstName { get; set; }

    [JsonProperty("last_name")]
    public string LastName { get; set; }

    [JsonProperty("original_device")]
    public string OriginalDevice { get; set; }

    [JsonProperty("original_ip")]
    public string OriginalIp { get; set; }

    [JsonProperty("redirect_uri")]
    public string RedirectUri { get; set; }

    [JsonProperty("scope")]
    public string Scope { get; set; }

    [JsonProperty("tos_acceptance_time")]
    public long TermsOfServiceAcceptanceTime { get; set; }

    #endregion
  }

  public class UserRegisterResponse
  {
    #region Public Properties

    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("access_token")]
    public string AccessToken { get; set; }

    [JsonProperty("expires_in")]
    public long ExpiresIn { get; set; }

    [JsonProperty("token_type")]
    public string TokenType { get; set; }

    [JsonProperty("user_id")]
    public long UserId { get; set; }

    #endregion
  }

  public class UserRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public string actionUrl = @"user";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string accessToken { get; set; }

    #endregion
  }

  public class UserResponse
  {
    #region Public Properties

    [JsonProperty("email")]
    public string Email { get; set; }

    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("first_name")]
    public string FirstName { get; set; }

    [JsonProperty("user_name")]
    public string UserName { get; set; }

    [JsonProperty("last_name")]
    public string LastName { get; set; }

    [JsonProperty("state")]
    public string State { get; set; }

    [JsonProperty("user_id")]
    public long UserId { get; set; }

    #endregion
  }
}