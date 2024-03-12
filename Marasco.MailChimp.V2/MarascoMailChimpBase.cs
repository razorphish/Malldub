// ***********************************************************************
// Assembly         : Marasco.MailChimp
// Author           : David Antonio Marasco
// Created          : 03-14-2017
// Last Modified By : David Antonio Marasco
// Last Modified On : 03-14-2017
// ***********************************************************************
// <copyright file="MarascoMailChimpBase.cs" company="Maras,co">
//     Copyright ©  2017
// </copyright>
// ***********************************************************************
namespace Marasco.MailChimpApi
{
    #region Directives

    using System.Configuration;
    using System.Globalization;
    using System.Security.Cryptography;

    using MailChimp.Net;
    using MailChimp.Net.Core;
    using MailChimp.Net.Interfaces;

    #endregion

    /// <summary>
    /// Class MarascoMailChimpBase.
    /// </summary>
    public abstract class MarascoMailChimpBase
    {
        #region Fields

        /// <summary>
        /// The mail chimp manager
        /// </summary>
        protected IMailChimpManager MailChimpManager;

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the default type of the email.
        /// </summary>
        /// <value>The default type of the email.</value>
        public string DefaultEmailType { get; set; }

        /// <summary>
        /// Gets or sets the default name of the list.
        /// </summary>
        /// <value>The default name of the list.</value>
        public string DefaultListName { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        public void Initialize()
        {
            var config = new MailChimpConfiguration
                         {
                             ApiKey =
                                 ConfigurationManager.AppSettings["MailChimpApiKey"]
                         };

            MailChimpManager = new MailChimpManager(config);

            DefaultListName = ConfigurationManager.AppSettings["MailChimpDefaultList"];
            DefaultEmailType = ConfigurationManager.AppSettings["MailChimpDefaultEmailType"];
        }

        #endregion

        #region Methods

        /// <summary>
        /// The hash.
        /// </summary>
        /// <param name="emailAddress">
        /// The email address.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        internal string Hash(string emailAddress)
        {
            using (var md5 = MD5.Create())
            {
                return md5.GetHash(emailAddress);
            }
        }

        #endregion
    }
}