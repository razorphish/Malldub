// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 01-07-2015
// Last Modified By : Antonio David Marasco
// Last Modified On : 01-07-2015
// ***********************************************************************
// <copyright file="FundUploadsController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Data.Entity;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Web;
  using System.Web.Http;

  using Malldub.Data;

  using Marasco.Api;
  using Marasco.Azure.Storage.Business;

  #endregion

  [RoutePrefix("api/fund/{fundId}/uploads")]
  [Authorize]
  public class FundUploadsController : BaseApiController
  {
    #region Constructors and Destructors

    public FundUploadsController()
      : base(new MalldubDataContext()) {}

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Deletes the specified fund identifier.
    /// </summary>
    /// <param name="fundId">The fund identifier.</param>
    /// <param name="id">The identifier.</param>
    /// <returns>HttpResponseMessage.</returns>
    [HttpDelete]
    [Route("{id}")]
    public HttpResponseMessage Delete(int fundId, int id)
    {
      try
      {
        var upload = TheContext.Upload.GetByKey(id);
        if (upload == null)
        {
          return Request.CreateErrorResponse(
            HttpStatusCode.NotFound, 
            string.Format("Could not find the item upload - Item id : {0}, Upload Id : {1}", fundId, id));
        }

        TheContext.Upload.DeleteObject(upload);
        TheContext.SaveChanges();

        CloudBlockBlobBusiness.Delete(upload.Name.Split(",".ToCharArray()));

        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }
    }

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    [HttpPost]
    [Route("")]
    public HttpResponseMessage Post(ItemUpload value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      try
      {
        if (value.Upload.TypeId == "web.Video")
        {
          var uri = ExtractVideoUrl(value);

          value.Upload.RelativeLocation = uri.PathAndQuery;
          value.Upload.ContainerName = uri.AbsolutePath;
          value.Upload.Extension = uri.Query;
        }

        TheContext.ItemUpload.AddObject(value);

        TheContext.FundActivity.AddObject(
          new FundActivity
          {
            TypeId = value.Upload.TypeId == "web.Image" ? "NewImage" : "NewVideo", 
            FundId = value.ItemId, 
            Activity =
              new Activity
              {
                TypeId = "Create", 
                Memo =
                  string.Format(
                    "A new {0} has been added to your campaign.", 
                    value.Upload.TypeId == "web.Image" ? "image" : "video")
              }
          });

        TheContext.SaveChanges();

        // Post based on settings
        PostToSocial(value);
        var response = Request.CreateResponse(HttpStatusCode.Created, value);

        return response;
      }
      catch (ArgumentException argexc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, argexc.Message);
      }
      catch (Exception exc)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, exc.Message);
      }
    }

    /// <summary>
    /// Puts the specified value.
    /// </summary>
    /// <param name="fundId">The identifier.</param>
    /// <param name="itemUploads">The item uploads.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException"></exception>
    /// <exception cref="HttpResponseMessage"></exception>
    [HttpPut]
    [Route("")]
    public HttpResponseMessage Put(int fundId, List<ItemUpload> itemUploads)
    {
      foreach (var itemUpload in itemUploads)
      {
        itemUpload.IsDefault = itemUpload.SortOrder == 0;

        var upload = TheContext.ItemUpload.GetByKey(fundId, itemUpload.UploadId);

        if (upload == null)
        {
          throw new HttpResponseException(
            Request.CreateErrorResponse(HttpStatusCode.NotFound, "Could not find image in item collection"));
        }

        TheContext.ApplyCurrentValues(upload.EntityKey.EntitySetName, itemUpload);
      }

      if (itemUploads.Count > 0)
      {
        TheContext.SaveChanges();
      }

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion

    #region Methods

    /// <summary>
    /// Extracts the video URL.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>Uri.</returns>
    /// <exception cref="System.ArgumentException">
    /// invalid video url
    /// or
    /// invalid vimeo or youtube url
    /// </exception>
    private static Uri ExtractVideoUrl(ItemUpload value)
    {
      Uri uri;
      string fileName;

      var isUrl = Uri.TryCreate(value.Upload.Location, UriKind.RelativeOrAbsolute, out uri);

      if (!isUrl || !uri.IsWellFormedOriginalString())
      {
        throw new ArgumentException("invalid video url");
      }

      switch (uri.Host)
      {
        case "youtu.be":
        case "www.youtube.com":
          value.Upload.TypeId += ".YouTube";

          if (value.Upload.Location.IndexOf("https:", 0, StringComparison.CurrentCulture) < 0)
          {
            value.Upload.Location = string.Format(
              "https://{0}", 
              value.Upload.Location.Replace("//", string.Empty).Replace("http:", string.Empty));
          }

          if (uri.Scheme == "file")
          {
            uri = new Uri(string.Format("{0}{1}", "https:", uri.OriginalString));
          }

          if (uri.Host == "youtu.be")
          {
            fileName = uri.AbsolutePath.Replace("/", string.Empty);
          }
          else
          {
            var nvc = HttpUtility.ParseQueryString(uri.Query);
            fileName = nvc.Get("v");
            if (fileName == null)
            {
              // Search segments
              foreach (var segment in uri.Segments.Where(segment => segment != "/" && segment != "embed/"))
              {
                fileName = segment;
                break;
              }
            }
          }

          value.Upload.OriginalFileName = string.IsNullOrEmpty(fileName) ? value.Upload.OriginalFileName : fileName;
          value.Upload.Description = "YouTube.com video";
          value.Upload.Name = string.Format("https://img.youtube.com/vi/{0}/0.jpg", fileName);
          value.Upload.Location = string.Format("//www.youtube.com/embed/{0}", fileName);
          break;
        case "player.vimeo.com":
        case "vimeo.com":
        case "www.vimeo.com":

          // http://vimeo.com/channels/staffpicks/114736751
          value.Upload.TypeId += ".Vimeo";

          if (uri.Scheme == "file")
          {
            uri = new Uri(string.Format("{0}{1}", "https:", uri.OriginalString));
          }

          // Search segments
          fileName = uri.Segments[uri.Segments.Length - 1];

          // Get Thumbnail
          var res = VimeoClient.Get(fileName);

          value.Upload.OriginalFileName = string.IsNullOrEmpty(fileName) ? value.Upload.OriginalFileName : fileName;
          value.Upload.Description = "Vimeo.com video";
          value.Upload.Name = res[0].ThumbnailMedium.Replace("http", "https");
          value.Upload.Location = string.Format("//player.vimeo.com/video/{0}", fileName);
          break;
        default:
          throw new ArgumentException("invalid vimeo or youtube url");
      }

      return uri;
    }

    /// <summary>
    /// Posts to social.
    /// </summary>
    /// <param name="value">The value.</param>
    private void PostToSocial(ItemUpload value)
    {
      var fund = TheContext.Fund.ByIdentification(value.ItemId).Include("FundSetting").Include("Item").FirstOrDefault();

      if (fund == null)
      {
        return;
      }

      var postingAllowed = value.Upload.TypeId == "web.Image"
                             ? fund.FundSetting.FacebookPostAddImage
                             : fund.FundSetting.FacebookPostAddVideo;

      if (!postingAllowed)
      {
        return;
      }

      var controller = new FacebookController();

      controller.PostToFacebook(
        fund.Item.Description, 
        string.Format(
          "We have uploaded a new {0} to our campaign", 
          value.Upload.TypeId == "web.Image" ? "image" : "video"), 
        fund.Item.Permalink, 
        fund.Item.Title, 
        value);
    }

    #endregion
  }
}