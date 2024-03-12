CREATE TABLE [Fundolo].[DonationNote]
(
  [Id] INT NOT NULL PRIMARY KEY IDENTITY, 
  [DonationId] INT NOT NULL,
  [Message] NVARCHAR(300) NOT NULL, 
  [TypeId] NVARCHAR(20) NOT NULL,
  [DateEntered] DATETIME NULL, 
  CONSTRAINT [FK_DonationNote_Donation] FOREIGN KEY ([DonationId]) REFERENCES [Fundolo].[Donation]([Id]) ON DELETE CASCADE
)
