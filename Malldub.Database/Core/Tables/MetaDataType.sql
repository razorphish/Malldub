CREATE TABLE [Core].[MetaDataType] (
    [Id]              NVARCHAR (20) NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_MetaDataType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_MetaDataType] UNIQUE NONCLUSTERED ([Details] ASC)
);

