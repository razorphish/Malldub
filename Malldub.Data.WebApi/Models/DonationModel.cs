namespace Malldub.WebApi.Models
{
  #region Directives

  using System.Collections.Generic;

  using Mandrill;

  #endregion

  public class DonationModel
  {
    #region Public Properties

    public string Amount { get; set; }

    public string Body { get; set; }

    public string DonorName { get; set; }

    public string FundTitle { get; set; }

    public string Message { get; set; }

    public string OriginatorEmail { get; set; }

    public string OriginatorFirstName { get; set; }

    public string OriginatorLastName { get; set; }

    public string Permalink { get; set; }

    public string SubTitle { get; set; }
    public string Subject { get; set; }

    public string Title { get; set; }

    public List<EmailAddress> ToEmails { get; set; }

    #endregion
  }
}