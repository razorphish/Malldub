namespace Malldub.Data.WebApi.Services
{
    public interface IMalldubIdentityService
    {
        #region Public Properties

        string CurrentUser { get; }

        #endregion
    }
}