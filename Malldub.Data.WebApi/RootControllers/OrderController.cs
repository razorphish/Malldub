// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-08-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 02-09-2015
// ***********************************************************************
// <copyright file="OrderController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Configuration;
  using System.Data.Entity;
  using System.Globalization;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Threading.Tasks;
  using System.Web.Http;

  using Malldub.Data;
  using Malldub.WebApi.Models;

  using Mandrill;

  using Marasco.WePay;
  using Marasco.WePay.Models;

  using ErrorResponse = Marasco.WePay.ErrorResponse;

  #endregion

  /// <summary>
  /// Class OrderDetailsController.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class OrderDetailsController : BaseApiController
  {
    #region Fields

    /// <summary>
    /// Donation object from client
    /// </summary>
    private Donation _donation;

    /// <summary>
    /// Fundraiser
    /// </summary>
    private Item _item;

    /// <summary>
    /// The _subscription create response
    /// </summary>
    private SubscriptionCreateResponse _subscriptionCreateResponse;

    #endregion

    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="OrderDetailsController" /> class.
    /// </summary>
    public OrderDetailsController()
      : base(new MalldubDataContext()) {}

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    /// <exception cref="HttpResponseException"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public HttpResponseMessage Post(Order value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      // var results = new List<ValidationResult>();
      // bool isValid = DataAnnotationsValidator.TryValidateObjectRecursive(value.BillingAddressAddress, results);
      try
      {
        ProcessOrder(value);

        value.AspNetUser = null;

        if (_subscriptionCreateResponse != null && _subscriptionCreateResponse.SubscriptionId > 0)
        {
          _donation.SubscriptionId = _subscriptionCreateResponse.SubscriptionId.ToString(CultureInfo.CurrentCulture);
        }

        TheContext.Order.AddObject(value);

        var fundUser = TheContext.FundUser.GetByKey(_donation.FundId, _donation.DonorUserId, "Donor");
        if (fundUser == null)
        {
          var newFundUser = new FundUser
                            {
                              AllowEmail = true,
                              FundId     = _donation.FundId,
                              UserId     = _donation.DonorUserId,
                              UserTypeId = "Donor"
                            };

          TheContext.FundUser.AddObject(newFundUser);
        }

        TheContext.SaveChanges();

        // Send notifications
        SendDonationNotifications(value);
        var donationId = value.DonationList.Select(d => d.Identification).FirstOrDefault();

        var donation = TheContext.Donation
                .Include("DonorUserAspNetUser")
                .Include("DonorUserAspNetUser.AspNetUserLoginList")
                .ByIdentification(donationId)
                .ToList()
                .Select(
                  d => TheModelFactory.Create(d))
                 .FirstOrDefault();

        var response = Request.CreateResponse(HttpStatusCode.Created, donation);
        response.Headers.Location = new Uri(Url.Link("DefaultApi", new { value.Identification }));

        return response;
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
    /// Creates the subscription.
    /// </summary>
    /// <param name="subscriptionPlan">The subscription plan.</param>
    /// <param name="ccres">The ccres.</param>
    /// <param name="user">The user.</param>
    /// <returns>SubscriptionCreateResponse.</returns>
    /// <exception cref="Marasco.WePay.WePayException"></exception>
    /// <exception cref="WePayException"></exception>
    private static SubscriptionCreateResponse CreateSubscription(
      SubscriptionPlanCreateResponse subscriptionPlan, 
      CreditCardCreateResponseModel ccres, 
      AspNetUserGateway user)
    {
      if (user == null)
      {
        throw new WePayException
              {
                Error = "WePay account missing", 
                ErrorDescription =
                  "The campaign owner has not yet setup a payment account. Please try again later.", 
                ErrorMessage = "The campaign owner has not yet setup a payment account.", 
                ErrorCode = "md0002", 
                Source = "orderController.processCheckout"
              };
      }

      var sc = new SubscriptionCreateRequest
               {
                 AccessToken        = user.AccessToken, 
                 SubscriptionPlanId = subscriptionPlan.SubscriptionPlanId, 
                 PaymentMethodId    = ccres.CreditCardId, 
                 PaymentMethodType  = "credit_card",
                 Quantity           = 1
               };

      var req = new Subscription();

      var res = req.Create(sc);

      return res;
    }

    /// <summary>
    /// Processes the checkout.
    /// </summary>
    /// <param name="ccres">The ccres.</param>
    /// <param name="value">The value.</param>
    /// <returns>CheckoutCreateResponse.</returns>
    /// <exception cref="Marasco.WePay.WePayException">
    /// </exception>
    /// <exception cref="WePayException"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private CheckoutResponseModel ProcessCheckout(CreditCardCreateResponseModel ccres, Order value)
    {
      _donation = new Donation();

      var firstOrDefault = value.OrderItemList.FirstOrDefault();

      foreach (var donationItem in value.DonationList)
      {
        _donation = donationItem;
        break;
      }

      // TODO: Allow multiple products
      if (firstOrDefault != null)
      {
        _item =
          TheContext.Item.ByIdentification(firstOrDefault.ItemId)
                  .Include("Fund.DonationList")
                  .Include("Fund.FundSetting")
                  .Include("Fund.FundActivityList")
                  .Include("Fund.FundUserList")
                  .Include("Fund.FundUserList.AspNetUser")
                  .Include("Fund.FundUserList.AspNetUser.AspNetUserClaimList")
                  .Include("ItemUploadList")
                  .Include("ItemUploadList.Upload")
                  .FirstOrDefault();
      }

      if (_item == null)
      {
        throw new WePayException
              {
                Error = "Item missing from order", 
                ErrorDescription = "The item was not found in the database", 
                ErrorMessage = "Unable to retrieve item in order", 
                ErrorCode = "md1000", 
                Source = "orderController.processCheckout"
              };
      }

      var user = TheContext.AspNetUserGateway.ByAspNetUserId(_item.UserId).FirstOrDefault();

      if (user == null)
      {
        throw new WePayException
              {
                Error = "WePay account missing", 
                ErrorDescription =
                  "The campaign owner has not yet setup a payment account. Please try again later.", 
                ErrorMessage = "The campaign owner has not yet setup a payment account.", 
                ErrorCode = "md0002", 
                Source = "orderController.processCheckout"
              };
      }

      // Fix for over %20 app Fee
      var amount = _donation.Amount + (_donation.CostsCovered ? 0 : _donation.SystemAmount);

      var totalAmount = _item.Fund.DonationList.Sum(d => d.BeneficiaryAmount) + amount;
      var emailMessage = string.Format(
        ConfigurationManager.AppSettings["WePayThankYouDonation"], 
        _item.Title, 
        DateTime.Now, 
        totalAmount.ToString("c"));

      var systemAmount = _donation.SystemAmount;
      if (systemAmount > (amount * .2m))
      {
        systemAmount = amount * .2m;
        _donation.SystemAmount = systemAmount;
      }

      var longDescription = string.Format(
                         "id:{0}|did:{1}|oid:{2}|fid:{3}",
                         user.Identification,
                         _donation.Identification,
                         value.Identification,
                         _donation.FundId);

      var co = new CheckoutCreateRequest
               {
                 Currency           = "USD",
                 AccessToken        = user.AccessToken, 
                 AccountId          = Convert.ToInt64(user.AccountId),
                 AutoRelease        = true,
                 DeliveryType       = "donation",
                 ShortDescription   = "Mars.OrderController.WebApi::ProcessCheckout()",
                 LongDescription    = longDescription,
                 Type               = "donation", 
                 Amount             = amount, 
                 Fee = new FeeModel
                       {
                         AppFee   = systemAmount,
                         FeePayer = _donation.CostsCovered ? "payer" : "payee", 
                       },

                 PaymentMethod = new PaymentMethodModel
                                 {
                                   Type = "credit_card",
                                   CreditCard = new CreditCardModel
                                                {
                                                  Id = ccres.CreditCardId,
                                                  AutoCapture = true
                                                }
                                 },
                 EmailMessage      = new EmailMessageModel
                                  {
                                    ToPayee = emailMessage,
                                    ToPayer = emailMessage
                                  }, 
               };

      var req = new Checkout();

      var res = req.Post(co);
      value.CaptureTransactionId = res.CheckoutId.ToString(CultureInfo.CurrentCulture);
      return res;
    }

    /// <summary>
    /// Processes the order.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <exception cref="WePayException"></exception>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private void ProcessOrder(Order value)
    {
      var ccres = WePayController.ProcessCreditCard(value);
      if (ccres.Error != null)
      {
        throw ccres.Error;
      }

      var checkout = ProcessCheckout(ccres, value);

      if (checkout.Error != null)
      {
        throw checkout.Error;
      }

      // Only Monthly is supported for now
      var subscription = ProcessSubscription(ccres);

      //if (subscription.Error != null)
      //{
      //  throw subscription.Error;
      //}
    }

    /// <summary>
    /// Processes the subscription.
    /// </summary>
    /// <param name="ccres">The ccres.</param>
    /// <returns>Response from wePay subscription create</returns>
    private SubscriptionCreateResponse ProcessSubscription(CreditCardCreateResponseModel ccres)
    {
      if (_donation.SubscriptionTypeId != "Monthly")
      {
        return new SubscriptionCreateResponse();
      }

      var user = TheContext.AspNetUserGateway.ByAspNetUserId(_item.UserId).FirstOrDefault();

      var subscriptionplan = ProcessSubscriptionPlan(user);
      _subscriptionCreateResponse = CreateSubscription(subscriptionplan, ccres, user);

      return _subscriptionCreateResponse;
    }

    /// <summary>
    /// Processes the subscription plan.
    /// </summary>
    /// <param name="user">The user.</param>
    /// <returns>SubscriptionPlanCreateResponse.</returns>
    /// <exception cref="Marasco.WePay.WePayException"></exception>
    /// <exception cref="WePayException"></exception>
    private SubscriptionPlanCreateResponse ProcessSubscriptionPlan(AspNetUserGateway user)
    {
      if (user == null)
      {
        throw new WePayException
              {
                Error = "WePay account missing", 
                ErrorDescription =
                  "The campaign owner has not yet setup a payment account. Please try again later.", 
                ErrorMessage = "The campaign owner has not yet setup a payment account.", 
                ErrorCode = "md0002", 
                Source = "orderController.processCheckout"
              };
      }

      var sp = new SubsriptionPlanCreateRequest
               {
                 AccountId = Convert.ToInt64(user.AccountId), 
                 Name =
                   string.Format(
                     "Subscription for {0} {1} [Fund : {2}]", 
                     user.AspNetUser.FirstName, 
                     user.AspNetUser.LastName, 
                     _item.Title), 
                 ShortDescription =
                   string.Format(
                     "Monthly Subscription (30 days) for {0} {1} [Fund : {2}]", 
                     user.AspNetUser.FirstName, 
                     user.AspNetUser.LastName, 
                     _item.Title), 
                 Amount =
                   _donation.Amount
                   + (_donation.CostsCovered ? 0 : _donation.SystemAmount), 
                 Currency = "USD", 
                 Period = "monthly", 
                 AppFee = _donation.SystemAmount, 
                 TrialLength = 30
               };

      var req = new SubscriptionPlan();

      var res = req.Create(sp);

      return res;
    }

    /// <summary>
    /// Sends the donation.
    /// </summary>
    /// <param name="originator">The originator.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="title">The title.</param>
    /// <param name="message">The message.</param>
    /// <param name="toEmails">To emails.</param>
    private void SendDonation(
      FundUser originator, 
      string subject, 
      string title, 
      string message, 
      List<EmailAddress> toEmails)
    {
      MandrillController.SendOnDonation(
        new DonationModel
        {
          DonorName       = _donation.DonorName, 
          FundTitle       = _item.Title, 
          Permalink       = _item.Permalink, 
          Subject         = subject, 
          Title           = title, 
          SubTitle        = string.Empty, 
          ToEmails        = toEmails,
          OriginatorEmail = ConfigurationManager.AppSettings["MandrillFromEMail"], 
          Message         = message
        });
    }

    /// <summary>
    /// Sends the donation notifications.
    /// </summary>
    /// <param name="order">The order.</param>
    /// <remarks>Default Blank Remakrs Test</remarks>
    private void SendDonationNotifications(Order order)
    {
      var memo = string.Format(
        "A donation in the amount of {0} has been given by {1}", 
        _donation.Amount.ToString("C"), 
        _donation.DonorName);

      var originator = _item.Fund.FundUserList.FirstOrDefault(fi => fi.UserTypeId == "Originator");

      if (originator == null)
      {
        return;
      }

      string facebookMsg;
      string notificationMsg;
      string activityMsg;

      Parallel.Invoke(
        () =>
        {
          activityMsg = SendNotificationSaveActivities(order, originator, memo);
        },
        () =>
        {
          notificationMsg = SendNotificationEmailUser(originator, memo);
        },
        () =>
        {
          facebookMsg = SendNotificationPostFacebookUser(originator);
        });

      //var awaitList = new[]
      //                {
      //                  Task.Factory.StartNew(() => { facebookMsg = SendNotificationPostFacebookUser(originator); }),
      //                  Task.Factory.StartNew(() => { notificationMsg = SendNotificationEmailUser(originator, memo); }),
      //                  Task.Factory.StartNew(() => { activityMsg = SendNotificationSaveActivities(order, originator, memo); }),
      //                };

      //Task.WaitAll(awaitList);
    }

    private string SendNotificationSaveActivities(Order order, FundUser originator, string memo)
    {
      try
      {
        var activities = _item.Fund.FundActivityList;

        // Check percentage raised
        var totalDonations = _item.Fund.DonationList.Sum(donation => donation.BeneficiaryAmount);
        var percentage = Math.Round((totalDonations / _item.Fund.GoalAmount) * 100);

        if (percentage >= 25 && percentage < 50 && activities.All(act => act.TypeId != "25PercentFundRaised"))
        {
          if (_item.Fund.FundSetting.EmailSendSupporter25Raised)
          {
            SendPercentageToSupporter(totalDonations, originator, "25");
          }

          TheContext.FundActivity.AddObject(
            new FundActivity
            {
              FundId = _item.Identification,
              TypeId = "25PercentFundRaised",
              Activity =
                new Activity { TypeId = "Update", Memo = "25% of the campaign goal has been raised" }
            });
        }

        if (percentage >= 50 && percentage < 75 && activities.All(act => act.TypeId != "50PercentFundRaised"))
        {
          if (_item.Fund.FundSetting.EmailSendSupporter50Raised)
          {
            SendPercentageToSupporter(totalDonations, originator, "50");
          }

          TheContext.FundActivity.AddObject(
            new FundActivity
            {
              FundId = _item.Identification,
              TypeId = "50PercentFundRaised",
              Activity =
                new Activity { TypeId = "Update", Memo = "50% of the campaign goal has been raised" }
            });
        }

        if (percentage >= 75 && percentage < 100 && activities.All(act => act.TypeId != "75PercentFundRaised"))
        {
          if (_item.Fund.FundSetting.EmailSendSupporter75Raised)
          {
            SendPercentageToSupporter(totalDonations, originator, "75");
          }

          TheContext.FundActivity.AddObject(
            new FundActivity
            {
              FundId = _item.Identification,
              TypeId = "75PercentFundRaised",
              Activity =
                new Activity { TypeId = "Update", Memo = "75% of the campaign goal has been raised" }
            });
        }

        if (percentage > 100 && activities.All(act => act.TypeId != "100PercentFundRaised"))
        {
          TheContext.FundActivity.AddObject(
            new FundActivity
            {
              FundId = _item.Identification,
              TypeId = "100PercentFundRaised",
              Activity =
                new Activity { TypeId = "Update", Memo = "100% of the campaign goal has been raised" }
            });
        }

        // Add donation activity (general)
        TheContext.FundActivity.AddObject(
          new FundActivity
          {
            FundId = _item.Identification,
            TypeId = "DonationReceived",
            Activity = new Activity { TypeId = "Create", Memo = memo }
          });

        // Add Notification (general)
        TheContext.FundNote.AddObject(
          new FundNote
          {
            Note =
              new Note
              {
                Subject =
                  string.Format(
                    "[Fundolo] Donation - Donor: {0} - Amount: {1}",
                    _donation.DonorName,
                    _donation.Amount.ToString("C")),
                Comments = string.Format("{0} Donor message: {1}", memo, _donation.Message),
                Sent = false,
                Viewed = false,
                ApplicationId = "Fundolo",
                TypeId = "System",
                FirstName = _donation.DonorName,
                Email = _donation.Email
              },
            TypeId = "Donation",
            FundId = _item.Identification,
            FundUserId = originator.UserId
          });

        // Add Comment
        if (_donation.Message.Length > 0)
        {
          TheContext.FundComment.AddObject(
            new FundComment
            {
              Comment =
                new Comment
                {
                  Post = _donation.Message,
                  UserId = string.IsNullOrEmpty(order.CustomerId) ? null : order.CustomerId,
                  Geo = order.Geo,
                  Title =
                    string.Format(
                      "Commented with a ${0} donation:",
                      Convert.ToInt64(_donation.Amount)),
                  Name = _donation.DonorName
                },
              FundId = _item.Identification,
              OriginId = "Donation",
              DonationId = _donation.Identification
            });
        }
        TheContext.SaveChanges();

        return "Success";

      }
      catch (Exception)
      {

        // Supress error and move on.  This error usually indicates that campaign owner has not logged 
        // in with Facebook for a while
        return "Failed";
      }
    }

    private string SendNotificationEmailUser(FundUser originator, string memo)
    {
      try
      {
        if (!_item.Fund.FundSetting.EmailReceiveUserDonation)
        {
          return "Success";
        }

        const string TITLE = "{0} has donated {1} to your campaign '{2}'";

        SendDonation(
          originator,
          "You have a new Donation!",
          string.Format(TITLE, _donation.DonorName, _donation.Amount.ToString("C"), _item.Title),
          memo,
          new List<EmailAddress>
            {
              new EmailAddress
              {
                email = originator.AspNetUser.Email,
                name =
                  string.Format(
                    "{0} {1}",
                    originator.AspNetUser.FirstName,
                    originator.AspNetUser.LastName)
              }
            });
        return "Success";
      }
      catch (Exception)
      {
        // Supress error and move on.  This error usually indicates that campaign owner has not logged 
        // in with Facebook for a while
        return "Fail";
      }
    }

    private string SendNotificationPostFacebookUser(FundUser originator)
    {
      try
      {
        var accessToken =
        originator.AspNetUser.AspNetUserClaimList.FirstOrDefault(cl => cl.ClaimType == FacebookController.CLAIM_TYPE);

        if (!_item.Fund.FundSetting.FacebookPostUserDonate || accessToken == null)
        {
          return "Invalid Token";
        }

        var defaultImage = _item.ItemUploadList.FirstOrDefault(img => img.IsDefault == true);
        var fb = new FacebookController();

        fb.PostToFacebook(
          _item.Description,
          string.Format(
            "{0} has donated {1} to our campaign.  Thank you!",
            _donation.DonorName,
            _donation.Amount.ToString("C")),
          _item.Permalink,
          _item.Title,
          defaultImage,
          accessToken.ClaimValue);

        return "Success";
      }
      catch (Exception)
      {
        // Supress error and move on.  This error usually indicates that campaign owner has not logged 
        // in with Facebook for a while
        return "Failed";
      }
    }

    /// <summary>
    /// Sends the percentage to supporter.
    /// </summary>
    /// <param name="totalDonations">The total donations.</param>
    /// <param name="originator">The originator.</param>
    /// <param name="percentage">The percentage.</param>
    private void SendPercentageToSupporter(decimal totalDonations, FundUser originator, string percentage)
    {
      const string MESSAGE = "Good Job! We have raised {0} which is over {2}% of our campaign goal, {1}.";
      const string SUBJECT = "Congratulations!  We have reached {0}% of our campaign goal";
      const string TITLE = "You have raised {1}% of your campaign goal {0}";
      var toEmails =
        _item.Fund.FundUserList.Where(ful => ful.AllowEmail)
             .Select(
               f =>
               new EmailAddress
               {
                 email = f.AspNetUser.Email, 
                 name = string.Format("{0} {1}", f.AspNetUser.FirstName, f.AspNetUser.LastName)
               })
             .ToList();

      SendDonation(
        originator, 
        string.Format(SUBJECT, percentage), 
        string.Format(TITLE, _item.Fund.GoalAmount.ToString("C"), percentage), 
        string.Format(MESSAGE, totalDonations.ToString("C"), _item.Fund.GoalAmount.ToString("C"), percentage), 
        toEmails);
    }

    #endregion
  }
}