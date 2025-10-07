// src/api/unsplashApi.js
const UNSPLASH_KEY = "fxcJg7TtF1KfXyjpmHNGoI6IOHkpDlnJnpAdogfn7LU";
const PER_PAGE = 10;

/**
 * Fetch ảnh từ Unsplash API
 * @param {number} pageToFetch - số trang muốn lấy
 * @param {string} query - từ khóa tìm kiếm
 * @returns {Promise<Array>} danh sách ảnh đã được map lại
 */
export async function fetchUnsplash(pageToFetch = 1, query = "travel") {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=${PER_PAGE}&page=${pageToFetch}&client_id=${UNSPLASH_KEY}`
    );

    if (!res.ok) {
      throw new Error(`Unsplash API error: ${res.status}`);
    }

    const data = await res.json();

    return data.results.map((photo) => ({
      id: photo.id,
      title: photo.user.name || "Travel Photo",
      description: photo.alt_description || "Travel image",
      image: photo.urls.regular,
    }));
  } catch (err) {
    console.error("❌ Fetch Unsplash Error:", err);
    return [];
  }
}
