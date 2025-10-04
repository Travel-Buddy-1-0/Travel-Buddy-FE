import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HotelHeaderCard from "../../components/Hotel/HotelHeaderCard";
import HotelGallery from "../../components/Hotel/HotelGallery";
import HotelDescription from "../../components/Hotel/HotelDescription";
import HotelSidebar from "../../components/Hotel/HotelSidebar";

import RoomAvailability from "../../components/Hotel/RoomAvailability";
import ReviewSection from "../../components/Hotel/HotelReviews";
import { getHotelDetailApi } from "../../services/Bookings/HotelDetail";
import { getReviewsApi } from "../../services/Bookings/HotelReviews";

export const HotelDetail = () => {
  const { id } = useParams(); // /hotel/:id
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchHotel() {
      try {
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

  if (loading) return <p>Đang tải...</p>;
  if (!hotel) return <p>Không tìm thấy khách sạn.</p>;

  // Parse dữ liệu
  const images = hotel.image ? [hotel.image.replace(/^"|"$/g, "")] : [];
  const style = hotel.style ? JSON.parse(hotel.style) : {};
  const amenities = style?.amenities || [];

  // Scroll tới section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto container w-3/4">
      {/* Find Box */}
      <div className="px-10 py-4 bg-white border-gray-700 rounded-sm shadow-sm mt-2 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 flex space-x-8">
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => scrollToSection("overview")}
            >
              Tổng quan
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => scrollToSection("info")}
            >
              Thông tin
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => scrollToSection("amenities")}
            >
              Tiện nghi & giá
            </div>
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => scrollToSection("reviews")}
            >
              Đánh giá của khách
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg">
            Chi tiết
          </button>
        </div>
      </div>

      {/* Sections */}
      <div id="overview">
        <HotelHeaderCard hotel={hotel} reviewCount={reviews.length || 0} />
      </div>

 <div id="info" className="">
   <HotelGallery images={images} />
 </div>
     

      <div  className="my-6 flex space-x-6">
        <HotelDescription
          options={amenities}
          description={hotel.description}
        />
        <HotelSidebar rating={hotel.averageRating} locationText={hotel.address} />
      </div>
<div  id="amenities">
    <RoomAvailability rooms={hotel.rooms || []} hotelId={hotel.hotelId} />
</div>
    

      <div id="reviews">
        <ReviewSection reviews={reviews || []} />
      </div>
    </div>
  );
};
