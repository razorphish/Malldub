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
    public partial class AspNetUserController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.AspNetUser GetByKey(System.String identification)
        {
            var aspNetUser = _context.AspNetUser.GetByKey(identification);
            if (aspNetUser == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return aspNetUser;
        }

        public IQueryable<Malldub.Data.AspNetUser> GetAll()
        {
            return _context.AspNetUser.AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByUserName(System.String userName)
        {
            return _context.AspNetUser.ByUserName(userName).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByPasswordHash(System.String passwordHash)
        {
            return _context.AspNetUser.ByPasswordHash(passwordHash).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetBySecurityStamp(System.String securityStamp)
        {
            return _context.AspNetUser.BySecurityStamp(securityStamp).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByDiscriminator(System.String discriminator)
        {
            return _context.AspNetUser.ByDiscriminator(discriminator).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByFirstName(System.String firstName)
        {
            return _context.AspNetUser.ByFirstName(firstName).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByLastName(System.String lastName)
        {
            return _context.AspNetUser.ByLastName(lastName).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByEmail(System.String email)
        {
            return _context.AspNetUser.ByEmail(email).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByStatusId(System.String statusId)
        {
            return _context.AspNetUser.ByStatusId(statusId).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByAvatarUploadId(System.Int32? avatarUploadId)
        {
            return _context.AspNetUser.ByAvatarUploadId(avatarUploadId).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByAvatarUploadTempLocation(System.String avatarUploadTempLocation)
        {
            return _context.AspNetUser.ByAvatarUploadTempLocation(avatarUploadTempLocation).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByAccountId(System.String accountId)
        {
            return _context.AspNetUser.ByAccountId(accountId).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByDateEntered(System.DateTime dateEntered)
        {
            return _context.AspNetUser.ByDateEntered(dateEntered).AsQueryable();
        }

        public IQueryable<Malldub.Data.AspNetUser> GetByDateUpdated(System.DateTime dateUpdated)
        {
            return _context.AspNetUser.ByDateUpdated(dateUpdated).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.AspNetUser value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.AspNetUser.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.AspNetUser>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.AspNetUser value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var aspNetUser = _context.AspNetUser.GetByKey(value.Identification);
            if (aspNetUser == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(aspNetUser.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
