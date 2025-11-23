import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HotelHeaderCard from "../../components/Hotel/HotelHeaderCard";
import HotelGallery from "../../components/Hotel/HotelGallery";
import HotelDescription from "../../components/Hotel/HotelDescription";
import RoomAvailability from "../../components/Hotel/RoomAvailability";
import ReviewSection from "../../components/Hotel/HotelReviews";
import { getHotelDetailApi } from "../../services/Bookings/HotelDetail";
import { getReviewsApi } from "../../services/Bookings/HotelReviews";
import HotelSidebar from "../../components/Hotel/HotelSidebar";

export const HotelDetail = () => {
  const { id } = useParams(); // /hotel/:id
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchHotel() {
      try {
        setLoading(true);
        const data = await getHotelDetailApi(id);
        const reviewData = await getReviewsApi(id);
       
        setHotel(data);
        setReviews(reviewData);
      } catch (err) {
        console.error("Lỗi load chi tiết khách sạn:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [id]);

  if (loading) return <p className="text-center py-12">Đang tải...</p>;
  if (!hotel) return <p className="text-center py-12">Không tìm thấy khách sạn.</p>;

  const images = hotel.image ? [hotel.image.replace(/^"|"$/g, "")] : [];
  const style = hotel.style ? JSON.parse(hotel.style) : {};
  const amenities = style?.amenities || [];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* Sticky Nav */}
      <div className="py-2 bg-white border-b sticky top-16 md:top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="flex items-center overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="text-sm text-gray-600 flex space-x-2 sm:space-x-6">
            <button onClick={() => scrollToSection('overview')} className="cursor-pointer hover:text-blue-600 p-2 rounded-md">Tổng quan</button>
            <button onClick={() => scrollToSection('info')} className="cursor-pointer hover:text-blue-600 p-2 rounded-md">Thông tin</button>
            <button onClick={() => scrollToSection('amenities')} className="cursor-pointer hover:text-blue-600 p-2 rounded-md">Tiện nghi & giá</button>
            <button onClick={() => scrollToSection('reviews')} className="cursor-pointer hover:text-blue-600 p-2 rounded-md">Đánh giá</button>
          </div>
        </div>
      </div>

      <div id="overview" className="pt-6">
        <HotelHeaderCard hotel={hotel} reviewCount={reviews.length || 0} />
      </div>

      <div id="info">
        <HotelGallery images={images} />
      </div>

      <div className="my-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <HotelDescription
            options={amenities}
            description={hotel.description}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <HotelSidebar rating={hotel.averageRating} locationText={hotel.address} />
        </div>
      </div>

      <div id="amenities">
        <RoomAvailability rooms={hotel.rooms || []} hotelId={hotel.hotelId} />
      </div>
    
      <div id="reviews" className="py-6">
        <ReviewSection reviews={reviews || []} />
      </div>
    </div>
  );
};
