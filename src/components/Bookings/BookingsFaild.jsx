import { XCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function BookingFailed({ errorMessage }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center space-y-6">
        {/* Icon thất bại */}
        <XCircle size={80} weight="fill" className="mx-auto text-red-500" />

        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-gray-800">Đặt phòng thất bại!</h1>
        <p className="text-gray-600">
          Có lỗi xảy ra khi đặt phòng. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.
        </p>

        {/* Thông tin lỗi */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        {/* Nút thử lại */}
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg cursor-pointer font-semibold hover:bg-red-700 transition"
          onClick={() => navigate(-1)} // Quay về trang trước
        >
          Thử lại
        </button>

        {/* Nút quay về trang chủ */}
        <button
          className="w-full bg-gray-600 text-white py-3 rounded-lg cursor-pointer font-semibold hover:bg-gray-700 transition"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
