import { useMemo } from "react";

export default function ReviewSection({ reviews }) {
  // Tính điểm trung bình
  console.log(reviews)
  const avgRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  // Sinh hạng mục giả dựa trên review
  const scores = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];
    const base = (avgRating / 5) * 9.5  ; // đổi sang thang 10
    return [
      { label: "Cleanliness", value: Math.min(10, (base + Math.random() * 1.5).toFixed(1)) },
      { label: "Comfort", value: Math.min(10, (base + Math.random() * 1.2).toFixed(1)) },
      { label: "Location", value: Math.min(10, (base + Math.random() * 2).toFixed(1)) },
      { label: "Facilities", value: Math.min(10, (base + Math.random() * 1.8).toFixed(1)) },
      { label: "Staff", value: Math.min(10, (base + Math.random() * 1.4).toFixed(1)) },
      { label: "Value for money", value: Math.min(10, (base + Math.random() * 1.6).toFixed(1)) }
    ];
  }, [reviews, avgRating]);

  return (
    <div className="my-14 bg-white border border-gray-200 rounded-sm shadow-sm px-10 py-6">
      {/* Điểm tổng */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-600 text-white font-bold text-lg px-3 py-2 rounded">
          {avgRating*2}
        </div>
        <div>
          <div className="font-semibold">
            Tuyệt vời · {reviews.length} đánh giá{" "}
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Đọc tất cả đánh giá
            </a>
          </div>
        </div>
      </div>

      {/* Hạng mục */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {scores.map((s, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span>{s.label}</span>
              <span className="font-semibold">{s.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${(s.value / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Review list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r, i) => {
          let images = [];
          try {
            if (r.image) images = JSON.parse(r.image);
          } catch (e) {
            images = [];
          }

          return (
            <div
              key={i}
              className="border border-gray-200 rounded-md p-4 shadow-sm"
            >
              <div className="font-bold">{r.reviewerName}</div>
              <div className="text-xs text-gray-500 mb-2">
                {new Date(r.reviewDate).toLocaleDateString()}
              </div>
              <p className="text-sm text-gray-700 mb-2">“{r.comment}”</p>
              {/* {images.length > 0 && (
                <img
                  src={images[0].url}
                  alt="Review"
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )} */}
              <a
                href="#"
                className="text-blue-600 text-xs font-medium hover:underline"
              >
                Tìm hiểu thêm
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
