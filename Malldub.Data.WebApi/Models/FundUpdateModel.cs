// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 11-23-2016
// ***********************************************************************
// <copyright file="FundUpdateModel.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Models
{
    #region Directives

    using System.Collections.Generic;
    using System.Linq;

    using Malldub.Data;

    using Mandrill;

    #endregion

    /// <summary>
    /// Class FundUpdateModel.
    /// </summary>
    public class FundUpdateModel
    {
        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="FundUpdateModel"/> class.
        /// </summary>
        public FundUpdateModel()
        {
            ToEmails = new List<EmailAddress>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="FundUpdateModel"/> class.
        /// </summary>
        /// <param name="users">The users.</param>
        public FundUpdateModel(IEnumerable<FundUser> users) : this()
        {
            var fundUsers = users as IList<FundUser> ?? users.ToList();

            if (users == null || !fundUsers.Any())
            {
                return;
            }

            foreach (var user in fundUsers)
            {
                ToEmails.Add(new EmailAddress { email = user.User.Email, name = "Subscriber", type = "to" });
            }
        }

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the body.
        /// </summary>
        /// <value>The body.</value>
        public string Body { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>The email.</value>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the first name.
        /// </summary>
        /// <value>The first name.</value>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the fund title.
        /// </summary>
        /// <value>The fund title.</value>
        public string FundTitle { get; set; }

        /// <summary>
        /// Gets or sets the last name.
        /// </summary>
        /// <value>The last name.</value>
        public string LastName { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>The message.</value>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets the permalink.
        /// </summary>
        /// <value>The permalink.</value>
        public string Permalink { get; set; }

        /// <summary>
        /// Gets or sets the sub title.
        /// </summary>
        /// <value>The sub title.</value>
        public string SubTitle { get; set; }

        /// <summary>
        /// Gets or sets the subject.
        /// </summary>
        /// <value>The subject.</value>
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        /// <value>The title.</value>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets to emails.
        /// </summary>
        /// <value>To emails.</value>
        public List<EmailAddress> ToEmails { get; set; }

        #endregion
    }
}