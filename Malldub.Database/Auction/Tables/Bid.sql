CREATE TABLE [Auction].[Bid] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [AuctionId]   INT            NOT NULL,
    [UserId]      NVARCHAR (128) NOT NULL,
    [OrderNumber] INT            NOT NULL,
    [MaxBid]      MONEY          NOT NULL,
    [IsHighBid]   BIT            NOT NULL,
    [DateEntered] DATETIME       CONSTRAINT [DF_Bid_DateEntered] DEFAULT (getdate()) NOT NULL,
    [DateUpdated] DATETIME       CONSTRAINT [DF_Bid_DateUpdated] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Bid] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Bid_Auction] FOREIGN KEY ([AuctionId]) REFERENCES [Auction].[Auction] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Bid_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

