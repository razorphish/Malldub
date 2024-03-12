CREATE TABLE [Core].[Phone] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [TypeId]      NVARCHAR (30) NOT NULL,
    [Number]      NVARCHAR (20) NOT NULL,
    [DateEntered] DATETIME      NULL,
    CONSTRAINT [PK_Phone] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Phone_PhoneType] FOREIGN KEY ([TypeId]) REFERENCES [Core].[PhoneType] ([Id])
);

