export async function  getPaymentHistory() {
  try {
        const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) throw new Error("User not logged in");
    const response = await fetch(`https://travel-buddy-web.azurewebsites.net/api/Payment/history/${user.userId}`, {
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
