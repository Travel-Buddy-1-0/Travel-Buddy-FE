// services/UserService.js
export async function updateUserProfile(userId, updateData) {
  try {
    const response = await fetch(`https://localhost:7056/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}
