namespace Marasco.Azure.Storage.Business
{
  #region Directives

  using System.Collections.Generic;
  using System.IO;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Threading.Tasks;
  using System.Web;
  using System.Web.Http;

  using Malldub.Helper;

  using Marasco.Azure.Storage.Helper;
  using Marasco.Azure.Storage.Models;
  using Marasco.Azure.Storage.Providers;

  using Microsoft.WindowsAzure.Storage.Blob;

  #endregion

  public class CloudBlockBlobBusiness
  {
    #region Public Methods and Operators

    public static string BuildFileName(string getFileName)
    {
      var fileInfo = new FileInfo(getFileName);
      var rsg = new RandomStringGenerator(
        useLowerCaseCharacters: false,
        useUpperCaseCharacters: false,
        useNumericCharacters: true,
        useSpecialCharacters: false) { RepeatCharacters = false };

      var ret = string.Concat(rsg.Generate(10), fileInfo.Extension);
      return ret;
    }

    public static void Copy(string sourceBlobName, string targetBlobName)
    {
      var container = BlobHelper.GetWebApiContainer();

      var sourceBlob = container.GetBlockBlobReference(sourceBlobName);
      var targetBlob = container.GetBlockBlobReference(targetBlobName);

      targetBlob.StartCopy(sourceBlob);
    }

    public static void Delete(string[] fileNames)
    {
      var container = BlobHelper.GetWebApiContainer();

      foreach (var file in fileNames)
      {
        var blob = container.GetBlockBlobReference(file);
        blob.DeleteIfExists();
      }
    }

    public static IEnumerable<FileDetails> Get()
    {
      var container = BlobHelper.GetWebApiContainer();
      return from CloudBlockBlob blob in container.ListBlobs()
             select
               new FileDetails
               {
                 Name          = blob.Name, 
                 Size          = blob.Properties.Length, 
                 ContentLength = blob.Properties.Length, 
                 ContentType   = blob.Properties.ContentType, 
                 Location      = blob.Uri.AbsoluteUri
               };
    }

    public static Task<List<FileDetails>> Post(HttpRequestMessage request)
    {
      // check if correct mime type
      if (!request.Content.IsMimeMultipartContent("form-data"))
      {
        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
      }

      var multipartStreamProvider = new AzureBlobStorageMultipartProvider(BlobHelper.GetWebApiContainer());

      return request.Content.ReadAsMultipartAsync(multipartStreamProvider).ContinueWith(
        t =>
        {
          if (t.IsFaulted)
          {
            throw t.Exception;
          }

          var provider = t.Result;
          return provider.Files;
        });
    }

    public Task<IEnumerable<string>> GetFileOldWay(HttpRequestMessage request)
    {
      // HttpContext.Current.Request
      if (!request.Content.IsMimeMultipartContent())
      {
        throw new HttpResponseException(request.CreateResponse(HttpStatusCode.NotAcceptable, "Invalid Request!"));
      }

      var fullPath = HttpContext.Current.Server.MapPath("~/uploads");
      var streamProvider = new MarascoMultipartFormDataStreamProvider(fullPath);
      var task = request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith(
        t =>
        {
          if (t.IsFaulted || t.IsCanceled)
          {
            throw new HttpResponseException(HttpStatusCode.InternalServerError);
          }

          var fileInfo = streamProvider.FileData.Select(
            i =>
            {
              var info = new FileInfo(i.LocalFileName);
              return "File uploaded as " + info.FullName + " (" + info.Length + ")";
            });
          return fileInfo;
        });
      return task;
    }

    #endregion
  }
}