import React from "react";
import { useNavigate } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  // xử lý image
  const image = hotel.image?.replace(/^"|"$/g, ""); // loại bỏ dấu " dư

  // parse style để lấy amenities
  let amenities = [];
  try {
    const styleObj = hotel.style ? JSON.parse(hotel.style) : null;
    amenities = styleObj?.amenities || [];
  } catch (err) {
    amenities = [];
  }
  // tính giá trung bình USD
const usdPrice =
  hotel.rooms && hotel.rooms.length > 0
    ? (hotel.rooms.reduce((sum, r) => sum + r.pricePerNight, 0) / hotel.rooms.length / 26500).toFixed(2)
    : 0;


  return (
    <div className="border rounded-lg px-4 py-4 border-gray-300 flex gap-4 shadow-sm bg-white">
      {/* Ảnh */}
      <div className="relative w-1/3">
        <img
          src={image}
          alt={hotel.name}
          className="rounded-md w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-105">
          <i className="fa-regular fa-heart text-gray-600"></i>
        </button>
      </div>

      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-bold text-blue-600 flex items-center gap-2">
            {hotel.name}
            <span className="text-yellow-500 text-sm">
              {"⭐".repeat(Math.round(hotel.averageRating))}
            </span>
          </h1>

          <div className="text-sm text-blue-600 mt-3 flex items-center gap-2">
            <span>{hotel.address}</span>
            <button className="underline hover:text-blue-800">Xem trên bản đồ</button>
          </div>

          <div className="flex flex-wrap gap-2 my-4">
            {amenities.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-400 text-white text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6">
            {hotel.description && (
              <p className="text-sm text-gray-600">{hotel.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Giá & đánh giá */}
      <div className="flex flex-col justify-between text-right items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{hotel.reviewText}</span>
            <span className="bg-blue-900 text-white px-2 py-1 rounded font-bold">
              {(hotel.averageRating * 2).toFixed(1)}
            </span>
            
          </div>
          <div className="text-sm text-gray-500">{hotel.reviews} đánh giá</div>
        </div>
        <div className="text-right">
          {hotel.oldPrice && (
            <div className="text-sm text-gray-400 line-through">
              US${hotel.oldPrice}
            </div>
          )}
         <div className="text-xl font-bold text-red-600">US${usdPrice}</div>

          <div className="text-xs text-gray-500">Đã bao gồm thuế và phí</div>
          <button
            onClick={() => navigate(`/booking/hotel/${hotel.hotelId}`)}
            className="bg-blue-500 text-white px-4 py-2 font-semibold cursor-pointer rounded-md mt-2"
          >
            Xem chỗ trống
          </button>
        </div>
      </div>
    </div>
  );
}
