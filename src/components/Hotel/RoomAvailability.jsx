import { useState } from "react";
import { Calendar, Users } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function RoomAvailability({ rooms }) {
  const navigate = useNavigate();

  // State cho ngày check-in / check-out
  const [userCheckIn, setUserCheckIn] = useState("2025-09-25");
  const [userCheckOut, setUserCheckOut] = useState("2025-10-15");

  // State cho filter số khách
  const [filterGuests, setFilterGuests] = useState(null);

  // Hàm check phòng có thể đặt không
  const isRoomAvailable = (room) => {
    if (!room.lstCheckoutDate) return true;

    const checkoutDate = new Date(room.lstCheckoutDate);
    const checkInDate = new Date(userCheckIn);
    const checkOutDate = new Date(userCheckOut);

    if (checkoutDate >= checkInDate && checkoutDate <= checkOutDate) {
      return false;
    }
    return true;
  };

  const filteredRooms = rooms
    .filter(isRoomAvailable)
    .filter((room) => (filterGuests ? room.capacity === filterGuests : true))
    .sort((a, b) => a.capacity - b.capacity);

  return (
    <div className="my-14 bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6">
      <div className="my-6">
        <h2 className="text-xl font-bold mb-3">Phòng trống</h2>
        <div className="text-sm text-gray-500 mb-3">
          Giá đã được đổi qua USD
        </div>

        {/* Bộ lọc ngày + khách */}
        <div className="flex border border-blue-400 rounded-xl overflow-hidden shadow-md max-w-4xl bg-white">
          {/* Ngày */}
          <div className="flex items-center gap-2 px-4 py-2 border-r border-gray-200 flex-1">
            <Calendar size={20} className="text-gray-600" />
            <input
              type="date"
              value={userCheckIn}
              onChange={(e) => setUserCheckIn(e.target.value)}
              className="text-sm text-gray-800 border-none focus:ring-2 focus:ring-blue-400 rounded-md px-2 py-1 transition"
            />
            <span className="text-gray-500">—</span>
            <input
              type="date"
              value={userCheckOut}
              onChange={(e) => setUserCheckOut(e.target.value)}
              className="text-sm text-gray-800 border-none focus:ring-2 focus:ring-blue-400 rounded-md px-2 py-1 transition"
            />
          </div>

          {/* Chọn số khách & phòng */}
          <div className="flex items-center gap-2 px-4 py-2 flex-1">
            <Users size={20} className="text-gray-600" />
            <select
              value={filterGuests || ""}
              onChange={(e) =>
                setFilterGuests(e.target.value ? parseInt(e.target.value) : null)
              }
              className="text-sm text-gray-800 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 transition bg-white"
            >
              <option value="">Tất cả</option>
              <option value={1}>1 người · 1 phòng</option>
              <option value={2}>2 người · 1 phòng</option>
              <option value={3}>3 người · 1 phòng</option>
              <option value={4}>4 người · 1 phòng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng danh sách phòng */}
      <div className="overflow-x-auto my-6">
        <table className="w-full border border-gray-300 text-sm border-collapse rounded-md overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="p-3 border border-gray-300">Loại chỗ nghỉ</th>
              <th className="p-3 border border-gray-300">Số lượng khách</th>
              <th className="p-3 border border-gray-300">Giá mỗi đêm</th>
              <th className="p-3 border border-gray-300">Đặt phòng</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => {
              let images = [];
              try {
                images = JSON.parse(room.image);
              } catch (e) {
                images = [];
              }

              return (
                <tr key={room.roomId} className="hover:bg-gray-50 transition">
                  <td className="p-3 border border-gray-300 align-top w-1/4">
                    <div className="font-bold text-black">{room.roomType}</div>
                    <div className="text-xs text-gray-500">
                      Phòng số {room.roomNumber}
                    </div>
                    {images[0] && (
                      <img
                        src={images[0].url}
                        alt={room.roomType}
                        className="object-cover w-full h-32 rounded-lg my-2"
                      />
                    )}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    {room.capacity} khách
                  </td>
                  <td className="p-3 border border-gray-300 font-semibold text-gray-800">
                    {(room.pricePerNight / 26500).toLocaleString()} USD
                    <div className="text-xs text-gray-500">
                      Đã bao gồm thuế và phí
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      onClick={() => navigate("/booking/confirmation")}
                      className="block w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-2 rounded-lg shadow-md"
                    >
                      Tôi sẽ đặt
                    </button>
                    <div className="text-xs text-gray-500 mt-1">
                      Bạn sẽ không bị trừ tiền ngay
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
