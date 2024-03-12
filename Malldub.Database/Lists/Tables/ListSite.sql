CREATE TABLE [Lists].[ListSite] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Code]        NVARCHAR (10) NOT NULL,
    [Details]     NVARCHAR (40) NOT NULL,
    [Description] NVARCHAR (50) NULL,
    CONSTRAINT [PK_ListSite] PRIMARY KEY CLUSTERED ([Id] ASC)
);

