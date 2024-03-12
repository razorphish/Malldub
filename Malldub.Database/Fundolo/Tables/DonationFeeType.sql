CREATE TABLE [Fundolo].[DonationFeeType]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL, 
    [Description] NVARCHAR(100) NOT NULL,
    [SortOrderNumber] TINYINT
)

GO

CREATE UNIQUE INDEX [IX_DonationFeeType_FriendlyName] ON [Fundolo].[DonationFeeType] ([FriendlyName])
