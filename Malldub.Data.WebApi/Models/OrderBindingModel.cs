namespace Malldub.WebApi.Models
{
  #region Directives

  using System;

  #endregion

  public class OrderBindingModel
  {
    #region Public Properties

    public string AuthorizationTransactionCode { get; set; }
    public string AuthorizationTransactionId { get; set; }

    public string AuthorizationTransactionResult { get; set; }
    public int BillingAddressId { get; set; }

    public string CaptureTransactionId { get; set; }

    public string CaptureTransactionResult { get; set; }
    public string CardCvv2 { get; set; }
    public string CardExpirationMonth { get; set; }
    public string CardExpirationYear { get; set; }
    public string CardName { get; set; }
    public string CardNumber { get; set; }
    public string CardType { get; set; }
    public string CustomerId { get; set; }

    public DateTime DateEntered { get; set; }
    public Guid Guid { get; set; }
    public int Identification { get; set; }
    public string MaskedCreditCardNumber { get; set; }
    public string PaymentMethodSystemName { get; set; }
    public string PaymentStatusId { get; set; }
    public string PurchaseOrderNumber { get; set; }
    public int? ShippingAddressId { get; set; }
    public string StatusId { get; set; }
    public string SubscriptionTransactionId { get; set; }

    #endregion
  }
}