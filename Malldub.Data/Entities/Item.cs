namespace Malldub.Data
{
  #region Directives

  using System;

  using Malldub.Helper;

  #endregion

  partial class Item
  {
    #region Constructors and Destructors

      public Item()
      {
          DateEntered = DateTime.UtcNow;
          DateUpdated = DateTime.UtcNow;
          StartDate = DateTime.UtcNow;
          EndDate = DateTime.UtcNow.AddDays(30);
          Description = string.Empty;
          StatusId = "Active";
          var rs = new RandomStringGenerator(
              useSpecialCharacters: false,
              useNumericCharacters: false,
              useUpperCaseCharacters: false) { RepeatCharacters = false };

          Permalink = rs.Generate(6);
      }

      #endregion
  }
}