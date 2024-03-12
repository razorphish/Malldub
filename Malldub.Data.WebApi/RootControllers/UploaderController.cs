namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Data;

  using Marasco.Azure.Storage.Business;

  #endregion

  [Authorize]
  public class ItemUploaderController : ApiController
  {
    #region Fields

    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    [Route("api/itemuploader/remove")]
    [Obsolete("This message will be depreated by launch date")]
    public HttpResponseMessage Remove([FromBody] ItemUpload itemUpload)
    {
      if (itemUpload == null)
      {
        return new HttpResponseMessage(HttpStatusCode.NotFound);
      }

      if (itemUpload.Upload.Identification > 0)
      {
        var upload = _context.Upload.GetByKey(itemUpload.Upload.Identification);
        if (upload == null)
        {
          return new HttpResponseMessage(HttpStatusCode.NotFound);
        }
        _context.Upload.DeleteObject(upload);
        _context.SaveChanges();
      }

      CloudBlockBlobBusiness.Delete(itemUpload.Upload.Name.Split(",".ToCharArray()));

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion
  }
}