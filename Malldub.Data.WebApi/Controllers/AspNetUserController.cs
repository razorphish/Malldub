namespace Malldub.Data.Controllers.API
{
  #region Directives

  using System.Collections.Generic;
  using System.Data.Entity;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Marasco.Azure.Storage.Business;

  #endregion

  [Authorize(Roles = "Administrator")]
  [RoutePrefix("api/aspnetuser")]
  public partial class AspNetUserController
  {
    #region Public Methods and Operators

    [Route("all")]
    [HttpGet]
    public IQueryable<AspNetUser> All()
    {
      return _context.AspNetUser.AsQueryable();
    }

    /// <summary>
    /// Deletes the specified identification.
    /// </summary>
    /// <param name="identification">The identification.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <remarks>Delete from item Hierarchy (parent of fund</remarks>
    public HttpResponseMessage Delete(string identification)
    {
      var user        = _context.AspNetUser.GetByKey(identification);
      var addresses   = new List<Address>();
      var emails      = new List<Email>();
      var uploads     = new List<Upload>();
      var orders      = new List<Order>();
      var items       = new List<Item>();
      Account account = null;

      if (user == null)
      {
        return new HttpResponseMessage(HttpStatusCode.NotFound);
      }

      var userInfo = _context.AspNetUser.ByIdentification(identification)
        .Include("UserAddressList")
        .Include("UserEmailList")
        .Include("UserPhoneList")
        .Include("OrderList")
        .Include("ItemList")
        .Include("ItemList.ItemUploadList")
        .Include("ItemList.ItemUploadList.Upload")
        .FirstOrDefault();


      // Get items one layer removed
      // Orders and images
      if (userInfo != null)
      {
        addresses.AddRange(userInfo.UserAddressList.Select(address => _context.Address.GetByKey(address.AddressId)));
        emails.AddRange(userInfo.UserEmailList.Select(email        => _context.Email.GetByKey(email.EmailId)));
        uploads.AddRange(userInfo.UserUploadList.Select(upload     => _context.Upload.GetByKey(upload.UploadId)));
        orders.AddRange(userInfo.OrderList.Select(order            => _context.Order.GetByKey(order.Identification)));
        items.AddRange(userInfo.ItemList.Select(item               => _context.Item.GetByKey(item.Identification)));

        account = _context.Account.ByIdentification(userInfo.AccountId).FirstOrDefault();
      }

      foreach (var order in orders)
      {
        _context.Order.DeleteObject(order);
      }

      // Remove Items
      foreach (var item in items)
      {
        var itemUploads = new List<Upload>();
        itemUploads.AddRange(item.ItemUploadList.Select(upload => _context.Upload.GetByKey(upload.Upload.Identification)));
        
        foreach (var itemUpload in itemUploads)
        {
          _context.Upload.DeleteObject(itemUpload);
          if (itemUpload.TypeId == "web.Image")
          {
            CloudBlockBlobBusiness.Delete(itemUpload.Name.Split(",".ToCharArray()));
          }
        }
        _context.Item.DeleteObject(item);
      }

      _context.AspNetUser.DeleteObject(user);

      // Remove addresses
      foreach (var address in addresses)
      {
        _context.Address.DeleteObject(address);
      }

      // Remove email
      foreach (var email in emails)
      {
        _context.Email.DeleteObject(email);
      }

      // Remove uploads
      foreach (var upload in uploads)
      {
        if (upload.TypeId == "web.Image")
        {
          CloudBlockBlobBusiness.Delete(upload.Name.Split(",".ToCharArray()));
        }
        _context.Upload.DeleteObject(upload);
      }

      if (account != null)
      {
        _context.Account.DeleteObject(account);
      }

      _context.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion
  }
}