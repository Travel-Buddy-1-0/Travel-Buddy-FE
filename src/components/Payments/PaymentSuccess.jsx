// src/pages/PaymentSuccess.jsx
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-2xl font-bold text-green-700">Thanh toán thành công!</h1>
      <p className="text-gray-700 mt-2">
        Cảm ơn bạn đã đặt dịch vụ với <span className="font-semibold">Travel Buddify</span>.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
}
