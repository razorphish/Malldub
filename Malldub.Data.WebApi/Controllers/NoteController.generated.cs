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
    public partial class NoteController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.Note GetByKey(System.Int32 identification)
        {
            var note = _context.Note.GetByKey(identification);
            if (note == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return note;
        }

        public IQueryable<Malldub.Data.Note> GetAll()
        {
            return _context.Note.AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetBySubject(System.String subject)
        {
            return _context.Note.BySubject(subject).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByComments(System.String comments)
        {
            return _context.Note.ByComments(comments).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetBySent(System.Boolean sent)
        {
            return _context.Note.BySent(sent).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByIsPrivate(System.Boolean isPrivate)
        {
            return _context.Note.ByIsPrivate(isPrivate).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByTypeId(System.String typeId)
        {
            return _context.Note.ByTypeId(typeId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByDateEntered(System.DateTime? dateEntered)
        {
            return _context.Note.ByDateEntered(dateEntered).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByApplicationId(System.String applicationId)
        {
            return _context.Note.ByApplicationId(applicationId).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByViewed(System.Boolean viewed)
        {
            return _context.Note.ByViewed(viewed).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByEmail(System.String email)
        {
            return _context.Note.ByEmail(email).AsQueryable();
        }

        public IQueryable<Malldub.Data.Note> GetByFirstName(System.String firstName)
        {
            return _context.Note.ByFirstName(firstName).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.Note value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.Note.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.Note>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.Note value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var note = _context.Note.GetByKey(value.Identification);
            if (note == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(note.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var note = _context.Note.GetByKey(identification);
            if (note == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.Note.DeleteObject(note);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
