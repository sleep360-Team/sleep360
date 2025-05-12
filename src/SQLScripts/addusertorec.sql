ALTER PROCEDURE [dbo].[AddUserRecommendationToAccount]
    @RecommendationID INT,
    @AccountID INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        BEGIN
            -- new recommendation
            INSERT INTO UserRecommendation (RecommendationID, AccountID, StartDate, EndDate)
            VALUES (@RecommendationID, @AccountID, GETDATE(), DATEADD(DAY, 7, GETDATE()));

            COMMIT TRANSACTION;
            RETURN 0;
        END
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        PRINT 'Error: ' + @ErrorMessage;
        THROW 50001, @ErrorMessage, @ErrorState;
    END CATCH
END;