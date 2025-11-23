const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function searchHotelsApi(payload, limit = 20, offset = 0) {
    
  try {
    const query = new URLSearchParams({ limit, offset }).toString();
   
    const response = await fetch(`${API_BASE_URL}/Hotel/search?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // trả về mảng hotel
  } catch (error) {
    console.error("Lỗi searchHotelsApi:", error);
    return [];
  }
}