namespace Marasco.Azure.Storage.Controllers
{
    #region Directives

  using System;
  using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
  using System.Net.Cache;
  using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;

    using Business;

  using Malldub.Helper;

  using Models;

    using Providers;

    using WebApi.Helper.Attributes;

    #endregion

    [ApiControllerConfig]
    public class UploaderController : ApiController
    {
        // GET api/<controller>

        #region Public Methods and Operators

        public void Delete()
        {
            var fileNames = HttpContext.Current.Request["filenames"].Split(",".ToCharArray());
            CloudBlockBlobBusiness.Delete(fileNames);
        }

        public IEnumerable<FileDetails> Get()
        {
            return CloudBlockBlobBusiness.Get();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public async Task<HttpResponseMessage> Post()
        {
          try
          {
            var response = await CloudBlockBlobBusiness.Post(Request);
            return Request.CreateResponse(HttpStatusCode.OK, response);
          }
          catch (Exception e)
          {
            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.GetOriginalException());
          }
        }

        // PUT api/<controller>/5
        public void Put(
            int id,
            [FromBody] string value)
        {
        }

        #endregion

        #region Methods

        private Task<IEnumerable<string>> GetFileOldWay()
        {
            //HttpContext.Current.Request
            if (Request.Content.IsMimeMultipartContent())
            {
                string fullPath = HttpContext.Current.Server.MapPath("~/uploads");
                var streamProvider = new MarascoMultipartFormDataStreamProvider(fullPath);
                var task = Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith
                    (
                        t =>
                        {
                            if (t.IsFaulted || t.IsCanceled)
                            {
                                throw new HttpResponseException(HttpStatusCode.InternalServerError);
                            }

                            var fileInfo = streamProvider.FileData.Select
                                (
                                    i =>
                                    {
                                        var info = new FileInfo(i.LocalFileName);
                                        return "File uploaded as " + info.FullName + " (" + info.Length + ")";
                                    });
                            return fileInfo;
                        });
                return task;
            }

            throw new HttpResponseException
                (
                Request.CreateResponse
                    (
                        HttpStatusCode.NotAcceptable,
                        "Invalid Request!"));
        }

        #endregion

        // DELETE api/<controller>/5
    }
}