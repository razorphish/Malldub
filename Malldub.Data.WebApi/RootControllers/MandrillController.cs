// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 02-10-2017
// ***********************************************************************
// <copyright file="MandrillController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
    #region Directives

    using System.Collections.Generic;
    using System.Configuration;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Malldub.Data;
    using Malldub.Helper;
    using Malldub.WebApi.Models;

    using Mandrill;

    #endregion

    /// <summary>
    /// Class MandrillController.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    [RoutePrefix("api/mandrill")]
    [Authorize]
    public class MandrillController : ApiController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Passwords the reset.
        /// </summary>
        /// <param name="userInfo">The user information.</param>
        /// <returns>HttpResponseMessage.</returns>
        [AllowAnonymous]
        [HttpPost]
        [Route("passwordReset")]
        public HttpResponseMessage PasswordReset(UserInfoViewModel userInfo)
        {
            try
            {
                var result = SendPasswordReset(userInfo, string.Empty);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (MandrillException mex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, mex);
            }
        }

        #endregion

        #region Methods

        /// <summary>
        /// Sends the contact request.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendContactRequest(FundContactRequestModel model)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var template = ConfigurationManager.AppSettings["MandrillFundContactTemplate"];
            var subject = string.Format("Campaign Contact: {0} is trying to connect with you", model.FirstName);

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage
                          {
                              to =
                                  new List<EmailAddress>
                                  {
                                      new EmailAddress
                                      {
                                          email = model.ToEmail, 
                                          name = model.ToFullName, 
                                      }
                                  }, 
                              from_email = fromEmail, 
                              subject = subject
                          };

            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("FIRSTNAME", model.FirstName);
            message.AddGlobalVariable("FULLNAME", model.FullName);
            message.AddGlobalVariable("FUNDTITLE", model.FundTitle);
            message.AddGlobalVariable("EMAIL", model.Email);
            message.AddGlobalVariable("USERMESSAGE", model.Message);
            message.AddGlobalVariable("USERNAME", model.FunderFirstName);
            message.AddGlobalVariable("FUNDSUBJECT", subject);
            message.AddGlobalVariable("OURADDRESS", fromEmail);
            message.AddGlobalVariable("PERMALINK", model.Permalink);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the on donation.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendOnDonation(DonationModel model)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var fromEmail = model.OriginatorEmail;
            var template = ConfigurationManager.AppSettings["MandrillNotificationTemplate"];

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage { to = model.ToEmails, from_email = fromEmail, subject = model.Subject };

            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("USERNAME", model.DonorName);
            message.AddGlobalVariable("MESSAGE", model.Message);
            message.AddGlobalVariable("PERMALINK", model.Permalink);
            message.AddGlobalVariable("FUNDTITLE", model.FundTitle);
            message.AddGlobalVariable("TITLE", model.Subject);
            message.AddGlobalVariable("SUBTITLE", model.SubTitle);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the on update.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendOnUpdate(FundUpdateModel model)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var fromEmail = model.Email;
            var template = ConfigurationManager.AppSettings["MandrillNotificationTemplate"];

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage { to = model.ToEmails, from_email = fromEmail, subject = model.Subject };

            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("MESSAGE", model.Message);
            message.AddGlobalVariable("PERMALINK", model.Permalink);
            message.AddGlobalVariable("FUNDTITLE", model.FundTitle);
            message.AddGlobalVariable("TITLE", model.Subject);
            message.AddGlobalVariable("SUBTITLE", model.SubTitle);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the password reset.
        /// </summary>
        /// <param name="userInfo">The user information.</param>
        /// <param name="password">The password.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendPasswordReset(UserInfoViewModel userInfo, string password)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var toEmail = userInfo.Email;
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var template = ConfigurationManager.AppSettings["MandrillResetPasswordTemplate"];
            const string SUBJECT = "New Funding Miracles.com Password";

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage
                          {
                              to =
                                  new List<EmailAddress>
                                  {
                                      new EmailAddress
                                      {
                                          email = toEmail, 
                                          name =
                                              string.Format(
                                                  "{0} {1}",
                                                  userInfo.FirstName,
                                                  userInfo.LastName)
                                      }
                                  }, 
                              from_email = fromEmail, 
                              subject = SUBJECT
                          };

            message.AddGlobalVariable("FNAME", userInfo.FirstName);
            message.AddGlobalVariable("LNAME", userInfo.LastName);
            message.AddGlobalVariable("TEMP_PASSWORD", password);
            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the question.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendQuestion(QuestionModel model)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            const string TO_EMAIL = "support@fundingmiracles.com";
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var template = ConfigurationManager.AppSettings["MandrillSendQuestionTemplate"];
            const string SUBJECT = "Funding Miracles Support: New Question";

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage
                          {
                              to =
                                  new List<EmailAddress>
                                  {
                                      new EmailAddress
                                      {
                                          email = TO_EMAIL, 
                                          name = model.Name
                                      }
                                  }, 
                              from_email = fromEmail, 
                              subject = SUBJECT
                          };

            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("USERNAME", model.Name);
            message.AddGlobalVariable("EMAIL", model.Email);
            message.AddGlobalVariable("USERQUESTION", model.Message);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the share campaign.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendShareCampaign(ShareFundModel model)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var template = ConfigurationManager.AppSettings["MandrillShareCampaignTemplate"];
            var subject = string.Format("{0} shared a new campaign with you", model.FirstName);

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage { to = model.ToEmails, from_email = fromEmail, subject = subject };

            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("FUNDTITLE", model.FundTitle);
            message.AddGlobalVariable("FUNDDESCRIPTION", model.FundDescription);
            message.AddGlobalVariable("FUNDDONATEURL", model.FundDonateUrl);
            message.AddGlobalVariable("FUNDIMAGEURL", model.FundImageUrl);
            message.AddGlobalVariable("FUNDSUBJECT", subject);
            message.AddGlobalVariable("OURADDRESS", fromEmail);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the support.
        /// </summary>
        /// <param name="support">The support.</param>
        /// <param name="supporter">The supporter.</param>
        /// <param name="originator">The originator.</param>
        /// <param name="fund">The fund.</param>
        /// <param name="title">The title.</param>
        /// <param name="subject">The subject.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendSupport(
            SupportFundModel support, 
            AspNetUser supporter, 
            AspNetUser originator, 
            Fund fund, 
            string title, 
            string subject)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var template = ConfigurationManager.AppSettings["MandrillSupportCampaignTemplate"];

            if (originator == null)
            {
                return new List<EmailResult>
                       {
                           new EmailResult
                           {
                               RejectReason = "Invalid originator", 
                               Status = EmailResultStatus.Rejected, 
                               Email = string.Empty
                           }
                       };
            }

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage
                          {
                              to =
                                  new List<EmailAddress>
                                  {
                                      new EmailAddress
                                      {
                                          email =
                                              originator.Email, 
                                          name =
                                              string.Format(
                                                  "{0} {1}",
                                                  originator.FirstName,
                                                  originator.LastName)
                                      }
                                  }, 
                              from_email = fromEmail, 
                              subject = subject
                          };
            message.AddGlobalVariable("TITLE", title);
            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("FUNDTITLE", fund.Item.Title);
            message.AddGlobalVariable("FIRSTNAME", supporter.FirstName);
            message.AddGlobalVariable("LASTNAME", supporter.LastName);
            message.AddGlobalVariable("MESSAGE", support.Message);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the thank you.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendThankYou(DonationNoteModel model)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var toEmail = model.Email;
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var template = ConfigurationManager.AppSettings["MandrillThankYouNoteTemplate"];
            const string SUBJECT = "Warm Thank You For Your Donation";

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage
                          {
                              to =
                                  new List<EmailAddress>
                                  {
                                      new EmailAddress
                                      {
                                          email = toEmail, 
                                          name = model.DonorName
                                      }
                                  }, 
                              from_email = fromEmail, 
                              subject = SUBJECT
                          };

            message.AddGlobalVariable("CURRENT_DATE", DateUtilties.GetPstDateNow().ToString("G"));
            message.AddGlobalVariable("USERNAME", model.DonorName);
            message.AddGlobalVariable("EMAIL", model.Email);
            message.AddGlobalVariable("USERMESSAGE", model.Message);
            message.AddGlobalVariable("PERMALINK", model.Permalink);
            message.AddGlobalVariable("FUNDTITLE", model.FundTitle);

            var result = api.SendMessage(
                message, 
                template, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        /// <summary>
        /// Sends the welcome message.
        /// </summary>
        /// <param name="userInfo">The user information.</param>
        /// <returns>List&lt;EmailResult&gt;.</returns>
        internal static List<EmailResult> SendWelcomeMessage(UserInfoViewModel userInfo)
        {
            // Setup
            var apiKey = ConfigurationManager.AppSettings["MandrillToken"];
            var toEmail = userInfo.Email;
            var fromEmail = ConfigurationManager.AppSettings["MandrillFromEMail"];
            var welcomeTemplate = ConfigurationManager.AppSettings["MandrillWelcomeTemplate"];
            var subject = ConfigurationManager.AppSettings["MandrillWelcomeSubject"];

            // Exercise
            var api = new MandrillApi(apiKey);
            var message = new EmailMessage
                          {
                              to =
                                  new List<EmailAddress>
                                  {
                                      new EmailAddress
                                      {
                                          email = toEmail, 
                                          name =
                                              string.Format(
                                                  "{0} {1}",
                                                  userInfo.FirstName,
                                                  userInfo.LastName)
                                      }
                                  }, 
                              from_email = fromEmail, 
                              subject = subject
                          };

            message.AddGlobalVariable("FNAME", userInfo.FirstName);
            message.AddGlobalVariable("LNAME", userInfo.LastName);

            var result = api.SendMessage(
                message, 
                welcomeTemplate, 
                new List<TemplateContent>
                {
                    new TemplateContent { name = "model1", content = "Content1" }, 
                    new TemplateContent { name = "model2", content = "Content2" }
                });

            return result;
        }

        #endregion
    }
}