const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getGoogleLoginUrl() {
  try {
    const res = await fetch(`${API_BASE_URL}/Authentication/login-google`);
    if (!res.ok) throw new Error("Failed to get Google login URL");
 
    const url = await res.text(); // backend trả về URL redirect
    return url;
  } catch (error) {
   
    throw error;
  }
};

