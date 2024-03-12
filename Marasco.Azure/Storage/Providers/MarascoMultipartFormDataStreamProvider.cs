namespace Marasco.Azure.Storage.Providers
{
    #region Directives

    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;

    #endregion

    public class MarascoMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        #region Constructors and Destructors

        public MarascoMultipartFormDataStreamProvider(string path)
            : base(path)
        {
        }

        #endregion

        #region Public Methods and Operators

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            string fileName;
            if (!string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName))
            {
                fileName = headers.ContentDisposition.FileName;
            }
            else
            {
                fileName = Guid.NewGuid() + ".data";
            }
            return fileName.Replace
                (
                    "\"",
                    string.Empty);
        }

        #endregion
    }
}