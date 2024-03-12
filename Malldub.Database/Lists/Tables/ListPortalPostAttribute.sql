CREATE TABLE [Lists].[ListPortalPostAttribute] (
    [PostFieldId]      INT             IDENTITY (1, 1) NOT NULL,
    [ListPortalPostId] INT             NOT NULL,
    [FieldContent]     NVARCHAR (1000) NULL,
    CONSTRAINT [PK_ListPortalPostAttribute] PRIMARY KEY CLUSTERED ([PostFieldId] ASC, [ListPortalPostId] ASC),
    CONSTRAINT [FK_ListPortalPostAttribute_PostField] FOREIGN KEY ([PostFieldId]) REFERENCES [Shopping].[PostField] ([PostFieldId]),
    CONSTRAINT [FK_ListPostAttribute_ListPost] FOREIGN KEY ([ListPortalPostId]) REFERENCES [Lists].[ListPost] ([Id]) ON DELETE CASCADE
);

