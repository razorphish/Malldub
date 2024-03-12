CREATE TABLE [Core].[PhoneType] (
    [Id]          NVARCHAR (30)  NOT NULL,
    [Description] NVARCHAR (50)  NOT NULL,
    [Details]     NVARCHAR (100) NULL,
    [SortOrderNumber] TINYINT        NOT NULL,
    CONSTRAINT [PK_ContactPhoneType] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_PhoneType] UNIQUE NONCLUSTERED ([Details] ASC)
);

