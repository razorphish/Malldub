CREATE TABLE [Fundolo].[FundUser]
(
  [FundId]INT NOT NULL, 
  [UserId] NVARCHAR(128) NOT NULL, 
  [UserTypeId] NVARCHAR(20) NOT NULL, 
  [AllowEmail] BIT NOT NULL DEFAULT 1 ,
  [PostToFacebook] BIT NOT NULL DEFAULT 1,
  [UserFundId] INT NULL,
  [DateEntered] DATETIME NOT NULL DEFAULT getDate(), 
  CONSTRAINT [PK_FundUser] PRIMARY KEY ([FundId], [UserId], [UserTypeId]), 
  CONSTRAINT [FK_FundUser_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]) ON DELETE CASCADE,
  CONSTRAINT [FK_FundUser_Member] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id]) ON DELETE CASCADE,
  CONSTRAINT [FK_FundUser_FundUserType] FOREIGN KEY ([UserTypeId]) REFERENCES [Fundolo].[FundUserType]([Id]), 
  CONSTRAINT [FK_FundUser_FundUserFund] FOREIGN KEY ([UserFundId]) REFERENCES [Fundolo].[Fund]([Id])
  )
GO