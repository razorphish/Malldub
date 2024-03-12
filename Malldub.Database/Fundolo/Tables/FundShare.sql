CREATE TABLE [Fundolo].[FundShare]
(
    [Id]			          INT NOT NULL PRIMARY KEY IDENTITY,
    [FundId]		        INT NOT NULL,
    [UserId]		        NVARCHAR(128) NULL,
    [SocialId]			    NVARCHAR(128) NULL,
    [FirstName]	        NVARCHAR(50) NULL,
    [LastName]          NVARCHAR(50) NULL,
    [Email]             NVARCHAR(50) NULL,
    [Recipients]        NVARCHAR(MAX) NULL,
    [ShareTypeId]	      NVARCHAR(20) NOT NULL,
    [DateEntered]	      DATETIME NULL DEFAULT GETDATE(),
    CONSTRAINT [FK_FundShare_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_FundShare_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id]) ON DELETE CASCADE, 
    CONSTRAINT [FK_FundShare_FundShareType] FOREIGN KEY ([ShareTypeId]) REFERENCES [Fundolo].[FundShareType]([Id])
)
