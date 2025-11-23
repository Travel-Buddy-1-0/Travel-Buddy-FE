import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import * as Icons from "phosphor-react";
import { useNavigate, useParams } from "react-router-dom";
import PhotoDetail from "./ProductDetails";
import { fetchUnsplash } from "../../services/Unplash/unsplashService";
import { createFavoriteApi } from "../../services/Favorites/createFavoriteApi";
import { getFavorites } from "../../services/Favorites/getFavorites";


const breakpointColumnsObj = { default: 5, 1100: 3, 700: 2, 500: 1 };

// 🔹 Hàm bỏ dấu tiếng Việt
const removeVietnameseTones = (str) => {
  if (!str) return "";
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  str = str.replace(/\s+/g, "");
  return str.toLowerCase();
};

export default function Home() {
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const likeTimers = useRef({});

  // 🔹 Giá trị mặc định query: localStorage nếu có, nếu không thì "travel"



  // 👇 Lấy userId từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // 🔹 Lấy gói du lịch đã lưu
  const savedPackage = sessionStorage.getItem("travelPackage");
let initialQuery = "travel";
let cityQuery = "";
let userActivities = [];

if (savedPackage) {
  const pkg = JSON.parse(savedPackage);
  const destination = pkg.destination || "";
  const nameOnly = destination.replace(/^(Tỉnh|Thành phố)\s+/i, "");
  const cleanCity = removeVietnameseTones(nameOnly);
  cityQuery = cleanCity ? `${cleanCity} vietnam` : "";
  initialQuery = cityQuery || "travel";
  userActivities = pkg.activities || [];
}

// Lấy searchQuery từ localStorage
const storedQuery = localStorage.getItem("searchQuery")?.trim();

// Nếu searchQuery tồn tại → chọn làm query mặc định
if (storedQuery) {
  initialQuery = storedQuery;
}


// 🔹 Khởi tạo activityTopics từ savedPackage
const activityTopics = userActivities.map((act) => {
  const Icon = Icons[act.iconName] || Icons.Compass;
  return {
    name: act.name,
    query: removeVietnameseTones(act.name) + " vietnam",
    icon: Icon,
  };
});

// 🔹 Thêm "Explore" (thành phố) từ savedPackage
activityTopics.unshift({
  name: "Explore",
  query: cityQuery || "travel",
  icon: Icons.Compass,
});

// 🔹 Nếu có searchQuery → thêm button searchQuery
if (storedQuery) {
  activityTopics.unshift({
    name: storedQuery,        // hiển thị nội dung query
    query: storedQuery,       // dùng nguyên query khi click
    icon: Icons.MagnifyingGlass,
  });
}


  const [query, setQuery] = useState(initialQuery);

  // 🔹 Lấy ảnh Unsplash
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const results = await fetchUnsplash(1, query);
      setItems(results);
      setPage(1);
      setLoading(false);
    };
    load();
  }, [query]);

  // 🔹 Scroll load thêm
  useEffect(() => {
    const handleScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
        setLoading(true);
        const results = await fetchUnsplash(page + 1, query);
        setItems((prev) => {
          const merged = [...prev, ...results];
          return Array.from(new Map(merged.map((p) => [p.id, p])).values());
        });
        setPage((prev) => prev + 1);
        setLoading(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, query]);

  // 🩷 Lấy danh sách bài đã tym
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const result = await getFavorites(userId, "POST");
        if (result && Array.isArray(result.data)) {
          const likedMap = {};
          result.data.forEach((fav) => {
            likedMap[String(fav.targetId)] = true;
          });
          setLikedItems(likedMap);
   
        }
      } catch (err) {
      
        
      }
    };
    fetchFavorites();
  }, [userId]);

  // 🩷 Toggle like có delay 8s mới gọi API
  const toggleLike = (itemId) => {
  const key = String(itemId); // luôn string
  setLikedItems((prev) => {
    const isLiked = !prev[key];

    // Cancel timer nếu un-like trước khi 8s
    if (!isLiked && likeTimers.current[key]) {
      clearTimeout(likeTimers.current[key]);
      delete likeTimers.current[key];
    
    }

    // Nếu like mới → tạo timer call API
    if (isLiked && !likeTimers.current[key]) {
      likeTimers.current[key] = setTimeout(async () => {
        try {
          await createFavoriteApi(userId, "POST", key);
       
        } catch (err) {

        } finally {
          delete likeTimers.current[key];
        }
      }, 4000);
    }

    return { ...prev, [key]: isLiked };
  });
};


  return (
    <div className="px-4 py-6 relative">
      {/* Filter Buttons */}
      {activityTopics.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-6 z-40 px-4">
          <div className="flex space-x-2 p-2 bg-gray-900/70 rounded-full backdrop-blur-sm overflow-x-auto">
            {activityTopics.map((topic, idx) => {
              const Icon = topic.icon;
              const isActive = query === topic.query;
              return (
                <button
                  key={idx}
                  onClick={() => setQuery(topic.query)}
                  title={topic.name}
                  className={`flex-shrink-0 p-3 rounded-full transition shadow-md cursor-pointer ${
                    isActive
                      ? "bg-blue-500 text-white scale-110"
                      : "bg-black text-white hover:bg-gray-700"
                  }`}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative rounded overflow-hidden cursor-pointer"
            onClick={() => navigate(`/travel/posts/${item.id}`)}
          >
            <img src={item.image} alt={item.title} className="w-full rounded-2xl" />
        <button
  onClick={(e) => {
    e.stopPropagation();
    toggleLike(item.id);
  }}
  className={`absolute top-3 right-2 p-2 rounded-xl transition cursor-pointer ${
    likedItems[String(item.id)] ? "bg-rose-500" : "hover:bg-gray-200 bg-white"
  }`}
>
  <Icons.Heart
    size={16}
    weight={likedItems[String(item.id)] ? "fill" : "regular"}
    className={`${
      likedItems[String(item.id)]
        ? "text-white"
        : "text-gray-500 hover:text-rose-500"
    }`}
  />
</button>

            <div className="absolute text-white bottom-4 px-3">
              <h2 className="font-bold text-sm">{item.title}</h2>
            </div>
          </div>
        ))}

        {/* Skeleton */}
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-gray-300 animate-pulse h-[250px]"
            >
              <div className="h-full w-full bg-gray-200"></div>
            </div>
          ))}
      </Masonry>

      {/* Overlay chi tiết ảnh */}
      {id && <PhotoDetail id={id} onClose={() => navigate("/")} />}
    </div>
  );
}
