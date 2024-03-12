CREATE TABLE [Core].[UploadType] (
    [Id]          NVARCHAR (30)  NOT NULL,
    [Description] NVARCHAR (50)  NOT NULL,
    [Details]     NVARCHAR (100) NULL,
    [SortOrderNumber] TINYINT        NOT NULL,
    CONSTRAINT [PK_UploadType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_UploadType] UNIQUE NONCLUSTERED ([Details] ASC)
);
