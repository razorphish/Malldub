CREATE TABLE [Fundolo].[FundTeam]
(
  [Id]          INT NOT NULL IDENTITY(1,1),
  [FundId]      INT NOT NULL,
  [TeamId]      INT NOT NULL, 
  [TeamFundId]  INT NOT NULL,
  [GoalAmount]  MONEY NOT NULL, 
  [CaptainEmail] NVARCHAR(100) NULL,

  CONSTRAINT [FK_FundTeam_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]) ON DELETE CASCADE, 
  CONSTRAINT [FK_FundTeam_Team] FOREIGN KEY ([TeamId]) REFERENCES [Fundolo].[Team]([Id]) ON DELETE CASCADE, 
  CONSTRAINT [FK_FundTeam_TeamFund] FOREIGN KEY ([TeamFundId]) REFERENCES [Fundolo].[Fund]([Id]),
  CONSTRAINT [PK_FundTeam] PRIMARY KEY ([Id]) 
)
