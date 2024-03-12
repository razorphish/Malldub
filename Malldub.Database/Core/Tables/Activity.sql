CREATE TABLE [Core].[Activity]
(
  [Id]				INT				NOT NULL PRIMARY KEY IDENTITY, 
  [TypeId]			NVARCHAR(20)	NOT NULL, 
  [DateEntered]		DATETIME		NOT NULL DEFAULT getDate(), 
  [IsPrivate]       BIT				NULL DEFAULT 0,
  [Memo]			NVARCHAR(500) 
  CONSTRAINT [FK_Activity_ActivityType] FOREIGN KEY ([TypeId]) REFERENCES [Core].[ActivityType]([Id])
)
