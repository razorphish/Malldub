CREATE TABLE [Auction].[AuctionInvoice] (
    [AuctionId]                  INT NOT NULL,
    [InvoiceId]                  INT NOT NULL,
    [ClientIdPayable]            INT NULL,
    [ClientIdReceivable]         INT NOT NULL,
    [AuctionInvoiceTypeId]       INT NOT NULL,
    [SystemInvoice]              BIT NOT NULL,
    [AuctionInvoiceBillToTypeId] INT NULL,
    CONSTRAINT [PK_AuctionInvoice] PRIMARY KEY CLUSTERED ([AuctionId] ASC, [InvoiceId] ASC),
    CONSTRAINT [FK_AuctionInvoice_Auction] FOREIGN KEY ([AuctionId]) REFERENCES [Auction].[Auction] ([Id]),
    CONSTRAINT [FK_AuctionInvoice_AuctionInvoiceBillToType] FOREIGN KEY ([AuctionInvoiceBillToTypeId]) REFERENCES [Auction].[AuctionInvoiceBillToType] ([Id]),
    CONSTRAINT [FK_AuctionInvoice_AuctionInvoiceType] FOREIGN KEY ([AuctionInvoiceTypeId]) REFERENCES [Auction].[AuctionInvoiceType] ([Id]),
    CONSTRAINT [FK_AuctionInvoice_Invoice] FOREIGN KEY ([InvoiceId]) REFERENCES [Shopping].[Invoice] ([Id])
);

