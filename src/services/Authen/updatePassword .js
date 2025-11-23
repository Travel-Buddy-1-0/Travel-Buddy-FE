const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function  updatePassword(newPassword) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }
    console.log("");

    const response = await fetch(`${API_BASE_URL}/Authentication/updatepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AccessToken: accessToken,
        RefreshToken: refreshToken || "",
        NewPassword: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || "Failed to update password");
    }

    const result = await response.json();
    return result; // "Password updated successfully"
  } catch (error) {
    console.error("Update password error:", error);
    throw error;
  }
};


