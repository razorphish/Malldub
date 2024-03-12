CREATE TABLE [Lists].[ListArea] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [ListPortalSiteId] INT            NULL,
    [Name]             NVARCHAR (200) NULL,
    CONSTRAINT [PK_ListArea] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ListArea_ListSite] FOREIGN KEY ([ListPortalSiteId]) REFERENCES [Lists].[ListSite] ([Id]) ON DELETE CASCADE
);

