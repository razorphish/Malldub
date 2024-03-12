CREATE TABLE [Core].[Comment]
(
  [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
  [GeoId] INT NULL,
  [Post] NVARCHAR(MAX) NULL,
  [Title] NVARCHAR(256) NULL,
  [UserId] NVARCHAR (128) NULL, 
  [Name] NVARCHAR(256) NULL,
  [TotalLikes] INT NULL DEFAULT 0,
  [PostToFacebook] BIT NOT NULL DEFAULT 0,
  [DateEntered] DATETIME NOT NULL DEFAULT getDate(), 
    CONSTRAINT [FK_Comment_Geo] FOREIGN KEY ([GeoId]) REFERENCES [Core].[Geo]([Id]), 
    CONSTRAINT [FK_Comment_AspNetUser] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id])
)
