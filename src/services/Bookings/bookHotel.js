export async function bookingHotel(bookingData) {
  try {
    // Lấy userId từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
   
    console.log(bookingData)
    const userId = user.userId;

    // Gọi API
    const response = await fetch(`https://travel-buddy-web.azurewebsites.net/Hotel/book?userId=${userId}`, {
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
    console.log("Booking successful:", data);

    // Nếu muốn lưu lại booking info
    localStorage.setItem("booking", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
