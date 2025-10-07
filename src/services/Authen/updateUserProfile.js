export async function updateUserProfile(profileData) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Tokens not found, please login again");
    }

    // Chuẩn hóa dữ liệu profile (tránh undefined/null)
    const sanitizedProfile = {
      username: profileData.username ?? null,
      email: profileData.email ?? null,
      fullName: profileData.fullName ?? null,
      phoneNumber: profileData.phoneNumber ?? null,
      image: profileData.image ?? null,
      dateOfBirth: profileData.dateOfBirth ?? null, // YYYY-MM-DD
      sex: profileData.sex ?? null,
    };

    const payload = {
      auth: {
        accessToken,
        refreshToken,
      },
      profile: sanitizedProfile,
    };

    const response = await fetch(
      "https://travel-buddy-web.azurewebsites.net/user/updateInformation",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      let errorMessage = `Failed to update user profile (Status ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.title || errorData?.message) {
          errorMessage = errorData.title ?? errorData.message;
        }
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Nếu backend trả về auth mới, cập nhật localStorage
    if (data?.auth?.accessToken && data?.auth?.refreshToken) {
      localStorage.setItem("accessToken", data.auth.accessToken);
      localStorage.setItem("refreshToken", data.auth.refreshToken);
    }

    return data; // { auth, profile }
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}
