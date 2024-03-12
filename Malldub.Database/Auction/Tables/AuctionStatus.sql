CREATE TABLE [Auction].[AuctionStatus] (
    [Id]          INT           NOT NULL,
    [Description] VARCHAR (30)  NOT NULL,
    [Detail]      VARCHAR (200) NULL,
    CONSTRAINT [PK_AuctionStatus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

