/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
/* [Fundolo].FundUpdate Status */
IF NOT EXISTS (SELECT * FROM Fundolo.FundUpdateStatus WHERE Id = 'Active')
BEGIN
    INSERT INTO Fundolo.FundUpdateStatus (Id, FriendlyName) VALUES ('Active', 'Active')
END

IF NOT EXISTS (SELECT * FROM Fundolo.FundUpdateStatus WHERE Id = 'Deleted')
BEGIN
    INSERT INTO Fundolo.FundUpdateStatus (Id, FriendlyName) VALUES ('Deleted', 'Deleted')
END

/* [dbo].[AspNetUserGatewayActivityType] */
IF NOT EXISTS (SELECT * FROM [dbo].[AspNetUserGatewayActivityType] WHERE Id = 'AccountVerified')
BEGIN
    INSERT INTO [dbo].[AspNetUserGatewayActivityType] (Id, FriendlyName) VALUES ('AccountVerified', 'Account Verified')
END

IF NOT EXISTS (SELECT * FROM [dbo].[AspNetUserGatewayActivityType] WHERE Id = 'AccountDeleted')
BEGIN
    INSERT INTO [dbo].[AspNetUserGatewayActivityType] (Id, FriendlyName) VALUES ('AccountDeleted', 'Account Deleted')
END

IF NOT EXISTS (SELECT * FROM [dbo].[AspNetUserGatewayActivityType] WHERE Id = 'StatusChanged')
BEGIN
    INSERT INTO [dbo].[AspNetUserGatewayActivityType] (Id, FriendlyName) VALUES ('StatusChanged', 'Status Changed')
END

/* /[Fundolo].FundType */


/* [Fundolo].FundType */
IF NOT EXISTS (SELECT * FROM [Fundolo].FundType WHERE Id = 'Campaign')
BEGIN
    INSERT INTO [Fundolo].FundType (Id, FriendlyName) VALUES ('Campaign', 'Campaign')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundType WHERE Id = 'Fundraiser')
BEGIN
    INSERT INTO [Fundolo].FundType (Id, FriendlyName) VALUES ('Fundraiser', 'Fundraiser')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundType WHERE Id = 'TeamPage')
BEGIN
    INSERT INTO [Fundolo].FundType (Id, FriendlyName) VALUES ('TeamPage', 'TeamPage')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundType WHERE Id = 'TeamMemberPage')
BEGIN
    INSERT INTO [Fundolo].FundType (Id, FriendlyName) VALUES ('TeamMemberPage', 'TeamMemberPage')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundType WHERE Id = 'Default')
BEGIN
    INSERT INTO [Fundolo].FundType (Id, FriendlyName) VALUES ('Default', 'Default')
END
/* /[Fundolo].FundType */

/* [Fundolo].FundCategory*/
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'FuneralMemorial')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('FuneralMemorial', 'Funeral Memorial')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'MedicalExpenses')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('MedicalExpenses', 'Medical Expenses')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Other')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Other', 'Other')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'PetMedical')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('PetMedical', 'Pet Medical')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'MissionTrip')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('MissionTrip', 'Mission Trip')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Adoption')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Adoption', 'Adoption')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Tuition')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Tuition', 'Tuition')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'HelpNeighbor')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('HelpNeighbor', 'Help a Neighbor')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Nonprofits')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Nonprofits', 'Nonprofits')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Community')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Community', 'Community')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Business')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Business', 'Business')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Projects')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Projects', 'Projects')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Events')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Events', 'Events')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Charity')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Charity', 'Charity')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Family')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Family', 'Family')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Competitions')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Competitions', 'Competitions')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Military')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Military', 'Military')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Faith')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Faith', 'Faith')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Sports')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Sports', 'Sports')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Marriage')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Marriage', 'Marriage')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'College')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('College', 'College')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Volunteer')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Volunteer', 'Volunteer')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Emergencies')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Emergencies', 'Emergencies')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].FundCategory WHERE Id = 'Education')
BEGIN
    INSERT INTO [Fundolo].FundCategory (Id, FriendlyName) VALUES ('Education', 'Education')
END
/* /[Fundolo].FundCategory */

/* [Fundolo].[FundUserType]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'Originator')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('Originator', 'Originator')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'Beneficiary')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('Beneficiary', 'Beneficiary')
END

IF EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'MiracleWorker')
BEGIN
    DELETE FROM [Fundolo].[FundUserType] WHERE Id ='MiracleWorker'
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'Supporter')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('Supporter', 'Supporter')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'Donor')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('Donor', 'Donor')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'Fundraiser')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('Fundraiser', 'Fundraiser')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'TeamMember')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('TeamMember', 'Team Member')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'TeamManager')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('TeamManager', 'Team Manager')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'TeamCaptain')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('TeamCaptain', 'Team Captain')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundUserType] WHERE Id = 'Subscriber')
BEGIN
    INSERT INTO [Fundolo].[FundUserType] (Id, FriendlyName) VALUES ('Subscriber', 'Campaign Subscriber')
END
/* /[Fundolo].[FundUserType] */

/* [Fundolo].[FundShareType]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundShareType] WHERE Id = 'Email')
BEGIN
    INSERT INTO [Fundolo].[FundShareType] (Id, FriendlyName) VALUES ('Email', 'Email')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundShareType] WHERE Id = 'Twitter')
BEGIN
    INSERT INTO [Fundolo].[FundShareType] (Id, FriendlyName) VALUES ('Twitter', 'Twitter')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundShareType] WHERE Id = 'Facebook')
BEGIN
    INSERT INTO [Fundolo].[FundShareType] (Id, FriendlyName) VALUES ('Facebook', 'Facebook')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundShareType] WHERE Id = 'GooglePlus')
BEGIN
    INSERT INTO [Fundolo].[FundShareType] (Id, FriendlyName) VALUES ('GooglePlus', 'Google Plus')
END
/* /[Fundolo].[FundShareType] */

/* [Fundolo].FundNoteType */
IF EXISTS (SELECT * FROM [Fundolo].[FundNote] WHERE FundNoteTypeId = NULL)
BEGIN
    UPDATE [Fundolo].[FundNote] SET FundNoteTypeId = 'Notification' WHERE FundNoteTypeId = NULL
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Comment')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Comment', 'Comment', 'Comment made directly on fundraiser by a supporter')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Notification')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Notification', 'Notification', 'An attempted contact by user to fundraiser owner')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Donation')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Donation', 'Donation', 'Comment left on a donation')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Support')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Support', 'Support', 'A new supporter has joined the campaign')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Share')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Share', 'Share', 'Campaign has been shared')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Joined')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Joined', 'Joined', 'Campaign has been joined by member')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Subscribe')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Subscribe', 'Subscribe', 'Campaign has been subscribed by member')
END
IF NOT EXISTS (SELECT * FROM Fundolo.FundNoteType WHERE Id = 'Response')
BEGIN
    INSERT INTO Fundolo.FundNoteType (Id, FriendlyName, [Description]) VALUES ('Response', 'Response', 'A fundraiser owner has responded to a contact notification')
END
/* [Fundolo].FundNoteType */

/* [Fundolo].FUNDUSER */
IF EXISTS (SELECT * FROM [Fundolo].[FundUser] WHERE PostToFacebook = NULL)
BEGIN
    UPDATE [Fundolo].[FundUser] SET PostToFacebook = 1 WHERE PostToFacebook = NULL
END
/* /[Fundolo] FUNDUSER */

/* [Fundolo].[FundTeamMemberrole]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundTeamMemberRole] WHERE Id = 'Captain')
BEGIN
    INSERT INTO [Fundolo].[FundTeamMemberRole] (Id, FriendlyName) VALUES ('Captain', 'Captain')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundTeamMemberRole] WHERE Id = 'Partner')
BEGIN
    INSERT INTO [Fundolo].[FundTeamMemberRole] (Id, FriendlyName) VALUES ('Partner', 'Partner')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundTeamMemberRole] WHERE Id = 'TeamMember')
BEGIN
    INSERT INTO [Fundolo].[FundTeamMemberRole] (Id, FriendlyName) VALUES ('TeamMember', 'Team Member')
END
/* /[Fundolo].[FundTeamMemberrole] */

/* [Fundolo].[FundCommentOrigin]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundCommentOrigin] WHERE Id = 'Fund')
BEGIN
    INSERT INTO [Fundolo].[FundCommentOrigin] (Id, FriendlyName) VALUES ('Fund', 'Fundraiser Page')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundCommentOrigin] WHERE Id = 'Donation')
BEGIN
    INSERT INTO [Fundolo].[FundCommentOrigin] (Id, FriendlyName) VALUES ('Donation', 'Fund Donation')
END
/* /[Fundolo].[FundCommentOrigin] */

/* [Fundolo].[DonationFeeType]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationFeeType] WHERE Id = 'Level0')
BEGIN
    INSERT INTO [Fundolo].[DonationFeeType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Level0', 'No Fee', 'No Fee is charged to Donor.  Fee is charged to donation', '1')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationFeeType] WHERE Id = 'Level1')
BEGIN
    INSERT INTO [Fundolo].[DonationFeeType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Level1', 'Fee Covered', 'Fee Covered by donor.  No Fee charged to donation', '2')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationFeeType] WHERE Id = 'Level2')
BEGIN
    INSERT INTO [Fundolo].[DonationFeeType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Level2', 'Help out Miracles + 1', 'Fee covered by donor + 1%', '3')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationFeeType] WHERE Id = 'Level3')
BEGIN
    INSERT INTO [Fundolo].[DonationFeeType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Level3', 'Help out Miracles + 2', 'Fee covered by donor + 2%', '4')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationFeeType] WHERE Id = 'Level4')
BEGIN
    INSERT INTO [Fundolo].[DonationFeeType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Level4', 'Help out Miracles + 3', 'Fee covered by donor + 3%', '5')
END

/* /[Fundolo].[DonationFeeType] */

/* [Fundolo].[DonationStatus]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationStatus] WHERE Id = 'Active')
BEGIN
    INSERT INTO [Fundolo].[DonationStatus] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Active', 'Active', 'Donation is active and visible to public', '1')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationStatus] WHERE Id = 'Deleted')
BEGIN
    INSERT INTO [Fundolo].[DonationStatus] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Deleted', 'Deleted', 'Donation has been removed from user', '2')
END
/* /[Fundolo].[DonationStatus]*/

/* [Fundolo].[DonationSubscriptionType]*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationSubscriptionType] WHERE Id = 'None')
BEGIN
    INSERT INTO [Fundolo].[DonationSubscriptionType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('None', 'None', 'There is no subscription associated with this donation', '1')
END

IF NOT EXISTS (SELECT * FROM [Fundolo].[DonationSubscriptionType] WHERE Id = 'Monthly')
BEGIN
    INSERT INTO [Fundolo].[DonationSubscriptionType] (Id, [FriendlyName], [Description], SortOrderNumber) VALUES ('Monthly', 'Monthly', 'A monthly subscription associated with donation', '2')
END
/* /[Fundolo].[DonationSubscriptionType]*/

/* [Fundolo].[Donation]*/
IF EXISTS (SELECT * FROM [Fundolo].[Donation] WHERE IsPrivateDonorName = NULL)
BEGIN
    UPDATE [Fundolo].Donation SET IsPrivateDonorName = 0 WHERE IsPrivateDonorName = NULL
END
/* /[Fundolo].[Donation]*/

/* === [Fundolo].[FundActivityType] ===*/
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = '25PercentFundRaised')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('25PercentFundRaised', '25% of Fund Raised')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = '50PercentFundRaised')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('50PercentFundRaised', '50% of Fund Raised')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = '75PercentFundRaised')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('75PercentFundRaised', '75% of Fund Raised')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = '100PercentFundRaised')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('100PercentFundRaised', '100% of Fund Raised')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'DonationReceived')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('DonationReceived', 'Campaign received donation')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewSupporter')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewSupporter', 'Supporter joined campaign')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewFundraiser')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewFundraiser', 'Fundraiser joined campaign')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewTeamMember')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewTeamMember', 'Team member joined campaign')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewUpdate')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewUpdate', 'Update added to campaign')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewImage')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewImage', 'Image added to campaign')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewVideo')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewVideo', 'Video added to campaign')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'CampaignCreated')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('CampaignCreated', 'Campaign Created')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'CampaignUpdated')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('CampaignUpdated', 'Campaign Updated')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewTeam')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewTeam', 'A new team was created')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'NewComment')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('NewComment', 'A new comment was posted')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'OfflineDonation')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('OfflineDonation', 'An offline donation was posted')
END
IF NOT EXISTS (SELECT * FROM [Fundolo].[FundActivityType] WHERE Id = 'CampaignImageDeleted')
BEGIN
    INSERT INTO [Fundolo].[FundActivityType] (Id, FriendlyName) VALUES ('CampaignImageDeleted', 'Campaign image deleted')
END
/*===/[Fundolo].[FundActivityType]===*/

/* [Shopping].[ItemType]*/
IF NOT EXISTS (SELECT * FROM [Shopping].[ItemType] WHERE Id = 'FundoloFund')
BEGIN
    INSERT INTO [Shopping].[ItemType] (Id, Details, [Description], SortOrderNumber) VALUES ('FundoloFund', 'Fundolo Fund', 'A Fund in the application Fundolo', '1')
END
/* /[Shopping].[ItemType] */


/* [Mall].[MallPortalStatus]*/
IF NOT EXISTS (SELECT * FROM [Mall].[MallPortalStatus] WHERE Id = 'Active')
BEGIN
    INSERT INTO [Mall].[MallPortalStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Active', 'Active', 'Active Portal', '1')
END
/* /[Mall].[MallPortalStatus] */

/* [Core].[UploadCategory]*/
IF NOT EXISTS (SELECT * FROM [Core].[UploadCategory] WHERE Id = 'Document')
BEGIN
    INSERT INTO [Core].[UploadCategory] (Id, Details, [Description], SortOrderNumber) VALUES ('Document', 'Document', 'Default Document', '1')
END

IF NOT EXISTS (SELECT * FROM [Core].[UploadCategory] WHERE Id = 'Multimedia')
BEGIN
    INSERT INTO [Core].[UploadCategory] (Id, Details, [Description], SortOrderNumber) VALUES ('Multimedia', 'Multimedia', 'Multimedia', '2')
END
/* /[Core].[UploadCategory] */

/* [Core].[UploadType]*/
IF NOT EXISTS (SELECT * FROM [Core].[UploadType] WHERE Id = 'web.Image')
BEGIN
    INSERT INTO [Core].[UploadType] (Id, Details, [Description], SortOrderNumber) VALUES ('web.Image', 'Web Image', 'An image viewable from a browser', '1')
END

IF NOT EXISTS (SELECT * FROM [Core].[UploadType] WHERE Id = 'youTube.Video')
BEGIN
    INSERT INTO [Core].[UploadType] (Id, Details, [Description], SortOrderNumber) VALUES ('youTube.Video', 'YouTube Video', 'Video link from YouTube.com', '2')
END

IF NOT EXISTS (SELECT * FROM [Core].[UploadType] WHERE Id = 'web.Video')
BEGIN
    INSERT INTO [Core].[UploadType] (Id, Details, [Description], SortOrderNumber) VALUES ('web.Video', 'Web Video', 'Video url ', '3')
END

IF NOT EXISTS (SELECT * FROM [Core].[UploadType] WHERE Id = 'web.Video.YouTube')
BEGIN
    INSERT INTO [Core].[UploadType] (Id, Details, [Description], SortOrderNumber) VALUES ('web.Video.YouTube', 'Web Video: Youtube', 'Video url for youtube.com ', '4')
END

IF NOT EXISTS (SELECT * FROM [Core].[UploadType] WHERE Id = 'web.Video.Vimeo')
BEGIN
    INSERT INTO [Core].[UploadType] (Id, Details, [Description], SortOrderNumber) VALUES ('web.Video.Vimeo', 'Web Video:Vimeo', 'Video url for Vimeo.com', '5')
END
IF NOT EXISTS (SELECT * FROM [Core].[UploadType] WHERE Id = 'web.Image.System')
BEGIN
    INSERT INTO [Core].[UploadType] (Id, Details, [Description], SortOrderNumber) VALUES ('web.Image.System', 'Web Image:System', 'Web image from system or website', '6')
END
/* /[Core].[UploadType] */

/* [[Account]].[[AccountStatus]]*/
IF NOT EXISTS (SELECT * FROM [Account].[AccountStatus] WHERE Id = 'Active')
BEGIN
    INSERT INTO [Account].[AccountStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Active', 'Active', 'Active', '1')
END

IF NOT EXISTS (SELECT * FROM [Account].[AccountStatus] WHERE Id = 'Inactive')
BEGIN
    INSERT INTO [Account].[AccountStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Inactive', 'Inactive', 'Inactive Account', '2')
END

IF NOT EXISTS (SELECT * FROM [Account].[AccountStatus] WHERE Id = 'Disabled')
BEGIN
    INSERT INTO [Account].[AccountStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Disabled', 'Disabled', 'Account is temporarily disabled', '3')
END

IF NOT EXISTS (SELECT * FROM [Account].[AccountStatus] WHERE Id = 'Pending')
BEGIN
    INSERT INTO [Account].[AccountStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Pending', 'Pending', 'Account is pending', '4')
END

IF NOT EXISTS (SELECT * FROM [Account].[AccountStatus] WHERE Id = 'Archived')
BEGIN
    INSERT INTO [Account].[AccountStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Archived', 'Archived', 'Account is archived', '5')
END
IF NOT EXISTS (SELECT * FROM [Account].[AccountStatus] WHERE Id = 'Suspended')
BEGIN
    INSERT INTO [Account].[AccountStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Suspended', 'Suspended', 'Account is suspended', '6')
END
/* /[[Account]].[AccountStatus] */

/* [Mall].[PortalType]*/
IF NOT EXISTS (SELECT * FROM [Mall].[PortalType] WHERE Id = 'Fundolo')
BEGIN
    INSERT INTO [Mall].[PortalType] (Id, Details, [Description], SortOrderNumber) VALUES ('Fundolo', 'Fundolo', 'Fundolo', '1')
END

/* /[Mall].[PortalType] */

/* [Shipping].[ItemTransactionType]*/
IF NOT EXISTS (SELECT * FROM [Shopping].[ItemTransactionType] WHERE Id = 'Item')
BEGIN
    INSERT INTO [Shopping].[ItemTransactionType] (Id, Details, [Description], SortOrderNumber) VALUES ('Item', 'Item', 'Item', '1')
END

IF NOT EXISTS (SELECT * FROM [Shopping].[ItemTransactionType] WHERE Id = 'Donation')
BEGIN
    INSERT INTO [Shopping].[ItemTransactionType] (Id, Details, [Description], SortOrderNumber) VALUES ('Donation', 'Donation', 'Donation', '2')
END

/* /[Shopping].[ItemTransactionType] */

/* [Account].[AccountStatus]*/
IF NOT EXISTS (SELECT * FROM [Account].[UserStatus] WHERE Id = 'Active')
BEGIN
    INSERT INTO [Account].[UserStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Active', 'Active', 'Active Account', '1')
END

IF NOT EXISTS (SELECT * FROM [Account].[UserStatus] WHERE Id = 'Inactive')
BEGIN
    INSERT INTO [Account].[UserStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Inactive', 'Inactive', 'Inactive Account', '2')
END

IF NOT EXISTS (SELECT * FROM [Account].[UserStatus] WHERE Id = 'Disabled')
BEGIN
    INSERT INTO [Account].[UserStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Disabled', 'Disabled', 'User is temporarily disabled', '3')
END

IF NOT EXISTS (SELECT * FROM [Account].[UserStatus] WHERE Id = 'Pending')
BEGIN
    INSERT INTO [Account].[UserStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Pending', 'Pending', 'User status is pending', '4')
END

IF NOT EXISTS (SELECT * FROM [Account].[UserStatus] WHERE Id = 'Archived')
BEGIN
    INSERT INTO [Account].[UserStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Archived', 'Archived', 'User account is archived', '5')
END
IF NOT EXISTS (SELECT * FROM [Account].[UserStatus] WHERE Id = 'Suspended')
BEGIN
    INSERT INTO [Account].[UserStatus] (Id, Details, [Description], SortOrderNumber) VALUES ('Suspended', 'Suspended', 'User account is suspended', '6')
END
/* /[Account].[AccountStatus] */

/* [Core].[PhoneType]*/
IF NOT EXISTS (SELECT * FROM [Core].[PhoneType] WHERE Id = 'Mobile')
BEGIN
    INSERT INTO [Core].[PhoneType] (Id, Details, [Description], SortOrderNumber) VALUES ('Mobile', 'Mobile', 'Mobile Phone Number', '1')
END

IF NOT EXISTS (SELECT * FROM [Core].[PhoneType] WHERE Id = 'Fax')
BEGIN
    INSERT INTO [Core].[PhoneType] (Id, Details, [Description], SortOrderNumber) VALUES ('Fax', 'Fax', 'Fax Number', '2')
END

IF NOT EXISTS (SELECT * FROM [Core].[PhoneType] WHERE Id = 'Home')
BEGIN
    INSERT INTO [Core].[PhoneType] (Id, Details, [Description], SortOrderNumber) VALUES ('Home', 'Home', 'Home Number', '3')
END

/* /[Core].[PhoneType] */

/*  STATE CODES */

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AL')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Alabama', 'AL')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AK')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Alaska', 'AK')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AZ')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Arizona', 'AZ')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AR')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Arkansas', 'AR')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'CA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('California', 'CA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'CO')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Colorado', 'CO')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'CT')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Connecticut', 'CT')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'DE')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Delaware', 'DE')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'DC')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('District Of Columbia', 'DC')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'FL')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Florida', 'FL')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'GA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Georgia', 'GA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'HI')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Hawaii', 'HI')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'ID')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Idaho', 'ID')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'IL')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Illinois', 'IL')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'IN')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Indiana', 'IN')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'IA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Iowa', 'IA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'KS')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Kansas', 'KS')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'KY')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Kentucky', 'KY')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'LA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Louisiana', 'LA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'ME')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Maine', 'ME')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MD')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Maryland', 'MD')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Massachusetts', 'MA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MI')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Michigan', 'MI')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MN')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Minnesota', 'MN')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MS')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Mississippi', 'MS')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MO')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Missouri', 'MO')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MT')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Montana', 'MT')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NE')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Nebraska', 'NE')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NV')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Nevada', 'NV')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NH')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('New Hampshire', 'NH')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NJ')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('New Jersey', 'NJ')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NM')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('New Mexico', 'NM')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NY')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('New York', 'NY')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'NC')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('North Carolina', 'NC')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'ND')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('North Dakota', 'ND')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'OH')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Ohio', 'OH')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'OK')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Oklahoma', 'OK')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'OR')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Oregon', 'OR')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'PA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Pennsylvania', 'PA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'RI')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Rhode Island', 'RI')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'SC')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('South Carolina', 'SC')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'SD')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('South Dakota', 'SD')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'TN')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Tennessee', 'TN')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'TX')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Texas', 'TX')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'UT')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Utah', 'UT')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'VT')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Vermont', 'VT')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'VA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Virginia', 'VA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'WA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Washington', 'WA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'WV')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('West Virginia', 'WV')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'WI')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Wisconsin', 'WI')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'WY')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Wyoming', 'WY')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AS')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('American Samoa', 'AS')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'GU')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Guam', 'GU')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'MP')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Northern Mariana Islands', 'MP')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'PR')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Puerto Rico', 'PR')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'UM')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('United States Minor Outlying Islands', 'UM')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'VI')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Virgin Islands', 'VI')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AA')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Armed Forces Americas', 'AA')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AP')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Armed Forces Pacific', 'AP')
END

IF NOT EXISTS (SELECT * FROM [Core].[State] WHERE Id = 'AE')
BEGIN
    INSERT INTO [Core].[State] (Name, Id) VALUES ('Armed Forces Others', 'AE')
END
/* /[Fundolo].[DonationStatus] */

/* [dbo].[Gateway]*/
IF NOT EXISTS (SELECT * FROM [dbo].[Gateway] WHERE Id = 'WePay')
BEGIN
    INSERT INTO [dbo].[Gateway] (Id, [FriendlyName]) VALUES ('WePay', 'WePay')
END

IF NOT EXISTS (SELECT * FROM [dbo].[Gateway] WHERE Id = 'PayPal')
BEGIN
    INSERT INTO [dbo].[Gateway] (Id, [FriendlyName]) VALUES ('Paypal', 'Paypal')
END
IF NOT EXISTS (SELECT * FROM [dbo].[Gateway] WHERE Id = 'MailChimp')
BEGIN
    INSERT INTO [dbo].[Gateway] (Id, [FriendlyName]) VALUES ('MailChimp', 'MailChimp')
END
/* /[dbo].[Gateway]*/

/* [dbo].[AspNetRoles]*/
IF NOT EXISTS (SELECT * FROM [dbo].[AspNetRoles] WHERE Name = 'Administrator')
BEGIN
    INSERT INTO [dbo].[AspNetRoles] (Id, [Name]) VALUES ('C77D59D1-8180-44C4-B6B3-1603943FBEB0', 'Administrator')
END
IF NOT EXISTS (SELECT * FROM [dbo].[AspNetRoles] WHERE Name = 'User')
BEGIN
    INSERT INTO [dbo].[AspNetRoles] (Id, [Name]) VALUES ('0418B53B-4DBF-4493-8435-A458AD08A059', 'User')
END
/* /[dbo].[AspNetRoles]*/

/* [dbo].[userRoles]*/
IF NOT EXISTS (SELECT * FROM [dbo].[AspNetRoles] WHERE Name = 'Administrator')
BEGIN
    INSERT INTO [dbo].[AspNetRoles] (Id, [Name]) VALUES ('C77D59D1-8180-44C4-B6B3-1603943FBEB0', 'Administrator')
END
IF NOT EXISTS (SELECT * FROM [dbo].[AspNetRoles] WHERE Name = 'User')
BEGIN
    INSERT INTO [dbo].[AspNetRoles] (Id, [Name]) VALUES ('0418B53B-4DBF-4493-8435-A458AD08A059', 'User')
END
/* /[dbo].[AspNetRoles]*/

/* [dbo].[userRoles]*/
IF NOT EXISTS (  SELECT * FROM [dbo].[AspNetUsers] u 
  INNER JOIN [dbo].[AspNetUserRoles] ur ON u.Id = ur.UserId
  INNER JOIN [dbo].[AspNetRoles] r ON r.Id = ur.RoleId
  WHERE u.Email = 'marasco27@hotmail.com')
BEGIN
  IF (Exists(Select Id from [dbo].[AspNetUsers] where UserName = 'marasco27@hotmail.com'))
  BEGIN
    INSERT INTO .[dbo].[AspNetUserRoles] (UserId, RoleId) VALUES (
      (Select Id from [dbo].[AspNetUsers] where UserName = 'marasco27@hotmail.com'),'C77D59D1-8180-44C4-B6B3-1603943FBEB0')
  END
END

IF NOT EXISTS (  SELECT * FROM [dbo].[AspNetUsers] u 
  INNER JOIN [dbo].[AspNetUserRoles] ur ON u.Id = ur.UserId
  INNER JOIN [dbo].[AspNetRoles] r ON r.Id = ur.RoleId
  WHERE u.Email = 'luynhpham27@aol.com')
BEGIN
  IF (Exists(Select Id from [dbo].[AspNetUsers] where UserName = 'luynhpham27@aol.com'))
  BEGIN
    INSERT INTO [dbo].[AspNetUserRoles] (UserId, RoleId) VALUES (
      (Select Id from [dbo].[AspNetUsers] where UserName = 'luynhpham27@aol.com'),'C77D59D1-8180-44C4-B6B3-1603943FBEB0')
  END
END
/* /[dbo].[AspNetRoles]*/

/* [Core].[NoteType]*/
IF NOT EXISTS (SELECT * FROM [Core].[NoteType] WHERE Id = 'Comment')
BEGIN
    INSERT INTO [Core].[NoteType] (Id, Details, [Description], SortOrderNumber) VALUES ('Comment', 'Comment', 'User Comment', 1)
END

IF NOT EXISTS (SELECT * FROM [Core].[NoteType] WHERE Id = 'Question')
BEGIN
    INSERT INTO [Core].[NoteType] (Id, Details, [Description], SortOrderNumber) VALUES ('Question', 'Question', 'User Question', 2)
END

IF NOT EXISTS (SELECT * FROM [Core].[NoteType] WHERE Id = 'Message')
BEGIN
    INSERT INTO [Core].[NoteType] (Id, Details, [Description], SortOrderNumber) VALUES ('Message', 'Message', 'User Message', 3)
END
IF NOT EXISTS (SELECT * FROM [Core].[NoteType] WHERE Id = 'Response')
BEGIN
    INSERT INTO [Core].[NoteType] (Id, Details, [Description], SortOrderNumber) VALUES ('Response', 'Response', 'User Response', 4)
END
IF NOT EXISTS (SELECT * FROM [Core].[NoteType] WHERE Id = 'System')
BEGIN
    INSERT INTO [Core].[NoteType] (Id, Details, [Description], SortOrderNumber) VALUES ('System', 'System', 'System note', 4)
END
/* /[Core].[NoteType] */

/* [Core].[MalldubApplication]*/
IF NOT EXISTS (SELECT * FROM [Core].[MalldubApplication] WHERE Id = 'Fundolo')
BEGIN
    INSERT INTO [Core].[MalldubApplication] (Id, Name, [Description]) VALUES ('Fundolo', 'Fundolo', 'Free online fundraising')
END

IF NOT EXISTS (SELECT * FROM [Core].[MalldubApplication] WHERE Id = 'Biddler')
BEGIN
    INSERT INTO [Core].[MalldubApplication] (Id, Name, [Description]) VALUES ('Biddler', 'Biddler', 'Free online auction site')
END
/* /[Core].[MalldubApplication] */

/* [Core].[ActivityType]*/
IF NOT EXISTS (SELECT * FROM [Core].[ActivityType] WHERE Id = 'Update')
BEGIN
    INSERT INTO [Core].[ActivityType] (Id, Details, [Description], SortOrderNumber) VALUES ('Update', 'Update', 'An update has occurred', '1')
END

IF NOT EXISTS (SELECT * FROM [Core].[ActivityType] WHERE Id = 'Delete')
BEGIN
    INSERT INTO [Core].[ActivityType] (Id, Details, [Description], SortOrderNumber) VALUES ('Delete', 'Delete', 'A deletion has occurred', '2')
END

IF NOT EXISTS (SELECT * FROM [Core].[ActivityType] WHERE Id = 'Create')
BEGIN
    INSERT INTO [Core].[ActivityType] (Id, Details, [Description], SortOrderNumber) VALUES ('Create', 'Create', 'A creation has occurred', '3')
END

/* /[Core].[ActivityType] */

/* [Shopping].[ItemStatus]*/
IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Active')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Active', 'Active')
END

IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Expired')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Expired', 'Expired')
END

IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Suspended')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Suspended', 'Suspended')
END

IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Hidden')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Hidden', 'Hidden')
END
IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Deleted')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Deleted', 'Deleted')
END
IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Preliminary')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Preliminary', 'Preliminary')
END
IF NOT EXISTS (SELECT * FROM [Shopping].[ItemStatus] WHERE Id = 'Private')
BEGIN
    INSERT INTO [Shopping].[ItemStatus] (Id, FriendlyName) VALUES ('Private', 'Private')
END
/* /[Shopping].[ItemStatus] */

/* [Shopping].[Item]*/
IF EXISTS (SELECT * FROM [Shopping].[Item] WHERE StatusId = NULL)
BEGIN
    UPDATE [Shopping].[Item] SET StatusId = 'Active' WHERE StatusId = NULL
END
/* /[Shopping].[Item]*/