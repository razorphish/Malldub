CREATE TABLE [Shopping].[ItemTransactionType] (
    [Id]              NVARCHAR (20) NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_ItemTransactionType] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_ItemTransactionType]
    ON [Shopping].[ItemTransactionType]([Details] ASC);


