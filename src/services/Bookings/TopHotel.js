// fetchTopHotels.js
export const fetchTopHotels = async (limit = 4) => {
  try {
    const res = await fetch(`https://localhost:7056/Hotel/top?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch top hotels");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching top hotels:", error);
    return [];
  }
};
