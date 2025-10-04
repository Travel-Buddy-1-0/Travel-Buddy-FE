import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      {/* Ảnh minh họa */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
        alt="Maintenance"
        className="w-40 h-40 mb-6"
      />

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Xin lỗi, nội dung đang được bảo trì
      </h1>

      {/* Mô tả */}
      <p className="text-gray-600 max-w-md mb-6">
        Trang bạn đang truy cập hiện không khả dụng do chúng tôi đang tiến hành
        nâng cấp và bảo trì hệ thống. Vui lòng quay lại sau ít phút.
      </p>

      {/* Nút quay lại */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-700 transition"
      >
        Quay về trang chủ
      </button>
    </div>
  );
}
