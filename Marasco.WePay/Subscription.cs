namespace Marasco.WePay
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Marasco.WePay.Models;

  using Newtonsoft.Json;

  #endregion

  public class Subscription
  {
    #region Public Methods and Operators

    public SubscriptionCancelResponse Cancel(SubscriptionCancelRequest req)
    {
      SubscriptionCancelResponse response;
      try
      {
        response = new WePayClient().Invoke<SubscriptionCancelRequest, SubscriptionCancelResponse>(
          req,
          req.ActionUrl);
      }
      catch (WePayException ex)
      {
        response = new SubscriptionCancelResponse
        {
          Error = ex
        };
      }

      return response;
    }

    public SubscriptionCreateResponse Create(SubscriptionCreateRequest req)
    {
      SubscriptionCreateResponse response;
      try
      {
        response = new WePayClient().Invoke<SubscriptionCreateRequest, SubscriptionCreateResponse>(
          req, 
          req.ActionUrl,
          req.AccessToken);
      }
      catch (WePayException ex)
      {
        response = new SubscriptionCreateResponse
                   {
                     Error = ex
                   };
      }

      return response;
    }

    public SubscriptionResponse Get(long subscriptionId)
    {
      var req = new SubscriptionRequest { SubscriptionId = subscriptionId };

      SubscriptionResponse response;
      try
      {
        response = new WePayClient().Invoke<SubscriptionRequest, SubscriptionResponse>(req, req.ActionUrl);
      }
      catch (WePayException ex)
      {
        response = new SubscriptionResponse { Error = ex, Amount = 0, State = ex.Error };
      }

      return response;
    }

    #endregion
  }

  public class SubscriptionRequest
  {
    #region Fields

    [JsonIgnore]
    public readonly string ActionUrl = @"subscription";

    #endregion

    #region Public Properties

    [JsonProperty("subscription_id")]
    public long SubscriptionId { get; set; }

    #endregion
  }

  public class SubscriptionResponse
  {
    #region Public Properties

    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("subscription_plan_id")]
    public long SubscriptionPlanId { get; set; }

    [JsonProperty("subscription_id")]
    public long SubscriptionId { get; set; }

    [JsonProperty("subscription_uri")]
    [MaxLength(2083)]
    public string SubscriptionUri { get; set; }

    [JsonProperty("payer_name")]
    [MaxLength(255)]
    public string PayerName { get; set; }

    [JsonProperty("payer_email")]
    [MaxLength(255)]
    public string PayerEmail { get; set; }

    [JsonProperty("currency")]
    public string Currency { get; set; }

    [JsonProperty("amount")]
    public decimal Amount { get; set; }

    [JsonProperty("period")]
    [MaxLength(255)]
    public string Period { get; set; }

    [JsonProperty("app_fee")]
    public decimal AppFee { get; set; }

    [JsonProperty("fee_payer")]
    [MaxLength(255)]
    public string FeePayer { get; set; }

    [JsonProperty("state")]
    [MaxLength(255)]
    public string State { get; set; }

    [JsonProperty("create_time")]
    public long CreateTime { get; set; }

    [JsonProperty("redirect_uri")]
    [MaxLength(2083)]
    public string RedirectUri { get; set; }

    [JsonProperty("callback_uri")]
    [MaxLength(2083)]
    public string CallbackUri { get; set; }

    [JsonProperty("payment_method_id")]
    public long PaymentMethodId { get; set; }

    [JsonProperty("payment_method_type")]
    [MaxLength(255)]
    public string PaymentMethodType { get; set; }

    [JsonProperty("quantity")]
    public long Quantity { get; set; }

    [JsonProperty("mode")]
    [MaxLength(255)]
    public string Mode { get; set; }

    [JsonProperty("trial_days_remaining")]
    public long TrialDaysRemaining { get; set; }

    [JsonProperty("transition_expire_time")]
    public long TransitionExpireTime { get; set; }

    [JsonProperty("transition_prorate")]
    public bool TransitionProrate { get; set; }

    [JsonProperty("transition_quantity")]
    [MaxLength(255)]
    public long TransitionQuantity { get; set; }

    [JsonProperty("transition_subscription_plan_id")]
    public long TransitionSubscriptionPlanId { get; set; }

    [MaxLength(255)]
    [JsonProperty("reference_id")]
    public string ReferenceId { get; set; }

    #endregion
  }

  public class SubscriptionCreateRequest
  {
    #region Fields

    [JsonIgnore]
    public readonly string ActionUrl = @"subscription/create";

    #endregion

    #region Public Properties
    /// <summary>
    /// Gets or sets the access token.
    /// </summary>
    /// <value>The access token.</value>
    [JsonIgnore]
    public string AccessToken { get; set; }

    [JsonProperty("subscription_plan_id")]
    [Required]
    public long SubscriptionPlanId { get; set; }

    [JsonProperty("redirect_uri")]
    [MaxLength(2083)]
    public string RedirectUri { get; set; }

    [JsonProperty("callback_uri")]
    [MaxLength(2083)]
    public string CallbackUri { get; set; }

    [JsonProperty("payment_method_id")]
    public long PaymentMethodId { get; set; }

    [JsonProperty("payment_method_type")]
    [MaxLength(255)]
    public string PaymentMethodType { get; set; }

    [JsonProperty("mode")]
    public string Mode { get; set; }

    [JsonProperty("quantity")]
    public long Quantity { get; set; }

    [JsonProperty("reference_id")]
    public string ReferenceId { get; set; }

    [JsonProperty("prefill_info")]
    public PrefillInfoModel PrefillInfoModel { get; set; }


    #endregion
  }

  public class SubscriptionCreateResponse
  {
    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("subscription_id")]
    public long SubscriptionId { get; set; }

    [JsonProperty("subscription_uri")]
    [MaxLength(2083)]
    public string SubscriptionUri { get; set; }
  }

  public class SubscriptionCancelRequest
  {
    #region Fields

    [JsonIgnore]
    public readonly string ActionUrl = @"subscription/cancel";

    #endregion

    [JsonProperty("subscription_id")]
    [Required]
    public long SubscriptionId { get; set; }

    [JsonProperty("reason")]
    [MaxLength(255)]
    public string Reason { get; set; }
  }

  public class SubscriptionCancelResponse
  {

    [JsonIgnore]
    public WePayException Error { get; set; }


    [JsonProperty("subscription_id")]
    public long SubscriptionId { get; set; }

    [JsonProperty("subscription_plan_id")]
    public long SubscriptionPlanId { get; set; }

    [JsonProperty("state")]
    [MaxLength(255)]
    public string State { get; set; }
  }

  public class SubscriptionFindRequest
  {
    #region Fields

    [JsonIgnore]
    public readonly string ActionUrl = @"subscription/find";

    #endregion

    #region Public Properties

    [JsonProperty("end_time")]
    public long EndTime { get; set; }

    [JsonProperty("limit")]
    public long Limit { get; set; }

    [JsonProperty("reference_id")]
    public string ReferenceId { get; set; }

    [JsonProperty("start")]
    public long Start { get; set; }

    [JsonProperty("start_time")]
    public long StartTime { get; set; }

    [JsonProperty("state")]
    public string State { get; set; }

    [JsonProperty("subscription_plan_id")]
    public long SubscriptionPlanId { get; set; }

    #endregion
  }


  public class PrefillInfoModel
  {
    [JsonProperty("name")]
    public long Name { get; set; }

    [JsonProperty("email")]
    public string Email { get; set; }

    [JsonProperty("phone_number")]
    public string PhoneNumber { get; set; }

    [JsonProperty("address")]
    public AddressModel Address { get; set; }
  }
}