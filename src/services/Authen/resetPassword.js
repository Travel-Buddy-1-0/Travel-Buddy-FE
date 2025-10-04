// services/Authen/resetPassword.js

export async function resetPassword(email) {
  try {
    const response = await fetch("https://localhost:7056/Authentication/resetpassword", {
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
     console.log(data)
    return data; // "Password reset email sent"
  } catch (err) {
    console.error("Reset password error:", err);
    throw err;
  }
}
