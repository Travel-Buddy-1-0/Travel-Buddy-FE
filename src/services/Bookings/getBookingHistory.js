const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getBookingHistory(limit = 20, offset = 0) {
  try {
    // 🔹 Lấy userId từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      throw new Error("User not logged in");
    }

    const userId = user.userId;
 
    // 🔹 Gọi API
    const response = await fetch(
      `${API_BASE_URL}/Hotel/bookings/history?userId=${userId}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Lỗi khi lấy lịch sử đặt phòng: ${response.status}`);
    }

    const data = await response.json();

  
    const activeBookings = data.filter((booking) => booking.status === 1);

    

    return activeBookings;
  } catch (error) {
    console.error("❌ Error fetching booking history:", error);
    throw error;
  }
}