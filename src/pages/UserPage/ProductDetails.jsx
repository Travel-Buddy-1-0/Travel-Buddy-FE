import { useEffect, useState } from "react";
import { X, PaperPlaneRight } from "phosphor-react";

const UNSPLASH_KEY = "fxcJg7TtF1KfXyjpmHNGoI6IOHkpDlnJnpAdogfn7LU";

const initialComments = [
  { id: 1, user: "Alice", avatar: "https://i.pravatar.cc/40?img=1", text: "Wow, đẹp quá!" },
  { id: 2, user: "Bob", avatar: "https://i.pravatar.cc/40?img=2", text: "Mình muốn đi đó luôn." },
];

const hooks = [
  "Trải nghiệm địa điểm này, click vào đây!",
  "Đừng bỏ lỡ chuyến đi tuyệt vời này!",
  "Khám phá ngay nơi này bằng một cú click!",
  "Click để đặt phòng và tận hưởng chuyến đi!",
  "Điểm đến mơ ước đang chờ bạn!"
];

export default function PhotoDetail({ id, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [randomHook, setRandomHook] = useState("");

  const travelPackage = JSON.parse(sessionStorage.getItem("travelPackage") || "{}");

  useEffect(() => {
    setRandomHook(hooks[Math.floor(Math.random() * hooks.length)]);
  }, []);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_KEY}`);
        const data = await res.json();
        setPhoto({
          id: data.id,
          photographer: data.user.name,
          photographerLink: data.user.links.html,
          src: {
            large2x: data.urls.full,
            regular: data.urls.regular,
            small: data.urls.small,
          },
          alt: data.alt_description || "Travel Photo",
          description: data.description || data.alt_description || "Beautiful travel photo.",
        });
      } catch (err) {
        console.error("Fetch Unsplash detail error:", err);
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

  const handleBooking = () => {
    const location = encodeURIComponent(travelPackage.destination || "New York");
    const today = new Date();
    const checkIn = today.toISOString().split("T")[0];
    const checkoutDate = new Date(today);
    checkoutDate.setDate(today.getDate() + 2);
    const checkOut = checkoutDate.toISOString().split("T")[0];
    const guests = encodeURIComponent("1 adult");

    const url = `http://localhost:5173/booking/hotel?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
    window.location.href = url;
  };

  if (!photo) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[1000] p-6 overflow-auto">
      <div className="relative bg-white rounded-lg shadow-lg w-4/5 flex flex-col md:flex-row overflow-hidden h-2/3 mx-auto">
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

        {/* Right: Info */}
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
                <a
                  href={photo.photographerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-xs hover:underline"
                >
                  Unsplash Profile
                </a>
              </div>
            </div>

            {/* Title & description */}
            <p className="text-gray-600 text-sm mb-2">{photo.description}</p>
            <h3 className="font-semibold text-sm mb-3">{photo.alt}</h3>

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
            <div className="space-y-3 max-h-48 overflow-y-auto">
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

          {/* Booking button + hook + arrow */}
          <div className="mt-3 flex flex-col items-center relative">
            <p className="text-gray-600 text-sm mb-2 font-semibold text-center">{randomHook}</p>

            <div className="relative mt-5">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <button
                onClick={handleBooking}
                className="w-32 bg-blue-500 cursor-pointer text-white py-1.5 px-3  rounded-lg shadow hover:bg-blue-600 transition text-xs"
              >
                Đặt phòng
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
