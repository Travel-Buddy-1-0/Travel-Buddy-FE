// authService.js
export async function registerTraveler(email, password) {
  try {
    const response = await fetch("https://travel-buddy-web.azurewebsites.net/Authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Registration failed");
    }
     console.log("Register response:", response);
    return await response.json(); // Trả về dữ liệu session từ API
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
}
