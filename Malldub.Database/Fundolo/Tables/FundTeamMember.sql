CREATE TABLE [Fundolo].[FundTeamMember]
(
  [FundTeamId] INT NOT NULL,
  [UserId] NVARCHAR(128) NOT NULL,
  [FundId] INT NULL,
  [DateCreated] DateTime NOT NULL DEFAULT getDate(), 
    [RoleId] NVARCHAR(20) NOT NULL, 
    CONSTRAINT [FK_FundTeamMember_AspNetUser] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id]) ON DELETE CASCADE, 
    CONSTRAINT [FK_FundTeamMember_FundTeam] FOREIGN KEY ([FundTeamId]) REFERENCES [Fundolo].[FundTeam]([Id]), 
    CONSTRAINT [PK_FundTeamMember] PRIMARY KEY ([FundTeamId], [UserId]), 
    CONSTRAINT [FK_FundTeamMember_FundTeamMemberRole] FOREIGN KEY ([RoleId]) REFERENCES [Fundolo].[FundTeamMemberRole]([Id]), 
    CONSTRAINT [FK_FundTeamMember_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]) ON DELETE CASCADE
)
