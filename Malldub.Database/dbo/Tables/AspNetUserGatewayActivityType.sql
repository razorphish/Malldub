CREATE TABLE [dbo].[AspNetUserGatewayActivityType]
(
	[Id] NVARCHAR(20) NOT NULL PRIMARY KEY, 
	[FriendlyName] NVARCHAR(30) NOT NULL
)

GO

CREATE UNIQUE INDEX [IX_AspNetUserGatewayActivityType_FriendlyName] ON [dbo].[AspNetUserGatewayActivityType] ([FriendlyName])
