export async function createFavoriteApi(userId, targetType, targetId) {
  try {
    console.log(userId+targetType+targetId)
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Access token not found, please login.");

    const response = await fetch("https://localhost:7056/api/Favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accessToken": accessToken, // backend của bạn dùng header này  
      },
      body: JSON.stringify({
        userId,
        targetType,
        targetId,
      }),
    });

    if (!response.ok) {
      let errorMessage = `Failed to create favorite (Status ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }

    return await response.json(); // Trả về FavoriteDto
  } catch (error) {
    console.error("CreateFavorite API error:", error);
    throw error;
  }
}
