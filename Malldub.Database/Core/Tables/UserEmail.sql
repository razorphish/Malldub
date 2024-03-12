CREATE TABLE [Core].[UserEmail] (
    [UserId]    NVARCHAR (128) NOT NULL,
    [EmailId]   INT            NOT NULL,
    [IsDefault] BIT            NOT NULL,
    CONSTRAINT [PK_UserEmail] PRIMARY KEY CLUSTERED ([UserId] ASC, [EmailId] ASC),
    CONSTRAINT [FK_UserEmail_Email] FOREIGN KEY ([EmailId]) REFERENCES [Core].[Email] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserEmail_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

