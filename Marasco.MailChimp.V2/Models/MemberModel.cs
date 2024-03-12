// ***********************************************************************
// Assembly         : Marasco.MailChimp
// Author           : David Antonio Marasco
// Created          : 03-14-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 03-14-2017
// ***********************************************************************
// <copyright file="MemberModel.cs" company="Maras,co">
//     Copyright ©  2017
// </copyright>
// ***********************************************************************
namespace Marasco.MailChimpApi.Models
{
  #region Directives

  using System;

  #endregion

  /// <summary>
  /// Class MemberModel.
  /// </summary>
  public class MemberModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets the ASP net user identifier.
    /// </summary>
    /// <value>The ASP net user identifier.</value>
    public string AspNetUserId { get; set; }

    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    /// <value>The email.</value>
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the first name.
    /// </summary>
    /// <value>The first name.</value>
    public string FirstName { get; set; }

    /// <summary>
    /// Gets or sets the last name.
    /// </summary>
    /// <value>The last name.</value>
    public string LastName { get; set; }

    /// <summary>
    /// Gets or sets the latitude.
    /// </summary>
    /// <value>The latitude.</value>
    public decimal Latitude { get; set; }

    /// <summary>
    /// Gets or sets the longitude.
    /// </summary>
    /// <value>The longitude.</value>
    public decimal Longitude { get; set; }

    /// <summary>
    /// Gets or sets the user type identifier.
    /// </summary>
    /// <value>The user type identifier.</value>
    public string UserTypeId { get; set; }

    #endregion
  }
}