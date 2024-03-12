// ***********************************************************************
// Assembly         : Mandrill
// Author           : Antonio David Marasco
// Created          : 02-13-2014
//
// Last Modified By : Antonio David Marasco
// Last Modified On : 05-10-2014
// ***********************************************************************
// <copyright file="JSON.cs" company="Maras, co">
//     Copyright (c) Maras, co. All rights reserved.
// </copyright>
// <summary>The json.</summary>
// ***********************************************************************

namespace Mandrill
{
  #region Directives

  using System.Diagnostics;

  using Newtonsoft.Json;
  using Newtonsoft.Json.Converters;

  #endregion

  /// <summary>
  /// The json.
  /// </summary>
  public class JSON
  {
    #region Static Fields

    /// <summary>
    /// The settings.
    /// </summary>
    private static readonly JsonSerializerSettings settings = new JsonSerializerSettings
                                                              {
                                                                Converters = new[]
                                                                             {
                                                                               new IsoDateTimeConverter
                                                                                 ()
                                                                             }, 
                                                                DefaultValueHandling =
                                                                  DefaultValueHandling.Ignore, 
                                                                NullValueHandling =
                                                                  NullValueHandling.Ignore, 
                                                              };

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// The parse.
    /// </summary>
    /// <param name="json">The json.</param>
    /// <returns>dynamic.</returns>
    public static dynamic Parse(string json)
    {
      return JsonConvert.DeserializeObject<dynamic>(json, settings);
    }

    /// <summary>
    /// The parse.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="json">The json.</param>
    /// <returns>T.</returns>
    public static T Parse<T>(string json) where T : new()
    {
      if (json == null)
      {
        return new T();
      }

      try
      {
        return JsonConvert.DeserializeObject<T>(json, settings);
      }
      catch (JsonReaderException)
      {
        Trace.TraceWarning("Unable to parse JSON - {0}", json);
        return new T();
      }
    }

    /// <summary>
    /// The serialize.
    /// </summary>
    /// <param name="dyn">The dyn.</param>
    /// <returns>The <see cref="string" />.</returns>
    public static string Serialize(dynamic dyn)
    {
      return JsonConvert.SerializeObject(dyn, settings);
    }

    #endregion
  }
}