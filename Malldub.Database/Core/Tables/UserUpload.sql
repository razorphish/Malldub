CREATE TABLE [Core].[UserUpload] (
    [UserId]    NVARCHAR (128) NOT NULL,
    [UploadId]  INT            NOT NULL,
    [IsDefault] BIT            NULL,
    CONSTRAINT [PK_UserUpload] PRIMARY KEY CLUSTERED ([UserId] ASC, [UploadId] ASC),
    CONSTRAINT [FK_UserUpload_Upload] FOREIGN KEY ([UploadId]) REFERENCES [Core].[Upload] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserUpload_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

