CREATE TABLE [Shopping].[ItemStatus]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundUpdateStatus_FriendlyName] ON [Shopping].[ItemStatus] ([FriendlyName])