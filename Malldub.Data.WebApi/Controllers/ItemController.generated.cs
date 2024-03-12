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
    public partial class ItemController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.Item GetByKey(System.Int32 identification)
        {
            var item = _context.Item.GetByKey(identification);
            if (item == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return item;
        }

        public IQueryable<Malldub.Data.Item> GetAll()
        {
            return _context.Item.AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByUserId(System.String userId)
        {
            return _context.Item.ByUserId(userId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByTypeId(System.String typeId)
        {
            return _context.Item.ByTypeId(typeId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByTransactionTypeId(System.String transactionTypeId)
        {
            return _context.Item.ByTransactionTypeId(transactionTypeId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByTitle(System.String title)
        {
            return _context.Item.ByTitle(title).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByShortSummary(System.String shortSummary)
        {
            return _context.Item.ByShortSummary(shortSummary).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByDescription(System.String description)
        {
            return _context.Item.ByDescription(description).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByStartDate(System.DateTime? startDate)
        {
            return _context.Item.ByStartDate(startDate).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByEndDate(System.DateTime? endDate)
        {
            return _context.Item.ByEndDate(endDate).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByPermalink(System.String permalink)
        {
            return _context.Item.ByPermalink(permalink).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByDateEntered(System.DateTime? dateEntered)
        {
            return _context.Item.ByDateEntered(dateEntered).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByDateUpdated(System.DateTime? dateUpdated)
        {
            return _context.Item.ByDateUpdated(dateUpdated).AsQueryable();
        }

        public IQueryable<Malldub.Data.Item> GetByFeatured(System.Boolean featured)
        {
            return _context.Item.ByFeatured(featured).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.Item value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.Item.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.Item>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.Item value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var item = _context.Item.GetByKey(value.Identification);
            if (item == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(item.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var item = _context.Item.GetByKey(identification);
            if (item == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.Item.DeleteObject(item);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}