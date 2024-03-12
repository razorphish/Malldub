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
    public partial class UserStatusController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.UserStatus GetByKey(System.String identification)
        {
            var userStatus = _context.UserStatus.GetByKey(identification);
            if (userStatus == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return userStatus;
        }

        public Malldub.Data.UserStatus GetByDetails(System.String details)
        {
            var userStatus = _context.UserStatus.GetByDetails(details);
            if (userStatus == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return userStatus;
        }

        public IQueryable<Malldub.Data.UserStatus> GetAll()
        {
            return _context.UserStatus.AsQueryable();
        }

        public IQueryable<Malldub.Data.UserStatus> GetByDescription(System.String description)
        {
            return _context.UserStatus.ByDescription(description).AsQueryable();
        }

        public IQueryable<Malldub.Data.UserStatus> GetBySortOrderNumber(System.Byte sortOrderNumber)
        {
            return _context.UserStatus.BySortOrderNumber(sortOrderNumber).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.UserStatus value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.UserStatus.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.UserStatus>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { Identification = value.Identification }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.UserStatus value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var userStatus = _context.UserStatus.GetByKey(value.Identification);
            if (userStatus == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(userStatus.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.String identification)
        {
            var userStatus = _context.UserStatus.GetByKey(identification);
            if (userStatus == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.UserStatus.DeleteObject(userStatus);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}