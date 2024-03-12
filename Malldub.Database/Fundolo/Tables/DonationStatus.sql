CREATE TABLE [Fundolo].[DonationStatus]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL, 
    [Description] NVARCHAR(100) NOT NULL,
    [SortOrderNumber] TINYINT
)

GO

CREATE UNIQUE INDEX [IX_DonationStatus_FriendlyName] ON [Fundolo].[DonationStatus] ([FriendlyName])