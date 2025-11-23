import { useState } from "react";
import { Calendar, Users, Bed } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function RoomAvailability({ rooms, hotelId }) {
  const navigate = useNavigate();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [userCheckIn, setUserCheckIn] = useState(todayStr);
  const [userCheckOut, setUserCheckOut] = useState(tomorrowStr);
  const [filterGuests, setFilterGuests] = useState(null);

  const isRoomAvailable = (room) => {
    if (!room.lstCheckoutDate) return true;
    const checkoutDate = new Date(room.lstCheckoutDate);
    const checkInDate = new Date(userCheckIn);
    if (checkInDate < checkoutDate) return false;
    return true;
  };

  const filteredRooms = rooms
    .filter(isRoomAvailable)
    .filter((room) => (filterGuests ? room.capacity >= filterGuests : true))
    .sort((a, b) => a.capacity - b.capacity);
    
  const handleDateChange = (e, type) => {
      const newDate = e.target.value;
      if (type === 'checkin') {
          setUserCheckIn(newDate);
          const minCheckOut = new Date(newDate);
          minCheckOut.setDate(minCheckOut.getDate() + 1);
          if (new Date(userCheckOut) < minCheckOut) {
              setUserCheckOut(minCheckOut.toISOString().split("T")[0]);
          }
      } else {
          setUserCheckOut(newDate);
      }
  };

  const minCheckoutDate = () => {
    const date = new Date(userCheckIn);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  const navigateToBooking = (room) => {
    navigate("/booking/confirmation", {
      state: { hotelId, room, checkIn: userCheckIn, checkOut: userCheckOut },
    });
  };

  return (
    <div className="my-8 bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Phòng trống</h2>
        <p className="text-sm text-gray-500">Giá đã được đổi qua USD.</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-2 border border-gray-300 rounded-xl mt-4 p-2 bg-gray-50">
          <div className="flex items-center gap-2 p-2 flex-1">
            <Calendar size={20} className="text-gray-600 flex-shrink-0" />
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <input type="date" value={userCheckIn} min={todayStr} onChange={(e) => handleDateChange(e, 'checkin')} className="bg-white border-gray-300 rounded-md p-2 text-sm w-full focus:ring-blue-500" />
              <span className="text-gray-500 hidden sm:inline">—</span>
              <input type="date" value={userCheckOut} min={minCheckoutDate()} onChange={(e) => handleDateChange(e, 'checkout')} className="bg-white border-gray-300 rounded-md p-2 text-sm w-full focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 flex-1 border-t md:border-t-0 md:border-l border-gray-200">
            <Users size={20} className="text-gray-600 flex-shrink-0" />
            <select value={filterGuests || ""} onChange={(e) => setFilterGuests(e.target.value ? parseInt(e.target.value) : null)} className="text-sm text-gray-800 border border-gray-300 rounded-md p-2 focus:ring-blue-500 bg-white w-full">
              <option value="">Tất cả</option>
              <option value={1}>1 người · 1 phòng</option>
              <option value={2}>2 người · 1 phòng</option>
              <option value={3}>3 người · 1 phòng</option>
              <option value={4}>4+ người</option>
            </select>
          </div>
        </div>
      </div>

      {filteredRooms.length === 0 && <p className="text-center text-gray-500 py-8">Không có phòng trống phù hợp.</p>}

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-4">
        {filteredRooms.map((room) => (
          <div key={room.roomId} className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="font-bold text-lg text-blue-600">{room.roomType}</h3>
            <p className="text-xs text-gray-500 mb-3">Phòng số {room.roomNumber}</p>
            {/* Image can be added here if available */}
            <div className="flex justify-between items-center my-3 text-sm">
                <span className="flex items-center gap-2"><Users size={16}/> {room.capacity} khách</span>
                <span className="flex items-center gap-2"><Bed size={16}/> {room.bedType || 'Queen'}</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between items-center">
              <div>
                <div className="font-bold text-lg text-red-600">{(room.pricePerNight / 26500).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div>
                <div className="text-xs text-gray-500">/ đêm</div>
              </div>
              <button onClick={() => navigateToBooking(room)} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">
                Đặt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-3 font-semibold">Loại chỗ nghỉ</th>
              <th className="p-3 font-semibold text-center">Số lượng khách</th>
              <th className="p-3 font-semibold">Giá mỗi đêm</th>
              <th className="p-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.roomId} className="border-b hover:bg-gray-50">
                <td className="p-3 align-top w-2/5">
                  <div className="font-bold text-base text-blue-600">{room.roomType}</div>
                  <div className="text-xs text-gray-500">Phòng số {room.roomNumber}</div>
                  {/* Image can be added here */}
                </td>
                <td className="p-3 align-middle text-center">{room.capacity} khách</td>
                <td className="p-3 align-middle">
                  <div className="font-semibold text-lg text-red-600">{(room.pricePerNight / 26500).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div>
                  <div className="text-xs text-gray-500">Đã bao gồm thuế và phí</div>
                </td>
                <td className="p-3 align-middle text-center">
                  <button onClick={() => navigateToBooking(room)} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-4 py-2 rounded-lg shadow-md">
                    Tôi sẽ đặt
                  </button>
                  <div className="text-xs text-gray-500 mt-1">Bạn sẽ không bị trừ tiền ngay</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
