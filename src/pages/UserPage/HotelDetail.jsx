import { Check } from "phosphor-react";
import {
  Shower,
  WifiHigh,
  TelevisionSimple,
  Car,
  CookingPot,
  UsersThree,

  CheckCircle,
  SmileyXEyes,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "phosphor-react";
export const HotelDetail = () => {
  const rooms = [
    {
      name: "Phòng Có 2 Giường Cỡ Queen",
      notice: "Chúng tôi còn 2 căn",
      img:"https://pix8.agoda.net/hotelImages/51623761/-1/637b6e9070db21c2dc18b6da2e1e309c.jpg?ce=0&s=208x117&ar=16x9",
      guests: "👤👤",
      price: "US$463",
      details: [
        "2 giường đôi lớn",
        "33 m² • Tầm nhìn ra khung cảnh",
        "Phòng tắm riêng • TV màn hình phẳng",
        "WiFi miễn phí • Máy pha Cà phê • Minibar",
      ],
    },
    {
      name: "Suite Hạng Sang",
      notice: "Giá tốt cho kỳ nghỉ dài",
      guests: "👤👤👤",
      price: "US$890",
      details: [
        "1 giường King",
        "50 m² • Ban công riêng",
        "Phòng khách + Bồn tắm",
        "WiFi miễn phí • TV 55\" • Bàn làm việc",
      ],
    },
    {
      name: "Phòng Gia Đình",
      notice: "Lý tưởng cho 4 khách",
        img:"https://pix8.agoda.net/hotelImages/51623761/-1/637b6e9070db21c2dc18b6da2e1e309c.jpg?ce=0&s=208x117&ar=16x9",
      guests: "👤👤👤👤",
      price: "US$1200",
      details: [
        "2 giường đôi lớn",
        "60 m² • Bếp nhỏ",
        "2 phòng tắm riêng",
        "Máy giặt • WiFi miễn phí • Sofa",
      ],
    },
    {
      name: "Phòng Deluxe Hướng Biển",
      notice: "View biển tuyệt đẹp",
      guests: "👤👤",
      price: "US$1050",
      details: [
        "1 giường King",
        "40 m² • Ban công hướng biển",
        "Bồn tắm • Minibar",
        "Máy pha cà phê • TV màn hình phẳng",
      ],
    },
  ];

  const images = [
    "https://pix8.agoda.net/property/51623761/0/4d153f7ed5f78486b56a294c5633397f.jpeg?ce=2&s=1024x",
    "https://pix8.agoda.net/hotelImages/51623761/-1/42a19473394443204b1aca6f2e5124c4.jpg?ce=0&s=375x",
    "https://pix8.agoda.net/property/51623761/0/2dcb011694c18ec6d5b0b2f4626e330d.jpeg?ce=2&s=1024x",
    "https://pix8.agoda.net/hotelImages/51623761/0/6e4d743611214602a48f25f46e826950.jpg?ce=2&s=1024x",
    "https://pix8.agoda.net/property/51623761/0/c37bbdf2caa59b05ab746e915f0da8bb.jpeg?ce=0&s=1024x",
    "https://pix8.agoda.net/hotelImages/51623761/0/98323b99ef6165fba989bb226437f684.jpg?ce=0&s=1024x",
    "https://pix8.agoda.net/hotelImages/51623761/0/98323b99ef6165fba989bb226437f684.jpg?ce=0&s=1024x",
  ];
  const facilities = [
    { icon: <Shower size={20} weight="duotone" className="text-green-600" />, text: "Phòng tắm riêng" },
    { icon: <WifiHigh size={20} weight="duotone" className="text-green-600" />, text: "WiFi miễn phí" },
    { icon: <TelevisionSimple size={20} weight="duotone" className="text-green-600" />, text: "TV màn hình phẳng" },
    { icon: <Car size={20} weight="duotone" className="text-green-600" />, text: "Xe đưa đón sân bay" },
    { icon: <CookingPot size={20} weight="duotone" className="text-green-600" />, text: "Dịch vụ phòng" },
    { icon: <UsersThree size={20} weight="duotone" className="text-green-600" />, text: "Phòng gia đình" },

    { icon: <CheckCircle size={20} weight="duotone" className="text-green-600" />, text: "Khu vực picnic" },
  ];
    const navigate = useNavigate();
 const scores = [
    { label: "Nhân viên phục vụ", value: 9.2 },
    { label: "Tiện nghi", value: 8.8 },
    { label: "Sạch sẽ", value: 9.0 },
    { label: "Thoải mái", value: 9.1 },
    { label: "Đáng giá tiền", value: 9.0 },
    { label: "Địa điểm", value: 9.0 },
    { label: "WiFi miễn phí", value: 8.7 },
  ];


  const reviews = [
    {
      name: "Truong",
      country: "Việt Nam",
      content:
        "Giá tốt là điều đầu tiên và sạch sẽ wifi mạnh nước nóng mạnh rất hài lòng",
    },
    {
      name: "Thanh",
      country: "Việt Nam",
      content:
        "Khách sạn tiện nghi, nhân viên thân thiện, nằm gần các địa điểm tham quan, giá cả rất rẻ so với chất lượng",
    },
    {
      name: "Phương",
      country: "Việt Nam",
      content:
        "Khách sạn rất sạch sẽ, phòng có ban công thoáng mát, nhân viên thân thiện. Chúng tôi rất hài lòng với giá phòng.",
    },
  ];


  return (
    <div className="mx-auto container w-3/4 b">
        {/* find box */}
      <div className="px-10 py-4 bg-white border-gray-700 rounded-sm shadow-sm mt-2">
        <div className="flex justify-between items-center ">
          <div className="text-sm text-gray-600 flex space-x-8">
            <div className="cursor-pointer">Tổng quan</div>
            <div className="cursor-pointer">Thông tin </div>
            <div className="cursor-pointer">Tiện nghi & giá</div>
      
            <div className="cursor-pointer">Đáng giá của khách</div>
          </div>
          <button className="px-4 py-2 bg-blue-700 border-none  text-white font-semibold rounded-lg">Chi tiết</button>

        </div>

      </div>

        {/* information  */}
      <div className="   my-6 flex space-x-6">
        <div className="flex w-4/5 justify-between items-center bg-white border-gray-700 rounded-sm shadow-sm px-10 py-6">
          <div className="flex-col text-left text-gray-600 flex space-y-2 w-full">
            <div className="px-4 py-1 text-white text-xs bg-blue-300 rounded-sm w-1/3">Mới được xây dụng vào năm 2024</div>
            <div className="text-xl font-bold text-black w-full">Wink Hotel Can Tho Ninh Kieu Wharf - 24hrs stay & Rooftop Pool Bar
              <div className="">****</div>
            </div>
            <div className="text-xs font-semibold">14 Phan Dinh Phung , Tan An, Can Tho, Bến Ninh Kiều, Cần Thơ, Việt Nam, 700000 - <a className="text-blue-400">Trên bản đồ</a></div>
          </div>


        </div>
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 w-1/3 space-y-4">
          {/* Điểm tổng + số bài đánh giá */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xl font-bold text-black">9,1 Trên cả tuyệt vời</div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Check size={16} className="text-blue-600 mr-1" />
                1.930 bài đánh giá
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Đọc mọi bài đánh giá
            </a>
          </div>

          {/* Các tiêu chí nhỏ */}
          <div className="flex text-xs flex-wrap gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-medium">
              Độ sạch sẽ 9,5
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-medium">
              Vị trí 9,5
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-medium">
              Dịch vụ 9,3
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-medium">
              Cơ sở vật chất 9,2
            </span>
          </div>


        </div>

      </div>
      {/* picture */}
      <div className="my-6  ">
        <div className="grid grid-cols-5 grid-rows-2 gap-2 rounded-lg overflow-hidden relative">
          {/* Ảnh to bên trái */}
          <div className="row-span-2 col-span-2 relative">
            <img
              src={images[0]}
              alt="main"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Nút xem mọi bức ảnh */}
            <button className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-sm px-3 py-2 rounded-full flex items-center gap-2 shadow hover:bg-white">
              <i className="fa-regular fa-image"></i> Xem mọi bức ảnh
            </button>
          </div>

          {/* Wishlist */}
          <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-105">
            <i className="fa-regular fa-heart text-gray-600"></i>
          </button>

          {/* Các ảnh nhỏ bên phải */}
          {images.slice(1).map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt={`thumb-${idx}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

      </div>
         {/* detail */}
      <div className="my-6 flex space-x-6">
        {/* Bên trái: Nội dung mô tả */}
        <div className="flex-1 bg-white border border-gray-200 rounded-md shadow-sm px-8 py-6 space-y-4">
          <h2 className="text-lg font-bold">Giới thiệu chỗ nghỉ</h2>
          <p className="text-sm text-gray-700">
            Bạn có thể đủ điều kiện hưởng giảm giá Genius tại Dalat Wind Hotel. Để biết giảm giá Genius có áp dụng cho ngày bạn đã chọn hay không, hãy đăng nhập.

            Giảm giá Genius tại chỗ nghỉ này tùy thuộc vào ngày đặt phòng, ngày lưu trú và các ưu đãi có sẵn khác.

            Tọa lạc tại thành phố Đà Lạt, cách Hồ Xuân Hương 500 m, Dalat Wind Hotel là khách sạn 2 sao có lễ tân 24 giờ, sảnh khách chung, Wi-Fi và chỗ đỗ xe riêng miễn phí.

            Tại khách sạn, tất cả các phòng đều có bàn làm việc, TV màn hình phẳng, ấm đun nước và phòng tắm riêng với chậu rửa vệ sinh (bidet). Một số phòng còn có ban công.

            Khách sạn phục vụ bữa sáng gọi món hàng ngày. Du khách có thể dùng bữa tại nhà hàng trong khuôn viên, nơi chuyên phục vụ các món nướng/BBQ.

            Du khách cũng có thể thư giãn trên sân hiên tắm nắng.

            Các điểm tham quan nổi tiếng gần Dalat Wind Hotel bao gồm Vườn hoa Đà Lạt, Quảng trường Lâm Viên và Công viên Yersin Đà Lạt. Sân bay gần nhất là sân bay Liên Khương, cách chỗ nghỉ 23 km.

            Các cặp đôi đặc biệt thích địa điểm này — họ cho điểm 8,8 khi đánh giá chuyến đi hai người.
          </p>

          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-base font-semibold mb-4">
              Cực kỳ phù hợp cho kỳ lưu trú của bạn
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              {facilities.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bên phải: Bản đồ + Điểm vị trí */}
        <div className="w-1/3 bg-white border border-gray-200 rounded-md shadow-sm p-6 space-y-4 h-1/2">
          {/* Map */}
          <div className="relative h-32 w-full bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-sm font-semibold text-gray-600">TRÊN BẢN ĐỒ</span>
          </div>

          {/* Điểm đánh giá */}
          <div>
            <div className="text-lg font-bold">9,5 Trên cả tuyệt vời</div>
            <div className="text-sm text-gray-600">Điểm đánh giá vị trí</div>
            <div className="mt-2 text-sm text-green-700 font-semibold">
              ⭐ Vị trí hiếm có - trong nội thành
            </div>
          </div>
        </div>
      </div>

      {/* room*/}
<div className="my-14 bg-white border-gray-700 rounded-sm shadow-sm px-10 py-2">
  <div className="my-6">
    <h2 className="text-xl font-bold mb-3">Phòng trống</h2>
    <div className="text-sm text-gray-500 mb-3">
      Giá đã được đổi qua USD
    </div>

    {/* Bộ lọc ngày + khách */}
    <div className="flex border border-blue-400 rounded-md overflow-hidden shadow-sm max-w-4xl">
      {/* Ngày */}
      <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 flex-1 cursor-pointer hover:bg-gray-50">
        <Calendar size={20} className="text-gray-600" />
        <span className="text-sm text-gray-800">
          T5, 25 tháng 9 — T4, 15 tháng 10
        </span>
      </div>

      {/* Khách & phòng */}
      <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 flex-1 cursor-pointer hover:bg-gray-50">
        <Users size={20} className="text-gray-600" />
        <span className="text-sm text-gray-800">
          2 người lớn · 0 trẻ em · 1 phòng
        </span>
        <i className="fa-solid fa-caret-down text-gray-500 ml-auto"></i>
      </div>

      {/* Nút thay đổi */}
      <button 
      
      className="bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700">
        
        Thay đổi tìm kiếm
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto my-6">
      <table className="w-full border border-gray-300 text-sm border-collapse">
        <thead>
          <tr className="bg-blue-400 text-white text-left">
            <th className="p-3 border border-gray-300">Loại chỗ nghỉ</th>
            <th className="p-3 border border-gray-300">Số lượng khách</th>
            <th className="p-3 border border-gray-300">Giá cho 20 đêm</th>
            <th className="p-3 border border-gray-300">Chọn phòng</th>
            <th className="p-3 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, idx) => (
            <tr key={idx}>
              {/* Loại chỗ nghỉ */}
              <td className="p-3 border border-gray-300 align-top w-1/4">
                <div className="font-bold text-black">{room.name}</div>
                <div className="text-red-500 text-xs my-2">{room.notice}</div>
                <img  src={room.img} className="object-center"/>
                <ul className="mt-2 text-xs text-gray-600 list-disc list-inside space-y-1">
                  {room.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </td>

              {/* Số lượng khách */}
              <td className="p-3 border border-gray-300 text-center">
                {room.guests}
              </td>

              {/* Giá */}
              <td className="p-3 border border-gray-300 font-semibold text-gray-800">
                {room.price}
                <div className="text-xs text-gray-500">
                  Đã bao gồm thuế và phí
                </div>
              </td>

              {/* Chọn phòng */}
              <td className="p-3 border border-gray-300 text-center">
                <select className="border rounded px-2 py-1 text-sm w-20">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </td>

              {/* Nút đặt */}
              <td className="p-3 border border-gray-300 text-center">
                <button
                   onClick={() => navigate("/booking/confirmation")}  
                className="block w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-sm px-4 py-2 rounded">
                  Tôi sẽ đặt
                </button>
                <div className="text-xs text-gray-500 mt-1">
                  Bạn sẽ không bị trừ tiền ngay
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

</div>
        {/* rating */}
<div className="my-14 bg-white border border-gray-200 rounded-sm shadow-sm px-10 py-6">
      {/* Điểm tổng */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-600 text-white font-bold text-lg px-3 py-2 rounded">
          8,8
        </div>
        <div>
          <div className="font-semibold">
            Tuyệt vời · 981 đánh giá{" "}
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Đọc tất cả đánh giá
            </a>
          </div>
        </div>
      </div>

      {/* Hạng mục */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {scores.map((s, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span>{s.label}</span>
              <span className="font-semibold">{s.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${(s.value / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

     

      {/* Review list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-md p-4 shadow-sm"
          >
            <div className="font-bold">{r.name}</div>
            <div className="text-xs text-gray-500 mb-2">{r.country}</div>
            <p className="text-sm text-gray-700 mb-2">“{r.content}”</p>
            <a
              href="#"
              className="text-blue-600 text-xs font-medium hover:underline"
            >
              Tìm hiểu thêm
            </a>
          </div>
        ))}
      </div>
    </div>


    </div>
  );
};
