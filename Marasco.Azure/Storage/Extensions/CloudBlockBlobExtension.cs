namespace Marasco.Azure.Storage.Extensions
{
  #region Directives

  using System.IO;

  using Microsoft.WindowsAzure.Storage.Blob;

  #endregion

  public static class CloudBlockBlobExtension
  {
    #region Public Methods and Operators

    public static void DownloadToFile(this CloudBlockBlob blob, string fileName)
    {
      using (var fs = new FileStream(fileName, FileMode.Create))
      {
        blob.DownloadToStream(fs);
      }
    }

    public static void UploadFile(this CloudBlockBlob blob, string fileName)
    {
      using (var fs = new FileStream(fileName, FileMode.Open))
      {
        blob.UploadFromStream(fs);
      }
    }

    #endregion
  }
}