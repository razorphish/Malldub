namespace Malldub.Data.WebApi.Services
{
    #region Directives

    using System;
    using System.Collections.Generic;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    #endregion

    public class NinjectWebApiFilterProvider : IFilterProvider
    {
        #region Public Methods and Operators

        public IEnumerable<FilterInfo> GetFilters(
            HttpConfiguration configuration,
            HttpActionDescriptor actionDescriptor)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}