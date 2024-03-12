// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 12-21-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 12-21-2016
// ***********************************************************************
// <copyright file="UserController.cs" company="Maras,co">
//     Copyright ©  2016
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
    #region Directives

    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Runtime.InteropServices;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Description;

    using Malldub.Data;
    using Malldub.WebApi.Models;

    using Microsoft.AspNet.Identity;

    #endregion

    /// <summary>
    /// Class UserController.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    /// <remarks>Fill in the blank</remarks>
    [Authorize]
    [RoutePrefix("api/user")]
    public class UserController : BaseApiController
    {
        #region Fields

        /// <summary>
        /// The context
        /// </summary>
        private readonly MalldubDataContext _context = new MalldubDataContext();

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="UserController" /> class.
        /// </summary>
        /// <remarks>Malldub.remarks</remarks>
        public UserController()
            : this(Startup.UserManagerFactory()) {}

        /// <summary>
        /// Initializes a new instance of the <see cref="UserController" /> class.
        /// </summary>
        /// <param name="userManager">The user manager.</param>
        /// <remarks>Malldub.remarks</remarks>
        public UserController(UserManager<ApplicationUser> userManager)
        {
            // This allows email address as usernames
            userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
                                        {
                                            AllowOnlyAlphanumericUserNames
                                                = false
                                        };

            UserManager = userManager;
        }

        #endregion

        #region Public Properties

        /// <summary>
        /// Gets the user manager.
        /// </summary>
        /// <value>The user manager.</value>
        /// <remarks>Malldub.remarks</remarks>
        public UserManager<ApplicationUser> UserManager { get; private set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Get All roles List
        /// </summary>
        /// <returns>List of all roles</returns>
        /// <remarks>Fill in the blank</remarks>
        [AllowAnonymous]
        [Route("GetAllRoles")]
        public IQueryable<AspNetRole> GetAllRoles()
        {
            try
            {
                return _context.AspNetRole.AsQueryable();
            }
            catch 
            {
                return null;
            }
        }

        /// <summary>
        /// GET All Users List
        /// </summary>
        /// <returns>List of all users</returns>
        /// <remarks>Fill in the blank</remarks>
        [ResponseType(typeof(List<UserDetailsViewModel>))]
        [Route("")]
        [HttpGet]
        public IEnumerable<UserDetailsViewModel> GetAllUsers()
        {
            try
            {
                return
                    _context.AspNetUser.Select(
                        obj =>
                        new UserDetailsViewModel
                        {
                            Id          = obj.Identification, 
                            Email       = obj.Email, 
                            FirstName   = obj.FirstName, 
                            LastName    = obj.LastName, 
                            UserName    = obj.UserName,
                            DateEntered = obj.DateEntered
                        }).ToList();
            }
            catch
            {
                return null;
            }
        }


        [Route("{id}/donations")]
        [HttpGet]
        public IHttpActionResult GetDonations(string id)
        {
            try
            {

                var user = _context.AspNetUser.ByUserName(id).SingleOrDefault();

                if (user == null)
                {
                    return Ok();
                }

                AccessLevel("Administrator", "Admin");

                var result =
                    TheContext.Donation.ByDonorUserId(user.Identification)
                        .Include("DonorUserAspNetUser")
                        .Include("DonorUserAspNetUser.AspNetUserLoginList")
                        .ToList()
                        .Select(d => TheModelFactory.Create(d));

                //var enumerable = result as IList<Donation> ?? result.ToList();
                //var count = enumerable.Count();

                //if (itemsPerPage > 0)
                //{
                //    result = enumerable.OrderByDescending(ft => ft.DateEntered)
                //        .Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
                //}

                //var ret = new { Count = count, Data = enumerable };
                return Ok(result);
            }
            catch (Exception)
            {
                return null;
            }
        }

        [Route("{id}/fundraisers")]
        [HttpGet]
        public IHttpActionResult GetFundraisers(string id)
        {
            try
            {
                var user = _context.AspNetUser.ByUserName(id).SingleOrDefault();

                if (user == null)
                {
                    return Ok();
                }

                var item = _context.Fund
                    .Include(i => i.Item)
                    .Include(s => s.FundSetting)
                    .Where(f => f.Item.UserId == user.Identification);
                            
                return Ok(item);
            }
            catch (Exception)
            {
                return null;
            }
        }

        [Route("{id}/gateways")]
        [HttpGet]
        public IHttpActionResult GetGateways(string id)
        {
            try
            {
                var user = _context.AspNetUser.ByUserName(id).SingleOrDefault();

                if (user == null)
                {
                    return Ok();
                }

                var item = _context.AspNetUserGateway
                    .ByAspNetUserId(user.Identification)
                    .Include("AspNetUserGatewayActivityList")
                    .Include("AspNetUserGatewayActivityList.Activity")
                    .ToList()
                    .Select(n => TheModelFactory.Create(n));

                return Ok(item);
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// LOCK UNLOCK USER
        /// </summary>
        /// <param name="id">User name of User</param>
        /// <returns>error in not succeeded else OK</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("LockUnlock")]
        [HttpPost]
        public async Task<IHttpActionResult> LockUnlock([FromBody] string id)
        {
            try
            {
                if (id == null || Convert.ToString(id) == string.Empty)
                {
                    return BadRequest("Invalid details.");
                }

                var user = await UserManager.FindByNameAsync(id);

                if (user == null)
                {
                    return BadRequest("Invalid details.");
                }

                //if (!user.LockoutEnabled.HasValue)
                //{
                //    user.LockoutEnabled = false;
                //}

                //user.LockoutEnabled = !user.LockoutEnabled;

                // Keep this for when we update to 2.0
                // if (user.LockoutEnabled)
                // {
                // user.LockoutEndDateUtc = new DateTime(1900, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                // }
                var result = await UserManager.UpdateAsync(user);

                return !result.Succeeded ? GetErrorResult(result) : Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// LOCK UNLOCK USER
        /// </summary>
        /// <param name="featured">The featured.</param>
        /// <returns>error in not succeeded else OK</returns>
        /// <remarks>Fill in the blank</remarks>
        [Route("setFeatured")]
        [HttpPost]
        public IHttpActionResult SetFeatured(FundFeatured featured)
        {
            try
            {
                var oldItem = _context.Item.GetByKey(featured.Id);
                var newItem = _context.Item.ByIdentification(featured.Id).SingleOrDefault();

                if (newItem != null)
                {
                    newItem.Featured = featured.Featured;

                    _context.ApplyCurrentValues(oldItem.EntityKey.EntitySetName, newItem);
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Update User By User Name,
        /// If User Updated Successfully then returns Ok. roles
        /// If User Updated !Successfully then returns :
        /// 1. Email address already exists.
        /// 2. Minimum 2 characters are required for First Name/last Name.
        /// </summary>
        /// <param name="model">User Binding Model</param>
        /// <returns>OK</returns>
        /// <remarks>Fill in the blank</remarks>
        [AllowAnonymous]
        [Route("UpdateUserByUserName")]
        public async Task<IHttpActionResult> UpdateUserByUserName(UpdateUserBindingModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await UserManager.FindByNameAsync(model.UserName);
                var newRoles = model.UserRoles.Select(x => x.Id ?? x.Identification).ToList();
                var oldUser = _context.AspNetUser.GetByKey(user.Id);
                var value =
                    _context.AspNetUser.Include(r => r.AspNetRoleList).ByIdentification(user.Id).SingleOrDefault();
                var roles = _context.AspNetRole.ToList();
                if (value != null)
                {
                    value.FirstName = model.FirstName;
                    value.UserName = model.UserName;
                    value.LastName = model.LastName;
                    value.Email = model.Email;

                    _context.ApplyCurrentValues(oldUser.EntityKey.EntitySetName, value);

                    foreach (var role in roles)
                    {
                        var aspNetRole = _context.AspNetRole.GetByKey(role.Identification);

                        if (newRoles.Contains(role.Identification))
                        {
                            if (role.AspNetUserList.Contains(value))
                            {
                                continue;
                            }

                            role.AspNetUserList.Add(value);
                            _context.ApplyCurrentValues(aspNetRole.EntityKey.EntitySetName, role);
                        }
                        else
                        {
                            if (!role.AspNetUserList.Contains(value))
                            {
                                continue;
                            }

                            role.AspNetUserList.Remove(value);
                            _context.ApplyCurrentValues(aspNetRole.EntityKey.EntitySetName, role);
                        }
                    }
                }

                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Gets User Roles list by user name
        /// </summary>
        /// <param name="id">User Name</param>
        /// <returns>List of User Roles by user name</returns>
        /// <remarks>Fill in the blank</remarks>
        [ResponseType(typeof(List<RoleDetailsViewModel>))]
        [Route("roles")]
        public IEnumerable<RoleDetailsViewModel> UserRoles([FromBody] string id)
        {
            try
            {
                var user = _context
                    .AspNetUser
                    .ByUserName(id)
                    .Include(r => r.AspNetRoleList)
                    .SingleOrDefault();

                if (user == null)
                {
                    return null;
                }

                var userRoles =
                    user.AspNetRoleList.Select(
                        obj =>
                        new RoleDetailsViewModel
                        {
                            Id = obj.Identification, 
                            Identification = obj.Identification, 
                            Name = obj.Name
                        }).ToList();
                return userRoles;
            }
            catch 
            {
                return null;
            }
        }

        #endregion

        #region Methods

        /// <summary>
        /// Gets the error result.
        /// </summary>
        /// <param name="result">The result.</param>
        /// <returns>IHttpActionResult.</returns>
        /// <remarks>Malldub.remarks</remarks>
        protected internal IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (result.Succeeded)
            {
                return null;
            }

            if (result.Errors != null)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error);
                }
            }

            if (ModelState.IsValid)
            {
                // No ModelState errors are available to send, so just return an empty BadRequest.
                return BadRequest();
            }

            return BadRequest(ModelState);
        }

        #endregion
    }
}