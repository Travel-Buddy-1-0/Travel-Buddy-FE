export async function getCoordinates(address) {
  if (!address) return null;

  const API_KEY = "8cc573fcb2bd475487f7f89e4334a110"; // Thay bằng API key của bạn
  const encodedAddress = encodeURIComponent(address);

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const location = data.features[0].properties;
      return { latitude: location.lat, longitude: location.lon };
    } else {
      console.warn("Không tìm thấy tọa độ cho địa chỉ:", address);
      return null;
    }
  } catch (error) {
    console.error("Lỗi getCoordinates GeoApify:", error);
    return null;
  }
}
