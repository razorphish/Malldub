// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
// Last Modified By : amarasco
// Last Modified On : 10-22-2013
// ***********************************************************************
// <copyright file="Account.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay
{
  #region Directives

  using System;
  using System.Collections.Generic;

  using Marasco.WePay.Models;

  using Newtonsoft.Json;

  #endregion

  /// <summary>
  /// Class Account
  /// </summary>
  public class Account
  {
    #region Public Methods and Operators

    /// <summary>
    /// Finds the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>AccountResponse.</returns>
    public List<AccountResponse> Find(AccountFindRequest req)
    {
      try
      {
        var response = new WePayClient().Invoke<AccountFindRequest, List<AccountResponse>>(
          req, 
          req.actionUrl, 
          req.accessToken);
        return response;
      }
      catch (WePayException)
      {
        // response = new AccountResponse { name = ex.Error, Error = ex };
        return new List<AccountResponse>();
      }
    }

    /// <summary>
    /// Gets the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>AccountResponse.</returns>
    public AccountResponse Get(AccountRequest req)
    {
      AccountResponse response;
      try
      {
        response = new WePayClient().Invoke<AccountRequest, AccountResponse>(req, req.actionUrl, req.accessToken);
      }
      catch (WePayException ex)
      {
        response = new AccountResponse { Name = ex.Error, Error = ex };
      }

      return response;
    }

    /// <summary>
    /// Posts the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>AccountCreateResponse.</returns>
    public AccountResponse Post(AccountCreateRequest req)
    {
      AccountResponse response;
      try
      {
        response = new WePayClient().Invoke<AccountCreateRequest, AccountResponse>(req, req.ActionUrl, req.AccessToken);
      }
      catch (WePayException ex)
      {
        response = new AccountResponse { AccountId = 0, Error = ex };
      }

      return response;
    }

    #endregion
  }

  /// <summary>
  /// Class AccountCreateRequest
  /// </summary>
  public class AccountCreateRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string ActionUrl = @"account/create";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the callback URI.
    /// </summary>
    /// <value>The callback URI.</value>
    [JsonProperty("callback_uri")]
    public string CallbackUri { get; set; }

    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    /// <value>The country.</value>
    [JsonProperty("country")]
    public string Country { get; set; }

    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    /// <value>The country.</value>
    [JsonProperty("country_options")]
    public CountryOptionsModel CountryOptions { get; set; }

    /// <summary>
    /// Gets or sets the currencies.
    /// </summary>
    /// <value>The currencies.</value>
    [JsonProperty("currencies")]
    public string[] Currencies { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    /// <value>The description.</value>
    [JsonProperty("description")]
    public string Description { get; set; }

    /// <summary>
    /// Gets or sets the ga q domains.
    /// </summary>
    /// <value>The ga q domains.</value>
    [JsonProperty("gaq_domains")]
    public List<string> GaqDomains { get; set; }

    /// <summary>
    /// Gets or sets the image URI.
    /// </summary>
    /// <value>The image URI.</value>
    [JsonProperty("image_uri")]
    public string ImageUri { get; set; }

    /// <summary>
    /// Gets or sets the MCC.
    /// </summary>
    /// <value>The MCC.</value>
    [JsonProperty("mcc")]
    public string Mcc { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty("name")]
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets the reference identifier.
    /// </summary>
    /// <value>The reference identifier.</value>
    [JsonProperty("reference_id")]
    public string ReferenceId { get; set; }

    /// <summary>
    /// Gets or sets the support contact number.
    /// </summary>
    /// <value>The support contact number.</value>
    [JsonProperty("support_contact_number")]
    public InternationalPhoneModel SupportContactNumber { get; set; }

    /// <summary>
    /// Gets or sets the theme.
    /// </summary>
    /// <value>The theme.</value>
    [JsonProperty("theme_object")]
    public Theme Theme { get; set; }

    /// <summary>
    /// Gets or sets the type.
    /// </summary>
    /// <value>The type.</value>
    [JsonProperty("type")]
    public string Type { get; set; }

    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string AccessToken { get; set; }

    #endregion
  }

  /// <summary>
  /// Class Theme.
  /// </summary>
  public class Theme
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="Theme"/> class.
    /// </summary>
    public Theme()
    {
      // Set default for
      // TODO: MAke these configurable options
      BackgroundColor = "FFFFFF";
      Name = "API Theme for API App: Funding Miracles";
      ButtonColor = "3498DB";
      PrimaryColor = "3498DB";
      SecondaryColor = "000000";
    }

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the color of the background.
    /// </summary>
    /// <value>The color of the background.</value>
    [JsonProperty("background_color")]
    public string BackgroundColor { get; set; }

    /// <summary>
    /// Gets or sets the color of the button.
    /// </summary>
    /// <value>The color of the button.</value>
    [JsonProperty("button_color")]
    public string ButtonColor { get; set; }

    /// <summary>
    /// Gets or sets the identifier.
    /// </summary>
    /// <value>The identifier.</value>
    [JsonProperty("theme_id")]
    public int? Id { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty("name")]
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets the color of the primary.
    /// </summary>
    /// <value>The color of the primary.</value>
    [JsonProperty("primary_color")]
    public string PrimaryColor { get; set; }

    /// <summary>
    /// Gets or sets the color of the secondary.
    /// </summary>
    /// <value>The color of the secondary.</value>
    [JsonProperty("secondary_color")]
    public string SecondaryColor { get; set; }

    #endregion
  }

  /// <summary>
  /// Class AccountRequest
  /// </summary>
  public class AccountRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string actionUrl = @"account";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the account_id.
    /// </summary>
    /// <value>The account_id.</value>
    [JsonProperty("account_id")]
    public long AccountId { get; set; }

    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string accessToken { get; set; }

    #endregion
  }

  /// <summary>
  /// Class VerifyResponse.
  /// </summary>
  public class VerifyResponse
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the state of the account.
    /// </summary>
    /// <value>The state of the account.</value>
    public string AccountState { get; set; }

    /// <summary>
    /// Gets or sets the action reasons.
    /// </summary>
    /// <value>The action reasons.</value>
    public List<string> ActionReasons { get; set; }

    /// <summary>
    /// Gets or sets the balances.
    /// </summary>
    /// <value>The balances.</value>
    public List<BalanceModel> Balances { get; set; }

    /// <summary>
    /// Gets or sets the state of the user.
    /// </summary>
    /// <value>The state of the user.</value>
    public string UserState { get; set; }

    /// <summary>
    /// Gets or sets the we pay user.
    /// </summary>
    /// <value>The we pay user.</value>
    public UserResponse WePayUser { get; set; }

    #endregion
  }

  /// <summary>
  /// Class AccountResponse
  /// </summary>
  public class AccountResponse
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the account identifier.
    /// </summary>
    /// <value>The account identifier.</value>
    [JsonProperty("account_id")]
    public long AccountId { get; set; }

    /// <summary>
    /// Gets or sets the action reasons.
    /// </summary>
    /// <value>The action reasons.</value>
    [JsonProperty("action_reasons")]
    public List<string> ActionReasons { get; set; }

    /// <summary>
    /// Gets or sets the balance.
    /// </summary>
    /// <value>The balance.</value>
    [JsonProperty("balances")]
    public List<BalanceModel> Balance { get; set; }

    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    /// <value>The country.</value>
    [JsonProperty("country")]
    public string Country { get; set; }

    /// <summary>
    /// Gets or sets the create time.
    /// </summary>
    /// <value>The create time.</value>
    [JsonProperty("create_time")]
    public long CreateTime { get; set; }

    /// <summary>
    /// Gets or sets the currencies.
    /// </summary>
    /// <value>The currencies.</value>
    [JsonProperty("currencies")]
    public List<string> Currencies { get; set; }

    /// <summary>
    /// Gets or sets the description.
    /// </summary>
    /// <value>The description.</value>
    [JsonProperty("description")]
    public string Description { get; set; }

    /// <summary>
    /// Gets or sets the disabled reasons.
    /// </summary>
    /// <value>The disabled reasons.</value>
    [JsonProperty("disabled_reasons")]
    public List<string> DisabledReasons { get; set; }

    /// <summary>
    /// Gets or sets the disablement time.
    /// </summary>
    /// <value>The disablement time.</value>
    [JsonProperty("disablement_time")]
    public string DisablementTime { get; set; }

    /// <summary>
    /// Gets or sets the error.
    /// </summary>
    /// <value>The error.</value>
    [JsonIgnore]
    public WePayException Error { get; set; }

    /// <summary>
    /// Gets or sets the gaq domains.
    /// </summary>
    /// <value>The gaq domains.</value>
    [JsonProperty("gaq_domains")]
    public List<string> GaqDomains { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    [JsonProperty("name")]
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets the owner user identifier.
    /// </summary>
    /// <value>The owner user identifier.</value>
    [JsonProperty("owner_user_id")]
    public long OwnerUserId { get; set; }

    /// <summary>
    /// Gets or sets the reference identifier.
    /// </summary>
    /// <value>The reference identifier.</value>
    [JsonProperty("reference_id")]
    public string ReferenceId { get; set; }

    /// <summary>
    /// Gets or sets the state.
    /// </summary>
    /// <value>The state.</value>
    [JsonProperty("state")]
    public string State { get; set; }

    /// <summary>
    /// Gets or sets the statuses.
    /// </summary>
    /// <value>The statuses.</value>
    [JsonProperty("statuses")]
    public List<Statum> Statuses { get; set; }

    /// <summary>
    /// Gets or sets the theme object.
    /// </summary>
    /// <value>The theme object.</value>
    [JsonProperty("theme_object")]
    public object ThemeObject { get; set; }

    /// <summary>
    /// Gets or sets the type.
    /// </summary>
    /// <value>The type.</value>
    [JsonProperty("type")]
    public string Type { get; set; }

    #endregion
  }

  /// <summary>
  /// Class Statum.
  /// </summary>
  public class Statum
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the currency.
    /// </summary>
    /// <value>The currency.</value>
    [JsonProperty("currency")]
    public string Currency { get; set; }

    /// <summary>
    /// Gets or sets the incoming payments status.
    /// </summary>
    /// <value>The incoming payments status.</value>
    [JsonProperty("incoming_payments_status")]
    public string IncomingPaymentsStatus { get; set; }

    /// <summary>
    /// Gets or sets the outgoing payments status.
    /// </summary>
    /// <value>The outgoing payments status.</value>
    [JsonProperty("outgoing_payments_status")]
    public string OutgoingPaymentsStatus { get; set; }

    #endregion
  }

  /// <summary>
  /// Class AccountFindRequest
  /// </summary>
  public class AccountFindRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string actionUrl = @"account/find";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string accessToken { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    /// <value>The name.</value>
    public string name { get; set; }

    /// <summary>
    /// Gets or sets the reference_id.
    /// </summary>
    /// <value>The reference_id.</value>
    public string reference_id { get; set; }

    #endregion
  }

  /// <summary>
  /// Class BalanceModel.
  /// </summary>
  public class BalanceModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the balance.
    /// </summary>
    /// <value>The balance.</value>
    [JsonProperty("balance")]
    public double? Balance { get; set; }

    /// <summary>
    /// Gets or sets the currency.
    /// </summary>
    /// <value>The currency.</value>
    [JsonProperty("currency")]
    public string Currency { get; set; }

    /// <summary>
    /// Gets or sets the disputed amount.
    /// </summary>
    /// <value>The disputed amount.</value>
    [JsonProperty("disputed_amount")]
    public double? DisputedAmount { get; set; }

    /// <summary>
    /// Gets or sets the incoming pending amount.
    /// </summary>
    /// <value>The incoming pending amount.</value>
    [JsonProperty("incoming_pending_amount")]
    public double? IncomingPendingAmount { get; set; }

    /// <summary>
    /// Gets or sets the outgoing pending amount.
    /// </summary>
    /// <value>The outgoing pending amount.</value>
    [JsonProperty("outgoing_pending_amount")]
    public double? OutgoingPendingAmount { get; set; }

    /// <summary>
    /// Gets or sets the reserved amount.
    /// </summary>
    /// <value>The reserved amount.</value>
    [JsonProperty("reserved_amount")]
    public double? ReservedAmount { get; set; }

    /// <summary>
    /// Gets or sets the name of the withdrawal bank.
    /// </summary>
    /// <value>The name of the withdrawal bank.</value>
    [JsonProperty("withdrawal_bank_name")]
    public string WithdrawalBankName { get; set; }

    /// <summary>
    /// Gets or sets the withdrawal next time.
    /// </summary>
    /// <value>The withdrawal next time.</value>
    [JsonProperty("withdrawal_next_time")]
    public long? WithdrawalNextTime { get; set; }

    /// <summary>
    /// Gets or sets the withdrawal period.
    /// </summary>
    /// <value>The withdrawal period.</value>
    [JsonProperty("withdrawal_period")]
    public string WithdrawalPeriod { get; set; }

    /// <summary>
    /// Gets or sets the type of the withdrawal.
    /// </summary>
    /// <value>The type of the withdrawal.</value>
    [JsonProperty("withdrawal_type")]
    public string WithdrawalType { get; set; }

    #endregion
  }
}