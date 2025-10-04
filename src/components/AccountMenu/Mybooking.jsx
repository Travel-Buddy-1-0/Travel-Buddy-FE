import { useState } from "react";
import { CaretRight } from "phosphor-react";

export default function MyBookings() {
  const bookings = [
    {
      id: 101,
      location: "Đà Lạt",
      checkIn: "2025-03-05",
      checkOut: "2025-03-06",
      orders: 1,
      image: "https://picsum.photos/400/200?random=1",
      status: "confirmed",
    },
    {
      id: 102,
      location: "Nha Trang",
      checkIn: "2025-03-10",
      checkOut: "2025-03-12",
      orders: 2,
      image: "https://picsum.photos/400/200?random=2",
      status: "pending",
    },
  ];

  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lịch đặt phòng của bạn</h1>

      {/* Danh sách bookings */}
      {!selectedBooking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelectedBooking(b)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={b.image}
                alt={b.location}
                className="w-full h-40 object-cover"
              />
              <div className="flex justify-between items-center p-4">
                <div>
                  <h2 className="font-bold text-lg">{b.location}</h2>
                  <p className="text-sm text-gray-500 font-semibold">
                    {new Date(b.checkIn).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(b.checkOut).toLocaleDateString("vi-VN")} •{" "}
                  phòng dành cho   {b.orders} người 
                  </p>
                </div>
                <CaretRight size={20} className="text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chi tiết booking */}
      {selectedBooking && (
        <div className="mt-8 bg-white shadow rounded-2xl p-6">
          <button
            onClick={() => setSelectedBooking(null)}
            className="text-sm text-blue-600 mb-4"
          >
            ← Quay lại danh sách
          </button>

          <h2 className="text-xl font-bold mb-2">
            {selectedBooking.location}
          </h2>
          <p className="text-gray-600">
            {new Date(selectedBooking.checkIn).toLocaleDateString("vi-VN")} -{" "}
            {new Date(selectedBooking.checkOut).toLocaleDateString("vi-VN")}
          </p>
          <p className="mt-2 text-sm">
           phòng dành cho {selectedBooking.orders} người  • Trạng thái:{" "}
            {selectedBooking.status === "confirmed"
              ? "Đã xác nhận"
              : selectedBooking.status === "pending"
              ? "Đang chờ"
              : "Đã hủy"}
          </p>
        </div>
      )}
    </div>
  );
}
