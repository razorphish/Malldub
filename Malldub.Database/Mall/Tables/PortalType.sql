﻿CREATE TABLE [Mall].[PortalType] (
    [Id]              NVARCHAR (30) NOT NULL,
    [Details]         NVARCHAR (40) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_PortalType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

