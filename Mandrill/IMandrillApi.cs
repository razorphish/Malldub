// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="IMandrillApi.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Mandrill
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Net;
  using System.Threading.Tasks;

  using Mandrill.Models;

  #endregion

  /// <summary>
  /// Interface IMandrillApi
  /// </summary>
  public interface IMandrillApi
  {
    #region Public Properties

    /// <summary>
    /// Gets the Api Key for the project received from the MandrillApp website
    /// </summary>
    /// <value>The API key.</value>
    string ApiKey { get; }

    /// <summary>
    /// Gets or sets the proxy.
    /// </summary>
    /// <value>The proxy.</value>
    IWebProxy Proxy { get; set; }

    /// <summary>
    /// Gets or sets UserAgent to use for requests.
    /// </summary>
    /// <value>The user agent.</value>
    string UserAgent { get; set; }

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Add a new subaccount.
    /// </summary>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=add</remarks>
    /// <param name="subaccount">The subaccount to add</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information saved about the new subaccount</returns>
    SubaccountInfo AddSubaccount(SubaccountInfo subaccount, string notes = "");

    /// <summary>
    /// Asynchronously add a new subaccount.
    /// </summary>
    /// <remarks>
    /// https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=add : Mandrill API Documentation
    /// </remarks>
    /// <param name="subaccount">The subaccount to add</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information saved about the new subaccount</returns>
    Task<SubaccountInfo> AddSubaccountAsync(SubaccountInfo subaccount, string notes);

    /// <summary>
    /// Add a new template.
    /// </summary>
    /// <param name="name">The name for the new template - must be unique.</param>
    /// <param name="fromEmail">A default sending address for emails sent using this template.</param>
    /// <param name="fromName">A default from name to be used.</param>
    /// <param name="subject">A default subject line to be used.</param>
    /// <param name="code">The HTML code for the template with <c>mc:edit</c> attributes for
    /// the editable elements.</param>
    /// <param name="text">A default text part to be used when sending with this template.</param>
    /// <param name="publish">Set to false to add a draft template without publishing.</param>
    /// <param name="labels">Array of up to 10 labels to use for filtering templates.</param>
    /// <returns>A <see cref="TemplateInfo" /> object.</returns>
    TemplateInfo AddTemplate(
      string name, 
      string fromEmail, 
      string fromName, 
      string subject, 
      string code, 
      string text, 
      bool publish, 
      IEnumerable<string> labels);

    /// <summary>
    /// Add a new template.
    /// </summary>
    /// <param name="name">The name for the new template - must be unique.</param>
    /// <param name="fromEmail">A default sending address for emails sent using this template.</param>
    /// <param name="fromName">A default from name to be used.</param>
    /// <param name="subject">A default subject line to be used.</param>
    /// <param name="code">The HTML code for the template with <c>mc:edit</c> attributes for
    /// the editable elements.</param>
    /// <param name="text">A default text part to be used when sending with this template.</param>
    /// <param name="publish">Set to false to add a draft template without publishing.</param>
    /// <returns>A <see cref="TemplateInfo" /> object.</returns>
    TemplateInfo AddTemplate(
      string name, 
      string fromEmail, 
      string fromName, 
      string subject, 
      string code, 
      string text, 
      bool publish);

    /// <summary>
    /// Add a new template asynchronously.
    /// </summary>
    /// <param name="name">The name for the new template - must be unique.</param>
    /// <param name="fromEmail">A default sending address for emails sent using this template.</param>
    /// <param name="fromName">A default from name to be used.</param>
    /// <param name="subject">A default subject line to be used.</param>
    /// <param name="code">The HTML code for the template with <c>mc:edit</c> attributes for
    /// the editable elements.</param>
    /// <param name="text">A default text part to be used when sending with this template.</param>
    /// <param name="publish">if set to <c>true</c> [publish].</param>
    /// <returns>A <see cref="TemplateInfo" /> object.</returns>
    Task<TemplateInfo> AddTemplateAsync(
      string name, 
      string fromEmail, 
      string fromName, 
      string subject, 
      string code, 
      string text, 
      bool publish);

    /// <summary>
    /// Add a new template asynchronously.
    /// </summary>
    /// <param name="name">The name for the new template - must be unique.</param>
    /// <param name="fromEmail">A default sending address for emails sent using this template.</param>
    /// <param name="fromName">A default from name to be used.</param>
    /// <param name="subject">A default subject line to be used.</param>
    /// <param name="code">The HTML code for the template with <c>mc:edit</c> attributes for
    /// the editable elements.</param>
    /// <param name="text">A default text part to be used when sending with this template.</param>
    /// <param name="publish">if set to <c>true</c> [publish].</param>
    /// <param name="labels">Array of up to 10 labels to use for filtering templates.</param>
    /// <returns>A <see cref="TemplateInfo" /> object.</returns>
    Task<TemplateInfo> AddTemplateAsync(
      string name, 
      string fromEmail, 
      string fromName, 
      string subject, 
      string code, 
      string text, 
      bool publish, 
      IEnumerable<string> labels);

    /// <summary>
    /// The cancel scheduled message.
    /// </summary>
    /// <param name="id">The id.</param>
    /// <returns>The <see cref="ScheduledEmailResult" />.</returns>
    ScheduledEmailResult CancelScheduledMessage(string id);

    /// <summary>
    /// The list senders.
    /// </summary>
    /// <param name="domain">The domain.</param>
    /// <returns>a <see cref="SenderDomain" /></returns>
    SenderDomain CheckSenderDomain(string domain);

    /// <summary>
    /// The list senders async.
    /// </summary>
    /// <param name="domain">The domain.</param>
    /// <returns>The <see cref="Task{SenderDomain}" />.</returns>
    Task<SenderDomain> CheckSenderDomainAsync(string domain);

    /// <summary>
    /// Get the full content of a recently sent message.
    /// </summary>
    /// <param name="id">Unique id of the message to get -- passed as the "_id" field in
    /// webhooks, send calls, or search calls.</param>
    /// <returns>The <see cref="MandrillApi.Content" /></returns>
    Content Content(string id);

    /// <summary>
    /// Get the full content of a recently sent message.
    /// </summary>
    /// <param name="id">Unique id of the message to get -- passed as the "_id" field in
    /// webhooks, send calls, or search calls.</param>
    /// <returns>The <see cref="MandrillApi.Content" /></returns>
    Task<Content> ContentAsync(string id);

    /// <summary>
    /// The delete reject.
    /// </summary>
    /// <param name="email">The email.</param>
    /// <returns>The <see cref="RejectDeleteResult" />.</returns>
    /// <exception cref="Exception"></exception>
    RejectDeleteResult DeleteReject(string email);

    /// <summary>
    /// The delete reject async.
    /// </summary>
    /// <param name="email">The email.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<RejectDeleteResult> DeleteRejectAsync(string email);

    /// <summary>
    /// Delete an existing subaccount. Any email related to the subaccount will be saved, but stats will be removed and any
    /// future sending calls to this subaccount will fail.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to delete</param>
    /// <returns>the information for the deleted subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=delete</remarks>
    SubaccountInfo DeleteSubaccount(string id);

    /// <summary>
    /// Asynchronously delete an existing subaccount. Any email related to the subaccount will be saved, but stats will be
    /// removed and any future sending calls to this subaccount will fail.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to delete</param>
    /// <returns>the information for the deleted subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=delete</remarks>
    Task<SubaccountInfo> DeleteSubaccountAsync(string id);

    /// <summary>
    /// Send a new search instruction through Mandrill.
    /// </summary>
    /// <param name="info">The information.</param>
    /// <returns>The <see cref="SearchResult" />.</returns>
    SearchResult Info(Info info);

    /// <summary>
    /// Send a new info instruction through Mandrill.
    /// </summary>
    /// <param name="info">The info.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<SearchResult> InfoAsync(Info info);

    /// <summary>
    /// Lists the rejects.
    /// </summary>
    /// <param name="email">email address to limit the results</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<RejectInfo> ListRejects(string email = "");

    /// <summary>
    /// Lists the rejects asynchronous.
    /// </summary>
    /// <param name="email">email address to limit the results</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<RejectInfo>> ListRejectsAsync(string email = "");

    /// <summary>
    /// The list scheduled messages.
    /// </summary>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<ScheduledEmailResult> ListScheduledMessages();

    /// <summary>
    /// The list scheduled messages.
    /// </summary>
    /// <param name="to">The to.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<ScheduledEmailResult> ListScheduledMessages(string to);

    /// <summary>
    /// The list senders.
    /// </summary>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<Sender> ListSenders();

    /// <summary>
    /// The list senders async.
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<Sender>> ListSendersAsync();

    /// <summary>
    /// Get the list of subaccounts defined for the account, optionally filtered by a prefix.
    /// </summary>
    /// <param name="q">An optional prefix to filter the subaccounts' ids and names</param>
    /// <returns>the subaccounts for the account, up to a maximum of 1,000</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=list</remarks>
    List<SubaccountInfo> ListSubaccounts(string q = "");

    /// <summary>
    /// Asynchronously get the list of subaccounts defined for the account, optionally filtered by a prefix.
    /// </summary>
    /// <param name="q">An optional prefix to filter the subaccounts' ids and names.</param>
    /// <returns>the subaccounts for the account, up to a maximum of 1,000</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=list</remarks>
    Task<List<SubaccountInfo>> ListSubaccountsAsync(string q = "");

    /// <summary>
    /// The list templates.
    /// </summary>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<TemplateInfo> ListTemplates();

    /// <summary>
    /// The list templates async.
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<TemplateInfo>> ListTemplatesAsync();

    /// <summary>
    /// Pause a subaccount's sending. Any future emails delivered to this subaccount will be queued for a maximum of 3 days
    /// until the subaccount is resumed.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to pause</param>
    /// <returns>the information for the paused subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=pause</remarks>
    SubaccountInfo PauseSubaccount(string id);

    /// <summary>
    /// Asynchronously pause a subaccount's sending. Any future emails delivered to this subaccount will be queued for a
    /// maximum of 3 days until the subaccount is resumed.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to pause</param>
    /// <returns>the information for the paused subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=pause</remarks>
    Task<SubaccountInfo> PauseSubaccountAsync(string id);

    /// <summary>
    /// Validate an API key and respond to a ping
    /// </summary>
    /// <returns>The <see cref="string" />.</returns>
    string Ping();

    /// <summary>
    /// Validate an API key and respond to a ping
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    Task<string> PingAsync();

    /// <summary>
    /// The render.
    /// </summary>
    /// <param name="templateName">The template name.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="mergeVars">The merge vars.</param>
    /// <returns>The <see cref="RenderedTemplate" />.</returns>
    RenderedTemplate Render(
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      IEnumerable<merge_var> mergeVars);

    /// <summary>
    /// The render async.
    /// </summary>
    /// <param name="templateName">The template name.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="mergeVars">The merge vars.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<RenderedTemplate> RenderAsync(
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      IEnumerable<merge_var> mergeVars);

    /// <summary>
    /// The reschedule message.
    /// </summary>
    /// <param name="id">The id.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="ScheduledEmailResult" />.</returns>
    ScheduledEmailResult RescheduleMessage(string id, DateTime sendAt);

    /// <summary>
    /// Resume a paused subaccount's sending
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to resume</param>
    /// <returns>the information for the resumed subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=resume</remarks>
    SubaccountInfo ResumeSubaccount(string id);

    /// <summary>
    /// Asynchronously resume a paused subaccount's sending
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to resume</param>
    /// <returns>the information for the resumed subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=resume</remarks>
    Task<SubaccountInfo> ResumeSubaccountAsync(string id);

    /// <summary>
    /// Send a new search instruction through Mandrill.
    /// </summary>
    /// <param name="search">The search.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<SearchResult> Search(Search search);

    /// <summary>
    /// Send a new search instruction through Mandrill.
    /// </summary>
    /// <param name="search">The search.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<SearchResult>> SearchAsync(Search search);

    /// <summary>
    /// Send a new transactional message through Mandrill.
    /// </summary>
    /// <param name="recipients">The recipients.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="content">The content.</param>
    /// <param name="from">From.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<EmailResult> SendMessage(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      string content, 
      EmailAddress from, 
      DateTime sendAt = new DateTime());

    /// <summary>
    /// Send a new transactional message through Mandrill using a template
    /// </summary>
    /// <param name="recipients">The recipients.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="from">From.</param>
    /// <param name="templateName">Name of the template.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<EmailResult> SendMessage(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      EmailAddress from, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime());

    /// <summary>
    /// The send message.
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<EmailResult> SendMessage(EmailMessage message, DateTime sendAt = new DateTime());

    /// <summary>
    /// Send a new transactional message through Mandrill using a template
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="templateName">Name of the template.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<EmailResult> SendMessage(
      EmailMessage message, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime());

    /// <summary>
    /// Send a new transactional message through Mandrill.
    /// </summary>
    /// <param name="recipients">The recipients.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="content">The content.</param>
    /// <param name="from">From.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<EmailResult>> SendMessageAsync(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      string content, 
      EmailAddress from, 
      DateTime sendAt = new DateTime());

    /// <summary>
    /// Send a new transactional message through Mandrill using a template
    /// </summary>
    /// <param name="recipients">The recipients.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="from">From.</param>
    /// <param name="templateName">Name of the template.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<EmailResult>> SendMessageAsync(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      EmailAddress from, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime());

    /// <summary>
    /// Sends a new transactional message through Mandrill.
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<EmailResult>> SendMessageAsync(EmailMessage message, DateTime sendAt = new DateTime());

    /// <summary>
    /// Send a new transactional message through Mandrill using a template
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="templateName">Name of the template.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<EmailResult>> SendMessageAsync(
      EmailMessage message, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime());

    /// <summary>
    /// The send raw message.
    /// </summary>
    /// <param name="rawMessage">The rawMessage.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<EmailResult> SendRawMessage(EmailMessage rawMessage, DateTime sendAt = new DateTime());

    /// <summary>
    /// Send a new raw transactional message through Mandrill using a template
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<EmailResult>> SendRawMessageAsync(EmailMessage message, DateTime sendAt = new DateTime());

    /// <summary>
    /// The list senders.
    /// </summary>
    /// <returns>The <see cref="List{T}" />.</returns>
    List<SenderDomain> SenderDomains();

    /// <summary>
    /// The list senders async.
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    Task<List<SenderDomain>> SenderDomainsAsync();

    /// <summary>
    /// Given the ID of an existing subaccount, return the data about it
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to query</param>
    /// <returns>the information about the subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=info</remarks>
    SubaccountInfo SubaccountInfo(string id);

    /// <summary>
    /// Given the ID of an existing subaccount, asynchronously return the data about it
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to query</param>
    /// <returns>the information about the subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=info</remarks>
    Task<SubaccountInfo> SubaccountInfoAsync(string id);

    /// <summary>
    /// Update an existing subaccount
    /// </summary>
    /// <param name="subaccount">The subaccount to update</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information for the updated subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=update</remarks>
    SubaccountInfo UpdateSubaccount(SubaccountInfo subaccount, string notes = "");

    /// <summary>
    /// Asynchronously update an existing subaccount
    /// </summary>
    /// <param name="subaccount">The subaccount to update</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information for the updated subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=update</remarks>
    Task<SubaccountInfo> UpdateSubaccountAsync(SubaccountInfo subaccount, string notes = "");

    /// <summary>
    /// Updates the template.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <returns>System.Object.</returns>
    object UpdateTemplate(object data);

    /// <summary>
    /// Updates the template asynchronous.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <returns>Task&lt;System.Object&gt;.</returns>
    Task<object> UpdateTemplateAsync(object data);

    /// <summary>
    /// The user info.
    /// </summary>
    /// <returns>The <see cref="MandrillApi.UserInfo" />.</returns>
    /// <exception cref="Exception"></exception>
    UserInfo UserInfo();

    /// <summary>
    /// Return the information about the API-connected user
    /// </summary>
    /// <returns>The <see cref="Task" />.</returns>
    /// <remarks>https://mandrillapp.com/api/docs/users.html#method=info</remarks>
    Task<UserInfo> UserInfoAsync();

    #endregion
  }
}