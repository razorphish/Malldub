CREATE TABLE [Defaults].[Default] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [IsPrimary]   BIT            NOT NULL,
    [DateEntered] DATETIME      CONSTRAINT [DF_Pinnacle_DateEntered] DEFAULT (getdate()) NOT NULL, 
    CONSTRAINT [PK_Default] PRIMARY KEY ([Id]),
);

