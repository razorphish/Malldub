CREATE TABLE [Fundolo].[FundDefault]
(
  [DefaultId] INT NOT NULL,
  [FundId] INT NOT NULL, 
    CONSTRAINT [PK_FundDefault] PRIMARY KEY ([DefaultId], [FundId]), 
    CONSTRAINT [FK_FundDefault_Default] FOREIGN KEY ([DefaultId]) REFERENCES [Defaults].[Default]([Id]), 
    CONSTRAINT [FK_FundDefault_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id])
)
