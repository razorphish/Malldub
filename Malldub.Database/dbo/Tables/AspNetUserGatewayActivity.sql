CREATE TABLE [dbo].[AspNetUserGatewayActivity]
(
	[Id] INT NOT NULL PRIMARY KEY, 
	[AspNetUserGatewayId] INT NOT NULL, 
	[AspNetUserGatewayActivityTypeId] NVARCHAR(20) NOT NULL, 
	CONSTRAINT [FK_AspNetUserGatewayActivity_Activity] FOREIGN KEY ([Id]) REFERENCES [Core].[Activity]([Id]), 
	CONSTRAINT [FK_AspNetUserGatewayActivity_AspNetUserGateway] FOREIGN KEY ([AspNetUserGatewayId]) REFERENCES [dbo].[AspNetUserGateway]([Id]), 
	CONSTRAINT [FK_AspNetUserGatewayActivity_AspNetUserGatewayType] FOREIGN KEY ([AspNetUserGatewayActivityTypeId]) REFERENCES [dbo].[AspNetUserGatewayActivityType]([Id])
)
