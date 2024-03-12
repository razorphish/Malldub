CREATE TABLE [dbo].[AspNetUsers] (
    [Id]            NVARCHAR (128) NOT NULL,
    [UserName]      NVARCHAR (MAX) NOT NULL,
    [PasswordHash]  NVARCHAR (MAX) NULL,
    [SecurityStamp] NVARCHAR (MAX) NULL,
    [Discriminator] NVARCHAR (128) NOT NULL,
    [FirstName]     NVARCHAR(50) NULL, 
    [LastName]      NVARCHAR(50) NULL, 
    [Email]         NVARCHAR(128) NULL,
    [StatusId]      NVARCHAR (20)  NULL,
    [AvatarUploadId] INT NULL, 
    [AvatarUploadTempLocation] NVARCHAR(50) NULL, 
    [AccountId] NVARCHAR(128) NULL, 
    [DateEntered] DATETIME NOT NULL DEFAULT getDate(), 
    [DateUpdated] DATETIME NOT NULL DEFAULT getDate(), 
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Users_UserStatus] FOREIGN KEY ([StatusId]) REFERENCES [Account].[UserStatus] ([Id]), 
    CONSTRAINT [FK_AspNetUsers_Upload] FOREIGN KEY ([AvatarUploadId]) REFERENCES [Core].[Upload]([Id]), 
    CONSTRAINT [FK_AspNetUsers_Account] FOREIGN KEY ([AccountId]) REFERENCES [Account].[Account]([Id])
);

