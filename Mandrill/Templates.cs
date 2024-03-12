﻿// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Templates.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The mandrill api.</summary>
// ***********************************************************************
namespace Mandrill
{
    using System.Collections.Generic;
    using System.Dynamic;
    using System.Linq;
    using System.Threading.Tasks;

    using Mandrill.Models;

    using RestSharp;

  /// <summary>
  /// The mandrill api.
  /// </summary>
    public partial class MandrillApi
    {
        #region Public Methods and Operators

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
        public TemplateInfo AddTemplate(
            string name,
            string fromEmail,
            string fromName,
            string subject,
            string code,
            string text,
            bool publish,
            IEnumerable<string> labels)
        {
            return AddTemplateAsync(name, fromEmail, fromName, subject, code, text, publish, labels).Result;
        }

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
        public TemplateInfo AddTemplate(
            string name,
            string fromEmail,
            string fromName,
            string subject,
            string code,
            string text,
            bool publish)
        {
            return
                AddTemplateAsync(
                    name,
                    fromEmail,
                    fromName,
                    subject,
                    code,
                    text,
                    publish,
                    Enumerable.Empty<string>()).Result;
        }

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
        public Task<TemplateInfo> AddTemplateAsync(
            string name,
            string fromEmail,
            string fromName,
            string subject,
            string code,
            string text,
            bool publish)
        {
            return AddTemplateAsync(
                name,
                fromEmail,
                fromName,
                subject,
                code,
                text,
                publish,
                Enumerable.Empty<string>());
        }

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
        public Task<TemplateInfo> AddTemplateAsync(
            string name,
            string fromEmail,
            string fromName,
            string subject,
            string code,
            string text,
            bool publish,
            IEnumerable<string> labels)
        {
            const string PATH = "/templates/add.json";

            dynamic payload = new ExpandoObject();

            payload.name = name;
            payload.from_email = fromEmail;
            payload.from_name = fromName;
            payload.subject = subject;
            payload.code = code;
            payload.text = text;
            payload.publish = publish;

            if (!labels.Equals(Enumerable.Empty<string>()))
            {
                payload.labels = labels;
            }

            Task<IRestResponse> post = PostAsync(PATH, payload);

            return post.ContinueWith(
                p => JSON.Parse<TemplateInfo>(p.Result.Content),
                TaskContinuationOptions.ExecuteSynchronously);
        }

        /// <summary>
        /// The list templates.
        /// </summary>
        /// <returns>The <see cref="List{T}" />.</returns>
        public List<TemplateInfo> ListTemplates()
        {
            return ListTemplatesAsync().Result;
        }

        /// <summary>
        /// The list templates async.
        /// </summary>
        /// <returns>The <see cref="Task" />.</returns>
        public Task<List<TemplateInfo>> ListTemplatesAsync()
        {
            const string PATH = "/templates/list.json";

            return PostAsync(PATH, null)
                .ContinueWith(
                    p => JSON.Parse<List<TemplateInfo>>(p.Result.Content),
                    TaskContinuationOptions.ExecuteSynchronously);
        }

        /// <summary>
        /// The render.
        /// </summary>
        /// <param name="templateName">The template name.</param>
        /// <param name="templateContents">The template contents.</param>
        /// <param name="mergeVars">The merge vars.</param>
        /// <returns>The <see cref="RenderedTemplate" />.</returns>
        public RenderedTemplate Render(
            string templateName,
            IEnumerable<TemplateContent> templateContents,
            IEnumerable<merge_var> mergeVars)
        {
            return RenderAsync(templateName, templateContents, mergeVars).Result;
        }

        /// <summary>
        /// The render async.
        /// </summary>
        /// <param name="templateName">The template name.</param>
        /// <param name="templateContents">The template contents.</param>
        /// <param name="mergeVars">The merge vars.</param>
        /// <returns>The <see cref="Task" />.</returns>
        public Task<RenderedTemplate> RenderAsync(
            string templateName,
            IEnumerable<TemplateContent> templateContents,
            IEnumerable<merge_var> mergeVars)
        {
            const string PATH = "/templates/render.json";

            dynamic payload = new ExpandoObject();

            payload.template_name = templateName;
            payload.template_content = templateContents;
            payload.merge_vars = mergeVars;

            Task<IRestResponse> post = PostAsync(PATH, payload);

            return post.ContinueWith(
                p => JSON.Parse<RenderedTemplate>(p.Result.Content),
                TaskContinuationOptions.ExecuteSynchronously);
        }

        /// <summary>
        /// Updates the template.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <returns>System.Object.</returns>
        public object UpdateTemplate(object data)
        {
            return UpdateTemplateAsync(data).Result;
        }

        /// <summary>
        /// Updates the template asynchronous.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <returns>Task&lt;System.Object&gt;.</returns>
        public Task<object> UpdateTemplateAsync(object data)
        {
            const string PATH = "/templates/update.json";
            return PostAsync(PATH, data)
                .ContinueWith(p => JSON.Parse<object>(p.Result.Content), TaskContinuationOptions.ExecuteSynchronously);
        }

        #endregion
    }
}