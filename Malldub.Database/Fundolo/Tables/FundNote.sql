CREATE TABLE [Fundolo].[FundNote]
(
    [Id]		INT NOT NULL PRIMARY KEY,
    [FundUserId]	NVARCHAR(128) NOT NULL, 
    [FundId]	INT NOT NULL,
    [RespondNoteId] INT NULL,
    [FundNoteTypeId] NVARCHAR(20) NOT NULL DEFAULT 'Notification', 
    CONSTRAINT [FK_FundNote_Note] FOREIGN KEY ([Id]) REFERENCES [Core].[Note] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE, 
    CONSTRAINT [FK_FundNote_AspNetUsers] FOREIGN KEY ([FundUserId]) REFERENCES [dbo].[AspNetUsers]([Id]), 
    CONSTRAINT [FK_FundNote_Fund] FOREIGN KEY ([FundId]) REFERENCES [Fundolo].[Fund]([Id]), 
    CONSTRAINT [FK_FundNote_FundNoteType] FOREIGN KEY ([FundNoteTypeId]) REFERENCES [Fundolo].[FundNoteType]([Id])
)
