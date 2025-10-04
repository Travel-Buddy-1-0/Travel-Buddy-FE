export async function getReviewsApi(hotelId, rating = null, limit = 20, offset = 0) {
  try {
    if (!hotelId) throw new Error("Missing hotelId");

    const params = new URLSearchParams({
      hotelId,
      
      limit,
      
      offset,
    });
    if (rating !== null) params.append("rating", rating);

    const response = await fetch(
      `https://travel-buddy-web.azurewebsites.net/Hotel/reviews?${params.toString()}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      let errorMessage = `Failed to fetch reviews (Status ${response.status})`;
      try {
        const errorData = await response.json();

        if (errorData?.error) errorMessage = errorData.error;
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }
      
    return await response.json();
  } catch (error) {
    console.error("GetReviews API error:", error);
    throw error;
  }
}
