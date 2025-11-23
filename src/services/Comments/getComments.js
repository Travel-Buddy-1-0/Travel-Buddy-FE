const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getComments(blogId) {
  try {
    
    const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comments for blogId ${blogId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    return [];
  }
}