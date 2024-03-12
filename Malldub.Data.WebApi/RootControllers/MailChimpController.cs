// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="MailChimpController.cs" company="Maras,co">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Configuration;
  using System.Linq;
  using System.Threading.Tasks;
  using System.Web.Http;

  using MailChimp.Net.Models;

  using Malldub.Data;
  using Malldub.Data.Models;
  using Malldub.WebApi.Models;

  using Marasco.MailChimpApi;
  using Marasco.MailChimpApi.Models;

  #endregion

  /// <summary>
  /// Class MailChimpController.
  /// </summary>
  /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
  [RoutePrefix("api/mailchimp")]
  [AllowAnonymous]
  public class MailChimpController : BaseApiController
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="MailChimpController" /> class.
    /// </summary>
    /// <remarks>Fill in the blank</remarks>
    public MailChimpController()
      : base(new MalldubDataContext()) {}

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// automate as an asynchronous operation.
    /// </summary>
    /// <param name="workflowId">The workflow identifier.</param>
    /// <param name="user">The user.</param>
    /// <returns>Task&lt;Queue&gt;.</returns>
    public async Task<Queue> AutomateAsync(string workflowId, ApplicationUser user)
    {
      // https://us3.api.mailchimp.com/3.0/automations/4f6734242b/emails/6c5b037126/queue
      var emailUser = TheContext.AspNetUserGateway.ByAspNetUserId(user.Id).SingleOrDefault();

      if (emailUser == null)
      {
        return new Queue();
      }

      return await AutomateAsync(workflowId, emailUser.AccountId, emailUser.Email);
    }

    /// <summary>
    /// automate as an asynchronous operation.
    /// </summary>
    /// <param name="workflowId">The workflow identifier.</param>
    /// <param name="emailId">The email identifier.</param>
    /// <param name="email">The email.</param>
    /// <returns>Task&lt;Queue&gt;.</returns>
    public async Task<Queue> AutomateAsync(string workflowId, string emailId, string email)
    {
      // https://us3.api.mailchimp.com/3.0/automations/4f6734242b/emails/6c5b037126/queue
      var automations = new Automations();
      var queue = await automations.EmailQueues(workflowId, emailId, email);
      return queue;
    }

    /// <summary>
    /// automate as an asynchronous operation.
    /// </summary>
    /// <param name="workflowId">The workflow identifier.</param>
    /// <param name="userId">The user identifier.</param>
    /// <returns>Task&lt;Queue&gt;.</returns>
    public async Task<Queue> AutomateAsync(string workflowId, string userId)
    {
      // https://us3.api.mailchimp.com/3.0/automations/4f6734242b/emails/6c5b037126/queue
      var emailUser = TheContext.AspNetUserGateway.ByAspNetUserId(userId).SingleOrDefault();

      if (emailUser == null)
      {
        return new Queue();
      }

      return await AutomateAsync(workflowId, emailUser.AccountId, emailUser.Email);
    }

    /// <summary>
    /// Creates the mail chimp subscriber.
    /// </summary>
    /// <param name="user">The user.</param>
    /// <param name="geo">The geo.</param>
    /// <param name="listName">Name of the list.</param>
    /// <param name="workflowId">The workflow identifier.</param>
    /// <param name="workflowTriggerId">The workflow trigger identifier.</param>
    /// <returns>Task.</returns>
    public async Task CreateMailChimpSubscriber(
      ApplicationUser user, 
      GeoCode geo, 
      string listName = "",
      string workflowId = "",
      string workflowTriggerId = "")
    {
      var dbuser = TheContext.AspNetUserGateway.ByAspNetUserId(user.Id).ByGatewayId("MailChimp").FirstOrDefault();

      var list = listName;

      if (string.IsNullOrEmpty(listName))
      {
        list = ConfigurationManager.AppSettings["MailChimpDefaultList"];
      }

      var listMember = new ListMember();
      var member = new MemberModel
                   {
                     AspNetUserId = user.Id, 
                     Email        = user.Email, 
                     FirstName    = user.FirstName, 
                     LastName     = user.LastName, 
                     Latitude     = Convert.ToDecimal(geo.Latitude), 
                     Longitude    = Convert.ToDecimal(geo.Longitude)
                   };

      var response = await listMember.Add(list, member);

      var gatewayUser = new AspNetUserGateway
                        {
                          AspNetUserId  = user.Id, 
                          TokenType     = "Unique Email ID", 
                          FirstName     = user.FirstName, 
                          LastName      = user.LastName, 
                          Email         = user.Email, 
                          UserState     = response.Status.ToString(), 
                          GatewayId     = "MailChimp", 
                          GatewayUserId = response.Id, 
                          AccountId     = response.UniqueEmailId, 
                          AccountState  = response.Status.ToString()
                        };

      if (dbuser == null)
      {
        TheContext.AspNetUserGateway.AddObject(gatewayUser);
      }
      else
      {
        gatewayUser.Identification = dbuser.Identification;
        gatewayUser.DateUpdated    = dbuser.DateEntered;
        TheContext.ApplyCurrentValues(dbuser.EntityKey.EntitySetName, gatewayUser);
      }

      TheContext.SaveChanges();

      // Begin automation trigger, if exists
      if (!string.IsNullOrEmpty(workflowTriggerId) && (!string.IsNullOrEmpty(workflowId)))
      {
        await AutomateAsync(workflowId, workflowTriggerId, user.Email);
      }
    }

    #endregion
  }
}