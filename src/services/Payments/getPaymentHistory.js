const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function  getPaymentHistory() {
  try {
        const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) throw new Error("User not logged in");
    const response = await fetch(`${API_BASE_URL}/api/Payment/history/${user.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: Không thể lấy lịch sử thanh toán`);
    }

    const data = await response.json();
   
    return data;
  } catch (error) {
    
    return null;
  }
}

// Gọi thử
getPaymentHistory(3);