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