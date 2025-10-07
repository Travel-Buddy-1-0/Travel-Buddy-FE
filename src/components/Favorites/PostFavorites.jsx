import { useState, useEffect } from "react";
import { Heart } from "phosphor-react";
import { getUnsplashPhotoById } from "../../services/Unplash/unsplashByID";


import { Link } from "react-router-dom";
import { deleteFavoriteApi } from "../../services/Favorites/deleteFavoriteApi";
import PhotoDetail from "../../pages/UserPage/ProductDetails";

export default function PostFavorites({ favorites }) {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // dùng cho overlay PhotoDetail

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const list = await Promise.all(
          favorites.map(async (f) => {
            const photo = await getUnsplashPhotoById(f.targetId);
            if (!photo) return null;

            return {
              id: photo.id,
              favoriteId: f.favoriteId,
              name: photo.alt || "Post",
              description: photo.description || "Không có mô tả",
              image: photo.src.regular,
            };
          })
        );
        setPosts(list.filter(Boolean));
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (favorites.length > 0) fetchPosts();
  }, [favorites]);

  const handleUnfollow = async (favoriteId) => {
    try {
      await deleteFavoriteApi(favoriteId);
      setPosts(prev => prev.filter(p => p.favoriteId !== favoriteId));
      if (selectedId === favoriteId) setSelectedId(null);
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  if (favorites.length === 0) return <p className="text-gray-500">Chưa có post yêu thích nào.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-6">Danh sách bài viết yêu thích</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl justify-between shadow-md overflow-hidden transition hover:shadow-lg relative">
            <div > 
                  <img
              src={post.image}
              alt={post.name}
              className="w-full h-40 object-cover cursor-pointer"
              onClick={() => setSelectedId(post.id)}
            />
            <div className="p-4">
              <h2 className="font-bold text-lg">{post.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
            </div>
            </div>
          
            <div className="flex justify-between items-center p-4 pt-0">
              <button
                onClick={() => handleUnfollow(post.favoriteId)}
                className="flex items-center gap-1"
              >
                <Heart weight="fill" className="text-red-500 cursor-pointer" />
                <span className="text-xs text-red-400"></span>
              </button>

              <button
                onClick={() => setSelectedId(post.id)}
                className="text-blue-600 hover:underline text-sm"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay PhotoDetail */}
      {selectedId && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-start pt-20">
          <PhotoDetail id={selectedId} onClose={() => setSelectedId(null)} />
        </div>
      )}
    </div>
  );
}
