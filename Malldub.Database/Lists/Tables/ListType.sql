CREATE TABLE [Lists].[ListType] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Code]        NVARCHAR (10)  NULL,
    [Description] NVARCHAR (200) NOT NULL,
    CONSTRAINT [PK_ListType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_ListType] UNIQUE NONCLUSTERED ([Code] ASC)
);

