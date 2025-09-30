import { useState, useEffect } from "react";
import { Heart } from "phosphor-react";

export default function MySaves() {
  const [activeTab, setActiveTab] = useState("hotels"); // hotels | posts | restaurants
  const [saves, setSaves] = useState({
    hotels: [],
    posts: [],
    restaurants: [],
  });
  const [selectedItem, setSelectedItem] = useState(null);

  // Giả lập fetch từ API
  useEffect(() => {
    setSaves({
      hotels: [
        {
          id: 1,
          name: "Panorama Nha Trang Condotel",
          description: "Khách sạn 5 sao với view biển tuyệt đẹp",
          image: "https://picsum.photos/400/200?random=1",
        },
        {
          id: 2,
          name: "InterContinental Saigon",
          description: "Trung tâm Sài Gòn, tiện nghi sang trọng",
          image: "https://picsum.photos/400/200?random=2",
        },
      ],
      posts: [
        {
          id: 101,
          title: "10 địa điểm check-in đẹp nhất Sài Gòn",
          description: "Khám phá các điểm sống ảo hot nhất thành phố",
          image: "https://picsum.photos/400/200?random=3",
        },
        {
          id: 102,
          title: "Review nhà hàng Nhật mới mở",
          description: "Trải nghiệm ẩm thực Nhật Bản ngon miệng",
          image: "https://picsum.photos/400/200?random=4",
        },
      ],
      restaurants: [
        {
          id: 201,
          name: "Nhà hàng Sushi Hana",
          description: "Sushi tươi ngon, view đẹp",
          image: "https://picsum.photos/400/200?random=5",
        },
        {
          id: 202,
          name: "Pizza 4P's",
          description: "Pizza nướng chuẩn Ý, nguyên liệu cao cấp",
          image: "https://picsum.photos/400/200?random=6",
        },
      ],
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách yêu thích</h1>

      {/* Tabs */}
      {!selectedItem && (
        <div className="flex gap-4 mb-6">
          {["hotels", "posts", "restaurants"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Danh sách items */}
      {!selectedItem && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {saves[activeTab].map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name || item.title}
                className="w-full h-40 object-cover"
              />
              <div className="flex justify-between items-center p-4">
                <div>
                  <h2 className="font-bold text-lg">{item.name || item.title}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <Heart weight="fill" className="text-red-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chi tiết item */}
      {selectedItem && (
        <div className="mt-8 bg-white shadow rounded-2xl p-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="text-sm text-blue-600 mb-4"
          >
            ← Quay lại danh sách
          </button>

          <img
            src={selectedItem.image}
            alt={selectedItem.name || selectedItem.title}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold mb-2">
            {selectedItem.name || selectedItem.title}
          </h2>
          <p className="text-gray-600">{selectedItem.description}</p>
        </div>
      )}
    </div>
  );
}
