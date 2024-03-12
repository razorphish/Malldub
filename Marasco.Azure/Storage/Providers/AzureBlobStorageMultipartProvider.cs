namespace Marasco.Azure.Storage.Providers
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.IO;
  using System.Net.Http;
  using System.Net.Http.Headers;
  using System.Threading.Tasks;

  using Malldub.Helper;

  using Marasco.Azure.Storage.Business;
  using Marasco.Azure.Storage.Extensions;
  using Marasco.Azure.Storage.Models;

  using Microsoft.WindowsAzure.Storage.Blob;

  #endregion

  public class AzureBlobStorageMultipartProvider : MultipartFileStreamProvider
  {
    #region Fields

    private readonly CloudBlobContainer _container;

    #endregion

    #region Constructors and Destructors

    public AzureBlobStorageMultipartProvider(CloudBlobContainer container)
      : base(Path.GetTempPath())
    {
      _container = container;
      Files = new List<FileDetails>();
    }

    #endregion

    #region Public Properties

    public List<FileDetails> Files { get; set; }

    #endregion

    #region Public Methods and Operators

    public override Task ExecutePostProcessingAsync()
    {
      // Upload the files to azure blob storage and remove them from local disk
      foreach (var fileData in FileData)
      {
        // Skip token 
        if (fileData.Headers.ContentDisposition.Name == "\"__RequestVerificationToken\"")
        {
          continue;
        }

        var originalFileName = fileData.Headers.ContentDisposition.FileName.Trim('"');

        // Retrieve reference to a blob
        CloudBlockBlob blob;
        do
        {
          var fileName = CloudBlockBlobBusiness.BuildFileName(Path.GetFileName(originalFileName));
          blob = _container.GetBlockBlobReference(fileName);

          // if (blob.Exists())
          // {
          // // In the future if we want to allow multiple files by renaming them
          // //var newBlob = container.GetBlobReference(existBlob.Name.ToLower());
          // //newBlog.CopyFromBlob(existBlob);
          // throw new FileLoadException("File exists");
          // }
        }
        while (blob.Exists());

        blob.Properties.ContentType = fileData.Headers.ContentType.MediaType;
        blob.UploadFile(fileData.LocalFileName);
        File.Delete(fileData.LocalFileName);
        var fileInfo = new FileInfo(blob.Name);
        Files.Add(
          new FileDetails
          {
            ContentType      = blob.Properties.ContentType, 
            Name             = blob.Name, 
            Size             = blob.Properties.Length, 
            Location         = blob.Uri.AbsoluteUri, 
            OriginalFileName = originalFileName, 
            ContainerName    = _container.Name, 
            ContentLength    = blob.Properties.Length, 
            Description      = blob.Name, 
            Extension        = fileInfo.Extension, 
            IsPrivate        = false, 
            CategoryId       = "Multimedia", // TODO: create method to get Category by extension
            LocationHttp     = blob.Uri.AbsoluteUri, 
            RelativeLocation = blob.Uri.AbsolutePath, 
            DateEntered      = DateTime.UtcNow, 
            DateUpdated      = DateTime.UtcNow,
          });
      }

      return base.ExecutePostProcessingAsync();
    }

    /// <summary>
    /// Gets the name of the local file which will be combined with the root path to create an absolute file name where the contents of the current MIME body part will be stored.
    /// </summary>
    /// <param name="headers">
    /// The headers for the current MIME body part.
    /// </param>
    /// <returns>
    /// A relative filename with no path component.
    /// </returns>
    public override string GetLocalFileName(HttpContentHeaders headers)
    {
      return base.GetLocalFileName(headers);

      // string tempFileName = base.GetLocalFileName(headers);
      // string fileName;
      // if (!string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName))
      // {
      // fileName = "marasco" + headers.ContentDisposition.FileName;
      // }
      // else
      // {
      // fileName = Guid.NewGuid() + ".data";
      // }
      // return fileName.Replace
      // (
      // "\"",
      // string.Empty);
    }

    #endregion
  }
}