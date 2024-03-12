CREATE TABLE [Auction].[AuctionInvoiceBillToType] (
    [Id]          INT           NOT NULL,
    [Name]        VARCHAR (50)  NOT NULL,
    [Description] VARCHAR (200) NULL,
    CONSTRAINT [PK_AuctionInvoiceBillToType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

