CREATE TABLE [Account].[UserStatus] (
    [Id]              NVARCHAR (20) NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_UserStatus] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_UserStatus] UNIQUE NONCLUSTERED ([Details] ASC)
);

