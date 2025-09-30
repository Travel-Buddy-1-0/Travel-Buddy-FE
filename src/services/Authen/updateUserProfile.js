export async function updateUserProfile(profileData) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Tokens not found, please login again");
    }

    // Sanitize để tránh undefined/null
    const sanitizedProfile = {
      username: profileData.username ?? "",
      email: profileData.email ?? "",
      fullName: profileData.fullName ?? "",
      phoneNumber: profileData.phoneNumber ?? "",
      image: profileData.image ?? "",
      dateOfBirth: profileData.dateOfBirth ?? "",
      sex: profileData.sex ?? "",
    };

    const updateData = {
      auth: {
        accessToken,
        refreshToken,
      },
      profile: sanitizedProfile,
    };

    const response = await fetch(
      "https://localhost:7056/user/updateInformation",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      let errorMessage = `Failed to update user profile (Status ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Cập nhật token mới nếu backend trả về
    if (data?.auth) {
      localStorage.setItem("accessToken", data.auth.accessToken);
      localStorage.setItem("refreshToken", data.auth.refreshToken);
    }

    return data; // { auth, profile }
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}
