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
    public partial class AuctionController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.Auction GetByKey(System.Int32 identification)
        {
            var auction = _context.Auction.GetByKey(identification);
            if (auction == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return auction;
        }

        public IQueryable<Malldub.Data.Auction> GetAll()
        {
            return _context.Auction.AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByStartingPrice(System.Decimal startingPrice)
        {
            return _context.Auction.ByStartingPrice(startingPrice).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByDuration(System.Byte duration)
        {
            return _context.Auction.ByDuration(duration).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByBuyItNowPrice(System.Decimal? buyItNowPrice)
        {
            return _context.Auction.ByBuyItNowPrice(buyItNowPrice).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByReserveAmount(System.Decimal? reserveAmount)
        {
            return _context.Auction.ByReserveAmount(reserveAmount).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByCurrentHighBid(System.Decimal? currentHighBid)
        {
            return _context.Auction.ByCurrentHighBid(currentHighBid).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByBeginTime(System.DateTime? beginTime)
        {
            return _context.Auction.ByBeginTime(beginTime).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByEndTime(System.DateTime? endTime)
        {
            return _context.Auction.ByEndTime(endTime).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByHasEnded(System.Boolean hasEnded)
        {
            return _context.Auction.ByHasEnded(hasEnded).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByIncrement(System.Int32 increment)
        {
            return _context.Auction.ByIncrement(increment).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByStatusId(System.Int32 statusId)
        {
            return _context.Auction.ByStatusId(statusId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByWinningBidderUserId(System.Int32? winningBidderUserId)
        {
            return _context.Auction.ByWinningBidderUserId(winningBidderUserId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Auction> GetByTypeId(System.Int32? typeId)
        {
            return _context.Auction.ByTypeId(typeId).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.Auction value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.Auction.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.Auction>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.Auction value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var auction = _context.Auction.GetByKey(value.Identification);
            if (auction == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(auction.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var auction = _context.Auction.GetByKey(identification);
            if (auction == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.Auction.DeleteObject(auction);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
