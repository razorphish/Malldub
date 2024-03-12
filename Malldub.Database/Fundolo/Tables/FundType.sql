CREATE TABLE [Fundolo].[FundType]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundType_FriendlyName] ON [Fundolo].[FundType] ([FriendlyName])
