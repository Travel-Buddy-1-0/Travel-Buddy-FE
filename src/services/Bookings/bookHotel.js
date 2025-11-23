const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function bookingHotel(bookingData) {
  try {
    // Lấy userId từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
   
 
    const userId = user.userId;
    console.log("Booking data being sent:", bookingData);
    // Gọi API
    const response = await fetch(`${API_BASE_URL}/Hotel/book?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi đặt phòng: ${response.status}`);
    }

    const data = await response.json();


    // Nếu muốn lưu lại booking info
    localStorage.setItem("booking", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}