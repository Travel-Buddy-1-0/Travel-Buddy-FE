import { useEffect } from "react";

export default function NotificationInfor({ message, type = "info", duration = 3000, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`${bgColors[type]} text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-down`}
      >
        {message}
      </div>
    </div>
  );
}
