// PhotoDetail.jsx
import { useEffect, useState } from "react";
import { X, PaperPlaneRight } from "phosphor-react";

const API_KEY = "7VeXzpncLNFTB8Jx7Yw7vdsF6s3Ey7DfORn5Cr3WFqjOvHuspaqkJMCC";

const initialComments = [
  { id: 1, user: "Alice", avatar: "https://i.pravatar.cc/40?img=1", text: "Wow, đẹp quá!" },
  { id: 2, user: "Bob", avatar: "https://i.pravatar.cc/40?img=2", text: "Mình muốn đi đó luôn." },
];

export default function PhotoDetail({ id, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
          headers: { Authorization: API_KEY },
        });
        const data = await res.json();
        setPhoto(data);
      } catch (err) {
        console.error("Fetch detail error:", err);
      }
    };
    fetchPhoto();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        avatar: "https://i.pravatar.cc/40?img=3",
        text: newComment.trim(),
      },
    ]);
    setNewComment("");
  };

  if (!photo) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[1000] p-6 overflow-auto">
      <div className="relative bg-white rounded-2xl shadow-lg w-4/5 flex flex-col md:flex-row overflow-hidden h-2/3 mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10"
        >
          <X size={24} />
        </button>

        {/* Left: Photo */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <img
            src={photo.src.large2x}
            alt={photo.alt}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right: Info (nhỏ gọn) */}
        <div className="md:w-1/4 w-full p-3 flex flex-col justify-between bg-gray-50">
          <div>
            {/* Author */}
            <div className="flex items-center mb-3">
              <img
                src={`https://i.pravatar.cc/50?u=${photo.photographer}`}
                alt={photo.photographer}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h2 className="font-bold text-sm">{photo.photographer}</h2>
                <p className="text-gray-500 text-xs">Photographer</p>
              </div>
            </div>

            {/* Title & description */}
            <p className="text-gray-600 text-sm mb-2">{photo.description || "Beautiful travel photo."}</p>
            <h3 className="font-semibold text-sm mb-3">{photo.alt || "Travel Photo"}</h3>

            {/* Input comment */}
            <div className="flex items-center mb-3 space-x-2">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="You"
                className="w-8 h-8 rounded-full"
              />
              <div className="relative flex-1 my-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="w-full border rounded-full px-3 py-1.5 pr-10 text-sm focus:outline-none"
                  onKeyDown={e => e.key === "Enter" && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
                >
                  <PaperPlaneRight size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-3 max-h-48 overflow-y-auto ">
              {comments.map(c => (
                <div key={c.id} className="flex items-start space-x-2">
                  <img src={c.avatar} alt={c.user} className="w-6 h-6 rounded-full" />
                  <div>
                    <p className="font-semibold text-xs">{c.user}</p>
                    <p className="text-gray-700 text-xs">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
