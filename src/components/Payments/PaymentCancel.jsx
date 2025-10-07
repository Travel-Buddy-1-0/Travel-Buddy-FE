// src/pages/PaymentCancel.jsx
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-2xl font-bold text-red-700">Thanh toán bị hủy!</h1>
      <p className="text-gray-700 mt-2">
        Giao dịch của bạn đã bị hủy. Nếu đây là nhầm lẫn, bạn có thể thử thanh toán lại.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
}
