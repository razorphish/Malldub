namespace Marasco.Analytics.GoogleAnalytics.Model
{
  #region Directives

  using System.Collections.Generic;
  using System.Net.Sockets;
  using System.Text;

  using Google.Apis.Analytics.v3.Data;

  using Newtonsoft.Json.Linq;

  #endregion

  public class AnalyticDataPoint
  {
    #region Constructors and Destructors

    public AnalyticDataPoint()
    {
      Rows = new List<IList<string>>();
    }

    #endregion

    #region Public Properties

    public IList<GaData.ColumnHeadersData> ColumnHeaders { get; set; }

    public List<IList<string>> Rows { get; set; }

    public JArray Data
    {
      get
      {
        var sb = new StringBuilder("[");
        if (Rows == null)
        {
          return JArray.Parse(string.Empty);
        }

        for (var i = 0; i < Rows.Count; i++)
        {
          var row = new StringBuilder("{");

          for (var j = 0; j < ColumnHeaders.Count; j++)
          {
            row.Append(string.Format("\"{0}\"", ColumnHeaders[j].Name.Replace("ga:", string.Empty)));
            row.Append(":");
            row.Append("\"" + Rows[i][j] + "\"");
            if (j < (ColumnHeaders.Count - 1))
            {
              row.Append(",");
            }
          }

          row.Append("}");

          if (i < (Rows.Count - 1))
          {
            row.Append(",");
          }

          sb.Append(row);
        }

        sb.Append("]");

        return JArray.Parse(sb.ToString());
      }
    }

    #endregion
  }
}