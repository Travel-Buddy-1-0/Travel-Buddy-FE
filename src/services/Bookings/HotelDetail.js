export async function getHotelDetailApi(id) {
  try {
    if (!id) throw new Error("Hotel ID is required");

    const response = await fetch(
      `https://travel-buddy-web.azurewebsites.net/Hotel/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      let errorMessage = `Failed to fetch hotel detail (Status ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.error) errorMessage = errorData.error;
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data; // dữ liệu chi tiết khách sạn
  } catch (error) {
    console.error("GetHotelDetail API error:", error);
    throw error;
  }
}
