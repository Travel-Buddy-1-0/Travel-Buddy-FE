import { useEffect, useState } from "react";
import { CaretRight } from "phosphor-react";
import { getBookingHistory } from "../../services/Bookings/getBookingHistory";
import { getRoomDetail } from "../../services/Bookings/RoomDetail";
import { cancelBooking } from "../../services/Bookings/cancelBooking";
import NotificationInfor from "../Layout/NotificationInfor";


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  // 🔔 Notification
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
  };

  // 🔄 Load booking list
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const history = await getBookingHistory();
      const detailed = await Promise.all(
        history.map(async (b) => {
          const room = await getRoomDetail(b.roomId);
          return { ...b, room };
        })
      );
      setBookings(detailed);
    } catch (error) {
      console.error("⚠️ Lỗi khi tải lịch sử đặt phòng:", error);
      showNotification("Không thể tải danh sách đặt phòng.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ❌ Xác nhận hủy
  const openCancelConfirm = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowConfirm(true);
  };

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;

    try {
      await cancelBooking(bookingToCancel);
      showNotification("✅ Hủy đặt phòng thành công!", "success");
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      showNotification("❌ Lỗi khi hủy phòng: " + error.message, "error");
    } finally {
      setShowConfirm(false);
      setBookingToCancel(null);
    }
  };

  if (loading) return <p className="text-center py-10">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      {/* ✅ Notification */}
      <NotificationInfor
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      {/* 🔘 Popup xác nhận hủy */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-80 animate-fade-in-down">
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              Xác nhận hủy đặt phòng
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Bạn có chắc chắn muốn hủy đặt phòng này không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt phòng của bạn</h1>

      {/* Danh sách bookings */}
      {!selectedBooking && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.length === 0 ? (
            <p className="text-gray-600 col-span-2 text-center">
              Bạn chưa có đặt phòng nào.
            </p>
          ) : (
            bookings.map((b) => (
              <div
                key={b.bookingId}
                onClick={() => setSelectedBooking(b)}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={
                    b.room.hotel?.image?.replace(/"/g, "") ||
                    "https://picsum.photos/400/200"
                  }
                  alt={b.room.hotel?.name}
                  className="w-full h-40 object-cover"
                />
                <div className="flex justify-between items-center p-4">
                  <div>
                    <h2 className="font-bold text-lg">
                      {b.room.hotel?.name || "Khách sạn không xác định"}
                    </h2>
                    <p className="text-sm text-gray-500 font-semibold">
                      {new Date(b.checkInDate).toLocaleDateString("vi-VN")} -{" "}
                      {new Date(b.checkOutDate).toLocaleDateString("vi-VN")} •{" "}
                      {b.room.roomType} ({b.room.capacity} người)
                    </p>
                  </div>
                  <CaretRight size={20} className="text-gray-500" />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Chi tiết booking */}
      {selectedBooking && (
  <div className="mt-8 bg-white shadow-xl rounded-2xl p-6 relative overflow-hidden">
    <button
      onClick={() => setSelectedBooking(null)}
      className="text-base  mb-4 cursor-pointer hover:text-blue-400"
    >
      ← Quay lại danh sách
    </button>

    <img
      src={selectedBooking.room.hotel?.image?.replace(/"/g, "")}
      alt={selectedBooking.room.hotel?.name}
      className="w-full h-64 object-cover rounded-lg mb-6"
    />

    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900">
        {selectedBooking.room.hotel?.name}
      </h2>
      <p className="text-gray-600 italic">
        📍 {selectedBooking.room.hotel?.address}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Loại phòng:</span>{" "}
          {selectedBooking.room.roomType}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Sức chứa:</span>{" "}
          {selectedBooking.room.capacity} người
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Ngày nhận:</span>{" "}
          {new Date(selectedBooking.checkInDate).toLocaleDateString("vi-VN")}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Ngày trả:</span>{" "}
          {new Date(selectedBooking.checkOutDate).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Giá mỗi đêm:</span>{" "}
          <span className="text-green-600 font-bold">
            {(
              selectedBooking.room.pricePerNight / 25000
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>

        <p className="text-gray-800 text-lg mt-2">
          <span className="font-semibold">Tổng tiền:</span>{" "}
          <span className="text-blue-600 font-bold">
            {selectedBooking.totalPrice
              ? (selectedBooking.totalPrice / 1 ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "—"}
          </span>
        </p>
      </div>
    </div>

    {/* 🛑 Nút hủy phòng */}
    <div className="mt-6 flex justify-end">
      <button
        onClick={() => openCancelConfirm(selectedBooking.bookingId)}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md cursor-pointer transition-all"
      >
        Hủy phòng
      </button>
    </div>
  </div>
)}

    </div>
  );
}
