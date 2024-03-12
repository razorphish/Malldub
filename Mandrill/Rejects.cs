// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Rejects.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The mandrill api.</summary>
// ***********************************************************************

namespace Mandrill
{
  #region Directives

  using System;
  using System.Collections.Generic;
  using System.Dynamic;
  using System.Threading.Tasks;

  #endregion

  /// <summary>
  /// The mandrill api.
  /// </summary>
  public partial class MandrillApi
  {
    #region Public Methods and Operators

    /// <summary>
    /// The delete reject.
    /// </summary>
    /// <param name="email">The email.</param>
    /// <returns>The <see cref="RejectDeleteResult" />.</returns>
    /// <exception cref="Exception"></exception>
    public RejectDeleteResult DeleteReject(string email)
    {
      try
      {
        return DeleteRejectAsync(email).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// The delete reject async.
    /// </summary>
    /// <param name="email">The email.</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<RejectDeleteResult> DeleteRejectAsync(string email)
    {
      const string PATH = "/rejects/delete.json";

      dynamic param = new ExpandoObject();
      param.email = email;
      return PostAsync<RejectDeleteResult>(PATH, param);
    }

    /// <summary>
    /// Lists the rejects.
    /// </summary>
    /// <param name="email">email address to limit the results</param>
    /// <returns>List of reject info objects</returns>
    public List<RejectInfo> ListRejects(string email = "")
    {
      try
      {
        return ListRejectsAsync(email).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Lists the rejects asynchronous.
    /// </summary>
    /// <param name="email">email address to limit the results</param>
    /// <returns>The <see cref="Task" />.</returns>
    public Task<List<RejectInfo>> ListRejectsAsync(string email = "")
    {
      const string PATH = "/rejects/list.json";

      dynamic param = new ExpandoObject();
      param.email = email;
      return PostAsync<List<RejectInfo>>(PATH, param);
    }

    #endregion
  }
}