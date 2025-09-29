import { CheckCircle, CalendarBlank, MapPin, User } from "phosphor-react";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center space-y-6">
        {/* Icon thành công */}
        <CheckCircle size={80} weight="fill" className="mx-auto text-green-500" />

        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-gray-800">
          Đặt phòng thành công!
        </h1>
        <p className="text-gray-600">
          Cảm ơn bạn đã đặt phòng cùng chúng tôi. Thông tin đặt phòng đã được gửi
          đến email của bạn.
        </p>

        {/* Thông tin đặt phòng */}
        <div className="bg-gray-100 rounded-lg p-4 text-left space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin size={22} className="text-blue-600" />
            <span className="text-gray-700 font-medium">
              Dalat Wind Hotel - Đà Lạt
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarBlank size={22} className="text-blue-600" />
            <span className="text-gray-700">
              Nhận phòng: <b>18/10/2025</b> — Trả phòng: <b>19/10/2025</b>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={22} className="text-blue-600" />
            <span className="text-gray-700">2 người lớn, 1 đêm</span>
          </div>
        </div>

        {/* Giá */}
        <div className="text-lg font-semibold text-gray-800">
          Tổng tiền: <span className="text-blue-600">2.800.000 đ</span>
        </div>

        {/* Nút quay lại */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg cursor-pointer    font-semibold hover:bg-blue-700 transition"
          onClick={() => (window.location.href = "/")}
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
