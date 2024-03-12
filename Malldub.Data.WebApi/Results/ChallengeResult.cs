// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-04-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 11-04-2013
// ***********************************************************************
// <copyright file="ChallengeResult.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Malldub.WebApi.Results
{
    #region Directives

    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web.Http;

    #endregion

    /// <summary>
    /// The challenge result.
    /// </summary>
    /// <remarks>Malldub</remarks>
    public class ChallengeResult : IHttpActionResult
    {
        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ChallengeResult" /> class.
        /// </summary>
        /// <param name="loginProvider">The login provider.</param>
        /// <param name="controller">The controller.</param>
        /// <remarks>Malldub.remarks</remarks>
        public ChallengeResult(string loginProvider, ApiController controller)
        {
            LoginProvider = loginProvider;
            Request = controller.Request;
        }

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets or sets the login provider.
        /// </summary>
        /// <value>The login provider.</value>
        /// <remarks>Malldub.remarks</remarks>
        public string LoginProvider { get; set; }

        /// <summary>
        /// Gets or sets the request.
        /// </summary>
        /// <value>The request.</value>
        /// <remarks>Malldub.remarks</remarks>
        public HttpRequestMessage Request { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// The execute async.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>The <see cref="Task" />.</returns>
        /// <remarks>Malldub.remarks</remarks>
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            Request.GetOwinContext().Authentication.Challenge(LoginProvider);

            var response = new HttpResponseMessage(HttpStatusCode.Unauthorized) { RequestMessage = this.Request };
            var task = Task.FromResult(response);
          return task;
        }

        #endregion
    }
}