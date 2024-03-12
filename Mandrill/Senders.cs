// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Senders.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The mandrill api.</summary>
// ***********************************************************************
namespace Mandrill
{
  #region Directives

  using System.Collections.Generic;
  using System.Dynamic;
  using System.Threading.Tasks;

  using Mandrill.Models;

  using RestSharp;

  #endregion

  /// <summary>
  /// The mandrill api.
  /// </summary>
  public partial class MandrillApi
  {
    #region Public Methods and Operators

    /// <summary>
    /// The list senders.
    /// </summary>
    /// <param name="domain">The domain.</param>
    /// <returns>a <see cref="SenderDomain" /></returns>
    public SenderDomain CheckSenderDomain(string domain)
    {
      return CheckSenderDomainAsync(domain).Result;
    }

    /// <summary>
    /// The list senders async.
    /// </summary>
    /// <param name="domain">The domain.</param>
    /// <returns>The <see cref="Task{SenderDomain}" />.</returns>
    public Task<SenderDomain> CheckSenderDomainAsync(string domain)
    {
      const string PATH = "/senders/check-domain.json";

      dynamic payload = new ExpandoObject();
      payload.domain = domain;

      Task<IRestResponse> post = PostAsync(PATH, payload);

      return post.ContinueWith(
        p => JSON.Parse<SenderDomain>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// The list senders.
    /// </summary>
    /// <returns>List&lt;Sender&gt;.</returns>
    public List<Sender> ListSenders()
    {
      return ListSendersAsync().Result;
    }

    /// <summary>
    /// The list senders async.
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<Sender>> ListSendersAsync()
    {
      const string PATH = "/senders/list.json";

      return PostAsync(PATH, null)
                 .ContinueWith(
                   p => JSON.Parse<List<Sender>>(p.Result.Content), 
                   TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// The list senders.
    /// </summary>
    /// <returns><see cref="List{T}" /></returns>
    public List<SenderDomain> SenderDomains()
    {
      return SenderDomainsAsync().Result;
    }

    /// <summary>
    /// The list senders async.
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<SenderDomain>> SenderDomainsAsync()
    {
      const string PATH = "/senders/domains.json";

      return PostAsync(PATH, null)
                 .ContinueWith(
                   p => JSON.Parse<List<SenderDomain>>(p.Result.Content), 
                   TaskContinuationOptions.ExecuteSynchronously);
    }

    #endregion
  }
}