import { useEffect, useState } from "react";
import { MapPin, Calendar, Users, MagnifyingGlass } from "phosphor-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DefaultContentSection from "../../components/Bookings/DefaultContentSection";
import SearchContentSection from "../../components/Bookings/SearchContentSection";

export default function BookingHotel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "1 adult",
  });

  // Lấy danh sách tỉnh/thành phố từ API
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  // Cập nhật từ query URL
  useEffect(() => {
    const location = searchParams.get("location") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const guests = searchParams.get("guests") || "1 adult";

    setSearchData({ location, checkIn, checkOut, guests });
  }, [searchParams]);

  // Xử lý khi bấm Search
  const handleSearch = () => {
    if (!searchData.location) {
      alert("Vui lòng chọn địa điểm!");
      return;
    }
    navigate(
      `/booking/hotel?location=${encodeURIComponent(
        searchData.location
      )}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&guests=${encodeURIComponent(
        searchData.guests
      )}`
    );
  };

  // Hôm nay và ngày mai (mặc định checkIn/checkOut)
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <div>
      {/* Nếu chưa search thì hiện background */}
      {!searchParams.get("location") && (
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
        ${!searchParams.get("location")
          ? "relative top-[220px] rounded-2xl w-fit"
          : "sticky top-0 z-50 w-full rounded-none"}`}
      >
        {/* Tabs */}
        <div className="flex space-x-2 items-center mb-3 ml-3">
          <button className="px-3 py-1 text-sm rounded-full bg-blue-400 text-white">
            Hotel
          </button>
          <button className="px-3 py-1 text-sm rounded-full hover:text-white hover:bg-blue-400">
            Restaurant
          </button>
        </div>

        {/* Search Filters */}
        <div className="border rounded-sm border-gray-200 py-2 px-4 flex items-center justify-between bg-white shadow-sm max-w-8xl mx-6 mb-3 text-sm space-x-3">
          {/* Location */}
          <div className="flex flex-col flex-1 pr-4 border-r border-gray-200">
            <label className="text-gray-500 text-xs">Location</label>
            <div className="flex items-center space-x-1">
              <MapPin size={16} weight="fill" className="text-gray-400" />
              <select
                id="location"
                className="bg-transparent outline-none text-sm w-full"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({ ...searchData, location: e.target.value })
                }
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.name}>
                    {p.name}
                  </option>
                ))}
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
                value={searchData.checkIn || today}
                min={today}
                onChange={(e) =>
                  setSearchData({ ...searchData, checkIn: e.target.value })
                }
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
                value={searchData.checkOut || tomorrow}
                min={searchData.checkIn || today}
                onChange={(e) =>
                  setSearchData({ ...searchData, checkOut: e.target.value })
                }
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
                value={searchData.guests}
                onChange={(e) =>
                  setSearchData({ ...searchData, guests: e.target.value })
                }
              >
                <option>1 adult</option>
                <option>2 adults</option>
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
      <div className={`${!searchParams.get("location") ? "mt-[250px]" : "mt-6"}`}>
        {searchParams.get("location") ? (
          <SearchContentSection data={searchData} />
        ) : (
          <DefaultContentSection />
        )}
      </div>
    </div>
  );
}
