using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MailChimp.Tests
{
    [TestClass]
    public class APIKeyTests
    {
        [TestMethod]
        public void ValidAPIKey_ReturnsCorrectDataCenter()
        {
            //  Arrange
          string apiKey = "5b1cfefd0fa72b0effd9d0852eda71c1-us3";

            //  Act
            MailChimpManager mc = new MailChimpManager(apiKey);

            PrivateObject po = new PrivateObject(mc);
            string dataCenterPrefix = po.GetField("_dataCenterPrefix").ToString();

            //  Assert
            Assert.AreEqual<string>("us2", dataCenterPrefix);

        }
    }
}
