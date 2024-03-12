CREATE TABLE [Mall].[Mall] (
    [Id]          NVARCHAR(128)  NOT NULL,
    [Url]         NVARCHAR (100) NOT NULL,
    [Title]       NCHAR (10)     NULL,
    [DateEntered] DATETIME       CONSTRAINT [DF_Mall_DateEntered] DEFAULT (getdate()) NULL,
    [DateUpdated] DATETIME       CONSTRAINT [DF_Mall_DateTime] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_MALL] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Mall_Users] FOREIGN KEY ([Id]) REFERENCES [AspNetUsers]([Id])
);

