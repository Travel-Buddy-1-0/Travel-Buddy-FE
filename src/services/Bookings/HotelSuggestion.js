
export const fetchSuggestions = async (limit = 4) => {
  try {
    const res = await fetch(`https://localhost:7056/Hotel/suggestions?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch suggestions");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
