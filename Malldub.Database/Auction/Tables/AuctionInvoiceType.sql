CREATE TABLE [Auction].[AuctionInvoiceType] (
    [Id]          INT           NOT NULL,
    [Name]        VARCHAR (50)  NOT NULL,
    [Description] VARCHAR (100) NULL,
    CONSTRAINT [PK_AuctionInvoiceType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

