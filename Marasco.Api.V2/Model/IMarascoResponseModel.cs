namespace Marasco.Api.Model
{
  #region Directives

  using Newtonsoft.Json;

  #endregion

  internal interface IMarascoResponseModel
  {
    #region Public Properties

    [JsonIgnore]
    MarascoApiException Error { get; set; }

    #endregion
  }
}