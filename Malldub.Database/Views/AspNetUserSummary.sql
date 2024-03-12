CREATE VIEW [dbo].[AspNetUserSummary]
  AS SELECT UserName, FirstName, LastName, Email, StatusId, AvatarUploadTempLocation FROM dbo.AspNetUsers
