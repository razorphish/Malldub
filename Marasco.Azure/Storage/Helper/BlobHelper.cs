namespace Marasco.Azure.Storage.Helper
{
    #region Directives

    // http://blogs.msdn.com/b/yaohuang1/archive/2012/07/02/asp-net-web-api-and-azure-blob-storage.aspx

  using System;

  using Microsoft.Azure;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;

    #endregion

    public static class BlobHelper
    {
        #region Public Methods and Operators

        public static CloudBlobContainer GetWebApiContainer()
        {
            return GetWebApiContainer("img");
        }

        public static CloudBlobContainer GetWebApiContainer(string containerName)
        {
            return GetWebApiContainer
                (
                    containerName,
                    "CloudStorageConnectionString");
        }

        public static CloudBlobContainer GetWebApiContainer(
            string containerName,
            string cloudStorageConnectionString)
        {
          var storageAccount =
            CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(cloudStorageConnectionString));

          var blobClient = storageAccount.CreateCloudBlobClient();

            var container = blobClient.GetContainerReference(containerName);

            container.CreateIfNotExists();

            var permissions = container.GetPermissions();

            if (permissions.PublicAccess == BlobContainerPublicAccessType.Off)
            {
                permissions.PublicAccess = BlobContainerPublicAccessType.Blob;
                container.SetPermissions(permissions);
            }
            return container;
        }

        #endregion
    }
}