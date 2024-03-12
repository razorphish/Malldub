CREATE TABLE [Core].[MalldubApplication] (
    [Id]          NVARCHAR (20)  NOT NULL,
    [Name]        NVARCHAR (50)  NOT NULL,
    [Description] NVARCHAR (100) NOT NULL, 
    CONSTRAINT [PK_MalldubApplication] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [IX_MalldubApplicationName] UNIQUE NONCLUSTERED ([Name] ASC)
);