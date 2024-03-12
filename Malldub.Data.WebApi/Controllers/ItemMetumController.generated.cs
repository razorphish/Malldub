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
    public partial class ItemMetumController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.ItemMetum GetByKey(System.Int32 itemId, System.String metaKeyId)
        {
            var itemMetum = _context.ItemMetum.GetByKey(itemId, metaKeyId);
            if (itemMetum == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return itemMetum;
        }

        public IQueryable<Malldub.Data.ItemMetum> GetAll()
        {
            return _context.ItemMetum.AsQueryable();
        }

        public IQueryable<Malldub.Data.ItemMetum> GetByStringValue(System.String stringValue)
        {
            return _context.ItemMetum.ByStringValue(stringValue).AsQueryable();
        }

        public IQueryable<Malldub.Data.ItemMetum> GetByNumericValue(System.Decimal? numericValue)
        {
            return _context.ItemMetum.ByNumericValue(numericValue).AsQueryable();
        }

        public IQueryable<Malldub.Data.ItemMetum> GetByDateValue(System.DateTime? dateValue)
        {
            return _context.ItemMetum.ByDateValue(dateValue).AsQueryable();
        }

        public IQueryable<Malldub.Data.ItemMetum> GetByXmlDom(System.String xmlDom)
        {
            return _context.ItemMetum.ByXmlDom(xmlDom).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.ItemMetum value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.ItemMetum.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.ItemMetum>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { ItemId = value.ItemId, MetaKeyId = value.MetaKeyId }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.ItemMetum value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var itemMetum = _context.ItemMetum.GetByKey(value.ItemId, value.MetaKeyId);
            if (itemMetum == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(itemMetum.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 itemId, System.String metaKeyId)
        {
            var itemMetum = _context.ItemMetum.GetByKey(itemId, metaKeyId);
            if (itemMetum == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.ItemMetum.DeleteObject(itemMetum);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}