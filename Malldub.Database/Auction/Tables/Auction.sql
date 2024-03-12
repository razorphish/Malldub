CREATE TABLE [Auction].[Auction] (
    [Id]                  INT      NOT NULL,
    [StartingPrice]       MONEY    NOT NULL,
    [Duration]            TINYINT  NOT NULL,
    [BuyItNowPrice]       MONEY    NULL,
    [ReserveAmount]       MONEY    NULL,
    [CurrentHighBid]      MONEY    NULL,
    [BeginTime]           DATETIME NULL,
    [EndTime]             DATETIME NULL,
    [HasEnded]            BIT      NOT NULL,
    [Increment]           INT      NOT NULL,
    [AuctionStatusId]     INT      NOT NULL,
    [WinningBidderUserId] INT      NULL,
    [AuctionTypeId]       INT      NULL,
    CONSTRAINT [PK_lm_Auction] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Auction_AuctionStatus] FOREIGN KEY ([AuctionStatusId]) REFERENCES [Auction].[AuctionStatus] ([Id]),
    CONSTRAINT [FK_Auction_AuctionType] FOREIGN KEY ([AuctionTypeId]) REFERENCES [Auction].[AuctionType] ([Id]),
    CONSTRAINT [FK_Auction_Item] FOREIGN KEY ([Id]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
);

