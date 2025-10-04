// HotelGallery.jsx
import { useMemo, useState, useEffect } from "react";
import { X, CaretLeft, CaretRight } from "phosphor-react";

export default function HotelGallery({ images }) {
  const fallbackUrl =
    "https://vendoshoes.com/public/upload/images/thumb_baiviet/hoat-dong-thi-truong-dang-cap-nhat-941688722738.png";

  const galleryImages = useMemo(() => {
    if (!images || images.length === 0) return Array(7).fill(fallbackUrl);
    if (images.length < 7) {
      return [...images, ...Array(7 - images.length).fill(fallbackUrl)];
    }
    return images;
  }, [images]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  // keyboard navigation: Esc, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, galleryImages.length]);

  return (
    <div className="my-6">
      <div className="grid grid-cols-5 grid-rows-2 gap-2 rounded-lg overflow-hidden relative">
        {/* Ảnh to bên trái */}
        <div
          className="row-span-2 col-span-2 relative cursor-pointer"
          onClick={() => openModal(0)}
        >
          <img
            src={galleryImages[0]}
            alt="main"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(0);
            }}
            className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-sm px-3 py-2 rounded-full flex items-center gap-2 shadow hover:bg-white"
          >
            <i className="fa-regular fa-image"></i> Xem mọi bức ảnh
          </button>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-105"
        >
          <i className="fa-regular fa-heart text-gray-600"></i>
        </button>

        {/* Các ảnh nhỏ bên phải */}
        {galleryImages.slice(1, 7).map((img, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer"
            onClick={() => openModal(idx + 1)}
          >
            <img
              src={img}
              alt={`thumb-${idx}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal xem ảnh */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeModal} // click nền đóng modal
          role="dialog"
          aria-modal="true"
        >
          {/* đóng (X) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-6 right-6 text-white"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-8 text-white p-3 bg-black/40 rounded-full hover:bg-black/60"
            aria-label="Previous image"
          >
            <CaretLeft size={32} />
          </button>

          {/* ảnh (click không đóng modal) */}
          <img
            onClick={(e) => e.stopPropagation()}
            src={galleryImages[currentIndex]}
            alt={`modal-${currentIndex}`}
            className="max-h-[80%] max-w-[90%] object-contain rounded-lg"
          />

          {/* next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-8 text-white p-3 bg-black/40 rounded-full hover:bg-black/60"
            aria-label="Next image"
          >
            <CaretRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
