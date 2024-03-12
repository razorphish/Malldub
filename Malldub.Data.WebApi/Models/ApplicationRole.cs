namespace Malldub.WebApi.Models
{
    #region Directives

    using Microsoft.AspNet.Identity.EntityFramework;

    #endregion

    public sealed class ApplicationRole : IdentityRole
    {
        #region Constructors and Destructors

        public ApplicationRole() {}

        public ApplicationRole(string name)
            : base(name) {}

        #endregion
    }
}