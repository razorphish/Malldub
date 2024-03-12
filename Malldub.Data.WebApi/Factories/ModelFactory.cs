// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 01-08-2015
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 01-10-2017
// ***********************************************************************
// <copyright file="ModelFactory.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi.Factories
{
    #region Directives

    using System.Linq;
    using System.Net.Http;
    using System.Web.Http.Routing;

    using Malldub.Data;

    #endregion

    /// <summary>
    /// Class ModelFactory.
    /// </summary>
    public class ModelFactory
    {
        #region Fields

        /// <summary>
        /// The context
        /// </summary>
        private readonly MalldubDataContext _context;

        /// <summary>
        /// The URL helper
        /// </summary>
        private UrlHelper _urlHelper;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ModelFactory" /> class.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="context">The context.</param>
        public ModelFactory(HttpRequestMessage request, MalldubDataContext context)
        {
            if (request != null)
            {
                _urlHelper = new UrlHelper(request);
            }

            _context = context;
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>FundActivity.</returns>
        public AspNetUserGatewayActivity Create(AspNetUserGatewayActivity item)
        {
            var result = new AspNetUserGatewayActivity
            {
                Activity =
                    new Activity
                    {
                        Memo           = item.Activity.Memo,
                        TypeId         = item.Activity.TypeId,
                        DateEntered    = item.Activity.DateEntered,
                        Identification = item.Identification,
                        IsPrivate      = item.Activity.IsPrivate,
                        ActivityType   =
                            new ActivityType
                            {
                                Details =
                                    item.Activity.ActivityType
                                        .Details,
                                Identification =
                                    item.Activity.ActivityType
                                        .Identification
                            }
                    },
                TypeId                        = item.TypeId,
                Identification                = item.Identification,
                AspNetUserGatewayId           = item.AspNetUserGatewayId,
                AspNetUserGatewayActivityType = new AspNetUserGatewayActivityType
                                        {
                                            Identification = item.AspNetUserGatewayActivityType.Identification,
                                            FriendlyName = item.AspNetUserGatewayActivityType.FriendlyName
                                        }
            };

            return result;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>FundActivity.</returns>
        public AspNetUserGateway Create(AspNetUserGateway item)
        {
            var result = new AspNetUserGateway
            {
                Identification  = item.Identification,
                GatewayId       = item.GatewayId,
                GatewayUserId   = item.GatewayUserId,
                AccessToken     = item.AccessToken,
                AccountId       = item.AccountId,
                AccountState    = item.AccountState,
                AspNetUserId    = item.AspNetUserId,
                DateEntered     = item.DateEntered,
                DateUpdated     = item.DateUpdated,
                Email           = item.Email,
                FirstName       = item.FirstName,
                LastName        = item.LastName,
                TokenExpiration = item.TokenExpiration,
                TokenType       = item.TokenType,
                UserState       = item.UserState
            };

            return result;
        }


        /// <summary>
        /// Creates the specified item upload.
        /// </summary>
        /// <param name="itemUpload">The item upload.</param>
        /// <returns>ItemUpload.</returns>
        public ItemUpload Create(ItemUpload itemUpload)
        {
            return new ItemUpload
                   {
                       Upload    = Create(itemUpload.Upload), 
                       ItemId    = itemUpload.ItemId, 
                       IsDefault = itemUpload.IsDefault, 
                       SortOrder = itemUpload.SortOrder, 
                       UploadId  = itemUpload.UploadId
                   };
        }

        /// <summary>
        /// Creates the specified upload.
        /// </summary>
        /// <param name="upload">The upload.</param>
        /// <returns>Upload.</returns>
        public Upload Create(Upload upload)
        {
            return new Upload
                   {
                       CategoryId       = upload.CategoryId, 
                       ContainerName    = upload.ContainerName, 
                       ContentLength    = upload.ContentLength, 
                       ContentType      = upload.ContentType, 
                       DateEntered      = upload.DateEntered, 
                       DateUpdated      = upload.DateUpdated, 
                       Description      = upload.Description, 
                       Identification   = upload.Identification, 
                       IsPrivate        = upload.IsPrivate, 
                       Location         = upload.Location, 
                       LocationHttp     = upload.LocationHttp, 
                       Name             = upload.Name, 
                       OriginalFileName = upload.OriginalFileName, 
                       RelativeLocation = upload.RelativeLocation
                   };
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>Item.</returns>
        public Item Create(Item item)
        {
            return new Item
                   {
                       DateEntered       = item.DateEntered, 
                       Description       = item.Description, 
                       ShortSummary      = item.ShortSummary, 
                       EndDate           = item.EndDate, 
                       Identification    = item.Identification, 
                       Permalink         = item.Permalink, 
                       StartDate         = item.StartDate, 
                       Title             = item.Title, 
                       StatusId          = item.StatusId, 
                       TypeId            = item.TypeId, 
                       TransactionTypeId = item.TransactionTypeId, 
                       Featured          = item.Featured, 
                       DateUpdated       = item.DateUpdated
                   };
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>FundNote.</returns>
        public FundNote Create(FundNote item)
        {
            var fundNote = new FundNote
                           {
                               Identification = item.Identification, 
                               FundUserId     = item.FundUserId, 
                               FundId         = item.FundId, 
                               RespondNoteId  = item.RespondNoteId, 
                               TypeId         = item.TypeId, 
                               Note           =
                                   new Note
                                   {
                                       Identification = item.Note.Identification, 
                                       Subject        = item.Note.Subject, 
                                       Email          = item.Note.Email, 
                                       FirstName      = item.Note.FirstName, 
                                       LastName       = item.Note.LastName, 
                                       Comments       = item.Note.Comments, 
                                       Sent           = item.Note.Sent, 
                                       IsPrivate      = item.Note.IsPrivate, 
                                       Viewed         = item.Note.Viewed, 
                                       TypeId         = item.Note.TypeId, 
                                       ApplicationId  = item.Note.ApplicationId, 
                                       DateEntered    = item.Note.DateEntered
                                   }
                           };

            return fundNote;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>FundActivity.</returns>
        public FundActivity Create(FundActivity item)
        {
            var result = new FundActivity
                         {
                             Activity =
                                 new Activity
                                 {
                                     Memo           = item.Activity.Memo, 
                                     TypeId         = item.Activity.TypeId, 
                                     DateEntered    = item.Activity.DateEntered, 
                                     Identification = item.Identification, 
                                     IsPrivate      = item.Activity.IsPrivate, 
                                     ActivityType   =
                                         new ActivityType
                                         {
                                             Details =
                                                 item.Activity.ActivityType
                                                     .Details, 
                                             Identification =
                                                 item.Activity.ActivityType
                                                     .Identification
                                         }
                                 }, 
                             FundId           = item.FundId, 
                             Identification   = item.Identification, 
                             TypeId           = item.TypeId, 
                             FundActivityType =
                                 new FundActivityType
                                 {
                                     Identification =
                                         item.FundActivityType.Identification, 
                                     FriendlyName =
                                         item.FundActivityType.FriendlyName
                                 }
                         };

            return result;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>FundComment.</returns>
        public FundComment Create(FundComment item)
        {
            var geo = new Geo();
            if (item.Comment.Geo != null)
            {
                geo = new Geo
                      {
                          Identification = item.Comment.Geo.Identification,
                          Alias          = item.Comment.Geo.Alias,
                          City           = item.Comment.Geo.City,
                          CountryCode    = item.Comment.Geo.CountryCode,
                          DateEntered    = item.Comment.Geo.DateEntered,
                          IpAddress      = item.Comment.Geo.IpAddress,
                          Isp            = item.Comment.Geo.Isp,
                          Latitude       = item.Comment.Geo.Latitude,
                          Longitude      = item.Comment.Geo.Longitude,
                          Organization   = item.Comment.Geo.Organization,
                          OriginalDevice = item.Comment.Geo.OriginalDevice,
                          Region         = item.Comment.Geo.Region,
                          RegionName     = item.Comment.Geo.RegionName,
                          Status         = item.Comment.Geo.Status,
                          TimeZone       = item.Comment.Geo.TimeZone,
                          Zip            = item.Comment.Geo.Zip
                      };
            }

            var result = new FundComment
                         {
                             CommentId = item.CommentId,
                             FundCommentOrigin =
                                 new FundCommentOrigin
                                 {
                                     FriendlyName =
                                         item.FundCommentOrigin.FriendlyName,
                                     Identification =
                                         item.FundCommentOrigin.Identification
                                 },
                             FundId = item.FundId,
                             Identification = item.Identification,
                             Comment =
                                 new Comment
                                 {
                                     AspNetUser =
                                         new AspNetUser
                                         {
                                             FirstName =
                                                 item.Comment.AspNetUser
                                                     .FirstName,
                                             LastName =
                                                 item.Comment.AspNetUser
                                                     .LastName,
                                             Email =
                                                 item.Comment.AspNetUser.Email,
                                             Identification =
                                                 item.Comment.AspNetUser
                                                     .Identification,
                                             AccountId =
                                                 item.Comment.AspNetUser
                                                     .AccountId,
                                             UserName =
                                                 item.Comment.AspNetUser
                                                     .UserName,
                                            AvatarUploadTempLocation = 
                                                item.Comment.AspNetUser
                                                    .AvatarUploadTempLocation,
                                             DateEntered = 
                                                item.Comment.AspNetUser
                                                    .DateEntered,
                                            DateUpdated = 
                                                item.Comment.AspNetUser
                                                    .DateUpdated
                                         },
                                     Identification = item.Identification,
                                     DateEntered    = item.Comment.DateEntered,
                                     Name           = item.Comment.Name,
                                     Post           = item.Comment.Post,
                                     GeoId          = item.Comment.GeoId,
                                     PostToFacebook = item.Comment.PostToFacebook,
                                     Title          = item.Comment.Title,
                                     TotalLikes     = item.Comment.TotalLikes,
                                     UserId         = item.Comment.UserId,
                                     Geo            = geo
                                 }
                         };
            return result;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">
        /// The item.
        /// </param>
        /// <returns>
        /// FundUpdate.
        /// </returns>
        public FundUpdate Create(FundUpdate item)
        {
            var query =
                item.AspNetUser.AspNetUserLoginList.Select(aull => new { aull.LoginProvider, aull.ProviderKey })
                    .FirstOrDefault(aul => aul.LoginProvider == "Facebook");
            AspNetUserLogin login = null;
            if (query != null)
            {
                login = new AspNetUserLogin { LoginProvider = query.LoginProvider, ProviderKey = query.ProviderKey };
            }

            var fundUpdate = new FundUpdate
                             {
                                 Identification   = item.Identification, 
                                 Content          = item.Content, 
                                 FundId           = item.FundId, 
                                 UserId           = item.UserId, 
                                 Title            = item.Title, 
                                 StatusId         = item.StatusId, 
                                 PostedToEmail    = item.PostedToEmail, 
                                 PostedToFacebook = item.PostedToFacebook, 
                                 PostedToTwitter  = item.PostedToTwitter, 
                                 DateEntered      = item.DateEntered, 
                                 User =
                                     new AspNetUser
                                     {
                                         FirstName                = item.AspNetUser.FirstName, 
                                         LastName                 = item.AspNetUser.LastName, 
                                         Email                    = item.AspNetUser.Email, 
                                         AvatarUploadTempLocation =
                                             item.AspNetUser.AvatarUploadTempLocation, 
                                         Identification = item.AspNetUser.Identification, 
                                         FacebookProvider = login
                                     }
                             };

            return fundUpdate;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">
        /// The item.
        /// </param>
        /// <returns>
        /// Donation.
        /// </returns>
        public Donation Create(Donation item)
        {
            var query =
                item.DonorUserAspNetUser.AspNetUserLoginList.Select(
                    aull => new { aull.LoginProvider, aull.ProviderKey })
                    .FirstOrDefault(aul => aul.LoginProvider == "Facebook");
            AspNetUserLogin login = null;
            if (query != null)
            {
                login = new AspNetUserLogin { LoginProvider = query.LoginProvider, ProviderKey = query.ProviderKey };
            }

            var donation = new Donation
                           {
                               Identification     = item.Identification, 
                               FundId             = item.FundId, 
                               DonorUserId        = item.DonorUserId, 
                               MemberUserId       = item.MemberUserId, 
                               OrderId            = item.OrderId, 
                               FeeTypeId          = item.FeeTypeId, 
                               StatusId           = item.StatusId, 
                               Amount             = item.Amount, 
                               ProcessingFee      = item.ProcessingFee, 
                               BeneficiaryAmount  = item.BeneficiaryAmount, 
                               SystemAmount       = item.SystemAmount, 
                               DonorName          = item.IsPrivateDonorName ? "Anonymous" : item.DonorName, 
                               Message            = item.Message, 
                               IsPrivateAmount    = item.IsPrivateAmount, 
                               IsPrivateDonorName = item.IsPrivateDonorName, 
                               OfflineDonation    = item.OfflineDonation, 
                               ThankYouNoteSent   = item.ThankYouNoteSent, 
                               CostsCovered       = item.CostsCovered, 
                               DateEntered        = item.DateEntered, 
                               SubscriptionTypeId = item.SubscriptionTypeId, 
                               Email              = item.Email, 
                               User =
                                   new AspNetUser
                                   {
                                       FirstName = item.DonorUserAspNetUser.FirstName, 
                                       LastName = item.DonorUserAspNetUser.LastName, 
                                       Email = item.DonorUserAspNetUser.Email, 
                                       AvatarUploadTempLocation =
                                           item.DonorUserAspNetUser.AvatarUploadTempLocation, 
                                       Identification = item.DonorUserAspNetUser.Identification, 
                                       FacebookProvider = login
                                   }
                           };

            return donation;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">
        /// The item.
        /// </param>
        /// <returns>
        /// FundUser.
        /// </returns>
        public FundUser Create(FundUser item)
        {
            var fundUser = new FundUser
                           {
                               FundId         = item.FundId, 
                               UserId         = item.UserId, 
                               UserTypeId     = item.UserTypeId, 
                               PostToFacebook = item.PostToFacebook, 
                               DateEntered    = item.DateEntered, 
                               User           =
                                   new AspNetUser
                                   {
                                       Identification           = item.AspNetUser.Identification, 
                                       FirstName                = item.AspNetUser.FirstName, 
                                       LastName                 = item.AspNetUser.LastName, 
                                       Email                    = item.AspNetUser.Email, 
                                       AvatarUploadTempLocation =
                                           item.AspNetUser.AvatarUploadTempLocation, 
                                   }
                           };

            return fundUser;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">
        /// The item.
        /// </param>
        /// <returns>
        /// FundUser.
        /// </returns>
        public FundShare Create(FundShare item)
        {
            var fundShare = new FundShare
            {
                Identification = item.Identification,
                FundId         = item.FundId,
                UserId         = item.UserId,
                Recipients     = item.Recipients,
                SocialId       = item.SocialId,
                FirstName      = item.FirstName,
                LastName       = item.LastName,
                Email          = item.Email,
                ShareTypeId    = item.ShareTypeId,
                DateEntered    = item.DateEntered
            };

            if (item.AspNetUser != null)
            {
                fundShare.AspNetUser = new AspNetUser
                                       {
                                           Identification           = item.AspNetUser.Identification,
                                           FirstName                = item.AspNetUser.FirstName,
                                           LastName                 = item.AspNetUser.LastName,
                                           Email                    = item.AspNetUser.Email,
                                           AvatarUploadTempLocation =
                                               item.AspNetUser.AvatarUploadTempLocation
                                       };
            }

            return fundShare;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">
        /// The item.
        /// </param>
        /// <returns>
        /// FundUser.
        /// </returns>
        public FundTeam Create(FundTeam item)
        {
            var fundTeam = new FundTeam
            {
                Identification = item.Identification,
                FundId         = item.FundId,
                TeamFundId     = item.TeamFundId,
                GoalAmount     = item.GoalAmount,
                CaptainEmail   = item.CaptainEmail,
                Team           = new Team
                       {
                           Identification = item.Team.Identification,
                           Name           = item.Team.Name,
                           DateEntered    = item.Team.DateEntered
                       },
                TeamFundFund = new Fund
                               {
                                   Identification      = item.TeamFundFund.Identification,
                                   TypeId              = item.TeamFundFund.TypeId,
                                   CategoryId          = item.TeamFundFund.CategoryId,
                                   IsPrivate           = item.TeamFundFund.IsPrivate,
                                   EnableSocialSharing = item.TeamFundFund.EnableSocialSharing,
                                   PageColor           = item.TeamFundFund.PageColor,
                                   PageSkin            = item.TeamFundFund.PageSkin,
                                   PageLayout          = item.TeamFundFund.PageLayout,
                                   GoalAmount          = item.TeamFundFund.GoalAmount,
                                   Item                = new Item
                                          {
                                              UserId            = item.TeamFundFund.Item.UserId,
                                              TypeId            = item.TeamFundFund.Item.TypeId,
                                              TransactionTypeId = item.TeamFundFund.Item.TransactionTypeId,
                                              Title             = item.TeamFundFund.Item.Title,
                                              ShortSummary      = item.TeamFundFund.Item.ShortSummary,
                                              Description       = item.TeamFundFund.Item.Description,
                                              StartDate         = item.TeamFundFund.Item.StartDate,
                                              EndDate           = item.TeamFundFund.Item.EndDate,
                                              Permalink         = item.TeamFundFund.Item.Permalink,
                                              Featured          = item.TeamFundFund.Item.Featured,
                                              StatusId          = item.TeamFundFund.Item.StatusId,
                                              DateEntered       = item.TeamFundFund.Item.DateEntered,
                                              DateUpdated       = item.TeamFundFund.Item.DateUpdated
                                          },
                                   FundSetting = new FundSetting
                                                 {
                                                     AllowAnonymousDonors            = item.TeamFundFund.FundSetting.AllowAnonymousDonors,
                                                     AllowCommenting                 = item.TeamFundFund.FundSetting.AllowCommenting,
                                                     AllowRecuringPayments           = item.TeamFundFund.FundSetting.AllowRecuringPayments,
                                                     DonationHideAmount              = item.TeamFundFund.FundSetting.DonationHideAmount,
                                                     DonationHideDonorName           = item.TeamFundFund.FundSetting.DonationHideDonorName,
                                                     EmailReceiveUserDonation        = item.TeamFundFund.FundSetting.EmailReceiveUserDonation,
                                                     EmailReceiveUserFundraiser      = item.TeamFundFund.FundSetting.EmailReceiveUserFundraiser,
                                                     EmailReceiveUserSupport         = item.TeamFundFund.FundSetting.EmailReceiveUserSupport,
                                                     EmailReceiveUserTeamMember      = item.TeamFundFund.FundSetting.EmailReceiveUserTeamMember,
                                                     EmailSendSupporter25Raised      = item.TeamFundFund.FundSetting.EmailSendSupporter25Raised,
                                                     EmailSendSupporter50Raised      = item.TeamFundFund.FundSetting.EmailSendSupporter50Raised,
                                                     EmailSendSupporter75Raised      = item.TeamFundFund.FundSetting.EmailSendSupporter75Raised,
                                                     EmailSendSupporterFriendSupport = item.TeamFundFund.FundSetting.EmailSendSupporterFriendSupport,
                                                     FacebookPostAddImage            = item.TeamFundFund.FundSetting.FacebookPostAddImage,
                                                     FacebookPostAddVideo            = item.TeamFundFund.FundSetting.FacebookPostAddVideo,
                                                     FacebookPostUpdate              = item.TeamFundFund.FundSetting.FacebookPostUpdate,
                                                     FacebookPostUserComment         = item.TeamFundFund.FundSetting.FacebookPostUserComment,
                                                     FacebookPostUserDonate          = item.TeamFundFund.FundSetting.FacebookPostUserDonate,
                                                     FacebookPostUserFundraiser      = item.TeamFundFund.FundSetting.FacebookPostUserFundraiser,
                                                     FacebookPostUserSupport         = item.TeamFundFund.FundSetting.FacebookPostUserSupport,
                                                     UsePaymentModal                 = item.TeamFundFund.FundSetting.UsePaymentModal
                                                 }
                               }
            };

            return fundTeam;
        }

        /// <summary>
        /// Creates the specified item.
        /// </summary>
        /// <param name="item">
        /// The item.
        /// </param>
        /// <returns>
        /// Order.
        /// </returns>
        public Order Create(Order item)
        {
            var order = new Order
                        {
                            Identification        = item.Identification, 
                            Guid                  = item.Guid, 
                            CustomerId            = item.CustomerId, 
                            BillingAddressAddress =
                                new Address
                                {
                                    Address1       = item.BillingAddressAddress.Address1, 
                                    Address2       = item.BillingAddressAddress.Address2, 
                                    City           = item.BillingAddressAddress.City, 
                                    Country        = item.BillingAddressAddress.Country, 
                                    County         = item.BillingAddressAddress.Country, 
                                    DateEntered    = item.BillingAddressAddress.DateEntered, 
                                    Identification = item.BillingAddressAddress.Identification, 
                                    Latitude       = item.BillingAddressAddress.Latitude, 
                                    Longitude      = item.BillingAddressAddress.Longitude, 
                                    State          = item.BillingAddressAddress.State, 
                                    ZipCode        = item.BillingAddressAddress.ZipCode
                                }, 
                            StatusId = item.StatusId, 
                            PaymentStatusId = item.PaymentStatusId, 
                            Geo =
                                new Geo
                                {
                                    Alias          = item.Geo.Alias, 
                                    City           = item.Geo.City, 
                                    CountryCode    = item.Geo.CountryCode, 
                                    DateEntered    = item.Geo.DateEntered, 
                                    Identification = item.Geo.Identification, 
                                    IpAddress      = item.Geo.IpAddress, 
                                    Isp            = item.Geo.Isp, 
                                    Latitude       = item.Geo.Latitude, 
                                    Longitude      = item.Geo.Longitude, 
                                    Organization   = item.Geo.Organization, 
                                    OriginalDevice = item.Geo.OriginalDevice, 
                                    Region         = item.Geo.Region, 
                                    RegionName     = item.Geo.RegionName, 
                                    TimeZone       = item.Geo.TimeZone, 
                                    Status         = item.Geo.Status, 
                                    Zip            = item.Geo.Zip
                                }, 
                            PaymentMethodSystemName        = item.PaymentMethodSystemName, 
                            AuthorizationTransactionId     = item.AuthorizationTransactionId, 
                            AuthorizationTransactionCode   = item.AuthorizationTransactionCode, 
                            AuthorizationTransactionResult = item.AuthorizationTransactionResult, 
                            CaptureTransactionId           = item.CaptureTransactionId, 
                            CaptureTransactionResult       = item.CaptureTransactionResult, 
                            SubscriptionTransactionId      = item.SubscriptionTransactionId, 
                            PurchaseOrderNumber            = item.PurchaseOrderNumber, 
                            DateEntered                    = item.DateEntered
                        };
            return order;
        }

        #endregion
    }
}