namespace Malldub.Data.WebApi.Services
{
    #region Directives

    using System.Threading;

    #endregion

    public class MalldubIdentityService : IMalldubIdentityService
    {
        #region Public Properties

        public string CurrentUser
        {
            get
            {
                return Thread.CurrentPrincipal.Identity.Name;
            }
        }

        #endregion
    }
}