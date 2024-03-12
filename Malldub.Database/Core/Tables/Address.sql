CREATE TABLE [Core].[Address] (
    [Id]          INT             IDENTITY (1, 1) NOT NULL,
    [Address1]    NVARCHAR (50)   NOT NULL,
    [Address2]    NVARCHAR (50)   NULL,
    [City]        NVARCHAR (50)   NOT NULL,
    [State]       CHAR(2)         NOT NULL,
    [ZipCode]     NVARCHAR (12)   NOT NULL,
    [Longitude]   DECIMAL  (12, 7) NULL,
    [Latitude]    DECIMAL  (12, 7) NULL,
    [County]      NVARCHAR (30)   NULL,
    [Country]     NVARCHAR (50)   NULL,
    [DateEntered] DATETIME        CONSTRAINT [DF_Address_DateEntered] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_mar_Address]   PRIMARY KEY CLUSTERED ([Id] ASC), 
    CONSTRAINT [FK_Address_State] FOREIGN KEY ([State]) REFERENCES [Core].[State]([Id])
   -- CONSTRAINT [FK_Address_ZipCode] FOREIGN KEY ([ZipCode]) REFERENCES [Core].[ZipCode]([Id])
);

