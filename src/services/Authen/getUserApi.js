export async function getUserApi() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Access token not found, please login.");

    const response = await fetch("https://localhost:7056/Authentication/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accessToken": accessToken, 
      },
    });

    if (!response.ok) {
      let errorMessage = `Failed to fetch user (Status ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.error) errorMessage = errorData.error;
      } catch {
        console.warn("No JSON in response body for error");
      }
      throw new Error(errorMessage);
    }

    return await response.json(); // UserDto
  } catch (error) {
    console.error("GetUser API error:", error);
    throw error;
  }
}
