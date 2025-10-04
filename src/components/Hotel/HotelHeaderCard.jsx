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
    <div className="my-8 flex flex-col md:flex-row gap-6">
      {/* Left: Hotel Info */}
      <div className="flex-1 bg-white rounded-md shadow-sm p-6 space-y-3">
        {/* Tagline */}
        <div className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
          {hotel?.style?.type || "Mới được xây dựng gần đây"}
        </div>

        {/* Name & Stars */}
        <div className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
          <span>{hotel?.name || "Tên khách sạn"}</span>
          <div className="flex space-x-1">
            {stars.map((s) => (
              <Star key={s} size={16} className="text-yellow-400" weight="fill" />
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="text-sm text-gray-600">
          {hotel?.address || "Địa chỉ khách sạn"} -{" "}
          {coords.latitude && coords.longitude ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Trên bản đồ
            </a>
          ) : (
            <span className="text-blue-500 underline cursor-not-allowed">
              Đang tải bản đồ...
            </span>
          )}
        </div>
      </div>

      {/* Right: Rating & Criteria */}
      <div className="w-full md:w-1/3 bg-white rounded-md shadow-sm p-6 flex flex-col justify-between space-y-4">
        <div className="flex items-center space-x-12 mx-auto">
    <span className="bg-blue-900 text-white px-6 py-4 rounded font-bold">
      {(hotel.averageRating * 2).toFixed(1)}
    </span>
    <div className="flex items-center flex-col text-sm text-gray-600 mt-1">
      <span className="text-lg font-semibold text-gray-600">
        {getRatingLabel(hotel.averageRating * 2)}
      </span>
      <div className="flex mt-2 items-center">
        <Check size={16} className="text-blue-500 mr-1" />
        {reviewCount || "100"} bài đánh giá
      </div>
    </div>
  </div>

        {/* Criteria */}
        <div className="flex flex-wrap gap-2 mt-2">
          {hotel?.criteria?.length > 0
            ? hotel.criteria.map((c, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {c}
                </span>
              ))
            : null}
        </div>

        <a
          href="#"
          className="text-sm font-medium text-blue-500 hover:underline mt-3 mx-auto"
        >
          Đọc mọi bài đánh giá
        </a>
      </div>
    </div>
  );
}
