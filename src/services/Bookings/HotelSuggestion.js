const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSuggestions = async (limit = 4) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Hotel/suggestions?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch suggestions");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};