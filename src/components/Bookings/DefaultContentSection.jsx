import Slider from "react-slick";
import { Heart, Star } from "phosphor-react";

export default function DefaultContentSection() {
 
  const destinations = [
    { name: "France", img: "https://www.bugbog.com/wp-content/uploads/2023/08/887087fa4833809f/best-places-like-france.jpeg", stays: "1.546 chỗ ở" },
    { name: "Poland", img: "https://deviet.vn/wp-content/uploads/2016/10/du-lich-ba-lan2.png", stays: "1.744 chỗ ở" },
    { name: "Singapore", img: "https://www.sellingtravel.co.uk/wp-content/uploads/2024/03/Singapore-main.png", stays: "8.329 chỗ ở" },
    { name: "Canada", img: "https://i.natgeofe.com/k/e2ffc795-8b1f-4479-8c95-b6497e5ca4f2/canada-vancouver.jpg?wp=1&w=1084.125&h=609", stays: "5.534 chỗ ở" },
    { name: "Việt Nam", img: "https://bcp.cdnchinhphu.vn/344443456812359680/2025/1/1/economy-23-1735698459702311790740.jpeg", stays: "5.165 chỗ ở" },
    { name: "Brazil", img: "https://images.goway.com/production/featured_images/shutterstock_1276835941.jpg", stays: "4.875 chỗ ở" },
    { name: "ThaiLand", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZmXysW8iVnekvTKi1QmZw_E0MM_-cD0uQ4Q&s", stays: "3.210 chỗ ở" },
    { name: "Greece", img: "https://www.earthtrekkers.com/wp-content/uploads/2024/11/Greece-Header-Image.jpg.webp", stays: "6.432 chỗ ở" },
    { name: "Japan", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FichgawfwrnY9Iqrg8W7piwIlxkc-DSthg&s", stays: "2.980 chỗ ở" },
    { name: "Chinese", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvoitWkJj94AGIbCDj_UPrd8cIV40aqfXrg&s", stays: "3.450 chỗ ở" },
  ];
  const suggestionHotels = [
    {
      id: 1,
      type: "Luxury",
      name: "Fairmont Resort, Dubai, United Arab Emirates",
      location: "Dubai, UEA",
      price: 148.25,
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/39/3d/a8/fairmont-the-palm-is.jpg?w=900&h=-1&s=1",
      rating: 5,
      reviewCount: 120
    },
    {
      id: 2,
      type: "Standard",
      name: "Atlantis Hotel, Dubai",
      location: "Dubai, UEA",
      price: 220.0,
      img: "https://assets.kerzner.com/api/public/content/ee8f360722de459a93ca4eaa257b308b?v=a3566083&t=w2880",
      rating: 4,
      reviewCount: 95
    },
    {
      id: 3,
      type: "Suite",
      name: "Diamond Sea Hotel",
      location: "Da Nang, VietNam",
      price: 110.0,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXyNE02L7suEBEchrowqgPF6VO4lBAZVLvrg&s",
      rating: 3,
      reviewCount: 80
    },
    {
      id: 4,
      type: "Resort",
      name: "Pullman Danang Beach Resort",
      location: "Dubai, UEA",
      price: 165.0,
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/5a/fe/96/caption.jpg?w=1400&h=800&s=1",
      rating: 4,
      reviewCount: 150
    },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 5,        // Hiển thị 5 hình cùng lúc để cảm giác nhỏ gọn
    autoplay: true,
    autoplaySpeed: 2000,     // 3s
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Most population location
      </h2>
      <div className="mx-auto w-2/3 mb-10">
        <Slider {...settings}>
          {destinations.map((d, idx) => (
            <div key={idx} className="p-1">
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
      <div className="my-20 mx-auto w-2/3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="font-bold text-3xl">Suggestion Hotel</div>
            <div className="font-medium text-[#737373] mt-1">
              Quality as judged by customers. Book at the ideal price!
            </div>
          </div>
          <button className="px-4 py-2 text-[16px] border rounded-full  bg-white hover:bg-blue-400 hover:text-white flex items-center space-x-1">
            <span>View more</span>
            <i className="text-[12px] fa-solid fa-arrow-right"></i>
          </button>
        </div>

        {/* Grid khách sạn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {suggestionHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="relative rounded-3xl overflow-hidden shadow-lg flex bg-white"
            >
              {/* Image */}
              <div className="relative w-1/3">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="object-cover w-full h-full rounded-l-3xl"
                />
                <div className="absolute top-3 left-2 bg-white px-2 py-1 rounded-full shadow cursor-pointer">
                  <i className="fa-regular fa-heart text-gray-600"></i>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 border-l w-2/3 rounded-r-3xl flex flex-col justify-between">
                <div>
                  <div className="bg-[#FFF0EC] font-semibold text-[12px] px-2 py-1 w-1/4 text-center rounded-full">
                    {hotel.type}
                  </div>
                  <div className="text-[20px] font-bold mt-2">{hotel.name}</div>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="font-medium text-[14px]">{hotel.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg text-gray-800">
                    ${hotel.price}{" "}
                    <span className="text-sm font-normal text-gray-500">/ night</span>
                  </span>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-14 mx-auto max-w-6xl px-6">
        <div className="text-center mb-10">
          <div className="font-bold text-3xl">Travel with top Hotel</div>
          <div className="font-medium text-sm text-gray-500 mt-2">
            Navigate the Global with confidence
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {suggestionHotels.map((hotel) => (
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
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full shadow cursor-pointer">
                  <Heart size={16} weight="regular" className="text-gray-600" />
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="bg-[#FFF0EC] font-semibold text-xs px-2 py-1 w-1/4 text-center rounded-full">
                    {hotel.type}
                  </div>
                  <div className="text-lg font-bold mt-2">{hotel.name}</div>
                  {/* Star rating */}
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        weight={i < hotel.rating ? "fill" : "regular"}
                        className="text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      ({hotel.reviewCount})
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm mt-2">{hotel.location}</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg text-gray-800">
                    ${hotel.price}{" "}
                    <span className="text-sm font-normal text-gray-500">/ night</span>
                  </span>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>






      <div className="my-20 mx-auto max-w-6xl px-6">
        <div className="font-bold text-2xl mb-8">Why choosing Travel Buddy?</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Item 1 */}
          <div className="flex flex-col text-left p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img
              className="w-20 h-20 mb-4"
              src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation@2x.png"
              alt="Feature 1"
            />
            <div className="font-semibold text-lg mb-2">Free Cancellation</div>
            <div className="text-gray-500 text-sm">Cancel for free up to 24 hours before check-in.</div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col text-left p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img
              className="w-20 h-20 mb-4"
              src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/Reviews@2x.png"
              alt="Feature 2"
            />
            <div className="font-semibold text-lg mb-2">Best Price</div>
            <div className="text-gray-500 text-sm">Book at the ideal price guaranteed.</div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col text-left p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img
              className="w-20 h-20 mb-4"
              src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/CustomerSupport@2x.png"
              alt="Feature 3"
            />
            <div className="font-semibold text-lg mb-2">24/7 Support</div>
            <div className="text-gray-500 text-sm">We are here to help you anytime you need.</div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col text-left p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img
              className="w-20 h-20 mb-4"
              src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/TripsGlobe@2x.png"
              alt="Feature 4"
            />
            <div className="font-semibold text-lg mb-2">Secure Payment</div>
            <div className="text-gray-500 text-sm">All payments are safe and encrypted.</div>
          </div>
        </div>
      </div>

    </div>
  );
}
