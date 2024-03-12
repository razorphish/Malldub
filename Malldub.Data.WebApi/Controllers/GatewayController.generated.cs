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
    public partial class GatewayController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.Gateway GetByKey(System.String identification)
        {
            var gateway = _context.Gateway.GetByKey(identification);
            if (gateway == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return gateway;
        }

        public IQueryable<Malldub.Data.Gateway> GetAll()
        {
            return _context.Gateway.AsQueryable();
        }

        public IQueryable<Malldub.Data.Gateway> GetByFriendlyName(System.String friendlyName)
        {
            return _context.Gateway.ByFriendlyName(friendlyName).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.Gateway value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.Gateway.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.Gateway>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.Gateway value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var gateway = _context.Gateway.GetByKey(value.Identification);
            if (gateway == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(gateway.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var gateway = _context.Gateway.GetByKey(identification);
            if (gateway == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.Gateway.DeleteObject(gateway);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}