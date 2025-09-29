import { useEffect, useState } from "react";
import { MapPin, Calendar, Users, MagnifyingGlass } from "phosphor-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DefaultContentSection from "../../components/Bookings/DefaultContentSection";
import SearchContentSection from "../../components/Bookings/SearchContentSection";

export default function BookingHotel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(null);

  // Lấy query từ URL nếu có
  useEffect(() => {
    const location = searchParams.get("location");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");

    if (location || checkIn || checkOut || guests) {
      setSearchData({ location, checkIn, checkOut, guests });
    }
  }, [searchParams]);

  // Xử lý khi bấm nút Search
  const handleSearch = () => {
    const location = document.getElementById("location").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const guests = document.getElementById("guests").value;

    // điều hướng sang URL với query
    navigate(
      `/booking/hotel?location=${encodeURIComponent(location)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div>
      {/* Nếu chưa search thì hiện background */}
      {!searchData && (
        <div
          className="h-[300px] bg-blue-400 flex flex-col justify-center absolute w-full text-white text-left"
          style={{
            backgroundImage:
              "url('https://media.architecturaldigest.com/photos/63e2c8a240f65efb020122c3/3:2/w_2100,h_1400,c_limit/vcegl-explorers-library-5963%20(2).jpg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <div className="max-w-6xl w-full px-6">
            <div className="font-bold text-2xl">Find Your Next Stay</div>
            <div className="font-medium text-base mt-1">
              Search and book cheap hotels in 3 easy steps here!
            </div>
          </div>
        </div>
      )}

      {/* Search Box */}
      <div
        className={`py-3 bg-white mx-auto border border-gray-200 shadow-md transition-all duration-300 
        ${!searchData ? "relative top-[220px] rounded-2xl w-fit" : "sticky top-0 z-50 w-full rounded-none"}`}
      >
        {/* Tabs */}
        <div className="flex space-x-2 items-center mb-3 ml-3">
          <button className="px-3 py-1 text-sm rounded-full hover:text-white hover:bg-blue-400">
            Hotel
          </button>
          <button className="px-3 py-1 text-sm rounded-full hover:text-white hover:bg-blue-400">
            Restaurant
          </button>
        </div>

        {/* Search Filters */}
        <div className="border rounded-sm border-gray-200 py-2 px-4 flex items-center justify-between bg-white shadow-sm max-w-8xl mx-6 mb-3 text-sm">
          {/* Location */}
          <div className="flex flex-col flex-1 pr-4 border-r border-gray-200">
            <label className="text-gray-500 text-xs">Location</label>
            <div className="flex items-center space-x-1">
              <MapPin size={16} weight="fill" className="text-gray-400" />
              <select
                id="location"
                className="bg-transparent outline-none text-sm w-full"
              >
                <option>New York</option>
                <option>London</option>
                <option>Tokyo</option>
              </select>
            </div>
          </div>

          {/* Check In */}
          <div className="flex flex-col flex-1 pr-4 border-r border-gray-200">
            <label className="text-gray-500 text-xs">Check In</label>
            <div className="flex items-center space-x-1">
              <Calendar size={16} className="text-gray-400" />
              <input
                id="checkIn"
                type="date"
                className="bg-transparent outline-none text-sm w-full"
                defaultValue="2024-01-02"
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col flex-1 pr-4 border-r border-gray-200">
            <label className="text-gray-500 text-xs">Check Out</label>
            <div className="flex items-center space-x-1">
              <Calendar size={16} className="text-gray-400" />
              <input
                id="checkOut"
                type="date"
                className="bg-transparent outline-none text-sm w-full"
                defaultValue="2024-01-02"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col flex-1 pr-4">
            <label className="text-gray-500 text-xs">Guest</label>
            <div className="flex items-center space-x-1">
              <Users size={16} className="text-gray-400" />
              <select
                id="guests"
                className="bg-transparent outline-none text-sm w-full"
              >
                <option>2 adults</option>
                <option>1 adult</option>
                <option>3 adults</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-400 text-white rounded-full px-4 py-2 flex items-center space-x-1 hover:bg-blue-500 text-sm ml-4"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`${!searchData ? "mt-[250px]" : "mt-6"}`}>
        {searchData ? (
          <SearchContentSection data={searchData} />
        ) : (
          <DefaultContentSection />
        )}
      </div>
    </div>
  );
}
