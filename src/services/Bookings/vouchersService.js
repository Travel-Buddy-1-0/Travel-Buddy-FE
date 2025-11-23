const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function fetchVouchers() {
  try {
    const res = await fetch(`${API_BASE_URL}/Hotel/vouchers`);
    if (!res.ok) throw new Error("Không thể lấy dữ liệu voucher");
    return await res.json();
  } catch (error) {
    console.error("Lỗi fetch vouchers:", error);
    return [];
  }
}