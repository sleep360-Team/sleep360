CREATE PROCEDURE [dbo].[GetCurrentRecommendation]
(@UserID int)
AS
BEGIN
	SELECT * FROM dbo.Recommendation WHERE RecommendationID = (
		SELECT TOP 1 RecommendationID from dbo.UserRecommendation WHERE AccountID = @UserID AND
		StartDate < GETDATE() AND GETDATE() < EndDate
	)
END