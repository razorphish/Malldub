CREATE TABLE [Lists].[PostReplyEmailType] (
    [Id]          INT           NOT NULL,
    [Details]     NVARCHAR (30) NOT NULL,
    [Description] NVARCHAR (40) NULL,
    CONSTRAINT [PK_PostReplyEmailType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

