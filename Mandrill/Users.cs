// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 03-06-2014
// ***********************************************************************
// <copyright file="Users.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The mandrill api.</summary>
// ***********************************************************************
namespace Mandrill
{
    using System;
    using System.Threading.Tasks;

  /// <summary>
  /// The mandrill api.
  /// </summary>
    public partial class MandrillApi
    {
        #region Public Methods and Operators

      /// <summary>
      /// Validate an API key and respond to a ping
      /// </summary>
      /// <returns>The <see cref="string" />.</returns>
        public string Ping()
        {
            try
            {
                return PingAsync().Result;
            }
            catch (AggregateException aex)
            {
                // catch and throw the inner exception
                throw aex.Flatten().InnerException;
            }
        }

        /// <summary>
        /// Validate an API key and respond to a ping
        /// </summary>
        /// <returns>The <see cref="Task" />.</returns>
        public Task<string> PingAsync()
        {
          const string PATH = "/users/ping.json";
          return PostAsync(PATH, null).ContinueWith(p => p.Result.Content);
        }

    /// <summary>
        /// The user info.
        /// </summary>
        /// <returns>The <see cref="UserInfo" />.</returns>
        /// <exception cref="Exception"></exception>
        public UserInfo UserInfo()
        {
            try
            {
                return UserInfoAsync().Result;
            }
            catch (AggregateException aex)
            {
                // catch and throw the inner exception
                throw aex.Flatten().InnerException;
            }
        }

        /// <summary>
        /// Return the information about the API-connected user
        /// </summary>
        /// <returns>The <see cref="Task" />.</returns>
        /// <remarks>https://mandrillapp.com/api/docs/users.html#method=info</remarks>
        public Task<UserInfo> UserInfoAsync()
        {
          const string PATH = "/users/info.json";
          return PostAsync<UserInfo>(PATH, null);
        }

    #endregion
    }
}