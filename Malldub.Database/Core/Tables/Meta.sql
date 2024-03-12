CREATE TABLE [Core].[Meta] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [MetaKeyId]  NVARCHAR (50)  NOT NULL,
    [MetaOption] NVARCHAR (256) NOT NULL,
    CONSTRAINT [PK_Meta] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Meta_MetaKey] FOREIGN KEY ([MetaKeyId]) REFERENCES [Core].[MetaKey] ([Id])
);

