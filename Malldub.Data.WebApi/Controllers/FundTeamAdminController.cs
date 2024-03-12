// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 02-04-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 02-04-2017
// ***********************************************************************
// <copyright file="FundTeamController.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Controllers
{
    #region Directives

    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    using Malldub.Data;
    using Malldub.Helper;
    using Malldub.WebApi.RootControllers;

    #endregion

    /// <summary>
    /// Class FundTeamController.
    /// </summary>
    /// <seealso cref="Malldub.WebApi.RootControllers.BaseApiController" />
    [Authorize]
    [RoutePrefix("api/admin/item/{itemId}/fundteam")]
    public class FundTeamAdminController : BaseApiController
    {
        #region Fields

        /// <summary>
        /// The context
        /// </summary>
        private readonly MalldubDataContext _context = new MalldubDataContext();

        #endregion

        #region Public Methods and Operators


        /// <summary>
        /// Updates the specified item identifier.
        /// </summary>
        /// <param name="itemId">The item identifier.</param>
        /// <param name="fundTeamId">The fund team identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns>HttpResponseMessage.</returns>
        /// <exception cref="System.Web.Http.HttpResponseException">
        /// </exception>
        /// <exception cref="HttpResponseMessage">
        /// </exception>
        [Route("{fundTeamId}")]
        [HttpPut]
        public HttpResponseMessage Update(int itemId, int fundTeamId, FundTeam value)
        {
            AccessLevel("Administrator", "Admin");
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            var team = _context.Team.GetByKey(value.Team.Identification);
            var fundTeam = _context.FundTeam
              .Include("Team")
              .Include("FundTeamMemberList")
              .Include("FundFund")
              .Include("FundFund.Item")
              .GetByKey(fundTeamId);

            var currentCaptain = fundTeam.FundTeamMemberList.FirstOrDefault(ft => ft.RoleId == "Captain");

            if (string.IsNullOrWhiteSpace(value.CaptainEmail))
            {
                if (currentCaptain != null)
                {
                    _context.FundTeamMember.DeleteObject(currentCaptain);
                }
            }
            else
            {
                var captain = _context.AspNetUser.ByEmail(value.CaptainEmail).SingleOrDefault();

                if (captain == null)
                {
                    if (currentCaptain != null)
                    {
                        _context.FundTeamMember.DeleteObject(currentCaptain);
                    }
                }
                else
                {
                    if (string.IsNullOrWhiteSpace(fundTeam.CaptainEmail))
                    {
                        _context.FundTeamMember.AddObject(
                          new FundTeamMember
                          {
                              RoleId = "Captain",
                              UserId = captain.Identification,
                              FundTeamId = value.Identification
                          });
                    }
                    else if (fundTeam.CaptainEmail != value.CaptainEmail)
                    {
                        if (currentCaptain != null)
                        {
                            _context.FundTeamMember.DeleteObject(currentCaptain);
                        }

                        _context.FundTeamMember.AddObject(
                          new FundTeamMember
                          {
                              RoleId = "Captain",
                              UserId = captain.Identification,
                              FundTeamId = value.Identification
                          });
                    }
                }
            }

            if (fundTeam == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            var fundItem = _context.Item.GetByKey(fundTeam.TeamFundId);

            var newFund = fundItem;
            newFund.Permalink = string.Format("{0}-{1}", fundTeam.FundFund.Item.Permalink, StringUtilities.Slug(value.Team.Name));
            newFund.Title = value.Team.Name;
            _context.ApplyCurrentValues(fundItem.EntityKey.EntitySetName, newFund);
            _context.ApplyCurrentValues(team.EntityKey.EntitySetName, value.Team);
            _context.ApplyCurrentValues(fundTeam.EntityKey.EntitySetName, value);

            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        #endregion
    }
}