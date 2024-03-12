﻿#pragma warning disable 1591
// <auto-generated>
//     This code was generated from a CodeSmith Generator template.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeSmith.Data.Linq;
using CodeSmith.Data.Linq.Dynamic;
using Malldub.Data;

namespace Malldub.Data.Controllers.API
{
    [CodeSmith.Data.Web.Http.PagingAndFiltering]
    public partial class ListPostController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.ListPost GetByKey(System.Int32 identification)
        {
            var listPost = _context.ListPost.GetByKey(identification);
            if (listPost == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return listPost;
        }

        public IQueryable<Malldub.Data.ListPost> GetAll()
        {
            return _context.ListPost.AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByListSiteId(System.Int32 listSiteId)
        {
            return _context.ListPost.ByListSiteId(listSiteId).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByListTypeId(System.Int32 listTypeId)
        {
            return _context.ListPost.ByListTypeId(listTypeId).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByListCategoryId(System.Int32? listCategoryId)
        {
            return _context.ListPost.ByListCategoryId(listCategoryId).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByListAreaId(System.Int32? listAreaId)
        {
            return _context.ListPost.ByListAreaId(listAreaId).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetBySpecificLocation(System.String specificLocation)
        {
            return _context.ListPost.BySpecificLocation(specificLocation).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByPostReplyEmailTypeId(System.Int32 postReplyEmailTypeId)
        {
            return _context.ListPost.ByPostReplyEmailTypeId(postReplyEmailTypeId).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByIsSolicitable(System.Boolean isSolicitable)
        {
            return _context.ListPost.ByIsSolicitable(isSolicitable).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPost> GetByStatusId(System.Int32 statusId)
        {
            return _context.ListPost.ByStatusId(statusId).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.ListPost value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.ListPost.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.ListPost>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.ListPost value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var listPost = _context.ListPost.GetByKey(value.Identification);
            if (listPost == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(listPost.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var listPost = _context.ListPost.GetByKey(identification);
            if (listPost == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.ListPost.DeleteObject(listPost);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
