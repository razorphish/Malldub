CREATE TABLE [Shopping].[InvoiceItem] (
    [Id]                 INT      IDENTITY (1, 1) NOT NULL,
    [InvoiceId]          INT      NOT NULL,
    [PaymentItemId]      INT      NOT NULL,
    [Quantity]           TINYINT  NOT NULL,
    [Amount]             MONEY    NOT NULL,
    [DiscountValue]      MONEY    NULL,
    [DiscountPercentage] TINYINT  NULL,
    [DateEntered]        DATETIME CONSTRAINT [DF_InvoiceItem_DateModified] DEFAULT (getdate()) NULL,
    [DateUpdated]        DATETIME CONSTRAINT [DF_InvoiceItem_DateUpdated] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_lm_InvoiceItem] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_InvoiceItem_Invoice] FOREIGN KEY ([InvoiceId]) REFERENCES [Shopping].[Invoice] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_InvoiceItem_PaymentItem] FOREIGN KEY ([PaymentItemId]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE
);

