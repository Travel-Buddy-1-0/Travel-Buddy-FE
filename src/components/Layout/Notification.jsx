import { useEffect } from "react";

export default function Notification({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // tự động tắt sau 3 giây
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg text-white text-center transition transform scale-100 ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
