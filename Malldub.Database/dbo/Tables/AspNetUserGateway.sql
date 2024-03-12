CREATE TABLE [dbo].[AspNetUserGateway]
(
    [Id]              INT NOT NULL IDENTITY(1,1),
    [GatewayId]       NVARCHAR (30)  NOT NULL,
    [AspNetUserId]    NVARCHAR (128) NOT NULL,
    [GatewayUserId]   NVARCHAR (128) NOT NULL,
    [FirstName]       NVARCHAR (50)  NULL,
    [LastName]        NVARCHAR (50)  NULL,
    [Email]           NVARCHAR (100) NULL,
    [AccessToken]     NVARCHAR (128)  NULL,
    [TokenType]       NVARCHAR (30)  NULL,
    [TokenExpiration] NVARCHAR (50)  NULL,
    [UserState]    NVARCHAR (50)  NULL,
    [AccountState]   NVARCHAR (50)  NULL,
    [AccountId]       NVARCHAR (128) NULL,
    [AccountReferenceId] NVARCHAR(128) NULL,
    [DateEntered]     DATETIME      CONSTRAINT [DF_Account_DateStarted] DEFAULT (getdate()) NOT NULL,
    [DateUpdated]     DATETIME      CONSTRAINT [DF_Account_DateUpdated] DEFAULT (getdate()) NOT NULL, 
    CONSTRAINT [PK_GatewayAccount] PRIMARY KEY ([Id]), 
    CONSTRAINT [FK_AspNetUserGateway_Gateway] FOREIGN KEY ([GatewayId]) REFERENCES [Gateway]([Id]), 
    CONSTRAINT [FK_AspNetUserGateway_AspNetUsers] FOREIGN KEY ([AspNetUserId]) REFERENCES [AspNetUsers]([Id]) ON DELETE CASCADE
)
