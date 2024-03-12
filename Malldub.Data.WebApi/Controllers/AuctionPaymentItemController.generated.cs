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
    public partial class AuctionPaymentItemController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.AuctionPaymentItem GetByKey(System.Int32 paymentItemId, System.Int32 userId)
        {
            var auctionPaymentItem = _context.AuctionPaymentItem.GetByKey(paymentItemId, userId);
            if (auctionPaymentItem == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return auctionPaymentItem;
        }

        public IQueryable<Malldub.Data.AuctionPaymentItem> GetAll()
        {
            return _context.AuctionPaymentItem.AsQueryable();
        }

        public IQueryable<Malldub.Data.AuctionPaymentItem> GetByBasedOnWinningPrice(System.Boolean basedOnWinningPrice)
        {
            return _context.AuctionPaymentItem.ByBasedOnWinningPrice(basedOnWinningPrice).AsQueryable();
        }

        public IQueryable<Malldub.Data.AuctionPaymentItem> GetByDateEntered(System.DateTime? dateEntered)
        {
            return _context.AuctionPaymentItem.ByDateEntered(dateEntered).AsQueryable();
        }

        public IQueryable<Malldub.Data.AuctionPaymentItem> GetByDateUpdated(System.DateTime? dateUpdated)
        {
            return _context.AuctionPaymentItem.ByDateUpdated(dateUpdated).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.AuctionPaymentItem value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.AuctionPaymentItem.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.AuctionPaymentItem>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { PaymentItemId = value.PaymentItemId, UserId = value.UserId }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.AuctionPaymentItem value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var auctionPaymentItem = _context.AuctionPaymentItem.GetByKey(value.PaymentItemId, value.UserId);
            if (auctionPaymentItem == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(auctionPaymentItem.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 paymentItemId, System.Int32 userId)
        {
            var auctionPaymentItem = _context.AuctionPaymentItem.GetByKey(paymentItemId, userId);
            if (auctionPaymentItem == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.AuctionPaymentItem.DeleteObject(auctionPaymentItem);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
