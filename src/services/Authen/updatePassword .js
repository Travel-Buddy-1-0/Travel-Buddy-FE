
export async function  updatePassword(newPassword) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch("https://travel-buddy-web.azurewebsites.net/Authentication/updatepassword", {
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
