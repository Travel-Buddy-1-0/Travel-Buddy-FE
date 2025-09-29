// Home.jsx
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import {
  Compass,
  Fire,
  Lightning,
  PaintBrush,
  MagnifyingGlass,
  ForkKnife,
  Buildings,
  Heart,
} from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";
import PhotoDetail from "./ProductDetails";

const breakpointColumnsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1,
};

const UNSPLASH_KEY = "fxcJg7TtF1KfXyjpmHNGoI6IOHkpDlnJnpAdogfn7LU"; // 🔑 thay bằng key của bạn
const PER_PAGE = 10;

const TOPICS = [
  { name: "Ngẫu nhiên", query: "travel", icon: Compass },
  { name: "Lễ hội", query: "festival", icon: Fire },
  { name: "Hiện đại", query: "modern travel", icon: Lightning },
  { name: "Cổ điển", query: "classic travel", icon: PaintBrush },
  { name: "Bí ẩn", query: "mysterious places", icon: MagnifyingGlass },
  { name: "Ăn uống", query: "food travel", icon: ForkKnife },
  { name: "Khách sạn", query: "famous hotels", icon: Buildings },
];

export default function Home() {
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("travel");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.pathname.startsWith("/travel/posts/")
    ? { id: location.pathname.split("/").pop() }
    : {};

  const fetchUnsplash = async (pageToFetch, query) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=${PER_PAGE}&page=${pageToFetch}&client_id=${UNSPLASH_KEY}`
      );
      const data = await res.json();
 console.log(data)
      const mapped = data.results.map((photo) => ({
        id: photo.id,
        title: photo.user.name || "Travel Photo",
        text: photo.alt_description,
        image: photo.urls.regular,
      }));


      setItems((prev) => {
        const merged = [...prev, ...mapped];
        return Array.from(new Map(merged.map((p) => [p.id, p])).values());
      });
    } catch (err) {
      console.error("Fetch Unsplash Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // reset khi đổi chủ đề
useEffect(() => {
  setItems([]);
  setPage(1);
  fetchUnsplash(1, query);
}, [query]);


  const toggleLike = (id) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // scroll load more
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        fetchUnsplash(page + 1, query);
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, query]);

  return (
    <div className="px-4 py-6 relative">
      {/* 🔹 Thanh icon filter */}
      <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center space-x-4 mb-6 z-50">
        {TOPICS.map((topic, idx) => {
          const Icon = topic.icon;
          const isActive = query === topic.query;
          return (
            <button
              key={idx}
              onClick={() => setQuery(topic.query)}
              title={topic.name}
              className={`p-3 rounded-full transition shadow-md cursor-pointer ${
                isActive
                  ? "bg-blue-500 text-white scale-110"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* 🔹 Masonry Grid */}
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
                likedItems[item.id] ? "bg-rose-500" : "hover:bg-gray-200 bg-white"
              }`}
            >
              <Heart
                size={16}
                weight={likedItems[item.id] ? "fill" : "regular"}
                className={`${
                  likedItems[item.id]
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

        {/* 🔹 Skeleton khi loading */}
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

      {/* 🔹 Overlay Detail */}
      {id && <PhotoDetail id={id} onClose={() => navigate("/")} />}
    </div>
  );
}
