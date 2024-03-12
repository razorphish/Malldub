CREATE TABLE [Core].[Email] (
    [Id]           INT IDENTITY,
    [EmailAddress] NVARCHAR(100) NOT NULL,
    [DateEntered]  DATETIME      NULL DEFAULT getDate(),
    CONSTRAINT [PK_Email_1] PRIMARY KEY CLUSTERED ([Id] ASC)
);
