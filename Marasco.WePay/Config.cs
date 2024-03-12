// ***********************************************************************
// Assembly         : Marasco.WePay
// Author           : amarasco
// Created          : 10-22-2013
//
// Last Modified By : amarasco
// Last Modified On : 10-22-2013
// ***********************************************************************
// <copyright file="Config.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Marasco.WePay
{
    #region Directives

    using System;

    #endregion

    /// <summary>
    /// Class WePayConfig
    /// </summary>
    public static class WePayConfig
    {
        // staging credentials...

        #region Constants and Fields

        /// <summary>
        /// The auth scope
        /// </summary>
        public static string authScope =
            "manage_accounts,view_balance,collect_payments,refund_payments,view_user,preapprove_payments,send_money,manage_subscriptions";

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the access token.
        /// </summary>
        /// <value>The access token.</value>
        public static string accessToken { get; set; }
        /// <summary>
        /// Gets or sets the account id.
        /// </summary>
        /// <value>The account id.</value>
        public static int accountId { get; set; }
        /// <summary>
        /// Gets or sets the client id.
        /// </summary>
        /// <value>The client id.</value>
        public static int clientId { get; set; }
        /// <summary>
        /// Gets or sets the client secret.
        /// </summary>
        /// <value>The client secret.</value>
        public static string clientSecret { get; set; }
        /// <summary>
        /// Gets or sets a value indicating whether [production mode].
        /// </summary>
        /// <value><c>true</c> if [production mode]; otherwise, <c>false</c>.</value>
        public static bool productionMode { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Endpoints the specified prod.
        /// </summary>
        /// <param name="prod">if set to <c>true</c> [prod].</param>
        /// <returns>System.String.</returns>
        public static string endpoint(bool prod)
        {
            if (prod)
            {
                return @"https://wepayapi.com/v2/";
            }
            return @"https://stage.wepayapi.com/v2/";
        }

        #endregion
    }

    /// <summary>
    /// Class ExtensionMethods
    /// </summary>
    public static class ExtensionMethods
    {
        #region Public Methods and Operators

        /// <summary>
        /// Jsons the date.
        /// </summary>
        /// <param name="dt">The dt.</param>
        /// <returns>System.Double.</returns>
        public static double JsonDate(this DateTime dt)
        {
            DateTime d1 = new DateTime(1970, 1, 1);
            DateTime d2 = dt.ToUniversalTime();
            TimeSpan ts = new TimeSpan(d2.Ticks - d1.Ticks);
            return Math.Round(ts.TotalMilliseconds, 0);
        }

        #endregion
    }
}