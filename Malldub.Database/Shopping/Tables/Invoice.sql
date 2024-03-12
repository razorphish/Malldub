CREATE TABLE [Shopping].[Invoice] (
    [Id]              INT      IDENTITY (1, 1) NOT NULL,
    [Tax]             MONEY    NOT NULL,
    [TaxRate]         TINYINT  NULL,
    [SubTotal]        MONEY    NOT NULL,
    [TotalAmount]     MONEY    NOT NULL,
    [InvoiceStatusId] INT      NOT NULL,
    [DateEntered]     DATETIME NULL,
    [DateUpdated]     DATETIME NULL,
    CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED ([Id] ASC) ,
    CONSTRAINT [FK_Invoice_InvoiceStatus] FOREIGN KEY ([InvoiceStatusId]) REFERENCES [Shopping].[InvoiceStatus] ([Id])
);

