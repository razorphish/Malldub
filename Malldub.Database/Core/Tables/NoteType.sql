CREATE TABLE [Core].[NoteType] (
    [Id]              NVARCHAR (20)  NOT NULL,
    [Description]     NVARCHAR (50)  NOT NULL,
    [Details]         NVARCHAR (100) NULL,
    [SortOrderNumber] TINYINT        NOT NULL,
    CONSTRAINT [PK_NoteType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_NoteType] UNIQUE NONCLUSTERED ([Details] ASC)
);

