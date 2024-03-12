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
    public partial class PhoneTypeController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.PhoneType GetByKey(System.String identification)
        {
            var phoneType = _context.PhoneType.GetByKey(identification);
            if (phoneType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return phoneType;
        }

        public Malldub.Data.PhoneType GetByDetails(System.String details)
        {
            var phoneType = _context.PhoneType.GetByDetails(details);
            if (phoneType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return phoneType;
        }

        public IQueryable<Malldub.Data.PhoneType> GetAll()
        {
            return _context.PhoneType.AsQueryable();
        }

        public IQueryable<Malldub.Data.PhoneType> GetByDescription(System.String description)
        {
            return _context.PhoneType.ByDescription(description).AsQueryable();
        }

        public IQueryable<Malldub.Data.PhoneType> GetBySortOrderNumber(System.Byte sortOrderNumber)
        {
            return _context.PhoneType.BySortOrderNumber(sortOrderNumber).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.PhoneType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.PhoneType.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.PhoneType>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.PhoneType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var phoneType = _context.PhoneType.GetByKey(value.Identification);
            if (phoneType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(phoneType.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var phoneType = _context.PhoneType.GetByKey(identification);
            if (phoneType == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.PhoneType.DeleteObject(phoneType);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
