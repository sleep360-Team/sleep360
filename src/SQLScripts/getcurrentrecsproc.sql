CREATE PROCEDURE [dbo].[GetCurrentRecommendation]
(@UserID int)
AS
BEGIN
	SELECT * FROM dbo.Recommendation WHERE RecommendationID = (
		SELECT RecommendationID from dbo.UserRecommendation WHERE AccountID = @UserID
	)
END