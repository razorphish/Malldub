using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Malldub.WebApi.Exceptions
{
  using Newtonsoft.Json;

  public class MalldubWebApiErrorResponse
  {
    #region Public Properties
    [JsonProperty("error")]
    public string Error { get; set; }

    [JsonProperty("error_description")]
    public string ErrorDescription { get; set; }

    [JsonProperty("error_code")]
    public string ErrorCode { get; set; }

    [JsonProperty("error_message")]
    public string ErrorMessage { get; set; }

    #endregion
  }
}