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
    public partial class NoteTypeController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.NoteType GetByKey(System.String identification)
        {
            var noteType = _context.NoteType.GetByKey(identification);
            if (noteType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return noteType;
        }

        public Malldub.Data.NoteType GetByDetails(System.String details)
        {
            var noteType = _context.NoteType.GetByDetails(details);
            if (noteType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return noteType;
        }

        public IQueryable<Malldub.Data.NoteType> GetAll()
        {
            return _context.NoteType.AsQueryable();
        }

        public IQueryable<Malldub.Data.NoteType> GetByDescription(System.String description)
        {
            return _context.NoteType.ByDescription(description).AsQueryable();
        }

        public IQueryable<Malldub.Data.NoteType> GetBySortOrderNumber(System.Byte sortOrderNumber)
        {
            return _context.NoteType.BySortOrderNumber(sortOrderNumber).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.NoteType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.NoteType.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.NoteType>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.NoteType value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var noteType = _context.NoteType.GetByKey(value.Identification);
            if (noteType == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(noteType.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var noteType = _context.NoteType.GetByKey(identification);
            if (noteType == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.NoteType.DeleteObject(noteType);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
