CREATE TABLE [Core].[Note] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [Subject]       NVARCHAR (256)  NOT NULL,
    [Email]         NVARCHAR (100) NULL,
    [FirstName]     NVARCHAR (50) NULL,
    [LastName]      NVARCHAR (50) NULL,
    [Comments]      VARCHAR (MAX) NOT NULL,
    [Sent]          BIT            NOT NULL,
    [IsPrivate]     BIT            NOT NULL,
    [Viewed]        BIT            NOT NULL,
    [NoteTypeId]    NVARCHAR (20)  NOT NULL,
    [ApplicationId] NVARCHAR (20)  NOT NULL,
    [DateEntered]   DATETIME       CONSTRAINT [DF_lm_Notes_DateEntered] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_lm_Notes] PRIMARY KEY CLUSTERED ([Id] ASC), 
    CONSTRAINT [FK_Note_NoteType] FOREIGN KEY ([NoteTypeId]) REFERENCES [Core].[NoteType]([Id]), 
    CONSTRAINT [FK_Note_MalldubApplication] FOREIGN KEY ([ApplicationId]) REFERENCES [Core].[MalldubApplication]([Id])
);

