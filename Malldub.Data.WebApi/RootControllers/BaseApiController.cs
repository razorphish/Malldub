// ***********************************************************************
// Assembly         : Malldub.Data.WebApi
// Author           : David Antonio Marasco
// Created          : 01-08-2015
// Last Modified By : David Antonio Marasco
// Last Modified On : 11-23-2016
// ***********************************************************************
// <copyright file="BaseApiController.cs" company="Maras,co">
//     Copyright ©  2016
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
    #region Directives

    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Malldub.Data;
    using Malldub.WebApi.Factories;

    using Microsoft.AspNet.Identity;

    #endregion

    /// <summary>
    /// Class BaseApiController.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    /// <remarks>Fill in the blank</remarks>
    public abstract class BaseApiController : ApiController
    {
        #region Fields

        /// <summary>
        /// The data context / repository
        /// </summary>
        private readonly MalldubDataContext _context;

        /// <summary>
        /// The _model factory
        /// </summary>
        private ModelFactory _modelFactory;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseApiController"/> class.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <remarks>
        /// Fill in the blank
        /// </remarks>
        protected BaseApiController(MalldubDataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseApiController" /> class.
        /// </summary>
        /// <remarks>Fill in the blank</remarks>
        protected BaseApiController()
        {
            _context = new MalldubDataContext();
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets the context.
        /// </summary>
        /// <value>The context.</value>
        /// <remarks>Fill in the blank</remarks>
        protected MalldubDataContext TheContext
        {
            get
            {
                return _context;
            }
        }

        /// <summary>
        /// Gets the model factory.
        /// </summary>
        /// <value>The model factory.</value>
        /// <remarks>Fill in the blank</remarks>
        protected ModelFactory TheModelFactory
        {
            get
            {
                return _modelFactory ?? (_modelFactory = new ModelFactory(Request, TheContext));
            }
        }

        #endregion

        #region Methods

        protected void AccessLevel(params string[] roles)
        {
            if (IsInRole(roles))
            {
                return;
            }

            var msg = new HttpResponseMessage(HttpStatusCode.Unauthorized) { ReasonPhrase = "Unauthorized" };
            throw new HttpResponseException(msg);
        }

        protected bool IsInRole(params string[] roles)
        {
            // Get User
            var userId = RequestContext.Principal.Identity.GetUserId();

            var dataroles =
                _context.AspNetRole
                    .Include("AspNetUserList")
                        .Where(r => r.AspNetUserList.Any(anul => anul.Identification == userId))
                        .ToList();

            //foreach (var role in dataroles)
            //{
            //    if (roles.Contains(role.Name))
            //    {
            //        return true;
            //    }
            //}

            return dataroles.Any(role => roles.Contains(role.Name));
        }

        #endregion
    }
}