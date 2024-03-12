CREATE TABLE [Auction].[AuctionType] (
    [Id]          INT            NOT NULL,
    [Description] VARCHAR (50)   NOT NULL,
    [Details]     VARCHAR (2000) NOT NULL,
    CONSTRAINT [PK_lm_AuctionType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

