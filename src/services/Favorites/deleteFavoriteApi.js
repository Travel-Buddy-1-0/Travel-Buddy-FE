export async function deleteFavoriteApi(favoriteId) {
  if (!favoriteId) throw new Error("Favorite ID is required");

  try {
    const res = await fetch(`https://localhost:7056/api/Favorite/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      let errorMessage = `Failed to delete favorite (Status ${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log(data.message); // "Favorite deleted successfully"
    return data;
  } catch (err) {
    console.error("Delete favorite API error:", err);
    throw err;
  }
}
