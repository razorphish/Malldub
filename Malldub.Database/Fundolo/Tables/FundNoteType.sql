CREATE TABLE [Fundolo].[FundNoteType]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL, 
    [Description] NVARCHAR(100) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundNoteType_FriendlyName] ON [Fundolo].[FundNoteType] ([FriendlyName])