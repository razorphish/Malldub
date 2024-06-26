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
    public partial class AddressController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.Address GetByKey(System.Int32 identification)
        {
            var address = _context.Address.GetByKey(identification);
            if (address == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return address;
        }

        public IQueryable<Malldub.Data.Address> GetAll()
        {
            return _context.Address.AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByAddress1(System.String address1)
        {
            return _context.Address.ByAddress1(address1).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByAddress2(System.String address2)
        {
            return _context.Address.ByAddress2(address2).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByCity(System.String city)
        {
            return _context.Address.ByCity(city).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByState(System.String state)
        {
            return _context.Address.ByState(state).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByZipCode(System.String zipCode)
        {
            return _context.Address.ByZipCode(zipCode).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByLongitude(System.Decimal? longitude)
        {
            return _context.Address.ByLongitude(longitude).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByLatitude(System.Decimal? latitude)
        {
            return _context.Address.ByLatitude(latitude).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByCounty(System.String county)
        {
            return _context.Address.ByCounty(county).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByCountry(System.String country)
        {
            return _context.Address.ByCountry(country).AsQueryable();
        }

        public IQueryable<Malldub.Data.Address> GetByDateEntered(System.DateTime? dateEntered)
        {
            return _context.Address.ByDateEntered(dateEntered).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.Address value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.Address.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.Address>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.Address value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var address = _context.Address.GetByKey(value.Identification);
            if (address == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(address.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var address = _context.Address.GetByKey(identification);
            if (address == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.Address.DeleteObject(address);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
