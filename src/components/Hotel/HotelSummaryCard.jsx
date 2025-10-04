import { useEffect, useState } from "react";
import { getHotelDetailApi } from "../../services/Bookings/HotelDetail";

export default function HotelSummaryCard({ hotelId }) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) return;

    const fetchHotel = async () => {
      setLoading(true);
      try {
        const data = await getHotelDetailApi(hotelId);

        // Xử lý image nếu dư dấu "
        if (data.image) {
          data.image = data.image.replace(/^"|"$/g, "");
        }

        // Parse style để lấy amenities
        if (data.style) {
          try {
            data.style = JSON.parse(data.style);
          } catch (e) {
            data.style = { amenities: [] };
          }
        }

        setHotel(data);
      } catch (err) {
        console.error("Lỗi load hotel detail:", err);
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) return <p>Đang tải thông tin khách sạn...</p>;
  if (!hotel) return <p>Không tìm thấy thông tin khách sạn.</p>;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-[350px]">
      {/* Ảnh khách sạn */}
      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />

      {/* Nội dung */}
      <div className="p-4 space-y-2">
        {/* Stars + Icon */}
      <div className="flex items-center space-x-1 text-yellow-500">
  {Array.from({ length: hotel.style?.stars || 2 }).map((_, i) => (
    <span key={i}>★</span>
  ))}
  <span className="bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5 rounded">👍</span>
</div>


        {/* Tên khách sạn */}
        <h2 className="text-lg font-bold">{hotel.name}</h2>

        {/* Địa chỉ */}
        <p className="text-gray-600 text-sm">{hotel.address}</p>

        {/* Vị trí */}
        <p className="text-green-600 text-sm">
          Vị trí xuất sắc — <span className="font-semibold">{hotel.averageRating.toFixed(1)}</span>
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {hotel.style?.amenities?.map((amenity, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full border border-gray-300"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
