export async function searchHotelsApi(payload, limit = 20, offset = 0) {
    
  try {
    const query = new URLSearchParams({ limit, offset }).toString();
   
    const response = await fetch(`https://travel-buddy-web.azurewebsites.net/Hotel/search?${query}`, {
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
