ALTER PROCEDURE [dbo].[CreateReport]
    @TimeReported DATETIME,
    @NumberHours FLOAT,
    @NumberInterrupts INT,
	@Comments NVARCHAR(MAX),
    @QualitySleep NVARCHAR(255),
	@Userid INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO dbo.Reports ([Time Reported], [Number Hours], [Number Interruptions], [Quality of Sleep], [Comments], [UserID])
        VALUES (@TimeReported, @NumberHours, @NumberInterrupts, @QualitySleep, @Comments, @Userid);
    END TRY
    BEGIN CATCH
        -- Handle errors
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END

CREATE PROCEDURE CheckAccountReports
    @AccountID INT
AS
BEGIN
    -- Declare variables to hold the counts
    DECLARE @ReportCount INT;
    DECLARE @OldReportCount INT;

    -- Get the count of reports associated with the given AccountID
    SELECT @ReportCount = COUNT(*)
    FROM Reports
    WHERE UserID = @AccountID;

    -- Get the count of reports where Time Reported is at least 7 days ago
    SELECT @OldReportCount = COUNT(*)
    FROM Reports
    WHERE UserID = @AccountID
      AND [Time Reported] <= DATEADD(DAY, -7, GETDATE());

    -- Check if there are at least 7 reports and at least 1 report with Time Reported >= 7 days ago
    IF @ReportCount >= 7 AND @OldReportCount >= 1
    BEGIN
        PRINT 'Account has at least 7 reports and at least 1 report with Time Reported >= 7 days ago.';
    END
    ELSE
    BEGIN
        PRINT 'Account does not meet the criteria.';
    END
END;

CREATE PROCEDURE AddUserRecommendationToAccount
    @UserRecommendationID INT,
    @AccountID INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        IF NOT EXISTS (SELECT 1 FROM Account_UserRecommendations WHERE UserRecommendationID = @UserRecommendationID AND AccountID = @AccountID)
        BEGIN
            INSERT INTO Account_UserRecommendations(UserRecommendationID, AccountID)
            VALUES (@UserRecommendationID, @AccountID);

            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
             RAISERROR('The UserRecommendationID and AccountID combination already exists.', 16, 1);
        END
    END TRY
    BEGIN CATCH
        -- rollback :(
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END
		-- details of error 
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        PRINT 'Error: ' + @ErrorMessage;
        THROW @ErrorSeverity, @ErrorMessage, @ErrorState;
    END CATCH
END;

CREATE PROCEDURE [dbo].[DeleteReport]
(@ReportID int)
AS
BEGIN

	IF(NOT EXISTS (SELECT * FROM Reports WHERE @ReportID = ReportID))
	BEGIN
		RAISERROR('Report does not exist', 14, 1)
		RETURN 1
	END

	DELETE FROM dbo.Reports WHERE ReportID = @ReportID;

	RETURN 0
END