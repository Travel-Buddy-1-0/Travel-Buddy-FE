export async function loginApi({ email, password }) {
  try {

    
    const response = await fetch("https://travel-buddy-web.azurewebsites.net/Authentication/login", {
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
