CREATE TABLE [Account].[Account] (
    [Id]          NVARCHAR (128) NOT NULL,
    [AccountStatusId] NVARCHAR (20) CONSTRAINT [DF_Account_AccountStatusId] NOT NULL,
    [DateEntered]     DATETIME      CONSTRAINT [DF_Account_DateStarted] DEFAULT (getdate()) NULL,
    [DateUpdated]     DATETIME      CONSTRAINT [DF_Account_DateUpdated] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [FK_Account_AccountStatus] FOREIGN KEY ([AccountStatusId]) REFERENCES [Account].[AccountStatus] ([Id])
);

