namespace Marasco.Domain
{
  /// <summary>
  /// Class ProviderModel.
  /// </summary>
  /// <remarks>Default Blank Remakrs Test</remarks>
  public class ProviderModel
  {
    #region Public Properties

    /// <summary>
    /// Gets or sets a value indicating whether this <see cref="ProviderModel"/> is found.
    /// </summary>
    /// <value><c>true</c> if found; otherwise, <c>false</c>.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public bool Found { get; set; }

    /// <summary>
    /// Gets or sets the provider.
    /// </summary>
    /// <value>The provider.</value>
    /// <remarks>Default Blank Remakrs Test</remarks>
    public string Provider { get; set; }

    public string ProviderKey { get; set; }

    #endregion
  }
}