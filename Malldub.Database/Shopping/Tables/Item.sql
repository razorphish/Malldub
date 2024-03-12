CREATE TABLE [Shopping].[Item] (
    [Id]                    INT            NOT NULL IDENTITY,
    [UserId]                NVARCHAR (128) NOT NULL,
    [TypeId]                NVARCHAR (20)  NOT NULL,
    [TransactionTypeId]     NVARCHAR (20)  NULL,
    [Title]                 VARCHAR (50)   NOT NULL,
    [ShortSummary]          NVARCHAR (140) NULL,
    [Description]           NVARCHAR (MAX) NOT NULL,
    [StartDate]             DATETIME       NULL,
    [EndDate]               DATETIME       NULL,
    [Permalink]             NVARCHAR (100) NULL,
    [Featured]              BIT            NOT NULL,
	[StatusId]				NVARCHAR (20)  NOT NULL DEFAULT 'Active',
    [DateEntered]           DATETIME       CONSTRAINT [DF_Item_DateEntered] DEFAULT (getdate()) NULL,
    [DateUpdated]           DATETIME       CONSTRAINT [DF_Item_DateUpdated] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Item_ItemTransactionType] FOREIGN KEY ([TransactionTypeId]) REFERENCES [Shopping].[ItemTransactionType] ([Id]),
    CONSTRAINT [FK_Item_ItemType] FOREIGN KEY ([TypeId]) REFERENCES [Shopping].[ItemType] ([Id]), 
    CONSTRAINT [FK_Item_User] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers]([Id]), 
    CONSTRAINT [FK_Item_ItemStatus] FOREIGN KEY ([StatusId]) REFERENCES [Shopping].[ItemStatus]([Id])
);

