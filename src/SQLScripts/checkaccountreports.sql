USE [sleep360_test]
GO
/****** Object:  StoredProcedure [dbo].[CheckAccountReports]    Script Date: 5/9/2025 1:49:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[CheckAccountReports]
    @AccountID INT,
	@ReportMeetsCriteria BIT OUTPUT
AS
BEGIN
    DECLARE @ReportCount INT;
    DECLARE @OldReportCount INT;

    SELECT @ReportCount = COUNT(*)
    FROM Reports
    WHERE UserID = @AccountID;

    SELECT @OldReportCount = COUNT(*)
    FROM Reports
    WHERE UserID = @AccountID
      AND [Time Reported] <= DATEADD(DAY, -3, GETDATE());

    IF @ReportCount >= 3 AND @OldReportCount >= 1
    BEGIN
        SET @ReportMeetsCriteria = 1; 
    END
    ELSE
    BEGIN
        SET @ReportMeetsCriteria = 0; 
    END
END;
