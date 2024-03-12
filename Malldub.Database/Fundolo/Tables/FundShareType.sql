CREATE TABLE [Fundolo].[FundShareType]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundShareType_FriendlyName] ON [Fundolo].[FundShareType] ([FriendlyName])