// ***********************************************************************
// Assembly         : Malldub.WebApi
// Author           : Antonio David Marasco
// Created          : 11-04-2013
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 11-04-2013
// ***********************************************************************
// <copyright file="AccountController.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// ***********************************************************************

namespace Malldub.Data.Controllers.API
{
  using System.Web.Http;

  [Authorize(Roles = "Administrator")]
  public partial class AccountController
  {

  }
}