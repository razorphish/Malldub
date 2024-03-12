namespace Malldub.Data
{
  partial class FundSetting
  {
    #region Constructors and Destructors

    public FundSetting()
    {
      EmailReceiveUserDonation   = true;
      EmailReceiveUserSupport    = true;
      EmailReceiveUserFundraiser = true;
      EmailReceiveUserTeamMember = true;

      EmailSendSupporter25Raised = true;
      EmailSendSupporter50Raised = true;
      EmailSendSupporter75Raised = true;
      EmailSendSupporterFriendSupport = true;
      
      FacebookPostAddVideo = false;
      FacebookPostAddImage = false;
      FacebookPostUpdate = true;
      FacebookPostUserSupport = true;
      FacebookPostUserDonate = true;
      FacebookPostUserFundraiser = true;
      FacebookPostUserComment = true;

      AllowAnonymousDonors = true;
      AllowRecuringPayments = true;
      UsePaymentModal = true;
      AllowCommenting = true;

      DonationHideAmount = false;
      DonationHideDonorName = false;
    }

    #endregion
  }
}