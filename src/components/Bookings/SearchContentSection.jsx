import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
    ArrowsDownUp,
    CaretDown,
    SortAscending,
    SortDescending,
    Star,
    MapPin,
    CaretUp, 
} from "phosphor-react";

export default function SearchContentSection() {
    const [min, setMin] = useState(2400);
    const [max, setMax] = useState(9975);
    const [filters, setFilters] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
       const [searchParams] = useSearchParams();
 const [openSections, setOpenSections] = useState({
    popular: true,
    promo: true,
  });
  const navigate = useNavigate();
  useEffect(() => {
  let logged = false;
  if (!logged) {
    const location = searchParams.get("location");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");


    console.log(location, checkIn, checkOut, guests);
    logged = true;
  }
}, [searchParams]);

    const handleChange = (values) => {
        setMin(values[0]);
        setMax(values[1]);
    };

    // fake data hotels
    const hotels = [
        {
            id: 1,
            name: "Panorama Nha Trang Central Condotel",
            price: 5000,
            oldPrice: 6500,
            rating: 4,
            reviews: 1200,
            reviewText: "Rất tốt",
            tags: ["luxury", "nearBeach", "pool", "breakfast"],
            location: "Nha Trang",
            distance: 1.2,
            description:
                "Panorama Nha Trang Central Condotel tọa lạc tại trung tâm thành phố, cách bãi biển chỉ vài phút đi bộ. Khách sạn cung cấp căn hộ hiện đại với hồ bơi vô cực nhìn ra biển, nhà hàng quốc tế, và phòng tập thể dục hiện đại. Đây là lựa chọn hoàn hảo cho du khách muốn tận hưởng kỳ nghỉ sang trọng và tiện nghi.",
        },
        {
            id: 2,
            name: "Seaside Resort",
            price: 3500,
            oldPrice: 4000,
            rating: 3,
            reviews: 800,
            reviewText: "Tốt",
            tags: ["nearBeach", "petFriendly"],
            location: "Nha Trang",
            distance: 0.8,
            description:
                "Seaside Resort nằm sát bãi biển, mang đến trải nghiệm thư giãn với khung cảnh biển tuyệt đẹp. Resort có khu vực dành riêng cho thú cưng, hồ bơi ngoài trời, và nhiều hoạt động giải trí cho gia đình. Phù hợp với những ai yêu thích không gian thoải mái và tiện ích thân thiện.",
        },
        {
            id: 3,
            name: "Budget Hostel Nha Trang",
            price: 1500,
            oldPrice: 1800,
            rating: 2,
            reviews: 400,
            reviewText: "Ổn",
            tags: ["breakfast"],
            location: "Nha Trang",
            distance: 2.5,
            description:
                "Budget Hostel Nha Trang là lựa chọn tiết kiệm cho du khách ba lô và nhóm bạn trẻ. Hostel cung cấp phòng tập thể sạch sẽ, bữa sáng đơn giản, và khu sinh hoạt chung thoải mái để kết nối với những người bạn mới. Từ đây, bạn có thể dễ dàng khám phá các điểm tham quan trong thành phố.",
        },
        {
            id: 4,
            name: "Skyline Luxury Hotel",
            price: 10000,
            oldPrice: 12000,
            rating: 5,
            reviews: 1500,
            reviewText: "Tuyệt hảo",
            tags: ["luxury", "airportShuttle", "pool"],
            location: "Nha Trang",
            distance: 0.5,
            description:
                "Skyline Luxury Hotel là khách sạn 5 sao đẳng cấp với thiết kế hiện đại và dịch vụ hoàn hảo. Khách sạn có hồ bơi trên tầng thượng với tầm nhìn toàn cảnh thành phố, spa cao cấp, và dịch vụ đưa đón sân bay riêng. Đây là điểm đến lý tưởng cho những ai tìm kiếm kỳ nghỉ sang trọng và đáng nhớ.",
        },
    ];


    // lọc theo price + filter tags
    const filteredHotels = hotels.filter((hotel) => {
        const inPrice = hotel.price >= min && hotel.price <= max;
        const matchFilters =
            filters.length === 0 || filters.every((f) => hotel.tags.includes(f));
        return inPrice && matchFilters;
    });

    const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

   const filterGroups = [
    {
      id: "popular",
      title: "Popular Filter",
      options: [
        "Breakfast included",
        "Affordable Luxury",
        "Good Location",
        "Family/Kid friendly",
        "Beach side",
      ],
    },
    {
      id: "promo",
      title: "Promo & Discount",
      options: [
        "Promo for You",
        "Beach side",
        "Breakfast included",
        "Family/Kid friendly",
        "Top Favourite",
      ],
    },
      {
      id: "Accommodation ",
      title: "Accommodation Type",
      options: [
        "Villa",
        "Hotel",
        "Ryokan ",
        "Apartment",
       
      ],
    },
  ];

    return (
        <div className="container w-5/6 mx-auto flex gap-6 ">
            {/* Sidebar trái */}
            <div className="w-1/4 space-y-4">
                {/* Price Range */}
                <div className="p-4 border-gray-400 rounded-xl shadow-sm  bg-white">
                    <h3 className="text-base font-bold mb-2">Price Range</h3>
                    <div className="values text-blue-600 font-semibold mb-1">
                        ${min.toLocaleString()} - ${max.toLocaleString()}
                    </div>
                    <Slider
                        range
                        min={500}
                        max={12000}
                        value={[min, max]}
                        onChange={handleChange}
                    />
                </div>

                {/* Bộ lọc */}
              <div className="space-y-4">
   {filterGroups.map((group) => (
  <div
    key={group.id}
    className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white"
  >
    {/* Header */}
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => toggleSection(group.id)}
    >
      <h3 className="text-sm font-bold">{group.title}</h3>
      {openSections[group.id] ? (
        <CaretUp size={18} className="text-gray-500" />
      ) : (
        <CaretDown size={18} className="text-gray-500" />
      )}
    </div>

    {/* Options */}
    {openSections[group.id] && (
      <div className="space-y-2 mt-2">
        {group.options.map((opt) => (
          <label
            key={opt}
            className="flex items-center cursor-pointer gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={filters.includes(opt)}
              onChange={() => toggleFilter(opt)}
              className="h-4 w-4 border-gray-400 rounded-md text-blue-600 focus:ring-0"
            />
            {opt}
          </label>
        ))}
        <button className="text-blue-600 text-sm font-medium hover:underline">
          See All
        </button>
      </div>
    )}
  </div>
))}

    </div>
            </div>

            {/* Content bên phải */}
            <div className="w-3/4 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">Nha Trang</h1>
                        <div className="font-semibold text-sm">
                            {filteredHotels.length} properties found
                        </div>
                    </div>
                    {/* Dropdown sort */}
                    <div className="relative inline-block w-64 bg-white">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full border border-gray-400 px-4 py-2 rounded-full text-sm bg-white flex justify-between items-center"
                        >
                            <span className="flex items-center">
                                <ArrowsDownUp size={16} className="mr-2" /> Ưu tiên nhà & căn hộ
                            </span>
                            <CaretDown size={16} />
                        </button>

                        {dropdownOpen && (
                            <ul className="absolute w-full text-sm bg-white border border-gray-400 rounded-md mt-1 shadow-lg z-10">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <SortAscending size={16} className="mr-2 " /> Giá thấp nhất
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <SortDescending size={16} className="mr-2" /> Giá cao nhất
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <Star size={16} className="mr-2" /> Đánh giá cao nhất
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <MapPin size={16} className="mr-2" /> Khoảng cách gần nhất
                                </li>
                            </ul>
                        )}
                    </div>  
                </div>

                {/* Hotel Cards */}
                <div className="space-y-4">
                    {filteredHotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="border rounded-lg px-4 py-4 border-gray-300 flex gap-4 shadow-sm bg-white"
                        >
                            {/* Ảnh */}
                            <div className="relative w-1/3">
                                <img
                                    src="https://cf.bstatic.com/xdata/images/hotel/square600/332960137.webp?k=fef71229a3aaf4b2a394f05adc1389bd2a86a8de2da269f65e60ce4424d6288e&o="
                                    alt={hotel.name}
                                    className="rounded-md w-full h-full object-cover"
                                />
                                {/* Wishlist */}
                                <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-105">
                                    <i className="fa-regular fa-heart text-gray-600"></i>
                                </button>
                            </div>

                            {/* Nội dung */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div className="">
                                        <h1 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                                            {hotel.name}
                                            <span className="text-yellow-500 text-sm">
                                                {"⭐".repeat(hotel.rating)}
                                            </span>
                                        </h1>

                                        <div className="text-sm text-blue-600 mt-3 flex items-center gap-2">
                                            <span>{hotel.location}</span>
                                            <button className="underline hover:text-blue-800">
                                                Xem trên bản đồ
                                            </button>
                                            <span className="text-gray-500">
                                                · {hotel.distance} km từ trung tâm
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 my-4">
                                            {hotel.tags && hotel.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-blue-400 text-white text-xs font-medium px-2 py-1 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-6">
                                            {hotel.description && (
                                                <p className="text-sm text-gray-600">
                                                    {hotel.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>


                                </div>


                            </div>
                            <div className="flex flex-col justify-between text-right items-end">
                                <div className="">
                                    <div className="flex items-center gap-2 ">

                                        <span className="text-sm font-semibold">
                                            {hotel.reviewText}
                                        </span>
                                        <span className="bg-blue-900 text-white px-2 py-1 rounded font-bold">
                                            {(hotel.rating * 2).toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {hotel.reviews} đánh giá
                                    </div>
                                </div>
                                <div className="text-right">
                                    {hotel.oldPrice && (
                                        <div className="text-sm text-gray-400 line-through">
                                            US${hotel.oldPrice}
                                        </div>
                                    )}
                                    <div className="text-xl font-bold text-red-600">
                                        US${hotel.price}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Đã bao gồm thuế và phí
                                    </div>
                                     <button
      onClick={() => navigate("/booking/hotel/1")}
      className="bg-blue-500 text-white px-4 py-2 font-semibold cursor-pointer rounded-md mt-2"
    >
      Xem chỗ trống
    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
