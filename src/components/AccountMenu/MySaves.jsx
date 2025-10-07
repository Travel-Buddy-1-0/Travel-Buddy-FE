import { useState, useEffect } from "react";
import { getFavorites } from "../../services/Favorites/getFavorites";
import HotelFavorites from "../Favorites/HotelFavorites";
import PostFavorites from "../Favorites/PostFavorites";


export default function MySaves() {
  const [activeTab, setActiveTab] = useState("hotels");
  const [favorites, setFavorites] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const typeMap = {
    hotels: "HOTEL",
    posts: "POST",
    restaurants: "RESTAURANT",
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const type = typeMap[activeTab];
        const res = await getFavorites(userId, type);
        setFavorites(res?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, [activeTab, userId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        {["hotels", "posts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded cursor-pointer ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "hotels" && <HotelFavorites favorites={favorites} />}
      {activeTab === "posts" && <PostFavorites favorites={favorites} />}
    </div>
  );
}
