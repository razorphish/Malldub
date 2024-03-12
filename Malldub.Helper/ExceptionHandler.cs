// ***********************************************************************
// Assembly         : Malldub.Helper
// Author           : David Antonio Marasco
// Created          : 04-25-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 04-25-2017
// ***********************************************************************
// <copyright file="ExceptionHandler.cs" company="Maras,co">
//     Copyright ©  2013
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Malldub.Helper
{
  #region Directives

  using System;

  #endregion

  /// <summary>
  /// Class ExceptionHandler.
  /// </summary>
  public static class ExceptionHandler
  {
    #region Public Methods and Operators

    /// <summary>
    /// Gets the original exception.
    /// </summary>
    /// <param name="ex">The ex.</param>
    /// <returns>Exception.</returns>
    public static Exception GetOriginalException(this Exception ex)
    {
      while (true)
      {
        if (ex.InnerException == null)
        {
          return ex;
        }

        ex = ex.InnerException;
      }
    }

    #endregion
  }
}