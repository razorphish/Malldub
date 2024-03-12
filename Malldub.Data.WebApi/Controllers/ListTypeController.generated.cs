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
    public partial class ListTypeController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.ListType GetByKey(System.Int32 identification)
        {
            var listType = _context.ListType.GetByKey(identification);
            if (listType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return listType;
        }

        public Malldub.Data.ListType GetByCode(System.String code)
        {
            var listType = _context.ListType.GetByCode(code);
            if (listType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return listType;
        }

        public IQueryable<Malldub.Data.ListType> GetAll()
        {
            return _context.ListType.AsQueryable();
        }

        public IQueryable<Malldub.Data.ListType> GetByDescription(System.String description)
        {
            return _context.ListType.ByDescription(description).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.ListType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.ListType.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.ListType>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.ListType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var listType = _context.ListType.GetByKey(value.Identification);
            if (listType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(listType.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var listType = _context.ListType.GetByKey(identification);
            if (listType == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.ListType.DeleteObject(listType);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
