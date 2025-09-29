export async function getUserApi(accessToken) {
  try {
    const response = await fetch(
      `https://localhost:7056/Authentication/getUser?accessToken=${accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data; // UserDto
  } catch (error) {
    console.error("GetUser API error:", error);
    throw error;
  }
}
