import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Heart, Star } from "phosphor-react";
import { fetchSuggestions } from "../../services/Bookings/HotelSuggestion";
import { fetchTopHotels } from "../../services/Bookings/TopHotel";
import { useNavigate } from "react-router-dom";
import { createFavoriteApi } from "../../services/Favorites/createFavoriteApi";
import { getFavorites } from "../../services/Favorites/getFavorites";
import { useRef } from "react";

export default function DefaultContentSection() {
  const navigate = useNavigate();
  const [destinations] = useState([
    { name: "Hà Nội", img: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/dia-diem-du-lich-o-ha-noi-1.jpg", stays: "3.200 chỗ ở" },
    { name: "Hồ Chí Minh", img: "https://bcp.cdnchinhphu.vn/334894974524682240/2025/6/30/tphcm-1-1751245519173693919081.jpg", stays: "4.500 chỗ ở" },
    { name: "Đà Nẵng", img: "https://danangsensetravel.com/view/at_ve-dep-thanh-pho-da-nang-giu-tron-tung-khoanh-khac_6b555585df3ca96d931cf6f4378c9488.jpg", stays: "2.800 chỗ ở" },
    { name: "Hạ Long", img: "https://bcp.cdnchinhphu.vn/Uploaded/tranducmanh/2019_10_02/HaLong12.jpg", stays: "1.950 chỗ ở" },
    { name: "Huế", img: "https://cdn.tienphong.vn/images/a6bf4f60924201126af6849ca45a39800293057942b68130b3f3e6287a485c233f98767b4a4946d01005e45988bdfe2cc21bdd6a56e08dcb9a2f321f36e37322/do-thi-hue-1499.jpg", stays: "1.300 chỗ ở" },
    { name: "Nha Trang", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF3oDOjTsP7V50yBA8ey6bR7o4kvXM6SF5bg&s", stays: "2.600 chỗ ở" },
    { name: "Phú Quốc", img: "https://bcp.cdnchinhphu.vn/334894974524682240/2025/6/23/phu-quoc-17506756503251936667562.jpg", stays: "1.800 chỗ ở" },
    { name: "Sapa", img: "https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg", stays: "1.200 chỗ ở" },
    { name: "Cần Thơ", img: "https://www.homecredit.vn/upload/2_cuoi_nam_la_thoi_diem_ly_tuong_de_kham_pha_ve_dep_cua_can_tho_91915554d9.jpg", stays: "1.400 chỗ ở" },
    { name: "Đà Lạt", img: "https://tiki.vn/blog/wp-content/uploads/2023/02/san-may-da-lat.jpg", stays: "2.100 chỗ ở" },
  ]);

  const [likedHotels, setLikedHotels] = useState({});
const likeTimers = useRef({});
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.userId;


  const [suggestionHotels, setSuggestionHotels] = useState([]);
  const [topHotels, setTopHotels] = useState([]);

  const parseStyle = (style) => {
    try {
      return style ? JSON.parse(style) : {};
    } catch {
      return {};
    }
  };

  const randomReviewCount = () =>
    Math.floor(Math.random() * (500 - 100 + 1)) + 100;

useEffect(() => {
  const cleanUrl = (url) => url.replace(/^"+|"+$/g, "");

  const loadData = async () => {
    try {
      const [suggestions, tops, favs] = await Promise.all([
        fetchSuggestions(4),
        fetchTopHotels(4),
        getFavorites(userId, "HOTEL"),
      ]);

      setSuggestionHotels(
        suggestions.map((h) => ({
          ...h,
          price: (Math.random() * 100 + 100).toFixed(2),
          img: cleanUrl(h.image),
        }))
      );

      setTopHotels(
        tops.map((h) => ({
          ...h,
          price: (Math.random() * 100 + 100).toFixed(2),
          img: cleanUrl(h.image),
          reviewCount: randomReviewCount(),
        }))
      );

      // Đánh dấu những hotel đã tym
      if (favs && Array.isArray(favs.data)) {
        const favMap = {};
        favs.data.forEach((f) => {
          favMap[f.targetId] = true;
        });
        setLikedHotels(favMap);
      }
    } catch (err) {
      console.error("❌ Error loading hotels or favorites:", err);
    }
  };

  loadData();
}, [userId]);

const toggleLikeHotel = (hotelId) => {
  hotelId = String(hotelId);
  setLikedHotels((prev) => {
    const isLiked = !prev[hotelId];

    if (isLiked) {
      if (likeTimers.current[hotelId]) return prev;

      const timer = setTimeout(async () => {
        try {
          await createFavoriteApi(userId, "HOTEL", hotelId);
          console.log(`✅ Hotel ${hotelId} added to favorites`);
        } catch (err) {
          console.error("❌ Error creating hotel favorite:", err);
        }
        delete likeTimers.current[hotelId];
      }, 5000);

      likeTimers.current[hotelId] = timer;
    } else {
      if (likeTimers.current[hotelId]) {
        clearTimeout(likeTimers.current[hotelId]);
        delete likeTimers.current[hotelId];
        console.log(`🛑 Cancel hotel favorite for ${hotelId}`);
      }
    }

    return { ...prev, [hotelId]: isLiked };
  });
};

  const settings = {
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      {/* Destinations slider */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Most population location
      </h2>
      <div className="mx-auto w-2/3 mb-10">
        <Slider {...settings}>
          {destinations.map((d, idx) => (
            <div
              key={idx}
              className="p-1 cursor-pointer"
              onClick={() => navigate(`/booking/hotel?location=${encodeURIComponent(d.name)}`)}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-36 md:h-40 object-cover rounded-lg"
                />
                <div className="p-1 md:p-2 text-center">
                  <p className="font-semibold text-sm md:text-base">{d.name}</p>
                  <p className="text-xs text-gray-500">{d.stays}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Suggestion Hotels */}
      <div className="my-20 mx-auto w-2/3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="font-bold text-3xl">Suggestion Hotel</div>
            <div className="font-medium text-[#737373] mt-1">
              Quality as judged by customers. Book at the ideal price!
            </div>
          </div>
          <button
            onClick={() => navigate(`/booking/hotel?location=${encodeURIComponent("Đà Nẵng")}`)}
            className="px-4 py-2 text-[16px] border rounded-full bg-white hover:bg-blue-400 hover:text-white flex items-center space-x-1 cursor-pointer"
          >
            <span>View more</span>
            <i className="text-[12px] fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {suggestionHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="relative rounded-3xl overflow-hidden shadow-lg flex bg-white"
            >
              <div className="relative w-1/3">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="object-cover w-full h-full rounded-l-3xl"
                />
                <button
  onClick={(e) => {
    e.stopPropagation();
    toggleLikeHotel(hotel.hotelId);
  }}
  className={`absolute  cursor-pointer top-3 left-2 p-2 rounded-full shadow transition ${
    likedHotels[hotel.hotelId] ? "bg-rose-500" : "bg-white hover:bg-gray-100"
  }`}
>
  <Heart
    size={16}
    weight={likedHotels[hotel.hotelId] ? "fill" : "regular"}
    className={likedHotels[hotel.hotelId] ? "text-white" : "text-gray-600"}
  />
</button>
              </div>

              <div className="p-4 border-l w-2/3 rounded-r-3xl flex flex-col justify-between">
                <div>
                  <div className="bg-[#FFF0EC] font-semibold text-[10px] px-2 py-1 w-1/5 text-center rounded-full">
                    {parseStyle(hotel.style).type || "Unknown"}
                  </div>
                  <div className="text-[20px] font-bold mt-2">{hotel.name}</div>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="font-medium text-[14px]">
                        {hotel.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg text-gray-800">
                    ${hotel.price}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      / night
                    </span>
                  </span>
                  <button
                    onClick={() => navigate(`/booking/hotel/${hotel.hotelId}`)}
                    className="px-4 py-2  bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Hotels */}
      <div className="my-14 mx-auto max-w-6xl px-6">
        <div className="text-center mb-10">
          <div className="font-bold text-3xl">Travel with top Hotel</div>
          <div className="font-medium text-sm text-gray-500 mt-2">
            Navigate the Global with confidence
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {topHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="relative rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white"
            >
              <div className="relative">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="object-cover w-full h-48 rounded-t-3xl"
                />
               <button
  onClick={(e) => {
    e.stopPropagation();
    toggleLikeHotel(hotel.hotelId);
  }}
  className={`absolute  cursor-pointer top-3 left-2 p-2 rounded-full shadow transition ${
    likedHotels[hotel.hotelId] ? "bg-rose-500" : "bg-white hover:bg-gray-100"
  }`}
>
  <Heart
    size={16}
    weight={likedHotels[hotel.hotelId] ? "fill" : "regular"}
    className={likedHotels[hotel.hotelId] ? "text-white" : "text-gray-600"}
  />
</button>

              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="bg-[#FFF0EC] font-semibold text-[12px] px-2 py-1 w-1/3 text-center rounded-full">
                    {parseStyle(hotel.style).type || "Unknown"}
                  </div>

                  <div className="text-lg font-bold mt-2">{hotel.name}</div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        weight={
                          i < hotel.averageRating ? "fill" : "regular"
                        }
                        className="text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      ({hotel.reviewCount})
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm mt-2">
                    {hotel.location}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg text-gray-800">
                    ${hotel.price}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      / night
                    </span>
                  </span>
                  <button
                    onClick={() => navigate(`/booking/hotel/${hotel.hotelId}`)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
       {/* Why Travel Buddy */}
      <div className="my-20 mx-auto max-w-6xl px-6">
        <div className="font-bold text-2xl mb-8">Why choosing Travel Buddy?</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              img: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation@2x.png",
              title: "Free Cancellation",
              desc: "Cancel for free up to 24 hours before check-in."
            },
            {
              img: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/Reviews@2x.png",
              title: "Best Price",
              desc: "Book at the ideal price guaranteed."
            },
            {
              img: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/CustomerSupport@2x.png",
              title: "24/7 Support",
              desc: "We are here to help you anytime you need."
            },
            {
              img: "https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/TripsGlobe@2x.png",
              title: "Secure Payment",
              desc: "All payments are safe and encrypted."
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col text-left p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <img className="w-20 h-20 mb-4" src={item.img} alt={item.title} />
              <div className="font-semibold text-lg mb-2">{item.title}</div>
              <div className="text-gray-500 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
