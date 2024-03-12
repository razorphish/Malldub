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
    public partial class FundShareTypeController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.FundShareType GetByKey(System.String identification)
        {
            var fundShareType = _context.FundShareType.GetByKey(identification);
            if (fundShareType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return fundShareType;
        }

        public Malldub.Data.FundShareType GetByFriendlyName(System.String friendlyName)
        {
            var fundShareType = _context.FundShareType.GetByFriendlyName(friendlyName);
            if (fundShareType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return fundShareType;
        }

        public IQueryable<Malldub.Data.FundShareType> GetAll()
        {
            return _context.FundShareType.AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.FundShareType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.FundShareType.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.FundShareType>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.FundShareType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var fundShareType = _context.FundShareType.GetByKey(value.Identification);
            if (fundShareType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(fundShareType.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var fundShareType = _context.FundShareType.GetByKey(identification);
            if (fundShareType == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.FundShareType.DeleteObject(fundShareType);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
