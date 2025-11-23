const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// authService.js
export async function registerTraveler(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/Authentication/register`, {
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
    
    return await response.json(); // Trả về dữ liệu session từ API
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
}


