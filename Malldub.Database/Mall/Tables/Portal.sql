CREATE TABLE [Mall].[Portal] (
    [Id]            INT             IDENTITY (1, 1) NOT NULL,
	[MallId]	    NVARCHAR (128)  NOT NULL,
	[StatusId]      NVARCHAR (30)   NOT NULL,
	[TypeId]	    NVARCHAR (30)   NOT NULL,
    [Name]          NVARCHAR (50)   NOT NULL,
	[ContainerName] NVARCHAR(256)     NOT NULL,
    [Title]         NVARCHAR (100)  NULL,
    [Keywords]      NVARCHAR (1000) NULL,
    [DateEntered]   DATETIME        CONSTRAINT [DF_Portal_DateEntered] DEFAULT (getdate()) NULL,
    [DateUpdated]   DATETIME        CONSTRAINT [DF_Portal_DateUpdated] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_Portal_1] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Portal_Mall] FOREIGN KEY ([MallId]) REFERENCES [Mall].[Mall]([Id]), 
    CONSTRAINT [FK_Portal_MallPortalStatus] FOREIGN KEY ([StatusId]) REFERENCES [Mall].[MallPortalStatus]([Id]), 
    CONSTRAINT [FK_Portal_PortalType] FOREIGN KEY ([TypeId]) REFERENCES [Mall].[PortalType]([Id])
);

