// src/api/unsplashApi.js
const UNSPLASH_KEY = "fxcJg7TtF1KfXyjpmHNGoI6IOHkpDlnJnpAdogfn7LU";

/**
 * Lấy chi tiết ảnh theo ID từ Unsplash
 * @param {string} id - ID của ảnh
 * @returns {Promise<Object>} - Dữ liệu ảnh đã chuẩn hoá
 */
export async function getUnsplashPhotoById(id) {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch photo");
    const data = await res.json();

    return {
      id: data.id,
      photographer: data.user.name,
      photographerLink: data.user.links.html,
      src: {
        large2x: data.urls.full,
        regular: data.urls.regular,
        small: data.urls.small,
      },
      alt: data.alt_description || "Travel Photo",
      description: data.description || data.alt_description || "Beautiful travel photo.",
    };
  } catch (err) {
    console.error("getUnsplashPhotoById error:", err);
    return null;
  }
}
