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
    public partial class UserUploadController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.UserUpload GetByKey(System.String userId, System.Int32 uploadId)
        {
            var userUpload = _context.UserUpload.GetByKey(userId, uploadId);
            if (userUpload == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return userUpload;
        }

        public IQueryable<Malldub.Data.UserUpload> GetAll()
        {
            return _context.UserUpload.AsQueryable();
        }

        public IQueryable<Malldub.Data.UserUpload> GetByIsDefault(System.Boolean? isDefault)
        {
            return _context.UserUpload.ByIsDefault(isDefault).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.UserUpload value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.UserUpload.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.UserUpload>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { UserId = value.UserId, UploadId = value.UploadId }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.UserUpload value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var userUpload = _context.UserUpload.GetByKey(value.UserId, value.UploadId);
            if (userUpload == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(userUpload.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String userId, System.Int32 uploadId)
        {
            var userUpload = _context.UserUpload.GetByKey(userId, uploadId);
            if (userUpload == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.UserUpload.DeleteObject(userUpload);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
