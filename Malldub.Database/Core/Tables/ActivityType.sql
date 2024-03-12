CREATE TABLE [Core].[ActivityType] (
    [Id]              NVARCHAR (20)  NOT NULL,
    [Description]     NVARCHAR (50)  NOT NULL,
    [Details]         NVARCHAR (100) NULL,
    [SortOrderNumber] TINYINT        NOT NULL,
    CONSTRAINT [PK_ActivityType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_ActivityType] UNIQUE NONCLUSTERED ([Details] ASC)
);

