const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// services/Authen/resetPassword.js

export async function resetPassword(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/Authentication/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
     
      throw new Error(errorData.title || "Reset password failed");
    }

    const data = await response.json();
    
    return data; // "Password reset email sent"
  } catch (err) {
    console.error("Reset password error:", err);
    throw err;
  }
}

