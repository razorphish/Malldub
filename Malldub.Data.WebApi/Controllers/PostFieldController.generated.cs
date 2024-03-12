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
    public partial class PostFieldController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.PostField GetByKey(System.Int32 identification)
        {
            var postField = _context.PostField.GetByKey(identification);
            if (postField == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return postField;
        }

        public IQueryable<Malldub.Data.PostField> GetAll()
        {
            return _context.PostField.AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetBySectionId(System.Int32 sectionId)
        {
            return _context.PostField.BySectionId(sectionId).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByListPortalCategoryId(System.Int32 listPortalCategoryId)
        {
            return _context.PostField.ByListPortalCategoryId(listPortalCategoryId).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByName(System.String name)
        {
            return _context.PostField.ByName(name).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByDefaultValue(System.String defaultValue)
        {
            return _context.PostField.ByDefaultValue(defaultValue).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByIsRequired(System.Boolean? isRequired)
        {
            return _context.PostField.ByIsRequired(isRequired).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByOption1(System.String option1)
        {
            return _context.PostField.ByOption1(option1).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByOption2(System.String option2)
        {
            return _context.PostField.ByOption2(option2).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByOption3(System.String option3)
        {
            return _context.PostField.ByOption3(option3).AsQueryable();
        }

        public IQueryable<Malldub.Data.PostField> GetByOption4(System.String option4)
        {
            return _context.PostField.ByOption4(option4).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.PostField value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.PostField.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.PostField>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.PostField value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var postField = _context.PostField.GetByKey(value.Identification);
            if (postField == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(postField.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 identification)
        {
            var postField = _context.PostField.GetByKey(identification);
            if (postField == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.PostField.DeleteObject(postField);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}