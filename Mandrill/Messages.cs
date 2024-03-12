// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Messages.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The mandrill api.</summary>
// ***********************************************************************
namespace Mandrill
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Dynamic;
  using System.Linq;
  using System.Threading.Tasks;

  using RestSharp;

  #endregion

  /// <summary>
  /// The mandrill api.
  /// </summary>
  public partial class MandrillApi : IMandrillApi
  {
    #region Public Methods and Operators

    /// <summary>
    /// The cancel scheduled message.
    /// </summary>
    /// <param name="id">The id.</param>
    /// <returns>The <see cref="ScheduledEmailResult" />.</returns>
    public ScheduledEmailResult CancelScheduledMessage(string id)
    {
      const string PATH = "/messages/cancel-scheduled.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;

      Task<IRestResponse> post = PostAsync(PATH, payload);
      return
        post.ContinueWith(
          p => JSON.Parse<ScheduledEmailResult>(p.Result.Content), 
          TaskContinuationOptions.ExecuteSynchronously).Result;
    }

    /// <summary>
    /// Get the full content of a recently sent message.
    /// </summary>
    /// <param name="id">Unique id of the message to get -- passed as the "_id" field in
    /// webhooks, send calls, or search calls.</param>
    /// <returns>The <see cref="Content" /></returns>
    public Content Content(string id)
    {
      return ContentAsync(id).Result;
    }

    /// <summary>
    /// Get the full content of a recently sent message.
    /// </summary>
    /// <param name="id">Unique id of the message to get -- passed as the "_id" field in
    /// webhooks, send calls, or search calls.</param>
    /// <returns>The <see cref="Content" /></returns>
    public Task<Content> ContentAsync(string id)
    {
      const string PATH = "/messages/content.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;

      Task<IRestResponse> post = PostAsync(PATH, payload);

      return post.ContinueWith(
        p => JSON.Parse<Content>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// Send a new search instruction through Mandrill.
    /// </summary>
    /// <param name="info">The information.</param>
    /// <returns>The <see cref="SearchResult" />.</returns>
    public SearchResult Info(Info info)
    {
      return InfoAsync(info).Result;
    }

    /// <summary>
    /// Send a new info instruction through Mandrill.
    /// </summary>
    /// <param name="info">The info.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<SearchResult> InfoAsync(Info info)
    {
      const string PATH = "/messages/info.json";

      dynamic payload = new ExpandoObject();
      payload.id = info.id;

      Task<IRestResponse> post = PostAsync(PATH, payload);

      return post.ContinueWith(
        p => JSON.Parse<SearchResult>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// The list scheduled messages.
    /// </summary>
    /// <returns>The <see cref="List{T}" />.</returns>
    public List<ScheduledEmailResult> ListScheduledMessages()
    {
      const string PATH = "/messages/list-scheduled.json";

      dynamic payload = new ExpandoObject();
      Task<IRestResponse> post = PostAsync(PATH, payload);
      return
        post.ContinueWith(
          p => JSON.Parse<List<ScheduledEmailResult>>(p.Result.Content), 
          TaskContinuationOptions.ExecuteSynchronously).Result;
    }

    /// <summary>
    /// The list scheduled messages.
    /// </summary>
    /// <param name="to">The to.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    /// <see cref="ScheduledEmailResult"></see>
    public List<ScheduledEmailResult> ListScheduledMessages(string to)
    {
      const string PATH = "/messages/list-scheduled.json";

      dynamic payload = new ExpandoObject();
      payload.to = to;

      Task<IRestResponse> post = PostAsync(PATH, payload);
      return
        post.ContinueWith(
          p => JSON.Parse<List<ScheduledEmailResult>>(p.Result.Content), 
          TaskContinuationOptions.ExecuteSynchronously).Result;
    }

    /// <summary>
    /// The reschedule message.
    /// </summary>
    /// <param name="id">The id.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="ScheduledEmailResult" />.</returns>
    public ScheduledEmailResult RescheduleMessage(string id, DateTime sendAt)
    {
      const string PATH = "/messages/reschedule.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;
      payload.send_at = (sendAt == DateTime.MinValue)
                          ? string.Empty
                          : sendAt.ToString(Configuration.DateTimeFormatString);

      Task<IRestResponse> post = PostAsync(PATH, payload);
      return
        post.ContinueWith(
          p => JSON.Parse<ScheduledEmailResult>(p.Result.Content), 
          TaskContinuationOptions.ExecuteSynchronously).Result;
    }

    /// <summary>
    /// Send a new search instruction through Mandrill.
    /// </summary>
    /// <param name="search">The search.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    public List<SearchResult> Search(Search search)
    {
      return SearchAsync(search).Result;
    }

    /// <summary>
    /// Send a new search instruction through Mandrill.
    /// </summary>
    /// <param name="search">The search.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<SearchResult>> SearchAsync(Search search)
    {
      const string PATH = "/messages/search.json";

      dynamic payload = new ExpandoObject();
      payload.query = search.query;
      payload.date_from = search.date_from;
      payload.date_to = search.date_to;
      payload.tags = search.tags;
      payload.senders = search.senders;
      payload.limit = search.limit;

      Task<IRestResponse> post = PostAsync(PATH, payload);

      return post.ContinueWith(
        p => JSON.Parse<List<SearchResult>>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// Send a new transactional message through Mandrill.
    /// </summary>
    /// <param name="recipients">The recipients.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="content">The content.</param>
    /// <param name="from">From.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    public List<EmailResult> SendMessage(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      string content, 
      EmailAddress from, 
      DateTime sendAt = new DateTime())
    {
      return SendMessageAsync(recipients, subject, content, from, sendAt).Result;
    }

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
    public List<EmailResult> SendMessage(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      EmailAddress from, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime())
    {
      return SendMessageAsync(recipients, subject, from, templateName, templateContents, sendAt).Result;
    }

    /// <summary>
    /// The send message.
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    public List<EmailResult> SendMessage(EmailMessage message, DateTime sendAt = new DateTime())
    {
      return SendMessageAsync(message, sendAt).Result;
    }

    /// <summary>
    /// Send a new transactional message through Mandrill using a template
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="templateName">Name of the template.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    public List<EmailResult> SendMessage(
      EmailMessage message, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime())
    {
      return SendMessageAsync(message, templateName, templateContents, sendAt).Result;
    }

    /// <summary>
    /// Send a new transactional message through Mandrill.
    /// </summary>
    /// <param name="recipients">The recipients.</param>
    /// <param name="subject">The subject.</param>
    /// <param name="content">The content.</param>
    /// <param name="from">From.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<EmailResult>> SendMessageAsync(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      string content, 
      EmailAddress from, 
      DateTime sendAt = new DateTime())
    {
      var message = new EmailMessage
                    {
                      to = recipients, 
                      from_name = from.name, 
                      from_email = from.email, 
                      subject = subject, 
                      html = content, 
                      auto_text = true, 
                    };

      return SendMessageAsync(message, sendAt);
    }

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
    public Task<List<EmailResult>> SendMessageAsync(
      IEnumerable<EmailAddress> recipients, 
      string subject, 
      EmailAddress from, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime())
    {
      var message = new EmailMessage
                    {
                      to = recipients, 
                      from_name = from.name, 
                      from_email = from.email, 
                      subject = subject, 
                    };

      return SendMessageAsync(message, templateName, templateContents, sendAt);
    }

    /// <summary>
    /// Sends a new transactional message through Mandrill.
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<EmailResult>> SendMessageAsync(EmailMessage message, DateTime sendAt = new DateTime())
    {
      const string PATH = "/messages/send.json";

      dynamic payload = new ExpandoObject();
      payload.message = message;
      payload.send_at = (sendAt == DateTime.MinValue)
                          ? string.Empty
                          : sendAt.ToString(Configuration.DateTimeFormatString);

      Task<IRestResponse> post = PostAsync(PATH, payload);

      return post.ContinueWith(
        p => JSON.Parse<List<EmailResult>>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// Send a new transactional message through Mandrill using a template
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="templateName">Name of the template.</param>
    /// <param name="templateContents">The template contents.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<EmailResult>> SendMessageAsync(
      EmailMessage message, 
      string templateName, 
      IEnumerable<TemplateContent> templateContents, 
      DateTime sendAt = new DateTime())
    {
      const string PATH = "/messages/send-template.json";

      dynamic payload = new ExpandoObject();
      payload.message = message;
      payload.template_name = templateName;
      payload.template_content = templateContents ?? Enumerable.Empty<TemplateContent>();
      payload.send_at = (sendAt == DateTime.MinValue)
                          ? string.Empty
                          : sendAt.ToString(Configuration.DateTimeFormatString);

      Task<IRestResponse> post = PostAsync(PATH, payload);
      return post.ContinueWith(
        p => JSON.Parse<List<EmailResult>>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    /// <summary>
    /// The send raw message.
    /// </summary>
    /// <param name="rawMessage">The rawMessage.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="List{T}" />.</returns>
    public List<EmailResult> SendRawMessage(EmailMessage rawMessage, DateTime sendAt = new DateTime())
    {
      return SendRawMessageAsync(rawMessage, sendAt).Result;
    }

    /// <summary>
    /// Send a new raw transactional message through Mandrill using a template
    /// </summary>
    /// <param name="message">The message.</param>
    /// <param name="sendAt">The sendAt.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<EmailResult>> SendRawMessageAsync(EmailMessage message, DateTime sendAt = new DateTime())
    {
      const string PATH = "/messages/send-raw.json";

      dynamic payload = new ExpandoObject();
      payload.raw_message = message.raw_message;
      payload.from_email = message.from_email;
      payload.from_name = message.from_name;
      payload.send_at = (sendAt == DateTime.MinValue)
                          ? string.Empty
                          : sendAt.ToString(Configuration.DateTimeFormatString);

      // payload.to = message.to;  // Does not work as advertised, silently fails with {"email":"Array","status":"invalid"}
      Task<IRestResponse> post = PostAsync(PATH, payload);
      return post.ContinueWith(
        p => JSON.Parse<List<EmailResult>>(p.Result.Content), 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    #endregion
  }
}