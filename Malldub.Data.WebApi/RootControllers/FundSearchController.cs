namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Data.Entity;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Malldub.Data;

  #endregion

  [RoutePrefix("api/fund/search")]
  public class FundSearchController : BaseApiController
  {
    public FundSearchController()
      : base(new MalldubDataContext())
    {
      
    }

    #region Public Methods and Operators

    [Route("{category}/{pageNumber}/{itemsPerPage}/{searchText}/{sortCriteria}")]
    [HttpGet]
    public HttpResponseMessage SearchFund(
      string category, 
      string searchText, 
      int pageNumber, 
      int itemsPerPage, 
      string sortCriteria = "")
    {
      // if no category search all
      // select i.*, f.* from fund inner join i.id = fund.id
      if (searchText.Equals("All", StringComparison.OrdinalIgnoreCase))
      {
        searchText = string.Empty;
      }

      var categories = category.Split(',');

      var searchResult =
        TheContext.Fund.Include("Item")
                .Where(f => !f.IsPrivate && f.Item.StatusId == "Active")
                .Include("Item.ItemUploadList")
                .Include("Item.ItemUploadList.Upload")
                .Include("Item.AspNetUser")
                .Include("FundCategory")
                .Include("DonationList")
                .Select(
                  f =>
                  new
                  {
                    f.Identification,
                    f.EnableSocialSharing,
                    f.GoalAmount,
                    f.IsPrivate,
                    f.PageColor,
                    f.PageLayout,
                    f.PageSkin,
                    f.TypeId,
                    f.CategoryId,
                    f.FundCategory.FriendlyName,
                    DonationList =
                    f.DonationList.Select(
                      dl =>
                      new
                      {
                        dl.Amount,
                        dl.BeneficiaryAmount,
                        dl.DonorName,
                        dl.Email,
                        dl.IsPrivateAmount,
                        dl.IsPrivateDonorName,
                        dl.Message,
                        dl.DateEntered
                      }),
                    Item =
                    new
                    {
                      f.Item.DateEntered,
                      f.Item.Description,
                      f.Item.EndDate,
                      f.Item.Identification,
                      f.Item.Permalink,
                      f.Item.StartDate,
                      f.Item.Title,
                      ItemUploadList =
                    f.Item.ItemUploadList.Select(
                      il =>
                      new
                      {
                        il.IsDefault,
                        Upload = new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                      })
                    },
                    Originator =
                    new
                    {
                      f.Item.AspNetUser.FirstName,
                      f.Item.AspNetUser.LastName,
                      FullName = f.Item.AspNetUser.FirstName + " " + f.Item.AspNetUser.LastName,
                      f.Item.AspNetUser.AvatarUploadTempLocation,
                      f.Item.AspNetUser.AvatarUploadId
                    },
                    Beneficiary =
                    f.FundUserList.Select(
                      fu =>
                      new
                      {
                        fu.UserTypeId,
                        fu.AspNetUser.FirstName,
                        fu.AspNetUser.LastName,
                        FullName = fu.AspNetUser.FirstName + " " + fu.AspNetUser.LastName
                      })
                     .FirstOrDefault(fi => fi.UserTypeId == "Beneficiary")
                  }).Where(
                  f => (f.Item.Title.Contains(searchText) ||
                  f.Beneficiary.FirstName.Contains(searchText) ||
                  f.Beneficiary.LastName.Contains(searchText) || f.Beneficiary.FullName.Contains(searchText)));

      // .Where(f => f.Item.EndDate > DateTime.UtcNow && !f.IsPrivate && f.TypeId == "Campaign");

      if (categories.Length > 0 && !category.Equals("All", StringComparison.OrdinalIgnoreCase))
      {
        var finalResult = searchResult.Where(f => categories.Contains(f.CategoryId));
        searchResult = finalResult;
      }

      var count = searchResult.Count();

      // Sort
      switch (sortCriteria.ToLower())
      {
        case "title":
          searchResult = searchResult.OrderBy(o => o.Item.Title)
                                     .Skip((pageNumber - 1) * itemsPerPage)
                                     .Take(itemsPerPage);
          break;
        case "ending":
          searchResult =
            searchResult.OrderByDescending(o => o.Item.EndDate).Skip((pageNumber - 1) * itemsPerPage).Take(itemsPerPage);
          break;
        case "newest":
          searchResult =
            searchResult.OrderByDescending(o => o.Item.StartDate)
                        .Skip((pageNumber - 1) * itemsPerPage)
                        .Take(itemsPerPage);
          break;
        default:
          searchResult =
            searchResult.OrderByDescending(o => o.Item.DateEntered)
                        .Skip((pageNumber - 1) * itemsPerPage)
                        .Take(itemsPerPage);
          break;
      }

      var ret = new { Count = count, Data = searchResult };

      return Request.CreateResponse(HttpStatusCode.OK, ret);
    }

    #endregion
  }
}