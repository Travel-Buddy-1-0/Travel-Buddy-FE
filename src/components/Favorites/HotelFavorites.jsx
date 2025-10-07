import { useState, useEffect } from "react";
import { Heart } from "phosphor-react";
import { getHotelDetailApi } from "../../services/Bookings/HotelDetail";
import { deleteFavoriteApi } from "../../services/Favorites/deleteFavoriteApi";
import { Link } from "react-router-dom"; // dùng để link tới trang booking

export default function HotelFavorites({ favorites }) {
  const [hotels, setHotels] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const list = await Promise.all(
          favorites.map(async (f) => {
            const detail = await getHotelDetailApi(f.targetId);
            if (!detail) return null;

            const imageUrl = detail.image?.replace(/^"|"$/g, "") || `https://picsum.photos/400/200?random=${f.targetId}`;
           
            return {
              id: detail.hotelId || detail.id,
              favoriteId: f.favoriteId,
              name: detail.name || f.targetName || "Không có tên",
              description: detail.description || "Không có mô tả",
              image: imageUrl,
              address: detail.address,
              averageRating: detail.averageRating,
              style: detail.style ? JSON.parse(detail.style) : null,
           
            };
          })
        );
        setHotels(list.filter(Boolean));
      } catch (err) {
        console.error("Error fetching hotel details:", err);
      }
    };

    if (favorites.length > 0) fetchHotelDetails();
  }, [favorites]);

  const handleUnfavorite = async (favoriteId) => {
    try {
      await deleteFavoriteApi(favoriteId);
      setHotels(prev => prev.filter(h => h.favoriteId !== favoriteId));
      if (selectedItem?.favoriteId === favoriteId) setSelectedItem(null);
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  if (favorites.length === 0) return <p className="text-gray-500">Chưa có hotel yêu thích nào.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách yêu thích</h1>

      {/* Grid */}
      {!selectedItem && hotels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover cursor-pointer"
                onClick={() => setSelectedItem(hotel)}
              />
              <div className="p-4">
                <h2 className="font-bold text-lg">{hotel.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
                {hotel.address && <p className="text-sm text-gray-500 mt-1">📍 {hotel.address}</p>}
               {hotel.style?.stars && (
  <p className="text-sm text-gray-500 mt-1">
    {Array(hotel.style.stars).fill("⭐").join("")}
  </p>
)}

                {hotel.style && hotel.style.type && <p className="text-sm text-gray-500 mt-1">🏨 {hotel.style.type}</p>}
              </div>
              <div className="flex justify-between items-center p-4 pt-0">
                <button
  onClick={() => handleUnfavorite(hotel.favoriteId)}
  className="flex items-center gap-1"
>
  <Heart weight="fill" className="text-red-500 cursor-pointer" />
  <span className="text-xs text-red-400"></span>
</button>

                <Link
                  to={`/booking/hotel/${hotel.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chi tiết hotel */}
      {selectedItem && (
        <div className="mt-8 bg-white shadow rounded-2xl p-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-sm text-blue-600 mb-4"
          >
            ← Quay lại danh sách
          </button>
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
          <p className="text-gray-600 mb-2">{selectedItem.description}</p>
          {selectedItem.address && <p className="text-gray-500 mb-1">📍 {selectedItem.address}</p>}
          {selectedItem.averageRating && <p className="text-gray-500 mb-1">⭐ {selectedItem.averageRating.toFixed(1)}</p>}
          {selectedItem.style && selectedItem.style.type && <p className="text-gray-500 mb-1">🏨 {selectedItem.style.type} - {selectedItem.style.stars} sao</p>}
      
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleUnfavorite(selectedItem.favoriteId)}
              className="flex cursor-pointer items-center gap-1 text-red-500 hover:text-red-600 transition"
            >
              <Heart weight="fill" size={20} />
              Hủy yêu thích
            </button>
            <Link
              to={`/booking/hotel/${selectedItem.id}`}
              className="text-blue-600 hover:underline"
            >
              Xem chi tiết đặt phòng
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
