
export async function getComments(blogId) {
  try {
    
    const response = await fetch(`https://localhost:7056/api/blogs/${blogId}/comments`, {
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
