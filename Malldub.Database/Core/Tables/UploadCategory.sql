CREATE TABLE [Core].[UploadCategory] (
    [Id]              NVARCHAR (30) NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_UploadCategory] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_UploadCategory] UNIQUE NONCLUSTERED ([Details] ASC)
);

