using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marasco.WebApi.Helper.Attributes
{
    #region Directives

    using System;
    using System.Web.Http.Controllers;
    using System.Web.Http.Validation;
    using System.Web.Http.Validation.Providers;
    using Config;

    #endregion

    public class ApiControllerConfigAttribute : Attribute, IControllerConfiguration
    {
        #region Public Methods and Operators

        public void Initialize(HttpControllerSettings settings, HttpControllerDescriptor descriptor)
        {
            FormatterConfig.RegisterGlobalFormatters(settings.Formatters);

            // Hostile change; we only do this because we have removed the Xmlformatter
            // This allows to use [Required] on value types (int, long, etc)
            // Remove this line when MVC 5 is out
            // http://aspnetwebstack.codeplex.com/workitem/270
            settings.Services.RemoveAll(typeof(ModelValidatorProvider), v => v is InvalidModelValidatorProvider);
        }

        #endregion
    }
}
