namespace Malldub.WebApi.Models
{
    #region Directives

    using System;
    using System.Data.Entity;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Malldub.Data;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    #endregion

    public sealed class ApplicationUser : IdentityUser
    {
        #region Constructors and Destructors

        public ApplicationUser()
        {
            var r = new Random();
            AvatarUploadTempLocation = string.Format("/img/avatar/{0}.jpg", r.Next(30));
            DateEntered = DateTime.UtcNow;
            DateUpdated = DateTime.UtcNow;
            //LockoutEnabled = true;
        }

        public ApplicationUser(IBindingModel model)
            : this()
        {
            UserName = model.UserName;
            FirstName = model.FirstName;
            LastName = model.LastName;
            Email = model.Email;
            StatusId = model.StatusId;
        }

        public ApplicationUser(AspNetUser currentUser)
        {
            UserName = currentUser.UserName;
            FirstName = currentUser.FirstName;
            LastName = currentUser.LastName;
            Email = currentUser.Email;
            StatusId = currentUser.StatusId;
        }

        #endregion

        #region Public Properties

        public string AccountId { get; set; }

        public int? AvatarUploadId { get; set; }

        public string AvatarUploadTempLocation { get; set; }

        public DateTime DateEntered { get; set; }

        public DateTime DateUpdated { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        //public bool? LockoutEnabled { get; set; }

        public string StatusId { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// generate user identity as an asynchronous operation.
        /// </summary>
        /// <param name="manager">
        /// The manager.
        /// </param>
        /// <param name="authenticationType">
        /// Type of the authentication.
        /// </param>
        /// <returns>
        /// Task&lt;ClaimsIdentity&gt;.
        /// </returns>
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(
            UserManager<ApplicationUser> manager, 
            string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

            // Add custom user claims here
            return userIdentity;
        }

        #endregion
    }

    /// <summary>
    /// Class ApplicationDbContext.
    /// </summary>
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="Malldub.WebApi.Models.ApplicationDbContext" /> class.
        /// </summary>
        public ApplicationDbContext()
            : base("DefaultConnection") {}

        #endregion

        #region Public Properties

        public DbSet<IdentityUserClaim> Claims { get; set; }

        public DbSet<IdentityUserLogin> Logins { get; set; }

        public DbSet<IdentityUserRole> UserRoles { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Creates this instance.
        /// </summary>
        /// <returns>ApplicationDbContext.</returns>
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        #endregion
    }
}