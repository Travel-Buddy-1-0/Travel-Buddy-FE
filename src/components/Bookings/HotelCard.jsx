import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "phosphor-react";
import { createFavoriteApi } from "../../services/Favorites/createFavoriteApi";
import { getFavorites } from "../../services/Favorites/getFavorites";


export default function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.userId;
  const targetType = "HOTEL";

  // ✅ Kiểm tra xem hotel này đã được yêu thích chưa
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const result = await getFavorites(userId, targetType);
        if (result?.data?.some((f) => f.targetId == hotel.hotelId)) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.error("❌ Error loading favorites:", err);
      }
    })();
  }, [hotel.hotelId, userId]);

  // ✅ Hàm xử lý khi click tym
  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Ngăn event navigate khi click vào card
    if (!userId) {
      alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
      return;
    }

    setLoading(true);
    try {
      if (!isFavorite) {
         const hotelId = String(hotel.hotelId);
        await createFavoriteApi(userId, targetType, hotelId);
        setIsFavorite(true);
      } else {
        // TODO: Thêm API xóa sau
        alert("Vào trang profile để xóa");
      }
    } catch (err) {
      console.error("❌ Error updating favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Xử lý image
  const image = hotel.image?.replace(/^"|"$/g, "");

  // ✅ Parse style
  let amenities = [];
  let stars = 0;
  try {
    const styleObj = hotel.style ? JSON.parse(hotel.style) : null;
    amenities = styleObj?.amenities || [];
    stars = styleObj?.stars || 0;
  } catch {
    amenities = [];
    stars = 0;
  }

  // ✅ Tính giá trung bình USD
  const usdPrice =
    hotel.rooms && hotel.rooms.length > 0
      ? (
          hotel.rooms.reduce((sum, r) => sum + r.pricePerNight, 0) /
          hotel.rooms.length /
          26500
        ).toFixed(2)
      : 0;

  return (
    <div className="border rounded-lg p-4 border-gray-300 flex flex-col sm:flex-row gap-4 shadow-sm bg-white cursor-pointer" onClick={() => navigate(`/booking/hotel/${hotel.hotelId}`)}>
      {/* Ảnh */}
      <div className="relative w-full sm:w-1/3 h-48 sm:h-auto flex-shrink-0">
        <img
          src={image}
          alt={hotel.name}
          className="rounded-md w-full h-full object-cover"
        />
       <button
          onClick={handleFavoriteClick}
          disabled={loading}
          className={`absolute top-2 right-2 p-2 rounded-full shadow transition z-10 ${
            isFavorite ? "bg-rose-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart
            size={20}
            weight={isFavorite ? "fill" : "regular"}
          />
        </button>
      </div>

      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-bold text-blue-600 flex items-center gap-2">
            {hotel.name}
            <span className="text-yellow-500 text-sm">
              {"⭐".repeat(stars)}
            </span>
          </h1>

          <div className="text-sm text-blue-600 mt-2 flex items-center gap-2">
            <span>{hotel.address}</span>
            <button className="underline hover:text-blue-800 hidden sm:block">
              Xem trên bản đồ
            </button>
          </div>

          <div className="flex flex-wrap gap-2 my-3">
            {amenities.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {hotel.description && (
            <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
              {hotel.description}
            </p>
          )}
        </div>
        {/* Price section for mobile */}
        <div className="sm:hidden mt-4 pt-4 border-t flex justify-between items-center">
            <div className="text-lg font-bold text-red-600">US${usdPrice}</div>
            <button
                className="bg-blue-500 text-white px-4 py-2 font-semibold cursor-pointer rounded-md"
            >
                Xem chỗ trống
            </button>
        </div>
      </div>

      {/* Giá & đánh giá (Desktop) */}
      <div className="hidden sm:flex flex-col justify-between text-right items-end w-48 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-sm font-semibold text-right">{hotel.reviewText || "Good"}</span>
            <span className="bg-blue-900 text-white px-2 py-1 rounded font-bold">
              {(hotel.averageRating * 2).toFixed(1)}
            </span>
          </div>
          <div className="text-sm text-gray-500">{hotel.reviews || 0} đánh giá</div>
        </div>
        <div className="text-right">
          {hotel.oldPrice && (
            <div className="text-sm text-gray-400 line-through">
              US${hotel.oldPrice}
            </div>
          )}
          <div className="text-xl font-bold text-red-600">US${usdPrice}</div>

          <div className="text-xs text-gray-500 mb-1">Đã bao gồm thuế và phí</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 font-semibold cursor-pointer rounded-md w-full"
          >
            Xem chỗ trống
          </button>
        </div>
      </div>
    </div>
  );
}
