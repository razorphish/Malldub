namespace Marasco.WePay
{
  #region Directives

  using System;
  using System.IO;
  using System.Net;
  using System.Text;

  using Newtonsoft.Json;

  #endregion

  public class WePayClient
  {
    #region Public Methods and Operators

    public ResponseT Invoke<RequestT, ResponseT>(RequestT request, string actionUrl, string accessToken)
    {

      ServicePointManager.Expect100Continue = true;
      ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

      var client = new WebClient();
      client.Headers.Add("Authorization", "Bearer " + accessToken);
      client.Headers.Add("Content-Type", "application/json");
      client.Headers.Add("User-Agent", "Funding Miracles");

      var data = JsonConvert.SerializeObject(request, new JsonSerializerSettings()
      {
        NullValueHandling = NullValueHandling.Ignore
      });
      var uriString = WePayConfig.endpoint(WePayConfig.productionMode) + actionUrl;
      string json;
      try
      {
        json = data.Length > 3
          ? client.UploadString(new Uri(uriString), "POST", data)
          : client.DownloadString(new Uri(uriString));
      }
      catch (WebException we)
      {
        if (we.Status != WebExceptionStatus.ProtocolError)
        {
          throw we;
        }

        var httpErrorResponse = (HttpWebResponse)we.Response as HttpWebResponse;

        var reader = new StreamReader(httpErrorResponse.GetResponseStream(), Encoding.UTF8);
        var responseBody = reader.ReadToEnd();
        var errResp = JsonConvert.DeserializeObject<ErrorResponse>(responseBody);
        throw new WePayException
        {
          Error = errResp.Error,
          ErrorDescription = errResp.ErrorDescription,
          ErrorMessage = we.Message,
          ErrorCode = errResp.ErrorCode
        };
      }
      return JsonConvert.DeserializeObject<ResponseT>(json);
    }

    public ResponseT Invoke<RequestT, ResponseT>(RequestT request, string actionUrl)
    {
      return Invoke<RequestT, ResponseT>(request, actionUrl, WePayConfig.accessToken);
    }

    #endregion
  }

  public class ErrorResponse
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

  public class WePayException : Exception
  {
    #region Public Properties

    [JsonProperty("error")]
    public string Error { get; set; }

    [JsonProperty("error_code")]
    public string ErrorCode { get; set; }

    [JsonProperty("error_description")]
    public string ErrorDescription { get; set; }

    [JsonProperty("error_message")]
    public string ErrorMessage { get; set; }

    #endregion
  }
}