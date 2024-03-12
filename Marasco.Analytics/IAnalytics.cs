namespace Marasco.Analytics
{
  public interface IAnalytics
  {
    #region Public Properties

    string ProjectId { get; set; }

    string ReadKey { get; set; }

    string WriteKey { get; set; }

    #endregion
  }
}