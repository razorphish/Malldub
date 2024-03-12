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
    public partial class ListAreaController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.ListArea GetByKey(System.Int32 identification)
        {
            var listArea = _context.ListArea.GetByKey(identification);
            if (listArea == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return listArea;
        }

        public IQueryable<Malldub.Data.ListArea> GetAll()
        {
            return _context.ListArea.AsQueryable();
        }

        public IQueryable<Malldub.Data.ListArea> GetByListPortalSiteId(System.Int32? listPortalSiteId)
        {
            return _context.ListArea.ByListPortalSiteId(listPortalSiteId).AsQueryable();
        }

        public IQueryable<Malldub.Data.ListArea> GetByName(System.String name)
        {
            return _context.ListArea.ByName(name).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.ListArea value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.ListArea.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.ListArea>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.ListArea value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var listArea = _context.ListArea.GetByKey(value.Identification);
            if (listArea == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(listArea.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var listArea = _context.ListArea.GetByKey(identification);
            if (listArea == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.ListArea.DeleteObject(listArea);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}