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
    public partial class UserEmailController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.UserEmail GetByKey(System.String userId, System.Int32 emailId)
        {
            var userEmail = _context.UserEmail.GetByKey(userId, emailId);
            if (userEmail == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return userEmail;
        }

        public IQueryable<Malldub.Data.UserEmail> GetAll()
        {
            return _context.UserEmail.AsQueryable();
        }

        public IQueryable<Malldub.Data.UserEmail> GetByIsDefault(System.Boolean isDefault)
        {
            return _context.UserEmail.ByIsDefault(isDefault).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.UserEmail value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.UserEmail.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.UserEmail>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { UserId = value.UserId, EmailId = value.EmailId }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.UserEmail value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var userEmail = _context.UserEmail.GetByKey(value.UserId, value.EmailId);
            if (userEmail == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(userEmail.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String userId, System.Int32 emailId)
        {
            var userEmail = _context.UserEmail.GetByKey(userId, emailId);
            if (userEmail == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.UserEmail.DeleteObject(userEmail);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
