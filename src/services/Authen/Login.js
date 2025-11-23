const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function loginApi({ email, password }) {
  try {

    
    const response = await fetch(`${API_BASE_URL}/Authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
}

