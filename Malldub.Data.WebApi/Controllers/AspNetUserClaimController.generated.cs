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
    public partial class AspNetUserClaimController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.AspNetUserClaim GetByKey(System.Int32 identification)
        {
            var aspNetUserClaim = _context.AspNetUserClaim.GetByKey(identification);
            if (aspNetUserClaim == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return aspNetUserClaim;
        }

        public IQueryable<Malldub.Data.AspNetUserClaim> GetAll()
        {
            return _context.AspNetUserClaim.AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUserClaim> GetByClaimType(System.String claimType)
        {
            return _context.AspNetUserClaim.ByClaimType(claimType).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUserClaim> GetByClaimValue(System.String claimValue)
        {
            return _context.AspNetUserClaim.ByClaimValue(claimValue).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUserClaim> GetByUserId(System.String userId)
        {
            return _context.AspNetUserClaim.ByUserId(userId).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.AspNetUserClaim value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.AspNetUserClaim.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.AspNetUserClaim>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.AspNetUserClaim value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var aspNetUserClaim = _context.AspNetUserClaim.GetByKey(value.Identification);
            if (aspNetUserClaim == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(aspNetUserClaim.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var aspNetUserClaim = _context.AspNetUserClaim.GetByKey(identification);
            if (aspNetUserClaim == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.AspNetUserClaim.DeleteObject(aspNetUserClaim);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}