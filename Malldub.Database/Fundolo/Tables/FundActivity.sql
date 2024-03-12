CREATE TABLE [Fundolo].[FundActivity]
(
  [Id] INT NOT NULL PRIMARY KEY,
  [FundId] INT NOT NULL,
  [FundActivityTypeId] NVARCHAR(20) NOT NULL, 
    CONSTRAINT [FK_FundActivity_Id] FOREIGN KEY ([Id]) REFERENCES [Core].[Activity]([Id]) ON DELETE CASCADE ON UPDATE CASCADE, 
    CONSTRAINT [FK_FundActivity_FundActivityType] FOREIGN KEY ([FundActivityTypeId]) REFERENCES [Fundolo].[FundActivityType]([Id]), 
    CONSTRAINT [FK_FundActivity_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]) ON DELETE CASCADE
)
