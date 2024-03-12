CREATE TABLE [Shopping].[InvoiceStatus] (
    [Id]          INT           NOT NULL,
    [Name]        VARCHAR (50)  NOT NULL,
    [Description] VARCHAR (200) NULL,
    CONSTRAINT [PK_InvoiceStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

