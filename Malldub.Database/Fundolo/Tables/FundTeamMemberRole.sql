CREATE TABLE [Fundolo].[FundTeamMemberRole]
(
    [Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
    [FriendlyName] NVARCHAR(30) NOT NULL 
)

GO

CREATE UNIQUE INDEX [IX_FundTeamMemberRole_FriendlyName] ON [Fundolo].[FundTeamMemberRole] ([FriendlyName])