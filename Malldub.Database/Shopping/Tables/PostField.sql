CREATE TABLE [Shopping].[PostField] (
    [PostFieldId]          INT            IDENTITY (1, 1) NOT NULL,
    [PostFieldSectionId]   INT            NOT NULL,
    [ListPortalCategoryId] INT            NOT NULL,
    [Name]                 NVARCHAR (30)  NOT NULL,
    [DefaultValue]         NVARCHAR (100) NULL,
    [IsRequired]           BIT            NULL,
    [Option1]              NVARCHAR (50)  NULL,
    [Option2]              NVARCHAR (50)  NULL,
    [Option3]              NVARCHAR (50)  NULL,
    [Option4]              NVARCHAR (50)  NULL,
    CONSTRAINT [PK_PostField] PRIMARY KEY CLUSTERED ([PostFieldId] ASC)
);

