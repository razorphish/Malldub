CREATE TABLE [Shopping].[AuctionPaymentItem] (
    [PaymentItemId]       INT      NOT NULL,
    [UserId]              INT      NOT NULL,
    [BasedOnWinningPrice] BIT      NOT NULL,
    [DateEntered]         DATETIME CONSTRAINT [DF_AuctionPaymentItem_DateEntered] DEFAULT (getdate()) NULL,
    [DateUpdated]         DATETIME CONSTRAINT [DF_AuctionPaymentItem_DateUpdated] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_lm_AuctionClientPaymentItem] PRIMARY KEY CLUSTERED ([PaymentItemId] ASC, [UserId] ASC),
    CONSTRAINT [FK_AuctionPaymentItem_PaymentItem] FOREIGN KEY ([PaymentItemId]) REFERENCES [Shopping].[Item] ([Id]) ON DELETE CASCADE
);

