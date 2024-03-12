// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : David Antonio Marasco
// Created          : 11-23-2016
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 02-08-2017
// ***********************************************************************
// <copyright file="print.aspx.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// ***********************************************************************
namespace Malldub.WebApi
{
    #region Directives

    using System;
    using System.Configuration;
    using System.Linq;
    using System.Web.UI;

    using Malldub.Data;

    using Marasco.Api;
    using Marasco.Api.Model;

    #endregion

    /// <summary>
    /// Class print.
    /// </summary>
    /// <seealso cref="System.Web.UI.Page" />
    public partial class print : Page
    {
        #region Fields

        /// <summary>
        /// The current server
        /// </summary>
        protected string CurrentServer = ConfigurationManager.AppSettings["CurrentServer"];

        /// <summary>
        /// The default image name
        /// </summary>
        protected string DefaultImageName;

        /// <summary>
        /// The fund title
        /// </summary>
        protected string FundTitle;

        /// <summary>
        /// The permalink
        /// </summary>
        protected string Permalink;

        /// <summary>
        /// The qr code image
        /// </summary>
        protected string QrCodeImage;

        /// <summary>
        /// The context
        /// </summary>
        private readonly MalldubDataContext _context = new MalldubDataContext();

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Gets the fund by permalink.
        /// </summary>
        /// <param name="permalink">The permalink.</param>
        /// <returns>IQueryable&lt;dynamic&gt;.</returns>
        public IQueryable<dynamic> GetFundByPermalink(string permalink)
        {
            var obj = _context.Item.ByPermalink(permalink);

            var firstOrDefault = obj.FirstOrDefault();
            if (firstOrDefault == null)
            {
                return null;
            }

            var ret =
                _context.Fund.Include("Item")
                        .Include("Item.ItemUploadList")
                        .Include("Item.ItemUploadList.Upload")
                        .Include("DonationList")
                        .Include("FundUpdateList")
                        .Include("Item.AspNetUser")
                        .Include("FundUser")
                        .ByIdentification(firstOrDefault.Identification)
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
                                DonationList =
                                f.DonationList.Select(
                                    dl =>
                                    new
                                    {
                                        dl.DonorUserAspNetUser.AvatarUploadTempLocation, 
                                        dl.Amount, 
                                        dl.BeneficiaryAmount, 
                                        DonorName = dl.IsPrivateDonorName ? "Anonymous" : dl.DonorName, 
                                        dl.IsPrivateAmount, 
                                        dl.IsPrivateDonorName, 
                                        dl.Message, 
                                        dl.DateEntered
                                    }), 
                                FundUpdateList =
                                f.FundUpdateList.Select(ul => new { ul.DateEntered, ul.Content, ul.StatusId })
                                 .Where(ul => ul.StatusId.Equals("Active", StringComparison.OrdinalIgnoreCase)), 
                                Item =
                                new
                                {
                                    f.Item.DateEntered, 
                                    f.Item.Description, 
                                    f.Item.ShortSummary, 
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
                                        Upload =
                                        new
                                        {
                                            il.Upload.ContainerName, 
                                            il.Upload.Name, 
                                            il.Upload.LocationHttp, 
                                            il.Upload.TypeId
                                        }
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
                            });

            return ret;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            var f = Request.QueryString["f"];
            var query = GetFundByPermalink(f);
            var enume = query.GetEnumerator();

            while (enume.MoveNext())
            {
                FundTitle = enume.Current.Item.Title;
                Permalink = string.Format("{0}/{1}", CurrentServer, enume.Current.Item.Permalink);

                // Set to default global default image
                var defaultImage = ConfigurationManager.AppSettings["DefaultImage"];

                // If list contains default to first image
                if (enume.Current.Item.ItemUploadList.Count > 0)
                {
                    defaultImage = GetImageUrl(enume.Current.Item.ItemUploadList[0]);
                }

                // If image has been specifically designated as default use it
                foreach (var itemUpload in enume.Current.Item.ItemUploadList)
                {
                    if (!itemUpload.IsDefault)
                    {
                        continue;
                    }

                    defaultImage = GetImageUrl(itemUpload);
                    break;
                }

                // Set protected property with FINAL default image
                DefaultImageName = defaultImage;
            }

            QrCodeImage = GetQrCodeImage(Permalink);
        }

        /// <summary>
        /// Gets the qr code image.
        /// </summary>
        /// <param name="permalink">The permalink.</param>
        /// <returns>System.String.</returns>
        private static string GetQrCodeImage(string permalink)
        {
            var img = QrCode.GenerateRelayQrCodeImage(new QrCodeImageRequest { Value = permalink }, 100, 100);
            return img.Src;
        }

        /// <summary>
        /// Gets the image URL.
        /// </summary>
        /// <param name="itemUpload">The item upload.</param>
        /// <returns>dynamic.</returns>
        private dynamic GetImageUrl(dynamic itemUpload)
        {
            string defaultImage;

            if (itemUpload == null)
            {
                defaultImage = ConfigurationManager.AppSettings["DefaultImage"];
            }
            else
            {
                switch (itemUpload.Upload.TypeId as string)
                {
                    case "web.Video.Vimeo":
                    case "web.Video.YouTube":
                        defaultImage = itemUpload.Upload.Name;
                        break;
                    default:
                        defaultImage = string.Format(
                            "{0}/azure/{1}/{2}?height=340&width=380&mode=crop&scale=both", 
                            CurrentServer, 
                            itemUpload.Upload.ContainerName, 
                            itemUpload.Upload.Name);
                        break;
                }
            }

            return defaultImage;
        }

        #endregion
    }
}