CREATE TABLE [Fundolo].[FundActivityType]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundActivityType_FriendlyName] ON [Fundolo].[FundActivityType] ([FriendlyName])