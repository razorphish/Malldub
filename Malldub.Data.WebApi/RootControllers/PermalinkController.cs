// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : Antonio David Marasco
// Created          : 08-28-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 11-05-2013
// ***********************************************************************
// <copyright file="PermalinkController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************

namespace Malldub.WebApi.RootControllers
{
    #region Directives

    using System;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using CodeSmith.Data.Linq.Dynamic;

    using Data;

  #endregion

    /// <summary>
    /// Class PermalinkController.
    /// </summary>
    /// <remarks>Malldub.remarks</remarks>
    public class PermalinkController : ApiController
    {
        #region Fields

        /// <summary>
        /// The _context
        /// </summary>
        private readonly MalldubDataContext _context = new MalldubDataContext();

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Permalinks the exists.
        /// </summary>
        /// <param name="permalink">The permalink.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <remarks>Malldub.remarks</remarks>
        [Route("api/permalinks/{permalink}")]
        [HttpGet]
        public HttpResponseMessage PermalinkExists(string permalink)
        {
            var obj = new Permalink
            {
                Exists = CheckReservedWords(permalink) || DynamicQueryable.Any(_context.Item.ByPermalink(permalink))
            };

            return Request.CreateResponse(HttpStatusCode.OK, obj);
        }

        #endregion

        #region Methods

        /// <summary>
        /// Checks the reserved words.
        /// </summary>
        /// <param name="permalink">The permalink.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        /// <remarks>Malldub.remarks</remarks>
        private static bool CheckReservedWords(string permalink)
        {
            string[] reserved =
            {
                "register", 
                "registerexternal",
                "authenticate",
                "login",
                "404",
                "terms",
                "aboutus"
            };

            return reserved.Any(s => s.Equals(permalink, StringComparison.OrdinalIgnoreCase));
        }

        #endregion
    }

    /// <summary>
    /// Class Permalink.
    /// </summary>
    /// <remarks>Malldub.remarks</remarks>
    public class Permalink
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="Permalink" /> is exists.
        /// </summary>
        /// <value><c>true</c> if exists; otherwise, <c>false</c>.</value>
        /// <remarks>Malldub.remarks</remarks>
        public bool Exists { get; set; }

        #endregion
    }
}