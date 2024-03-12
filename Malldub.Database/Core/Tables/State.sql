CREATE TABLE [Core].[State]
(
    [Id] CHAR(2) NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(40) NULL
)

GO

CREATE UNIQUE INDEX [IX_State_Abbreviation] ON [Core].[State] ([Name])
