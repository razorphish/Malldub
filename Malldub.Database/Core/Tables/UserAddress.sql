CREATE TABLE [Core].[UserAddress] (
    [UserId]    NVARCHAR (128) NOT NULL,
    [AddressId] INT            NOT NULL,
    [IsDefault] BIT            NOT NULL,
    CONSTRAINT [PK_UserAddress] PRIMARY KEY CLUSTERED ([UserId] ASC, [AddressId] ASC),
    CONSTRAINT [FK_UserAddress_Address] FOREIGN KEY ([AddressId]) REFERENCES [Core].[Address] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserAddress_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

