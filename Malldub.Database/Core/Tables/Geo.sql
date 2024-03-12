CREATE TABLE [Core].[Geo]
(
  [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  [Alias] NVARCHAR(100) NULL,
  [City] NVARCHAR (50),
  [CountryCode] NVARCHAR(10),
  [Isp] NVARCHAR(50),
  [Latitude] DECIMAL(8, 6),
  [Longitude] DECIMAL(9, 6),
  [IpAddress] NVARCHAR(30),
  [Region] NVARCHAR(15),
  [RegionName] NVARCHAR(50),
  [Status] NVARCHAR(30),
  [TimeZone] NVARCHAR(50),
  [Zip] NVARCHAR(10),
  [Organization] NVARCHAR(50),
  [OriginalDevice] NVARCHAR(256),
  [DateEntered] DATETIME DEFAULT getDate()
)
