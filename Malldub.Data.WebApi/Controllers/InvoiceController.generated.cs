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
    public partial class InvoiceController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.Invoice GetByKey(System.Int32 identification)
        {
            var invoice = _context.Invoice.GetByKey(identification);
            if (invoice == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return invoice;
        }

        public IQueryable<Malldub.Data.Invoice> GetAll()
        {
            return _context.Invoice.AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetByTax(System.Decimal tax)
        {
            return _context.Invoice.ByTax(tax).AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetByTaxRate(System.Byte? taxRate)
        {
            return _context.Invoice.ByTaxRate(taxRate).AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetBySubTotal(System.Decimal subTotal)
        {
            return _context.Invoice.BySubTotal(subTotal).AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetByTotalAmount(System.Decimal totalAmount)
        {
            return _context.Invoice.ByTotalAmount(totalAmount).AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetByStatusId(System.Int32 statusId)
        {
            return _context.Invoice.ByStatusId(statusId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetByDateEntered(System.DateTime? dateEntered)
        {
            return _context.Invoice.ByDateEntered(dateEntered).AsQueryable();
        }

        public IQueryable<Malldub.Data.Invoice> GetByDateUpdated(System.DateTime? dateUpdated)
        {
            return _context.Invoice.ByDateUpdated(dateUpdated).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.Invoice value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.Invoice.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.Invoice>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.Invoice value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var invoice = _context.Invoice.GetByKey(value.Identification);
            if (invoice == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(invoice.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var invoice = _context.Invoice.GetByKey(identification);
            if (invoice == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.Invoice.DeleteObject(invoice);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
