namespace Marasco.WePay
{
  #region Directives

  using System.ComponentModel.DataAnnotations;

  using Newtonsoft.Json;

  #endregion

  public class SubscriptionPlan
  {
    #region Public Methods and Operators

    public SubscriptionPlanCreateResponse Create(SubsriptionPlanCreateRequest req)
    {
      SubscriptionPlanCreateResponse response;
      try
      {
        response = new WePayClient().Invoke<SubsriptionPlanCreateRequest, SubscriptionPlanCreateResponse>(req, req.ActionUrl);
      }
      catch (WePayException ex)
      {
        response = new SubscriptionPlanCreateResponse { Error = ex };
      }

      return response;
    }

    #endregion
  }

  public class SubsriptionPlanCreateRequest
  {
    #region Fields

    [JsonIgnore]
    public readonly string ActionUrl = @"subscription_plan/create";

    #endregion

    #region Public Properties

    [JsonProperty("account_id")]
    [Required]
    public long AccountId { get; set; }

    [JsonProperty("amount")]
    [Required]
    public decimal Amount { get; set; }

    [JsonProperty("app_fee")]
    public decimal AppFee { get; set; }

    [JsonProperty("callback_uri")]
    [MaxLength(2083)]
    public string CallbackUri { get; set; }

    [JsonProperty("currency")]
    [MaxLength(3)]
    public string Currency { get; set; }

    [JsonProperty("name")]
    [MaxLength(255)]
    [Required]
    public string Name { get; set; }

    [JsonProperty("period")]
    [Required]
    [MaxLength(255)]
    public string Period { get; set; }

    [JsonProperty("reference_id")]
    [MaxLength(255)]
    public string ReferenceId { get; set; }

    [JsonProperty("setup_fee")]
    public decimal SetUpFee { get; set; }

    [JsonProperty("short_description")]
    [MaxLength(2047)]
    [Required]
    public string ShortDescription { get; set; }

    [JsonProperty("trial_length")]
    public long TrialLength { get; set; }

    #endregion
  }

  public class SubscriptionPlanCreateResponse
  {
    #region Public Properties

    [JsonIgnore]
    public WePayException Error { get; set; }

    [JsonProperty("subscription_plan_id")]
    public long SubscriptionPlanId { get; set; }

    #endregion
  }
}