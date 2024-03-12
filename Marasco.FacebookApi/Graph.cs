// ***********************************************************************
// Assembly         : Marasco.FacebookApi
// Author           : Antonio David Marasco
// Created          : 04-23-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 04-23-2014
// ***********************************************************************
// <copyright file="Graph.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Marasco.FacebookApi
{
  #region Directives

  using Facebook;

  using Marasco.FacebookApi.Models;

  #endregion

  /// <summary>
  /// Class Graph.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class Graph
  {
    #region Public Methods and Operators

    /// <summary>
    /// Posts the feed.
    /// </summary>
    /// <param name="feedRequest">The feed request.</param>
    /// <returns>dynamic.</returns>
    /// <remarks>Default Blank Remakrs Test</remarks>
    /// <code>
    /// var feed = new FeedRequest
    /// {
    ///  link = "http://www.fundingmiracles.com/terago", 
    ///  picture = "http://www.fundingmiracles.com/azure/img/4028975613.jpg?height=150&width=230&mode=crop", 
    ///  name = feedRequest.name, 
    ///  caption = feedRequest.caption, 
    ///  description = feedRequest.description, 
    ///  message = feedRequest.message
    /// };
    /// </code>
    public dynamic PostFeed(FeedRequest feedRequest)
    {
      try
      {
        var client = new FacebookClient(feedRequest.accessToken);

        return client.Post("me/feed", feedRequest);
      }
      catch (FacebookOAuthException fbe)
      {
        var message = fbe.Message;
        var t = message;

        // Our access token is invalid or expired
        // Here we need to do something to handle this.
        throw;
      }
    }

    #endregion
  }
}