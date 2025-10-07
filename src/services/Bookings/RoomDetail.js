export async function getRoomDetail(roomId) {
  try {
    if (!roomId) {
      throw new Error("roomId is required");
    }

    const response = await fetch(`https://travel-buddy-web.azurewebsites.net/api/Room/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Phòng với ID ${roomId} không tồn tại`);
      }
      throw new Error(`Lỗi khi lấy chi tiết phòng: ${response.status}`);
    }

    const data = await response.json();
    console.log("🏨 Room detail:", data);

    return data;
  } catch (error) {
    console.error("❌ Error fetching room detail:", error);
    throw error;
  }
}
