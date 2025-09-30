import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SidebarFilter from "../../components/Bookings/SilderBarfilterSearch";
import HotelCard from "./HotelCard";
import { searchHotelsApi } from "../../services/Bookings/searchHotelsApi";


export default function SearchContentSection() {
  const [min, setMin] = useState(2400);
  const [max, setMax] = useState(9975);
  const [filters, setFilters] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const buildPayload = () => {
    const payload = {};
    const location = searchParams.get("location");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");
    const stars = searchParams.get("stars");
    const type = searchParams.get("type");
    const amenities = searchParams.get("amenities");

    if (location) payload.location = location;
    if (checkIn) payload.checkIn = checkIn;
    if (checkOut) payload.checkOut = checkOut;
    if (guests) payload.guests = parseInt(guests);
    if (stars) payload.stars = parseInt(stars.replace(" stars", ""));
    if (type) payload.type = type;
    if (amenities) payload.amenities = amenities.split(",");

    return payload;
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const payload = buildPayload();
      const data = await searchHotelsApi(payload); // gọi thẳng hàm API
      setHotels(data);
     
    } catch (err) {
      console.error("Lỗi load hotels:", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [searchParams]);

  const handleChange = (values) => {
    setMin(values[0]);
    setMax(values[1]);
  };

  return (
    <div className="container w-5/6 mx-auto flex gap-6">
      {/* Sidebar */}
      <div className="w-1/4 space-y-4">
        <div className="p-4 border-gray-400 rounded-xl shadow-sm bg-white">
          <h3 className="text-base font-bold mb-2">Price Range</h3>
          <div className="values text-blue-600 font-semibold mb-1">
            ${min.toLocaleString()} - ${max.toLocaleString()}
          </div>
          <Slider
            range
            min={100}
            max={3000}
            value={[min, max]}
            onChange={handleChange}
          />
        </div>

        <SidebarFilter filters={filters} setFilters={setFilters} />
      </div>

      {/* Content */}
      <div className="w-3/4 space-y-6">
        {loading && <p>Đang tải...</p>}
        {!loading && hotels.length === 0 && <p>Không tìm thấy khách sạn.</p>}
        {!loading && hotels.length > 0 && (
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
