import { useState } from "react";
import { CaretRight } from "phosphor-react";

export default function MySettingNotification() {
  // Dummy notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Booking Confirmed", detail: "Your hotel booking has been confirmed.", enabled: true },
    { id: 2, title: "New Promo", detail: "Get 20% off on your next trip!", enabled: false },
    { id: 3, title: "Payment Reminder", detail: "Your payment is due in 3 days.", enabled: true },
  ]);

  // Toggle notification on/off
  const toggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      )
    );
  };

  // Track expanded items
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="font-semibold text-gray-800 text-lg mb-4">Notification Settings</h2>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="border border-gray-300 rounded-md p-3 flex flex-col">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleExpanded(n.id)}
              >
                <CaretRight
                  size={16}
                  className={`mr-2 transition-transform ${
                    expandedId === n.id ? "rotate-90" : ""
                  }`}
                />
                <span className="font-medium text-gray-800">{n.title}</span>
              </div>

              {/* Slider */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={n.enabled}
                  onChange={() => toggleNotification(n.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-all"></div>
              </label>
            </div>

            {expandedId === n.id && (
              <p className="mt-2 text-gray-600 text-sm">{n.detail}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
