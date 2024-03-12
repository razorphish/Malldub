namespace Marasco.Azure.Storage.Models
{
  #region Directives

  using System;

  #endregion

  /// <summary>
  /// Class FileDetails.
  /// </summary>
  public class FileDetails
  {
    #region Public Properties

    public string CategoryId { get; set; }

    public string ContainerName { get; set; }

    /// <summary>
    /// Gets or sets the length of the content.
    /// </summary>
    /// <value>The length of the content.</value>
    /// <remarks>Content Length = Size</remarks>
    public long ContentLength { get; set; } 

    public string ContentType { get; set; }

    public DateTime DateEntered { get; set; }

    public DateTime DateUpdated { get; set; }

    public string Description { get; set; }

    public string Extension { get; set; }

    public int Identification { get; set; }

    public bool IsPrivate { get; set; }

    public string Location { get; set; }

    public string LocationHttp { get; set; }

    public string Name { get; set; }

    public string OriginalFileName { get; set; }

    public string RelativeLocation { get; set; }

    public long Size { get; set; }

    public string TypeId { get; set; }

    #endregion
  }
}