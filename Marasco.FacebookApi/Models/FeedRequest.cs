namespace Marasco.FacebookApi.Models
{
  public class FeedRequest
  {
    #region Public Properties
    public string accessToken { get; set; }

    /// <summary>
    /// Link: Overwrites the caption under the title in the link preview
    /// </summary>
    /// <value>The caption.</value>
    public string caption { get; set; }

    /// <summary>
    /// Link : Overwrites the description in the link preview
    /// </summary>
    /// <value>The description.</value>
    public string description { get; set; }

    /// <summary>
    /// Gets or sets the link.
    /// </summary>
    /// <value>The link.</value>
    public string link { get; set; }

    public string message { get; set; }

    /// <summary>
    /// Overwrites the title of the link preview.
    /// </summary>
    /// <value>The name.</value>
    public string name { get; set; }

    /// <summary>
    /// Link [Required with Link]: Determines the preview image associated with the link.Gets or sets the picture.
    /// </summary>
    /// <value>The picture.</value>
    public string picture { get; set; }

    #endregion
  }
}