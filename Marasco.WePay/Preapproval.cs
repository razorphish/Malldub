// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
//
// Last Modified By : amarasco
// Last Modified On : 10-22-2013
// ***********************************************************************
// <copyright file="Preapproval.cs" company="Maras, co">
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
    /// Class Preapproval
    /// </summary>
    public class Preapproval
    {
        #region Public Methods and Operators

        /// <summary>
        /// Gets the status.
        /// </summary>
        /// <param name="req">The req.</param>
        /// <returns>PreapprovalResponse.</returns>
        public PreapprovalResponse GetStatus(PreapprovalRequest req)
        {
            // var req = new PreapprovalRequest { preapproval_id = preapproval_id };
            PreapprovalResponse response;
            try
            {
                response = new WePayClient().Invoke<PreapprovalRequest, PreapprovalResponse>(req, req.actionUrl);
            }
            catch (WePayException ex)
            {
                response = new PreapprovalResponse { state = ex.Error, amount = 0, Error = ex };
            }
            return response;
        }

        /// <summary>
        /// Posts the specified req.
        /// </summary>
        /// <param name="req">The req.</param>
        /// <returns>PreapprovalCreateResponse.</returns>
        public PreapprovalCreateResponse Post(PreapprovalCreateRequest req)
        {
            PreapprovalCreateResponse response;
            try
            {
                response = new WePayClient().Invoke<PreapprovalCreateRequest, PreapprovalCreateResponse>(
                    req,
                    req.actionUrl,
                    req.accessToken);
            }
            catch (WePayException ex)
            {
                response = new PreapprovalCreateResponse
                {
                    preapproval_uri = req.redirect_uri + "?error=" + ex.Error,
                    Error = ex
                };
            }

            return response;
        }

        #endregion
    }

    /// <summary>
    /// Class PreapprovalCreateRequest
    /// </summary>
    public class PreapprovalCreateRequest
    {
        #region Constants and Fields

        /// <summary>
        /// The action URL
        /// </summary>
        [JsonIgnore]
        public string actionUrl = @"preapproval/create";

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the access token.
        /// </summary>
        /// <value>The access token.</value>
        [JsonIgnore]
        public string accessToken { get; set; }

        /// <summary>
        /// Gets or sets the account_id.
        /// </summary>
        /// <value>The account_id.</value>
        public long account_id { get; set; }
        /// <summary>
        /// Gets or sets the amount.
        /// </summary>
        /// <value>The amount.</value>
        public decimal amount { get; set; }
        /// <summary>
        /// Gets or sets the app_fee.
        /// </summary>
        /// <value>The app_fee.</value>
        public decimal app_fee { get; set; }

        /// <summary>
        /// Gets or sets the callback_uri.
        /// </summary>
        /// <value>The callback_uri.</value>
        public string callback_uri { get; set; }
        /// <summary>
        /// Gets or sets the fee_payer.
        /// </summary>
        /// <value>The fee_payer.</value>
        public string fee_payer { get; set; }
        /// <summary>
        /// Gets or sets the long_description.
        /// </summary>
        /// <value>The long_description.</value>
        public string long_description { get; set; }
        /// <summary>
        /// Gets or sets the mode.
        /// </summary>
        /// <value>The mode.</value>
        public string mode { get; set; }
        /// <summary>
        /// Gets or sets the payee_email_message.
        /// </summary>
        /// <value>The payee_email_message.</value>
        public string payee_email_message { get; set; }
        /// <summary>
        /// Gets or sets the payer_email_message.
        /// </summary>
        /// <value>The payer_email_message.</value>
        public string payer_email_message { get; set; }
        /// <summary>
        /// Gets or sets the period.
        /// </summary>
        /// <value>The period.</value>
        public string period { get; set; }
        /// <summary>
        /// Gets or sets the redirect_uri.
        /// </summary>
        /// <value>The redirect_uri.</value>
        public string redirect_uri { get; set; }
        /// <summary>
        /// Gets or sets the reference_id.
        /// </summary>
        /// <value>The reference_id.</value>
        public string reference_id { get; set; }
        /// <summary>
        /// Gets or sets the short_description.
        /// </summary>
        /// <value>The short_description.</value>
        public string short_description { get; set; }

        #endregion
    }

    /// <summary>
    /// Class PreapprovalCreateResponse
    /// </summary>
    public class PreapprovalCreateResponse
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the error.
        /// </summary>
        /// <value>The error.</value>
        [JsonIgnore]
        public WePayException Error { get; set; }

        /// <summary>
        /// Gets or sets the preapproval_id.
        /// </summary>
        /// <value>The preapproval_id.</value>
        public long preapproval_id { get; set; }
        /// <summary>
        /// Gets or sets the preapproval_uri.
        /// </summary>
        /// <value>The preapproval_uri.</value>
        public string preapproval_uri { get; set; }

        #endregion
    }

    /// <summary>
    /// Class PreapprovalRequest
    /// </summary>
    public class PreapprovalRequest
    {
        #region Constants and Fields

        /// <summary>
        /// The action URL
        /// </summary>
        [JsonIgnore]
        public string actionUrl = @"preapproval";

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the access token.
        /// </summary>
        /// <value>The access token.</value>
        [JsonIgnore]
        public string accessToken { get; set; }

        /// <summary>
        /// Gets or sets the preapproval_id.
        /// </summary>
        /// <value>The preapproval_id.</value>
        public long preapproval_id { get; set; }

        #endregion
    }

    /// <summary>
    /// Class PreapprovalResponse
    /// </summary>
    public class PreapprovalResponse
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the error.
        /// </summary>
        /// <value>The error.</value>
        [JsonIgnore]
        public WePayException Error { get; set; }

        /// <summary>
        /// Gets or sets the account_id.
        /// </summary>
        /// <value>The account_id.</value>
        public long account_id { get; set; }
        /// <summary>
        /// Gets or sets the amount.
        /// </summary>
        /// <value>The amount.</value>
        public decimal amount { get; set; }
        /// <summary>
        /// Gets or sets the amount_refunded.
        /// </summary>
        /// <value>The amount_refunded.</value>
        public decimal amount_refunded { get; set; }
        /// <summary>
        /// Gets or sets the app_fee.
        /// </summary>
        /// <value>The app_fee.</value>
        public string app_fee { get; set; }
        /// <summary>
        /// Gets or sets the auto_capture.
        /// </summary>
        /// <value>The auto_capture.</value>
        public string auto_capture { get; set; }
        /// <summary>
        /// Gets or sets the callback_uri.
        /// </summary>
        /// <value>The callback_uri.</value>
        public string callback_uri { get; set; }
        /// <summary>
        /// Gets or sets the cancel_reason.
        /// </summary>
        /// <value>The cancel_reason.</value>
        public string cancel_reason { get; set; }
        /// <summary>
        /// Gets or sets the create_time.
        /// </summary>
        /// <value>The create_time.</value>
        public string create_time { get; set; }
        /// <summary>
        /// Gets or sets the currency.
        /// </summary>
        /// <value>The currency.</value>
        public string currency { get; set; }
        /// <summary>
        /// Gets or sets the fee.
        /// </summary>
        /// <value>The fee.</value>
        public string fee { get; set; }
        /// <summary>
        /// Gets or sets the fee_payer.
        /// </summary>
        /// <value>The fee_payer.</value>
        public string fee_payer { get; set; }
        /// <summary>
        /// Gets or sets the gross.
        /// </summary>
        /// <value>The gross.</value>
        public string gross { get; set; }
        /// <summary>
        /// Gets or sets the long_description.
        /// </summary>
        /// <value>The long_description.</value>
        public string long_description { get; set; }
        /// <summary>
        /// Gets or sets the payer_email.
        /// </summary>
        /// <value>The payer_email.</value>
        public string payer_email { get; set; }
        /// <summary>
        /// Gets or sets the payer_name.
        /// </summary>
        /// <value>The payer_name.</value>
        public string payer_name { get; set; }
        /// <summary>
        /// Gets or sets the preapproval_id.
        /// </summary>
        /// <value>The preapproval_id.</value>
        public long preapproval_id { get; set; }
        /// <summary>
        /// Gets or sets the redirect_uri.
        /// </summary>
        /// <value>The redirect_uri.</value>
        public string redirect_uri { get; set; }
        /// <summary>
        /// Gets or sets the reference_id.
        /// </summary>
        /// <value>The reference_id.</value>
        public string reference_id { get; set; }
        /// <summary>
        /// Gets or sets the refund_reason.
        /// </summary>
        /// <value>The refund_reason.</value>
        public string refund_reason { get; set; }
        /// <summary>
        /// Gets or sets the require_shipping.
        /// </summary>
        /// <value>The require_shipping.</value>
        public string require_shipping { get; set; }
        /// <summary>
        /// Gets or sets the shipping_address.
        /// </summary>
        /// <value>The shipping_address.</value>
        public string shipping_address { get; set; }
        /// <summary>
        /// Gets or sets the short_description.
        /// </summary>
        /// <value>The short_description.</value>
        public string short_description { get; set; }
        /// <summary>
        /// Gets or sets the state.
        /// </summary>
        /// <value>The state.</value>
        public string state { get; set; }
        /// <summary>
        /// Gets or sets the tax.
        /// </summary>
        /// <value>The tax.</value>
        public string tax { get; set; }
        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>The type.</value>
        public string type { get; set; }

        #endregion
    }
}