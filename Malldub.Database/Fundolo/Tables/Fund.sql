CREATE TABLE [Fundolo].[Fund]
(
  [Id]                  INT NOT NULL PRIMARY KEY, 
  [GoalAmount]          MONEY NOT NULL, 
  [FundTypeId]          NVARCHAR(20) NOT NULL,
  [FundCategoryId]      NVARCHAR(20),
  [IsPrivate]           BIT NOT NULL, 
  [EnableSocialSharing] BIT NOT NULL, 
  [PageColor]           NVARCHAR(20) NOT NULL,

  [PageSkin] NVARCHAR(20) NOT NULL DEFAULT 'Light', 
    [PageLayout] NVARCHAR(20) NOT NULL DEFAULT 'Wide', 
    CONSTRAINT [FK_Fund_FundType] FOREIGN KEY ([FundTypeId]) REFERENCES [Fundolo].[FundType]([Id]),
  CONSTRAINT [FK_Fund_FundCategory] FOREIGN KEY ([FundCategoryId]) REFERENCES [Fundolo].[FundCategory]([Id]),
  CONSTRAINT [FK_Fund_Item] FOREIGN KEY ([Id]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
)
