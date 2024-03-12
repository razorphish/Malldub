namespace Marasco.Api
{
  #region Directives

  using System;
  using System.IO;
  using System.Net;
  using System.Text;

  using Newtonsoft.Json;

  #endregion

  public class Client
  {
    #region Public Methods and Operators

    public TResponse Invoke<TRequest, TResponse>(TRequest request, string actionUrl, string accessToken)
    {
      var client = new WebClient();

      if (!string.IsNullOrEmpty(accessToken))
      {
        client.Headers.Add("Authorization", "Bearer " + accessToken);
      }
      client.Headers.Add("Content-Type", "application/json");
      client.Headers.Add("User-Agent", "Funding Miracles");

      var data = JsonConvert.SerializeObject(
        request,
        new JsonSerializerSettings
        {
          NullValueHandling = NullValueHandling.Ignore
      });

      var uriString = actionUrl;
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
          throw;
        }

        var httpErrorResponse = (HttpWebResponse)we.Response;

        var reader = new StreamReader(httpErrorResponse.GetResponseStream(), Encoding.UTF8);
        var responseBody = reader.ReadToEnd();
        var errResp = JsonConvert.DeserializeObject<ErrorResponse>(responseBody);
        throw new MarascoApiException
        {
          Error            = errResp.Error,
          ErrorDescription = errResp.ErrorDescription,
          ErrorMessage     = we.Message,
          ErrorCode        = errResp.ErrorCode
        };
      }
      return JsonConvert.DeserializeObject<TResponse>(json);
    }

    public TResponse Invoke<TRequest, TResponse>(TRequest request, string actionUrl)
    {
      return Invoke<TRequest, TResponse>(request, actionUrl, string.Empty);
    }

    public string Invoke<TRequest>(TRequest request, string actionUrl)
    {
      var client = new WebClient();

      //client.Headers.Add("Authorization", "Bearer " + accessToken);
      client.Headers.Add("Content-Type", "application/json");
      client.Headers.Add("User-Agent", "Funding Miracles");
      var data = JsonConvert.SerializeObject(request, new JsonSerializerSettings()
      {
        NullValueHandling = NullValueHandling.Ignore
      });

      var uriString = actionUrl;
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
        throw new MarascoApiException
        {
          Error = errResp.Error,
          ErrorDescription = errResp.ErrorDescription,
          ErrorMessage = we.Message,
          ErrorCode = errResp.ErrorCode
        };
      }
      return json;
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

  public class MarascoApiException : Exception
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