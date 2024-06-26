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
    public partial class StateController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.State GetByKey(System.String identification)
        {
            var state = _context.State.GetByKey(identification);
            if (state == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return state;
        }

        public Malldub.Data.State GetByName(System.String name)
        {
            var state = _context.State.GetByName(name);
            if (state == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return state;
        }

        public IQueryable<Malldub.Data.State> GetAll()
        {
            return _context.State.AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.State value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.State.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.State>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.State value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var state = _context.State.GetByKey(value.Identification);
            if (state == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(state.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var state = _context.State.GetByKey(identification);
            if (state == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.State.DeleteObject(state);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
