namespace Marasco.WePay
{
  #region Directives

  using System.Collections.Generic;

  using Newtonsoft.Json;

  #endregion

  public class Withdrawal
  {
    #region Public Methods and Operators

    public List<WithdrawalResponse> Find(WithdrawalFindRequest req)
    {
      try
      {
        List<WithdrawalResponse> response =
          new WePayClient().Invoke<WithdrawalFindRequest, List<WithdrawalResponse>>(req, req.actionUrl);
        return response;
      }
      catch (WePayException)
      {
        //response = new WithdrawalResponse { name = ex.Error, Error = ex };
        return new List<WithdrawalResponse>();
      }
    }

    /// <summary>
    /// Gets the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>WithdrawalResponse.</returns>
    public WithdrawalResponse Get(WithdrawalRequest req)
    {
      WithdrawalResponse response;
      try
      {
        response = new WePayClient().Invoke<WithdrawalRequest, WithdrawalResponse>(req, req.actionUrl, req.accessToken);
      }
      catch (WePayException ex)
      {
        response = new WithdrawalResponse { Error = ex };
      }
      return response;
    }

    /// <summary>
    /// Posts the specified req.
    /// </summary>
    /// <param name="req">The req.</param>
    /// <returns>WithdrawalCreateResponse.</returns>
    public WithdrawalCreateResponse Post(WithdrawalCreateRequest req)
    {
      WithdrawalCreateResponse response;
      try
      {
        response = new WePayClient().Invoke<WithdrawalCreateRequest, WithdrawalCreateResponse>(
          req,
          req.actionUrl,
          req.accessToken);
      }
      catch (WePayException ex)
      {
        response = new WithdrawalCreateResponse { WithdrawalId = 0, Error = ex };
      }

      return response;
    }

    public WithdrawalResponse Put(WithdrawalModifyRequest req)
    {
      WithdrawalResponse response;
      try
      {
        response = new WePayClient().Invoke<WithdrawalModifyRequest, WithdrawalResponse>(
          req,
          req.actionUrl);
      }
      catch (WePayException ex)
      {
        response = new WithdrawalResponse { WithdrawalId = 0, Error = ex };
      }

      return response;
    }

    #endregion
  }


  /// <summary>
  /// Class WithdrawalCreateRequest
  /// </summary>
  public class WithdrawalCreateRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string actionUrl = @"withdrawal/create";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string accessToken { get; set; }

    [JsonProperty("account_id")]
    public long AccountId { get; set; }

    [JsonProperty("currency")]
    public string Currency { get; set; }

    [JsonProperty("callback_uri")]
    public string CallbackUri { get; set; }

    [JsonProperty("redirect_uri")]
    public string RedirectUri { get; set; }

    /// <summary>
    /// The uri that the payer will be redirected to if cookies cannot 
    /// be set in the iframe; will only work if mode is iframe.
    /// </summary>
    /// <value>The fallback URI.</value>
    [JsonProperty("fallback_uri")]
    public string FallbackUri { get; set; }

    [JsonProperty("note")]
    public string Note { get; set; }

    /// <summary>
    /// What mode the withdrawal will be displayed in. The options are 
    /// 'iframe' or 'regular'. Choose 'iframe' if this is an iframe 
    /// withdrawal. Mode defaults to 'regular'.
    /// </summary>
    /// <value>The mode.</value>
    [JsonProperty("mode")]
    public string Mode { get; set; }

    #endregion
  }

  /// <summary>
  /// Class WithdrawalRequest
  /// </summary>
  public class WithdrawalRequest
  {
    #region Fields

    /// <summary>
    /// The action URL
    /// </summary>
    [JsonIgnore]
    public readonly string actionUrl = @"withdrawal";

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets the withdrawal_id.
    /// </summary>
    /// <value>The withdrawal_id.</value>
    [JsonProperty("withdrawal_id")]
    public long WithdrawalId { get; set; }

    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string accessToken { get; set; }

    #endregion
  }

  /// <summary>
  /// Class WithdrawalResponse
  /// </summary>
  public class WithdrawalResponse
  {
    #region Public Properties

    [JsonProperty("account_id")]
    public long AccountId { get; set; }

    [JsonProperty("amount")]
    public decimal Amount { get; set; }

    [JsonProperty("callback_uri")]
    public string CallbackUri { get; set; }

    [JsonProperty("capture_time")]
    public long CaptureTime { get; set; }

    [JsonProperty("create_time")]
    public long CreateTime { get; set; }


    [JsonProperty("currency")]
    public string Currency { get; set; }

    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("note")]
    public string Note { get; set; }

    [JsonProperty("recipient_confirmed")]
    public bool RecipientConfirmed { get; set; }

    [JsonProperty("redirect_uri")]
    public string RedirectUri { get; set; }

    [JsonProperty("state")]
    public string State { get; set; }

    [JsonProperty("type")]
    public string Type { get; set; }

    [JsonProperty("withdrawal_id")]
    public long WithdrawalId { get; set; }

    [JsonProperty("withdrawal_uri")]
    public string WithdrawalUri { get; set; }

    #endregion
  }

  public class WithdrawalFindRequest
  {
    #region Fields

    [JsonIgnore]
    public readonly string actionUrl = @"withdrawal/find";

    #endregion

    #region Public Properties

    [JsonProperty("account_id")]
    public string AccountId { get; set; }

    [JsonProperty("limit")]
    public long Limit { get; set; }

    [JsonProperty("sort_order")]
    public string SortOrder { get; set; }

    [JsonProperty("start")]
    public long Start { get; set; }

    #endregion
  }

  public class WithdrawalCreateResponse
  {
    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("withdrawal_id")]
    public long WithdrawalId { get; set; }

    [JsonProperty("withdrawal_uri")]
    public string WithdrawalUri { get; set; }
  }

  public class WithdrawalModifyRequest
  {
    [JsonIgnore]
    public readonly string actionUrl = @"withdrawal/modify";

    [JsonProperty("withdrawal_id")]
    public long WithdrawalId { get; set; }

    [JsonProperty("callback_uri")]
    public string CallbackUri { get; set; }
  }
}