CREATE TABLE [Fundolo].[FundComment]
(
  [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [FundId] INT NOT NULL,
  [CommentId] INT NOT NULL, 
  [OriginId] NVARCHAR(20) NOT NULL, 
  [DonationId] INT NULL,
  CONSTRAINT [FK_FundComment_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]),
  CONSTRAINT [FK_FundComment_Comment] FOREIGN KEY ([CommentId]) REFERENCES [Core].[Comment]([Id]), 
  CONSTRAINT [FK_FundComment_FundCommentOrigin] FOREIGN KEY ([OriginId]) REFERENCES [Fundolo].[FundCommentOrigin]([Id]), 
  CONSTRAINT [FK_FundComment_Donation] FOREIGN KEY ([DonationId]) REFERENCES [Fundolo].[Donation]([Id])
)
