CREATE TABLE [Shopping].[ItemCategory] (
    [ItemId]     INT NOT NULL,
    [CategoryId] INT NOT NULL,
    [IsDefault]  BIT NULL,
    CONSTRAINT [PK_ItemCategory] PRIMARY KEY CLUSTERED ([ItemId] ASC, [CategoryId] ASC),
    CONSTRAINT [FK_ItemCategory_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Shopping].[Category] ([Id]),
    CONSTRAINT [FK_ItemCategory_Item] FOREIGN KEY ([ItemId]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE
);

