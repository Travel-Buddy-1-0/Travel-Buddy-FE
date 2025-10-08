import { useState, useEffect } from "react";
import {
  Info,
  MapPin,
  ForkKnife,
  Bed,
  Bank,
  Tree,
  Leaf,
  ShoppingBag,
  Sparkle,
  Moon,
  Waves,
  CheckCircle,
  XCircle,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function BuildPackageSection() {
  const [provinces, setProvinces] = useState([]);
  const [destination, setDestination] = useState("");
  const [activities, setActivities] = useState(() => {
    const saved = sessionStorage.getItem("activities");
    return saved ? JSON.parse(saved) : [];
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);


  // Các hoạt động có thể chọn
  const activityOptions = [
    { name: "Tham quan", icon: MapPin },
    { name: "Ẩm thực", icon: ForkKnife },
    { name: "Nghỉ dưỡng", icon: Bed },
    { name: "Văn hóa - Lịch sử", icon: Bank },
    { name: "Biển & Nghỉ mát", icon: Waves },
    { name: "Núi rừng & Trekking", icon: Tree },
    { name: "Du lịch sinh thái", icon: Leaf },
    { name: "Mua sắm", icon: ShoppingBag },
    { name: "Lễ hội", icon: Sparkle },
    { name: "Khám phá đêm", icon: Moon },
  ];

  // Map từ tiếng Việt sang tiếng Anh (dùng khi lưu)
  const activityTranslation = {
    "Tham quan": "sightseeing",
    "Ẩm thực": "food",
    "Nghỉ dưỡng": "relaxing",
    "Văn hóa - Lịch sử": "culture history",
    "Biển & Nghỉ mát": "beach",
    "Núi rừng & Trekking": "mountains trekking",
    "Du lịch sinh thái": "eco travel",
    "Mua sắm": "shopping",
    "Lễ hội": "festival",
    "Khám phá đêm": "night life",
  };

  const toggleActivity = (name) => {
    setActivities((prev) => {
      let updated = [];
      if (prev.includes(name)) {
        updated = prev.filter((a) => a !== name);
      } else {
        if (prev.length >= 5) return prev;
        updated = [...prev, name];
      }
      sessionStorage.setItem("activities", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = () => {
  if (!destination) {
    setError("⚠️ Vui lòng chọn Tỉnh/Thành phố!");
    return;
  }
  if (activities.length === 0) {
    setError("⚠️ Vui lòng chọn ít nhất 1 hoạt động!");
    return;
  }

  setError("");
  setSuccess(true);

  // Lấy province đầy đủ
  const selectedProvince = provinces.find(
    (p) => p.code === Number(destination)
  );

  // Lấy đầy đủ activity object (name tiếng Anh + iconName)
  const selectedActivities = activityOptions
    .filter((act) => activities.includes(act.name))
    .map((act) => ({
      name: activityTranslation[act.name], // lưu tiếng Anh
      iconName: act.icon.displayName || act.icon.name,
    }));

  // Lưu packageData
  const packageData = {
    destination: selectedProvince ? selectedProvince.name : "",
    activities: selectedActivities,
    createdAt: new Date().toISOString(),
  };

  sessionStorage.setItem("travelPackage", JSON.stringify(packageData));

  console.log(
    "Package data đã lưu:",
    JSON.parse(sessionStorage.getItem("travelPackage"))
  );

  // Reload page sau 1s để Home load lại dữ liệu mới
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};


  return (
    <section className="flex justify-center py-4 cursor-pointer">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        {!success ? (
          <>
            <h2 className="text-xl font-bold text-center mb-6">
              Tự xây dựng gói du lịch
            </h2>

            {/* Destination Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chọn Tỉnh/Thành phố
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full outline-none text-gray-700 text-sm"
                >
                  <option value="">-- Chọn địa điểm --</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <Info size={18} className="ml-2 text-gray-400" />
              </div>
            </div>

            {/* Activities */}
            <p className="text-gray-700 font-medium mb-3">
              Sở thích hoạt động <span className="text-gray-400">(tối đa 5 mục)</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mb-6">
              {activityOptions.map((act) => {
                const Icon = act.icon;
                const isChecked = activities.includes(act.name);
                const isDisabled = !isChecked && activities.length >= 5;

                return (
                  <label
                    key={act.name}
                    className={`flex items-center space-x-2 text-sm cursor-pointer ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => toggleActivity(act.name)}
                      className="accent-blue-500"
                    />
                    <Icon size={16} className="text-blue-500" />
                    <span>{act.name}</span>
                  </label>
                );
              })}
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && (
              <div className="flex items-center text-red-500 text-sm mb-4">
                <XCircle size={18} className="mr-2" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition"
            >
              Tạo gói du lịch
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle size={48} className="text-green-500 mb-3" />
            <h3 className="text-xl font-bold text-green-600 mb-2">
              Gói du lịch đã được tạo thành công!
            </h3>
            <p className="text-gray-500 text-sm">
              Bạn sẽ được chuyển về trang chủ sau ít giây 🌍
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
