const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function getVoucherByCode(code) {
    
  try {

    const response = await fetch(`${API_BASE_URL}/Hotel/vouchers/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Không thể lấy thông tin voucher");
    }

    // Trả về dữ liệu voucher
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Lỗi khi lấy voucher:", err.message);
    return null;
  }
}