namespace Marasco.WebApi.Helper.Config
{
    #region Directives

    using System;
    using System.Configuration;
    using System.Net.Http.Formatting;
    using ContractResolvers;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    #endregion

    public class FormatterConfig
    {
        #region Public Methods and Operators

        public static void RegisterGlobalFormatters(MediaTypeFormatterCollection formatters)
        {
            var jsonSerializerSettings = formatters.JsonFormatter.SerializerSettings;
            jsonSerializerSettings.Converters.Add(new IsoDateTimeConverter());

            // serialize every enum as a string
            jsonSerializerSettings.Converters.Add(new StringEnumConverter());

            // include null value fields
            jsonSerializerSettings.NullValueHandling = NullValueHandling.Ignore;

            // use camel case
            jsonSerializerSettings.ContractResolver = new MalldubCamelCasePropertyNamesContractResolver();

            // indented formatting
            bool indent;
            Boolean.TryParse(ConfigurationManager.AppSettings["epsilon.indentjson"], out indent);
            formatters.JsonFormatter.Indent = indent;

            // Strictly Json no xml
            formatters.Remove(formatters.XmlFormatter);

            // Remove validation
        }

        #endregion
    }
}
