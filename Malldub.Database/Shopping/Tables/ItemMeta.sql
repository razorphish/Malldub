CREATE TABLE [Shopping].[ItemMeta] (
    [ItemId]       INT                                   NOT NULL,
    [MetaKeyId]    NVARCHAR (50)                         NOT NULL,
    [StringValue]  NVARCHAR (1024) SPARSE                NULL,
    [NumericValue] DECIMAL (16, 4) SPARSE                NULL,
    [DateValue]    SMALLDATETIME SPARSE                  NULL,
    [XmlDom]       XML COLUMN_SET FOR ALL_SPARSE_COLUMNS,
    CONSTRAINT [PK_RealEstateMeta] PRIMARY KEY CLUSTERED ([ItemId] ASC, [MetaKeyId] ASC),
    CONSTRAINT [FK_ItemMeta_Item] FOREIGN KEY ([ItemId]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_RealEstateMeta_MetaKey] FOREIGN KEY ([MetaKeyId]) REFERENCES [Core].[MetaKey] ([Id])
);

