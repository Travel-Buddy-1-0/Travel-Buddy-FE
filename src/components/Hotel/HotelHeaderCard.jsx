import { useEffect, useState } from "react";
import { Check, Star } from "phosphor-react";
import { getCoordinates } from "../../services/Map/Coordinates";


export default function HotelHeaderCard({ hotel ,reviewCount}) {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  function getRatingLabel(score) {
    if (score < 7) return "Trung bình";
    if (score >= 7 && score < 8) return "Tốt";
    if (score >= 8 && score < 9) return "Rất tốt";
    if (score >= 9 && score <= 10) return "Xuất sắc";
    return "Chưa đánh giá";
  }
  useEffect(() => {
    async function fetchCoords() {
      if (hotel?.address) {
        const result = await getCoordinates(hotel.address);
        if (result) setCoords(result);
      }
    }
    fetchCoords();
  }, [hotel?.address]);

  const stars = Array.from({ length: hotel?.stars || 4 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left: Hotel Info */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6 space-y-3 border">
        <div className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
          {hotel?.style?.type || "Hotel"}
        </div>

        <div className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{hotel?.name || "Tên khách sạn"}</span>
          <div className="flex">
            {stars.map((s) => (
              <Star key={s} size={16} className="text-yellow-400" weight="fill" />
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {hotel?.address || "Địa chỉ khách sạn"} -{" "}
          {coords.latitude && coords.longitude ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Xem bản đồ
            </a>
          ) : (
            <span className="text-gray-400">Đang tải bản đồ...</span>
          )}
        </div>
      </div>

      {/* Right: Rating & Criteria */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm p-6 flex flex-col justify-center items-center space-y-4 border">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="bg-blue-900 text-white text-2xl font-bold p-4 rounded-lg">
            {(hotel.averageRating * 2).toFixed(1)}
          </span>
          <div className="text-sm text-gray-600">
            <span className="text-lg font-semibold text-gray-800">
              {getRatingLabel(hotel.averageRating * 2)}
            </span>
            <div className="mt-1">
              từ {reviewCount || 0} bài đánh giá
            </div>
          </div>
        </div>

        <a href="#reviews" className="text-sm font-medium text-blue-500 hover:underline">
          Đọc mọi bài đánh giá
        </a>
      </div>
    </div>
  );
}
