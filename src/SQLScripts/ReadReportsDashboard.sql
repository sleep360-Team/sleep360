USE [sleep360_test]
GO
/****** Object:  StoredProcedure [dbo].[ReadReportsDashboard]    Script Date: 5/11/2025 9:34:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[ReadReportsDashboard]
	@UserID int
AS
	SELECT [Time Reported], [Number Hours], [FollowingRec]
	FROM dbo.Reports
	WHERE UserID = @UserID AND GETDATE() - [Time Reported] <= 7