CREATE TABLE [Shopping].[OrderItem] (
    [OrderId]            INT                  NOT NULL,
    [ItemId]             INT                  NOT NULL,
    [Price]              MONEY                NOT NULL,
    [ItemOrderGuid]      UNIQUEIDENTIFIER     NOT NULL,
    CONSTRAINT [FK_OrderItem_Item] FOREIGN KEY ([ItemId]) REFERENCES [Shopping].[Item]([Id]) ON DELETE CASCADE, 
    CONSTRAINT [FK_OrderItem_Order] FOREIGN KEY ([OrderId]) REFERENCES [Shopping].[Order]([Id]) ON DELETE CASCADE, 
    CONSTRAINT [PK_OrderItem] PRIMARY KEY ([OrderId], [ItemId]) 
);

