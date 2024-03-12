CREATE TABLE [Shopping].[ItemUpload] (
    [ItemId]    INT NOT NULL,
    [UploadId]  INT NOT NULL,
    [IsDefault] BIT NULL,
    [SortOrder] INT NOT NULL DEFAULT 0, 
    CONSTRAINT [PK_RealEstateUpload] PRIMARY KEY CLUSTERED ([ItemId] ASC, [UploadId] ASC),
    CONSTRAINT [FK_ItemUpload_Item] FOREIGN KEY ([ItemId]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ItemUpload_Upload] FOREIGN KEY ([UploadId]) REFERENCES [Core].[Upload] ([Id]) ON DELETE CASCADE
);

