// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 11-23-2016
// ***********************************************************************
// <copyright file="AspNetUserGatewayController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.Data.Controllers.API
{
    #region Directives

    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    #endregion

    /// <summary>
    /// Class AspNetUserGatewayController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    [Authorize]
    [RoutePrefix("api/admin/aspnetusergateway")]
    public partial class AspNetUserGatewayController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Activities the specified identification.
        /// </summary>
        /// <param name="identification">The identification.</param>
        /// <param name="pageNumber">The page number.</param>
        /// <param name="itemsPerPage">The items per page.</param>
        /// <returns>HttpResponseMessage.</returns>
        [Route("{identification}/activity/{pageNumber}/{itemsPerPage}")]
        [HttpGet]
        public HttpResponseMessage Activity(int identification, int pageNumber = 1, int itemsPerPage = 10)
        {
            AccessLevel("Administrator", "Admin");
            var result =
                TheContext.AspNetUserGatewayActivity.ByAspNetUserGatewayId(identification)
                          .Include("Activity")
                          .Include("Activity.ActivityType")
                          .Include("AspNetUserGatewayActivityType");

            var count = result.Count();


            if (itemsPerPage > 0)
            {
                result =
                    result.OrderByDescending(ft => ft.Activity.DateEntered)
                          .Skip((pageNumber - 1) * itemsPerPage)
                          .Take(itemsPerPage);
            }

            var ret = new { Count = count, Data = result.ToList().Select(n => TheModelFactory.Create(n)) };


            return Request.CreateResponse(HttpStatusCode.OK, ret);
        }

        #endregion
    }
}