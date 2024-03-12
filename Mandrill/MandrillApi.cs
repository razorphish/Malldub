// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 02-25-2015
// ***********************************************************************
// <copyright file="MandrillApi.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>Core class for using the MandrillApp Api</summary>
// ***********************************************************************
namespace Mandrill
{
  #region Directives

  using System.Dynamic;
  using System.Net;
  using System.Threading.Tasks;

  using Mandrill.Utilities;

  using RestSharp;

  #endregion

  /// <summary>
  /// Core class for using the MandrillApp Api
  /// </summary>
  public partial class MandrillApi
  {
    #region Fields

    /// <summary>
    /// the main rest client for use throughout the whole app.
    /// </summary>
    private readonly RestClient _client;

    #endregion

    #region Constructors and Destructors

    /// <summary>
    /// Initializes a new instance of the <see cref="MandrillApi" /> class.
    /// </summary>
    /// <param name="apiKey">The API Key recieved from MandrillApp</param>
    /// <param name="useSsl">if set to <c>true</c> [use SSL].</param>
    /// <param name="timeout">Timeout in milliseconds to use for requests.</param>
    public MandrillApi(string apiKey, bool useSsl = true, int timeout = 0)
    {
      ApiKey = apiKey;

      _client = useSsl ? new RestClient(Configuration.BaseSecureUrl) : new RestClient(Configuration.BaseUrl);

      _client.AddHandler("application/json", new DynamicJsonDeserializer());
      _client.Timeout = timeout;
    }

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets the Api Key for the project received from the MandrillApp website
    /// </summary>
    /// <value>The API key.</value>
    public string ApiKey { get; private set; }

    /// <summary>
    /// Gets or sets the proxy.
    /// </summary>
    /// <value>The proxy.</value>
    public IWebProxy Proxy
    {
      get
      {
        return _client.Proxy;
      }

      set
      {
        _client.Proxy = value;
      }
    }

    /// <summary>
    /// Gets the userAgent to use for requests.
    /// </summary>
    /// <value>The user agent.</value>
    public string UserAgent
    {
      get
      {
        return _client.UserAgent;
      }

      set
      {
        _client.UserAgent = value;
      }
    }

    #endregion

    // CODEPATH IS DISABLED (USES EXECUTEASYNC). EXECUTE ASYNC HAS A BUG
    // public Task<IRestResponse> PostAsync(string path, dynamic data)
    // {
    // TaskCompletionSource<IRestResponse> tcs = new TaskCompletionSource<IRestResponse>();

    // var request = new RestRequest(path, Method.POST);
    // request.RequestFormat = DataFormat.Json;

    // if (data == null)
    // {
    // data = new ExpandoObject();
    // }

    // data.key = ApiKey;

    // request.AddBody(data);
    // client.ExecuteAsync(request, (response) =>
    // {
    // if (response.StatusCode != System.Net.HttpStatusCode.OK)
    // {
    // var error = JSON.Parse<ErrorResponse>(response.Content);
    // var ex = new MandrillException(error, string.Format("Post failed {0}", path));
    // tcs.SetException(ex);
    // }
    // else
    // {
    // tcs.SetResult(response);
    // }
    // });

    // return tcs.Task;
    // }
    #region Public Methods and Operators

    /// <summary>
    /// PostAsync (uses synchronous function right now because ExecuteAsync has a bug)
    /// </summary>
    /// <param name="path">The path.</param>
    /// <param name="data">The data.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<IRestResponse> PostAsync(string path, dynamic data)
    {
      return Task.Factory.StartNew(
        () =>
        {
          var request = new RestRequest(path, Method.POST) { RequestFormat = DataFormat.Json };

          if (data == null)
          {
            data = new ExpandoObject();
          }

          data.key = ApiKey;

          request.AddBody(data);

          var response = _client.Execute(request);

          // if internal server error, then mandrill should return a custom error.
          if (response.StatusCode == HttpStatusCode.InternalServerError)
          {
            var error = JSON.Parse<ErrorResponse>(response.Content);
            var ex = new MandrillException(error, string.Format("Post failed {0}", path));
            throw ex;
          }

          if (response.StatusCode != HttpStatusCode.OK)
          {
            // used to throw errors not returned from the server, such as no response, etc.
            throw response.ErrorException;
          }

          return response;
        });
    }

    /// <summary>
    /// The post async.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="path">The path.</param>
    /// <param name="data">The data.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<T> PostAsync<T>(string path, dynamic data) where T : new()
    {
      Task<IRestResponse> post = PostAsync(path, data);

      return post.ContinueWith(
        p =>
        {
          var t = JSON.Parse<T>(p.Result.Content);
          return t;
        }, 
        TaskContinuationOptions.ExecuteSynchronously);
    }

    #endregion
  }
}