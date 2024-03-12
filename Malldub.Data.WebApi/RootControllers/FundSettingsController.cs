// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio Marasco
// Created          : 08-27-2014
//
// Last Modified By : Antonio Marasco
// Last Modified On : 08-27-2014
// ***********************************************************************
// <copyright file="FundSettingsController.cs" company="Maras,co">
//     Copyright (c) Maras,co. All rights reserved.
// </copyright>
// <summary>Fund settings Controller</summary>
// ***********************************************************************
namespace Malldub.WebApi.RootControllers
{
  #region Directives

  using System.Net;
  using System.Net.Http;
  using System.Web.Http;

  using Data;

  #endregion

  /// <summary>
  /// Class FundSettingsController.
  /// </summary>
  [RoutePrefix("api/fundsettings")]
  [Authorize]
  public class FundSettingsController : ApiController
  {
    #region Fields

    /// <summary>
    /// The _context
    /// </summary>
    private readonly MalldubDataContext _context = new MalldubDataContext();

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Posts the specified value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns>HttpResponseMessage.</returns>
    /// <exception cref="System.Web.Http.HttpResponseException">
    /// </exception>
    /// <exception cref="HttpResponseMessage">
    /// </exception>
    [HttpPut]
    [Route("update")]
    public HttpResponseMessage Put(FundSetting value)
    {
      if (!ModelState.IsValid)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
      }

      var fundSetting = _context.FundSetting.GetByKey(value.FundId);
      if (fundSetting == null)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
      }

      _context.ApplyCurrentValues(fundSetting.EntityKey.EntitySetName, value);
      _context.SaveChanges();

      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    #endregion
  }
}