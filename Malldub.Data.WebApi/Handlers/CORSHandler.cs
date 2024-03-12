namespace Malldub.Data.WebApi.Handlers
{
    #region Directives

    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;

    #endregion

    public class CorsHandler : DelegatingHandler
    {
        #region Constants and Fields

        private const string AccessControlAllowHeaders = "Access-Control-Allow-Headers";
        private const string AccessControlAllowMethods = "Access-Control-Allow-Methods";
        private const string AccessControlAllowOrigin = "Access-Control-Allow-Origin";
        private const string AccessControlRequestHeaders = "Access-Control-Request-Headers";
        private const string AccessControlRequestMethod = "Access-Control-Request-Method";
        private const string Origin = "Origin";

        #endregion

        #region Methods

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
                                                               CancellationToken cancellationToken)
        {
            bool isCorsRequest = request.Headers.Contains(Origin);
            bool isPreflightRequest = request.Method == HttpMethod.Options;
            if (!isCorsRequest)
            {
                return base.SendAsync
                    (request,
                     cancellationToken);
            }
            if (!isPreflightRequest)
            {
                return base.SendAsync
                    (request,
                     cancellationToken).ContinueWith
                    (t =>
                    {
                        var resp = t.Result;
                        resp.Headers.Add
                            (AccessControlAllowOrigin,
                             request.Headers.GetValues(Origin).First());
                        return resp;
                    });
            }
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Headers.Add
                (AccessControlAllowOrigin,
                 request.Headers.GetValues(Origin).First());

            string accessControlRequestMethod =
                request.Headers.GetValues(AccessControlRequestMethod).FirstOrDefault();
            if (accessControlRequestMethod != null)
            {
                response.Headers.Add
                    (AccessControlAllowMethods,
                     accessControlRequestMethod);
            }

            string requestedHeaders = string.Join
                (", ",
                 request.Headers.GetValues(AccessControlRequestHeaders));
            if (!string.IsNullOrEmpty(requestedHeaders))
            {
                response.Headers.Add
                    (AccessControlAllowHeaders,
                     requestedHeaders);
            }

            var tcs = new TaskCompletionSource<HttpResponseMessage>();
            tcs.SetResult(response);
            return tcs.Task;
        }

        #endregion
    }
}