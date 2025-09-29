// src/services/Authen/googleSession.js
export async function createGoogleSession  (accessToken, refreshToken)  {
  try {
    console.log("Creating Google session with tokens:", { accessToken, refreshToken });
    const response = await fetch("https://localhost:7056/Authentication/google-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(response)
      throw new Error(errorData?.error || "Failed to create Google session");
    }

    const data = await response.json();
    // Lưu thông tin user + token
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (err) {
    console.error("Failed to create Google session:", err);
    throw err;
  }
};
