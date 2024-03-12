CREATE TABLE [Fundolo].[FundUpdate]
(
    [Id]			          INT NOT NULL PRIMARY KEY IDENTITY,
    [FundId]		        INT NOT NULL,
    [UserId]		        NVARCHAR(128) NOT NULL,
    [Title]			        NVARCHAR(50) NOT NULL,
    [Content]		        NVARCHAR(MAX) NOT NULL,
    [StatusId]		      NVARCHAR(20) NOT NULL,
    [PostedToFacebook]  bit NOT NULL ,
    [PostedToEmail]     bit NOT NULL ,
    [PostedToTwitter]   bit NOT NULL,
    [DateEntered]	      DATETIME NULL DEFAULT GETDATE(),
    CONSTRAINT [FK_FundUpdate_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_FundUpdate_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id]) ON DELETE CASCADE, 
    CONSTRAINT [FK_FundUpdate_FundUpdateStatus] FOREIGN KEY ([StatusId]) REFERENCES [Fundolo].[FundUpdateStatus]([Id])
)
