const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function createComment( commentData) {
  try {
  

    const response = await fetch(`${API_BASE_URL}/api/blogs/${commentData.blogId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create comment: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error creating comment:", error);
    throw error;
  }
}