export async function confirmRegisterApi(payload) {
  try {
    const body = {
      access_token: payload.accessToken,
      refresh_token: payload.refreshToken,
      token_type: payload.tokenType,
      type: payload.type,
      expires_at: payload.expiresAt,
      expires_in: payload.expiresIn,
    };

    console.log("Final body gửi BE:", body);

    const response = await fetch("https://travel-buddy-web.azurewebsites.net/Authentication/confirmRegister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    

    return await response.json();
  } catch (err) {
    console.error("ConfirmRegister API error:", err);
    throw err;
  }
}
