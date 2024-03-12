namespace Malldub.Helper
{
  #region Directives

  using System;

  #endregion

  public static class DateUtilties
  {
    #region Static Fields

    public static readonly DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

    #endregion

    #region Public Methods and Operators

    public static DateTime GetPstDateNow()
    {
      var zone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
      var utcNow = DateTime.UtcNow;
      var pacificNow = TimeZoneInfo.ConvertTimeFromUtc(utcNow, zone);

      return pacificNow;
    }

    public static DateTime JavaTimeStampToDateTime(double javaTimeStamp)
    {
      // Java timestamp is millisecods past epoch
      var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
      dateTime = dateTime.AddSeconds(Math.Round(javaTimeStamp / 1000)).ToLocalTime();
      return dateTime;
    }

    /// <summary>
    /// Converts a DateTime to its Unix timestamp value. This is the number of seconds
    /// passed since the Unix Epoch (1/1/1970 UTC)
    /// </summary>
    /// <param name="dateTime">
    /// DateTime to convert
    /// </param>
    /// <returns>
    /// Number of seconds passed since 1/1/1970 UTC 
    /// </returns>
    public static int ToUnixTimeStamp(this DateTime dateTime)
    {
      if (dateTime == DateTime.MinValue)
      {
        return -1;
      }

      var span = dateTime - UnixEpoch;
      return (int)Math.Floor(span.TotalSeconds);
    }

    public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
    {
      // Unix timestamp is seconds past epoch
      var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
      dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
      return dateTime;
    }

    #endregion
  }
}