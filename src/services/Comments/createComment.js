export async function createComment( commentData) {
  try {
  

    const response = await fetch(`https://localhost:7056/api/blogs/${commentData.blogId}/comments`, {
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
