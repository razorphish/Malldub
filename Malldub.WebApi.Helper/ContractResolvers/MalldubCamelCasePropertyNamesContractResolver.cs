namespace Marasco.WebApi.Helper.ContractResolvers
{
    #region Directives

    using System.Linq;
    using System.Reflection;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    #endregion

    public class MalldubCamelCasePropertyNamesContractResolver : CamelCasePropertyNamesContractResolver
    {
        #region Methods

        /// <summary>
        /// Creates a <see cref="T:Newtonsoft.Json.Serialization.JsonProperty" /> for the given <see cref="T:System.Reflection.MemberInfo" />.
        /// By default the CamelCase Resolver will ignore the 'JsonProperty' attribute of properties in a given object.
        /// This behavior is overriden and the resolver will now use the name given to the JsonProperty("name=propertyName") attribute
        /// </summary>
        /// <param name="member">The member to create a <see cref="T:Newtonsoft.Json.Serialization.JsonProperty" /> for.</param>
        /// <param name="memberSerialization">The member's parent <see cref="T:Newtonsoft.Json.MemberSerialization" />.</param>
        /// <returns>A created <see cref="T:Newtonsoft.Json.Serialization.JsonProperty" /> for the given <see cref="T:System.Reflection.MemberInfo" />.</returns>
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var res = base.CreateProperty(member, memberSerialization);

            var attrs = member.GetCustomAttributes(typeof(JsonPropertyAttribute), true);
            if (attrs.Any())
            {
                var attr = (attrs[0] as JsonPropertyAttribute);
                if (res.PropertyName != null)
                {
                    res.PropertyName = attr.PropertyName;
                }
            }

            return res;
        }

        #endregion
    }
}
