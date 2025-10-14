
export async function cancelBooking(bookingId) {
  try {
    if (!bookingId) throw new Error("Booking ID không hợp lệ");

    // status = 0 => hủy phòng
    const response = await fetch(
      `https://travel-buddy-web.azurewebsites.net/Hotel/change-status-booking?bookingId=${bookingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Không thể hủy đặt phòng: ${msg}`);
    }

    const result = await response.text();
 
    return result;
  } catch (error) {
    console.error("❌ Lỗi khi hủy phòng:", error);
    throw error;
  }
}
