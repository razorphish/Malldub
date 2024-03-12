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
    public partial class ListPortalPostAttributeController : ApiController
    {
        private Malldub.Data.MalldubDataContext _context = new Malldub.Data.MalldubDataContext();

        #region Get

        public Malldub.Data.ListPortalPostAttribute GetByKey(System.Int32 postFieldId, System.Int32 listPortalPostId)
        {
            var listPortalPostAttribute = _context.ListPortalPostAttribute.GetByKey(postFieldId, listPortalPostId);
            if (listPortalPostAttribute == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return listPortalPostAttribute;
        }

        public IQueryable<Malldub.Data.ListPortalPostAttribute> GetAll()
        {
            return _context.ListPortalPostAttribute.AsQueryable();
        }

        public IQueryable<Malldub.Data.ListPortalPostAttribute> GetByFieldContent(System.String fieldContent)
        {
            return _context.ListPortalPostAttribute.ByFieldContent(fieldContent).AsQueryable();
        }

        #endregion

        public HttpResponseMessage Post(Malldub.Data.ListPortalPostAttribute value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            _context.ListPortalPostAttribute.AddObject(value);
            _context.SaveChanges();

            var response = Request.CreateResponse<Malldub.Data.ListPortalPostAttribute>(HttpStatusCode.Created, value);
            response.Headers.Location = new Uri( Url.Link("DefaultApi", new { PostFieldId = value.PostFieldId, ListPortalPostId = value.ListPortalPostId }));

            return response;
        }

        public HttpResponseMessage Put(Malldub.Data.ListPortalPostAttribute value)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

            var listPortalPostAttribute = _context.ListPortalPostAttribute.GetByKey(value.PostFieldId, value.ListPortalPostId);
            if (listPortalPostAttribute == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            _context.ApplyCurrentValues(listPortalPostAttribute.EntityKey.EntitySetName, value);
            _context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(System.Int32 postFieldId, System.Int32 listPortalPostId)
        {
            var listPortalPostAttribute = _context.ListPortalPostAttribute.GetByKey(postFieldId, listPortalPostId);
            if (listPortalPostAttribute == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            _context.ListPortalPostAttribute.DeleteObject(listPortalPostAttribute);
            _context.SaveChanges();
            
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}