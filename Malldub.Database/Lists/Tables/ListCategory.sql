CREATE TABLE [Lists].[ListCategory] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [ListPortalTypeId] INT            NOT NULL,
    [Description]      NVARCHAR (200) NOT NULL,
    CONSTRAINT [PK_ListCategory] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ListCategory_ListType] FOREIGN KEY ([ListPortalTypeId]) REFERENCES [Lists].[ListType] ([Id])
);

