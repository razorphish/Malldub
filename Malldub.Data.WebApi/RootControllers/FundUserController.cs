namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Threading.Tasks;
  using System.Web.Http;

  using CodeSmith.Data.Linq.Dynamic;

  using Malldub.Data;
  using Malldub.WebApi.Controllers;
  using Malldub.WebApi.Models;

  using Microsoft.AspNet.Identity;

  #endregion

  [Authorize]
  [RoutePrefix("api/fund/{fundId}/user")]
  public class FundUserController : BaseApiController
  {
    #region Constructors and Destructors

    public FundUserController()
      : base(new MalldubDataContext())
    {
      var userManager = Startup.UserManagerFactory();

      // This allows email address as usernames
      userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
                                  {
                                    AllowOnlyAlphanumericUserNames =
                                      false
                                  };

      UserManager = userManager;
    }

    #endregion

    #region Public Properties

    public UserManager<ApplicationUser> UserManager { get; private set; }

    #endregion

    #region Public Methods and Operators

    [Route("beneficiary/{id}")]
    [HttpGet]
    public HttpResponseMessage GetFundBeneficiarySummary(int id)
    {
      if (id == 0)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fund Id not valid");
      }

      var obj =
        TheContext.FundUser.Include("AspNetUser")
                  .Include("AspNetUser.UserAddressList.Address")
                  .Include("AspNetUser.UserEmailList.Email")
                  .Include("AspNetUser.UserPhoneList.Phone")
                  .ByFundId(id)
                  .ByUserTypeId("Beneficiary")
                  .Select(
                    fu =>
                    new
                    {
                      fu.UserTypeId, 
                      fu.FundId, 
                      AspNetUser =
                      new
                      {
                        fu.AspNetUser.FirstName, 
                        fu.AspNetUser.LastName, 
                        fu.AspNetUser.StatusId, 
                        fu.AspNetUser.Email, 
                        fu.AspNetUser.AvatarUploadTempLocation, 
                        UserAddressList =
                      fu.AspNetUser.UserAddressList.Select(
                        ual =>
                        new
                        {
                          ual.IsDefault, 
                          Address =
                          new { ual.Address.Address1, ual.Address.City, ual.Address.State, ual.Address.ZipCode }
                        })
                        .Where(uall => uall.IsDefault), 
                        UserEmailList =
                      fu.AspNetUser.UserEmailList.Select(
                        uel => new { uel.IsDefault, Email = new { uel.Email.Address } }).Where(uel => uel.IsDefault), 
                        UserPhoneList =
                      fu.AspNetUser.UserPhoneList.Select(
                        upl => new { upl.IsDefault, Phone = new { upl.Phone.Number, upl.Phone.TypeId } })
                        .Where(upl => upl.IsDefault)
                      }
                    });

      return Request.CreateResponse(DynamicQueryable.Any(obj) ? HttpStatusCode.OK : HttpStatusCode.NotFound, obj);
    }

    [Route("fundraisers/{pageNumber}/{itemsPerPage}")]
    [HttpGet]
    [AllowAnonymous]
    public HttpResponseMessage GetFundraisersByFund(int fundId, int pageNumber = 1, int itemsPerPage = 10)
    {
      if (fundId == 0)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Fund Id not valid");
      }

      var result =
        TheContext.FundUser.Include("AspNetUser")
        .Include("UserFundFund")
        .Include("UserFundFund.FundCategory")
                  .Include("UserFundFund.Item")
                  .Include("UserFundFund.Item.ItemUploadList")
                  .Include("UserFundFund.Item.ItemUploadList.Upload")
                  .ByFundId(fundId)
                  .ByUserTypeId("Fundraiser");

      var count = result.Count();

      if (itemsPerPage > 0)
      {
        result =
          result.OrderByDescending(ft => ft.DateEntered)
                .Skip((pageNumber - 1) * itemsPerPage)
                .Take(itemsPerPage);
      }

      var ret =
        new
        {
          Count = count,
          Data =
            result.ToList()
                  .Select(
                    fu =>
                    new
                    {
                      fu.UserTypeId,
                      fu.DateEntered,
                      Fund =
                      new
                      {
                        fu.UserFundFund.Identification,
                        fu.UserFundFund.EnableSocialSharing,
                        fu.UserFundFund.GoalAmount,
                        fu.UserFundFund.IsPrivate,
                        fu.UserFundFund.PageColor,
                        fu.UserFundFund.PageLayout,
                        fu.UserFundFund.PageSkin,
                        fu.UserFundFund.TypeId,
                        fu.UserFundFund.CategoryId,
                        fu.UserFundFund.FundCategory.FriendlyName,
                        Item =
                      new
                      {
                        fu.UserFundFund.Item.DateEntered,
                        fu.UserFundFund.Item.Description,
                        fu.UserFundFund.Item.EndDate,
                        fu.UserFundFund.Item.Identification,
                        fu.UserFundFund.Item.Permalink,
                        fu.UserFundFund.Item.StartDate,
                        fu.UserFundFund.Item.Title,
                        fu.UserFundFund.Item.StatusId,
                        ItemUploadList =
                      fu.UserFundFund.Item.ItemUploadList.Select(
                        il =>
                        new
                        {
                          il.IsDefault,
                          Upload =
                          new { il.Upload.ContainerName, il.Upload.Name, il.Upload.LocationHttp, il.Upload.TypeId }
                        })
                      },
                        DonationList =
                      fu.UserFundFund.DonationList.Select(
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
                      },
                      AspNetUser =
                      new
                      {
                        fu.AspNetUser.FirstName,
                        fu.AspNetUser.LastName,
                        fu.AspNetUser.StatusId,
                        fu.AspNetUser.Email,
                        fu.AspNetUser.AvatarUploadTempLocation,
                      }
                    })
        };

      return Request.CreateResponse(HttpStatusCode.OK, ret);
    }

    [Route("")]
    [HttpPost]
    public async Task<IHttpActionResult> Post(FundUser value)
    {
      var ac = new AuthController();
      string userId;
      var isDefault = false;

      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var newUser = TheContext.AspNetUser.ByUserName(value.AspNetUser.UserName).FirstOrDefault();

      if (newUser == null)
      {
        var accountId = Guid.NewGuid().ToString();
        CreateAccount(accountId);

        var user = new ApplicationUser
                   {
                     UserName = value.AspNetUser.UserName, 
                     FirstName = value.AspNetUser.FirstName, 
                     LastName = value.AspNetUser.LastName, 
                     Email = value.AspNetUser.Email, 
                     StatusId = "Pending", 
                     AccountId = accountId
                   };

        var result = await UserManager.CreateAsync(user);

        var errorResult = ac.GetErrorResult(result);

        if (errorResult != null)
        {
          return errorResult;
        }

        // Must be created after user
        WePayController.CreateGateWayAccounts(accountId, user, value.Geo, true);

        isDefault = true;
        userId = user.Id;
      }
      else
      {
        userId = newUser.Identification;
      }

      newUser = AddUserSpecifics(value, userId, isDefault);

      TheContext.AspNetUser.ApplyCurrentValues(newUser);

      value.AspNetUser = null;
      value.UserId = newUser.Identification;
      TheContext.FundUser.AddObject(value);
      TheContext.SaveChanges();

      return Ok(new RegisterAnonymousReturnModel { Identification = newUser.Identification });
    }

    [HttpPut]
    [Route("")]
    public HttpResponseMessage Put(FundUser value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var fundUser =
        TheContext.FundUser.Include("AspNetUser")
                  .Include("AspNetUser.UserAddressList.Address")
                  .Include("AspNetUser.UserEmailList.Email")
                  .Include("AspNetUser.UserPhoneList.Phone")
                  .GetByKey(value.FundId, value.UserId, value.UserTypeId);

      if (fundUser == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      TheContext.ApplyCurrentValues(fundUser.EntityKey.EntitySetName, value);
      TheContext.ApplyCurrentValues(fundUser.AspNetUser.EntityKey.EntitySetName, value.AspNetUser);

      foreach (var userAddress in fundUser.AspNetUser.UserAddressList)
      {
        foreach (var address in
          value.AspNetUser.UserAddressList.Where(
            address => userAddress.Address.Identification == address.Address.Identification))
        {
          TheContext.ApplyCurrentValues(userAddress.Address.EntityKey.EntitySetName, address.Address);
        }
      }

      foreach (var userEmail in fundUser.AspNetUser.UserEmailList)
      {
        foreach (var email in
          value.AspNetUser.UserEmailList.Where(email => userEmail.Email.Identification == email.Email.Identification))
        {
          TheContext.ApplyCurrentValues(userEmail.Email.EntityKey.EntitySetName, email.Email);
        }
      }

      foreach (var userPhone in fundUser.AspNetUser.UserPhoneList)
      {
        foreach (var phone in
          value.AspNetUser.UserPhoneList.Where(phone => userPhone.Phone.Identification == phone.Phone.Identification))
        {
          TheContext.ApplyCurrentValues(userPhone.Phone.EntityKey.EntitySetName, phone.Phone);
        }
      }

      // TODO ADD LOGIC THAT CHECKS
      var emailMatch =
        fundUser.AspNetUser.UserEmailList.Any(
          em => value.AspNetUser.UserEmailList.Any(um => um.Email.Identification == em.Email.Identification));

      TheContext.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion

    #region Methods

    private AspNetUser AddUserSpecifics(FundUser value, string userId, bool isDefault)
    {
      var userAddressList = value.AspNetUser.UserAddressList.FirstOrDefault();
      var userEmailList = value.AspNetUser.UserEmailList.FirstOrDefault();
      var userPhoneList = value.AspNetUser.UserPhoneList.FirstOrDefault();

      userAddressList.UserId = userId;
      userAddressList.IsDefault = isDefault;
      userEmailList.UserId = userId;
      userPhoneList.UserId = userId;

      var newuser = TheContext.AspNetUser.GetByIdentification(userId);
      newuser.UserAddressList.Add(userAddressList);
      newuser.UserEmailList.Add(userEmailList);
      newuser.UserPhoneList.Add(userPhoneList);
      return newuser;
    }

    private void CreateAccount(string accountId)
    {
      TheContext.Account.AddObject(new Account { StatusId = "Active", Identification = accountId });
      TheContext.SaveChanges();
    }

    #endregion
  }
}