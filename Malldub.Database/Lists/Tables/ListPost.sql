CREATE TABLE [Lists].[ListPost] (
    [Id]                   INT            NOT NULL,
    [ListSiteId]           INT            NOT NULL,
    [ListTypeId]           INT            NOT NULL,
    [ListCategoryId]       INT            NULL,
    [ListAreaId]           INT            NULL,
    [SpecificLocation]     NVARCHAR (200) NULL,
    [PostReplyEmailTypeId] INT            NOT NULL,
    [IsSolicitable]        BIT            NOT NULL,
    [ListPostStatusId]     INT            NOT NULL,
    CONSTRAINT [PK_ListPost] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ListPost_Item] FOREIGN KEY ([Id]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ListPost_ListArea] FOREIGN KEY ([ListAreaId]) REFERENCES [Lists].[ListArea] ([Id]),
    CONSTRAINT [FK_ListPost_ListCategory] FOREIGN KEY ([ListCategoryId]) REFERENCES [Lists].[ListCategory] ([Id]),
    CONSTRAINT [FK_ListPost_ListPostStatus] FOREIGN KEY ([ListPostStatusId]) REFERENCES [Lists].[ListPostStatus] ([Id]),
    CONSTRAINT [FK_ListPost_ListSite] FOREIGN KEY ([ListSiteId]) REFERENCES [Lists].[ListSite] ([Id]),
    CONSTRAINT [FK_ListPost_ListType] FOREIGN KEY ([ListTypeId]) REFERENCES [Lists].[ListType] ([Id]),
    CONSTRAINT [FK_ListPost_PostReplyEmailType] FOREIGN KEY ([PostReplyEmailTypeId]) REFERENCES [Lists].[PostReplyEmailType] ([Id])
);

