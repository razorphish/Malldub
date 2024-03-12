CREATE TABLE [Fundolo].[FundUserType]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundUserType_FriendlyName] ON [Fundolo].[FundUserType] ([FriendlyName])