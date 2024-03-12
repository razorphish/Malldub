namespace Malldub.Helper
{
  #region Directives

  using System;
  using System.Globalization;
  using System.Text.RegularExpressions;

  #endregion

  public class EmailValidator
  {
    #region Static Fields

    private static bool _invalid;

    #endregion

    #region Public Methods and Operators

    public static bool IsValidEmail(string email)
    {
      _invalid = false;
      if (string.IsNullOrEmpty(email))
      {
        return false;
      }

      // Use IdnMapping class to convert Unicode domain names. 
      try
      {
        email = Regex.Replace(email, @"(@)(.+)$", DomainMapper, RegexOptions.None, TimeSpan.FromMilliseconds(200));
      }
      catch (RegexMatchTimeoutException)
      {
        return false;
      }

      if (_invalid)
      {
        return false;
      }

      // Return true if email is in valid e-mail format. 
      try
      {
        return Regex.IsMatch(
          email, 
          @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))"
          + @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$", 
          RegexOptions.IgnoreCase, 
          TimeSpan.FromMilliseconds(250));
      }
      catch (RegexMatchTimeoutException)
      {
        return false;
      }
    }

    #endregion

    #region Methods

    private static string DomainMapper(Match match)
    {
      // IdnMapping class with default property values.
      var idn = new IdnMapping();

      var domainName = match.Groups[2].Value;
      try
      {
        domainName = idn.GetAscii(domainName);
      }
      catch (ArgumentException)
      {
        _invalid = true;
      }

      return match.Groups[1].Value + domainName;
    }

    #endregion
  }
}