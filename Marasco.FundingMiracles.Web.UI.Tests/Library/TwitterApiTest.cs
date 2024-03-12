namespace MiracleOfMiracles.Website.Tests.Library
{
  #region Directives

  using Marasco.TwitterApi;

  using Microsoft.VisualStudio.TestTools.UnitTesting;

  #endregion

  [TestClass]
  public class TwitterApiTest
  {
    #region Public Methods and Operators

    [TestMethod]
    public void Authentication()
    {
      var client = new TwitterClient();

      client.Authenticate();
    }


    [TestMethod]
    public void Authentication2()
    {
      var client = new TwitterClient();

      //client.AuthenticateTweetSharp();
    }
    #endregion
  }
}