CREATE TABLE [Fundolo].[FundCommentOrigin]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundCommentOrigin_FriendlyName] ON [Fundolo].[FundCommentOrigin] ([FriendlyName])