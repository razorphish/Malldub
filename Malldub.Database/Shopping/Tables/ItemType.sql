CREATE TABLE [Shopping].[ItemType] (
    [Id]              NVARCHAR (20) NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_ItemType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_ItemType] UNIQUE NONCLUSTERED ([Details] ASC)
);


GO