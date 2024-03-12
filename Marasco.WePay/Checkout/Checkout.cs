// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
//
// Last Modified By : amarasco
// Last Modified On : 12-15-2016
// ***********************************************************************
// <copyright file="Checkout.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay
{
    #region Directives

    using Marasco.WePay.Models;

    #endregion

    /// <summary>
    /// Class Checkout.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class Checkout
    {
        #region Public Methods and Operators

        /// <summary>
        /// Gets the status.
        /// </summary>
        /// <param name="checkoutId">The checkout identifier.</param>
        /// <returns>CheckoutResponseModel.</returns>
        /// <remarks>Fill in the blank</remarks>
        public CheckoutResponseModel GetStatus(long checkoutId)
        {
            var req = new CheckoutRequestModel { CheckoutId = checkoutId };
            CheckoutResponseModel response;
            try
            {
                response = new WePayClient().Invoke<CheckoutRequestModel, CheckoutResponseModel>(req, req.ActionUrl);
            }
            catch (WePayException ex)
            {
                response = new CheckoutResponseModel { State = ex.Error, Amount = 0, Error = ex };
            }

            return response;
        }

        /// <summary>
        /// Posts the specified req.
        /// </summary>
        /// <param name="req">The req.</param>
        /// <returns>CheckoutResponseModel.</returns>
        /// <remarks>Fill in the blank</remarks>
        public CheckoutResponseModel Post(CheckoutCreateRequest req)
        {
            CheckoutResponseModel response;
            try
            {
                response = new WePayClient().Invoke<CheckoutCreateRequest, CheckoutResponseModel>(
                    req, 
                    req.ActionUrl, 
                    req.AccessToken);
            }
            catch (WePayException ex)
            {
                response = new CheckoutResponseModel
                           {
                               CheckoutId = 0, 
                               CallbackUri = req.HostedCheckout.RedirectUri + "?error=" + ex.Error, 
                               Error = ex
                           };
            }

            return response;
        }

        #endregion
    }
}