// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
//
// Last Modified By : amarasco
// Last Modified On : 12-27-2016
// ***********************************************************************
// <copyright file="CreditCard.cs" company="Maras, co">
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
    /// Class CreditCard
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public class CreditCard
    {
        #region Public Methods and Operators

        /// <summary>
        /// Gets the status.
        /// </summary>
        /// <param name="creditCardId">The credit card identifier.</param>
        /// <returns>CreditCardResponseModel.</returns>
        /// <remarks>Fill in the blank</remarks>
        public CreditCardResponseModel GetStatus(long creditCardId)
        {
            var req = new CreditCardRequestModel { CreditCardId = creditCardId };
            CreditCardResponseModel response;
            try
            {
                response = new WePayClient().Invoke<CreditCardRequestModel, CreditCardResponseModel>(req, req.ActionUrl);
            }
            catch (WePayException ex)
            {
                response = new CreditCardResponseModel { Error = ex };
            }

            return response;
        }

        /// <summary>
        /// Posts the specified req.
        /// </summary>
        /// <param name="req">The req.</param>
        /// <returns>CreditCardCreateResponseModel.</returns>
        /// <remarks>Fill in the blank</remarks>
        public CreditCardCreateResponseModel Post(CreditCardCreateRequestModel req)
        {
            CreditCardCreateResponseModel response;
            try
            {
                response = new WePayClient().Invoke<CreditCardCreateRequestModel, CreditCardCreateResponseModel>(
                    req, 
                    req.ActionUrl, 
                    req.AccessToken);
            }
            catch (WePayException ex)
            {
                response = new CreditCardCreateResponseModel { CreditCardId = 0, Error = ex };
            }

            return response;
        }

        #endregion
    }
}