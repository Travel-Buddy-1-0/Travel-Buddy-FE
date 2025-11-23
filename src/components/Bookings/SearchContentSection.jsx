import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SidebarFilter from "../../components/Bookings/SilderBarfilterSearch";
import HotelCard from "./HotelCard";
import { searchHotelsApi } from "../../services/Bookings/searchHotelsApi";
import { Funnel } from "phosphor-react";

export default function SearchContentSection() {
  const [min, setMin] = useState(2400);
  const [max, setMax] = useState(9975);
  const [filters, setFilters] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

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
      const data = await searchHotelsApi(payload);
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
    <div className="container w-full mx-auto flex flex-col lg:flex-row gap-6 px-4 md:px-6">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <Funnel size={20} />
          <span className="font-semibold">{showFilters ? "Hide" : "Show"} Filters</span>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-1/4 space-y-4`}>
        <div className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white">
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
      <div className="w-full lg:w-3/4 space-y-6">
        {loading && <p className="text-center">Đang tải...</p>}
        {!loading && hotels.length === 0 && <p className="text-center">Không tìm thấy khách sạn phù hợp.</p>}
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
