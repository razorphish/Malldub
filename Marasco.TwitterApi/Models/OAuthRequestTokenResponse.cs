// ***********************************************************************
// Assembly         : Marasco.TwitterApi
// Author           : Antonio David Marasco
// Created          : 06-01-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 06-01-2014
// ***********************************************************************
// <copyright file="OAuthRequestTokenResponse.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>Class used for response token.  Needed to reduce references 
//  in referencing projects</summary>
// ***********************************************************************
namespace Marasco.TwitterApi.Models
{
  #region Directives

  using TweetSharp;

  #endregion

  /// <summary>
  /// Class OAuthRequestTokenResponse.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class OAuthRequestTokenResponse
  {
    #region Constructors and Destructors

    public OAuthRequestTokenResponse() { }

    /// <summary>
    /// Initializes a new instance of the <see cref="OAuthRequestTokenResponse"/> class.
    /// </summary>
    /// <param name="token">The token.</param>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public OAuthRequestTokenResponse(OAuthRequestToken token)
    {
      OAuthCallbackConfirmed = token.OAuthCallbackConfirmed;
      Token                  = token.Token;
      TokenSecret            = token.TokenSecret;
    }

    #endregion

    #region Public Properties

    /// <summary>
    /// Gets or sets a value indicating whether [o authentication callback confirmed].
    /// </summary>
    /// <value><c>true</c> if [o authentication callback confirmed]; otherwise, <c>false</c>.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public bool OAuthCallbackConfirmed { get; set; }

    /// <summary>
    /// Gets or sets the secret.
    /// </summary>
    /// <value>The secret.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public string TokenSecret { get; set; }

    /// <summary>
    /// Gets or sets the token.
    /// </summary>
    /// <value>The token.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public string Token { get; set; }

    #endregion
  }
}