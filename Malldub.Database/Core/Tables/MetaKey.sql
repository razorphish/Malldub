CREATE TABLE [Core].[MetaKey] (
    [Id]             NVARCHAR (50) NOT NULL,
    [MetaDataTypeId] NVARCHAR (20) NOT NULL,
    CONSTRAINT [PK_MetaKey] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_MetaKey_MetaDataType] FOREIGN KEY ([MetaDataTypeId]) REFERENCES [Core].[MetaDataType] ([Id])
);

