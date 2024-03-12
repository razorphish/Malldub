// ***********************************************************************
// Assembly         : Marasco.MailChimp
// Author           : David Antonio Marasco
// Created          : 03-14-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 03-14-2017
// ***********************************************************************
// <copyright file="Automations.cs" company="Maras,co">
//     Copyright ©  2017
// </copyright>
// ***********************************************************************
namespace Marasco.MailChimpApi
{
  #region Directives

  using System;
  using System.Threading.Tasks;

  using MailChimp.Net.Core;
  using MailChimp.Net.Models;

  #endregion

  /// <summary>
  /// Class Automations.
  /// </summary>
  /// <seealso cref="Marasco.MailChimpApi.MarascoMailChimpBase" />
  public class Automations : MarascoMailChimpBase
  {
    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="Automations" /> class.
    /// </summary>
    public Automations()
    {
      Initialize();
    }

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Emails the queues.
    /// </summary>
    /// <param name="workflowId">The workflow identifier.</param>
    /// <param name="workflowEmailId">The workflow email identifier.</param>
    /// <param name="emailAddress">The email address.</param>
    /// <returns>Task&lt;MailChimp.Net.Models.Queue&gt;.</returns>
    public async Task<Queue> EmailQueues(string workflowId, string workflowEmailId, string emailAddress)
    {
      try
      {
        var queue =
          await MailChimpManager.AutomationEmailQueues.AddSubscriberAsync(workflowId, workflowEmailId, emailAddress);
        return queue;
      }
      catch (MailChimpException mce)
      {
        var message = mce.Detail;
        if (mce.Title.Equals("Bad Request", StringComparison.CurrentCultureIgnoreCase))
        {
          return new Queue();
        }

        throw;
      }
      catch (Exception e)
      {
        var message = e.Message;
        throw;
      }

    }

    /// <summary>
    /// Starts the specified workflow identifier.
    /// </summary>
    /// <param name="workflowId">The workflow identifier.</param>
    /// <returns>Task.</returns>
    public async Task Start(string workflowId)
    {
      await MailChimpManager.Automations.StartAsync(workflowId);
    }

    #endregion
  }
}