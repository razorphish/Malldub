namespace Marasco.Api
{
  public static class Config
  {
    #region Public Properties

    public static string PrerenderToken { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether [production mode].
    /// </summary>
    /// <value><c>true</c> if [production mode]; otherwise, <c>false</c>.</value>
    public static bool ProductionMode { get; set; }

    #endregion

    #region Public Methods and Operators

    /// <summary>
    /// Endpoints the specified prod.
    /// </summary>
    /// <param name="prod">
    /// if set to <c>true</c> [prod].
    /// </param>
    /// <returns>
    /// System.String.
    /// </returns>
    public static string Endpoint(bool prod)
    {
      return @"https://prerender.io/api/recache";
    }

    #endregion
  }
}