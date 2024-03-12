// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Subaccounts.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
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
  /// Class MandrillApi.
  /// </summary>
  public partial class MandrillApi
  {
    #region Public Methods and Operators

    /// <summary>
    /// Add a new subaccount.
    /// </summary>
    /// <param name="subaccount">The subaccount to add</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information saved about the new subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=add</remarks>
    public SubaccountInfo AddSubaccount(SubaccountInfo subaccount, string notes = "")
    {
      try
      {
        return AddSubaccountAsync(subaccount, notes).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Asynchronously add a new subaccount.
    /// </summary>
    /// <param name="subaccount">The subaccount to add</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information saved about the new subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=add</remarks>
    public Task<SubaccountInfo> AddSubaccountAsync(SubaccountInfo subaccount, string notes)
    {
      const string PATH = "/subaccounts/add.json";

      dynamic payload = new ExpandoObject();
      payload.id = subaccount.Id;
      payload.name = subaccount.Name;
      payload.notes = notes;
      payload.custom_quota = subaccount.CustomQuota;

      return PostAsync<SubaccountInfo>(PATH, payload);
    }

    /// <summary>
    /// Delete an existing subaccount. Any email related to the subaccount will be saved, but stats will be removed and any
    /// future sending calls to this subaccount will fail.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to delete</param>
    /// <returns>the information for the deleted subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=delete</remarks>
    public SubaccountInfo DeleteSubaccount(string id)
    {
      try
      {
        return DeleteSubaccountAsync(id).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Asynchronously delete an existing subaccount. Any email related to the subaccount will be saved, but stats will be
    /// removed and any future sending calls to this subaccount will fail.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to delete</param>
    /// <returns>the information for the deleted subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=delete</remarks>
    public Task<SubaccountInfo> DeleteSubaccountAsync(string id)
    {
      const string PATH = "/subaccounts/delete.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;

      return PostAsync<SubaccountInfo>(PATH, payload);
    }

    /// <summary>
    /// Get the list of subaccounts defined for the account, optionally filtered by a prefix.
    /// </summary>
    /// <param name="q">An optional prefix to filter the subaccounts' ids and names</param>
    /// <returns>the subaccounts for the account, up to a maximum of 1,000</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=list</remarks>
    public List<SubaccountInfo> ListSubaccounts(string q = "")
    {
      try
      {
        return ListSubaccountsAsync(q).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Asynchronously get the list of subaccounts defined for the account, optionally filtered by a prefix.
    /// </summary>
    /// <param name="q">An optional prefix to filter the subaccounts' ids and names.</param>
    /// <returns>the subaccounts for the account, up to a maximum of 1,000</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=list</remarks>
    public Task<List<SubaccountInfo>> ListSubaccountsAsync(string q = "")
    {
      const string PATH = "/subaccounts/list.json";

      dynamic payload = new ExpandoObject();
      payload.q = q;

      return PostAsync<List<SubaccountInfo>>(PATH, payload);
    }

    /// <summary>
    /// Pause a subaccount's sending. Any future emails delivered to this subaccount will be queued for a maximum of 3 days
    /// until the subaccount is resumed.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to pause</param>
    /// <returns>the information for the paused subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=pause</remarks>
    public SubaccountInfo PauseSubaccount(string id)
    {
      try
      {
        return PauseSubaccountAsync(id).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Asynchronously pause a subaccount's sending. Any future emails delivered to this subaccount will be queued for a
    /// maximum of 3 days until the subaccount is resumed.
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to pause</param>
    /// <returns>the information for the paused subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=pause</remarks>
    public Task<SubaccountInfo> PauseSubaccountAsync(string id)
    {
      const string PATH = "/subaccounts/pause.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;

      return PostAsync<SubaccountInfo>(PATH, payload);
    }

    /// <summary>
    /// Resume a paused subaccount's sending
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to resume</param>
    /// <returns>the information for the resumed subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=resume</remarks>
    public SubaccountInfo ResumeSubaccount(string id)
    {
      try
      {
        return ResumeSubaccountAsync(id).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Asynchronously resume a paused subaccount's sending
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to resume</param>
    /// <returns>the information for the resumed subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=resume</remarks>
    public Task<SubaccountInfo> ResumeSubaccountAsync(string id)
    {
      const string PATH = "/subaccounts/resume.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;

      return PostAsync<SubaccountInfo>(PATH, payload);
    }

    /// <summary>
    /// Given the ID of an existing subaccount, return the data about it
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to query</param>
    /// <returns>the information about the subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=info</remarks>
    public SubaccountInfo SubaccountInfo(string id)
    {
      try
      {
        return SubaccountInfoAsync(id).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Given the ID of an existing subaccount, asynchronously return the data about it
    /// </summary>
    /// <param name="id">The unique identifier of the subaccount to query</param>
    /// <returns>the information about the subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=info</remarks>
    public Task<SubaccountInfo> SubaccountInfoAsync(string id)
    {
      const string PATH = "/subaccounts/info.json";

      dynamic payload = new ExpandoObject();
      payload.id = id;

      return PostAsync<SubaccountInfo>(PATH, payload);
    }

    /// <summary>
    /// Update an existing subaccount
    /// </summary>
    /// <param name="subaccount">The subaccount to update</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information for the updated subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=update</remarks>
    public SubaccountInfo UpdateSubaccount(SubaccountInfo subaccount, string notes = "")
    {
      try
      {
        return UpdateSubaccountAsync(subaccount, notes).Result;
      }
      catch (AggregateException aex)
      {
        // catch and throw the inner exception
        throw aex.Flatten().InnerException;
      }
    }

    /// <summary>
    /// Asynchronously update an existing subaccount
    /// </summary>
    /// <param name="subaccount">The subaccount to update</param>
    /// <param name="notes">Optional extra text to associate with the subaccount</param>
    /// <returns>the information for the updated subaccount</returns>
    /// <remarks>https://mandrillapp.com/api/docs/subaccounts.JSON.html#method=update</remarks>
    public Task<SubaccountInfo> UpdateSubaccountAsync(SubaccountInfo subaccount, string notes = "")
    {
      const string PATH = "/subaccounts/update.json";

      dynamic payload = new ExpandoObject();
      payload.id = subaccount.Id;
      payload.name = subaccount.Name;
      payload.notes = notes;
      payload.custom_quota = subaccount.CustomQuota;

      return PostAsync<SubaccountInfo>(PATH, payload);
    }

    #endregion
  }
}