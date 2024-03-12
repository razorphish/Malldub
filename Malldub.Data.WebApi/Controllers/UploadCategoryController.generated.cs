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
    public partial class UploadCategoryController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.UploadCategory GetByKey(System.String identification)
        {
            var uploadCategory = _context.UploadCategory.GetByKey(identification);
            if (uploadCategory == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return uploadCategory;
        }

        public Malldub.Data.UploadCategory GetByDetails(System.String details)
        {
            var uploadCategory = _context.UploadCategory.GetByDetails(details);
            if (uploadCategory == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return uploadCategory;
        }

        public IQueryable<Malldub.Data.UploadCategory> GetAll()
        {
            return _context.UploadCategory.AsQueryable();
        }

        public IQueryable<Malldub.Data.UploadCategory> GetByDescription(System.String description)
        {
            return _context.UploadCategory.ByDescription(description).AsQueryable();
        }

        public IQueryable<Malldub.Data.UploadCategory> GetBySortOrderNumber(System.Byte sortOrderNumber)
        {
            return _context.UploadCategory.BySortOrderNumber(sortOrderNumber).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.UploadCategory value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.UploadCategory.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.UploadCategory>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.UploadCategory value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var uploadCategory = _context.UploadCategory.GetByKey(value.Identification);
            if (uploadCategory == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(uploadCategory.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var uploadCategory = _context.UploadCategory.GetByKey(identification);
            if (uploadCategory == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.UploadCategory.DeleteObject(uploadCategory);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
