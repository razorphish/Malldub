CREATE TABLE [Core].[UserPhone] (
    [UserId]    NVARCHAR (128) NOT NULL,
    [PhoneId]   INT            NOT NULL,
    [IsDefault] BIT            NOT NULL,
    CONSTRAINT [PK_UserPhone] PRIMARY KEY CLUSTERED ([UserId] ASC, [PhoneId] ASC),
    CONSTRAINT [FK_UserPhone_Phone] FOREIGN KEY ([PhoneId]) REFERENCES [Core].[Phone] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserPhone_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

