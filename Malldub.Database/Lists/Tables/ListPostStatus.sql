CREATE TABLE [Lists].[ListPostStatus] (
    [Id]              INT           NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_ListPostStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO