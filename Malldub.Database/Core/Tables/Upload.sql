CREATE TABLE [Core].[Upload] (
		[Id]					INT           IDENTITY (1, 1) NOT NULL,
		[Description]			NVARCHAR (50) NOT NULL,
		[IsPrivate]				BIT           NOT NULL,
		[CategoryId]		    NVARCHAR (30) NOT NULL,
		[TypeId]      NVARCHAR(30) NOT NULL DEFAULT 'web.Image',
		[Name]					VARCHAR (255) NOT NULL,
		[OriginalFileName]		VARCHAR (255) NOT NULL,
		[Location]				VARCHAR (255) NOT NULL,
		[RelativeLocation]		VARCHAR (255) NULL,
		[Extension]				VARCHAR (2048)  NULL,
		[ContentLength]			BIGINT        NULL,
		[ContentType]			VARCHAR (50)  NULL,
		[LocationHttp]			VARCHAR (255) NULL,
		[ContainerName]			VARCHAR (50)  NULL,
		[DateEntered]			DATETIME      CONSTRAINT [DF_Upload_DateEntered] DEFAULT (getdate()) NULL,
		[DateUpdated]			DATETIME      CONSTRAINT [DF_Upload_DateUpdated] DEFAULT (getdate()) NULL,
		CONSTRAINT [PK_lm_ListingUpload]	  PRIMARY KEY CLUSTERED ([Id] ASC),
		CONSTRAINT [FK_Upload_UploadCategory] FOREIGN KEY ([CategoryId]) REFERENCES [Core].[UploadCategory] ([Id]),
		CONSTRAINT [FK_Upload_UploadType] FOREIGN KEY ([TypeId]) REFERENCES [Core].[UploadType] ([Id])
);

