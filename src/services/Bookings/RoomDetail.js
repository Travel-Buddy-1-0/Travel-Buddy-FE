const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getRoomDetail(roomId) {
  try {
    if (!roomId) {
      throw new Error("roomId is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/Room/${roomId}`, {
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


    return data;
  } catch (error) {
    console.error("❌ Error fetching room detail:", error);
    throw error;
  }
}