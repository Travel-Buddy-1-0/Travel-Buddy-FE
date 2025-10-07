export async function getGoogleLoginUrl() {
  try {
    const res = await fetch("hhttps://travel-buddy-web.azurewebsites.net/Authentication/login-google");
    if (!res.ok) throw new Error("Failed to get Google login URL");
 
    const url = await res.text(); // backend trả về URL redirect
    return url;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
