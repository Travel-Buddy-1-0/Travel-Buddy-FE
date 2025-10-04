import BookingSteps from "./BookingSteps";
import { LockSimple } from "phosphor-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HotelSummaryCard from "../Hotel/HotelSummaryCard";
import BookingSummary from "./BookingSummary";
import { bookingHotel } from "../../services/Bookings/bookHotel";



export default function BookingCheckout() {
  const [agree, setAgree] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ state
  const {
    customerName,
    customerEmail,
    customerPhone,
    specialRequest,
    checkIn,
    checkOut,
    totalPrice,
    nights,
    guests,
    hotelId,
    room
  } = location.state || {};

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  console.log(userId)

  const handleBooking = async () => {
    if (!userId || !room) return;

    const bookingData = {
  customerName,
  customerEmail,
  customerPhone,
  specialRequest: specialRequest || "Không có",
  checkIn,
  checkOut,
  totalPrice: totalPrice || 0,
  nights: nights || 1,
  guests: guests || 1,
  hotelId: hotelId || 0,
  roomId: room?.roomId || 0,
//   restaurantId: 0  // thêm để backend không lỗi
};


    try {
      const result = await bookingHotel(bookingData);
      console.log("Booking success:", result);
   
     navigate("/booking/sucesss", {
  state: {
    hotelId: hotelId,
    room: room,
    totalPrice:totalPrice,
    checkIn:checkIn,
    checkOut:checkOut,
    nights:nights
  }
});

    } catch (error) {
      console.error("Booking failed:", error);

    
    navigate("/booking/failed", {
      state: {
        errorMessage: error?.message || "Đặt phòng thất bại. Vui lòng thử lại!"
      }
    });
    }
  };

  return (
    <div className="w-full mx-auto px-6">
      {/* Step bar */}
      <BookingSteps currentStep={3} />

      <div className="my-10 gap-8 w-3/4 mx-auto flex">
        <div className="my-6 flex space-x-8 flex-col w-full">
          {/* Thanh toán và checkbox */}
          <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6 space-y-6">
            <h2 className="text-lg font-semibold">Chọn cách thanh toán</h2>

            {/* Option 1 */}
            <div className="space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">
                    Thanh toán vào ngày <span className="font-semibold">29 Tháng 9, 2025</span>
                  </div>
                  <ul className="text-sm text-green-600 space-y-1 mt-1">
                    <li>✔ KHÔNG SỢ RỦI RO! Không thanh toán hôm nay</li>
                    <li>✔ Hủy miễn phí trước 30 Tháng 9, 2025</li>
                  </ul>
                  <p className="text-sm text-blue-600 hover:underline">
                    Tiền sẽ được trực tiếp trừ vào tài khoản cá nhân trên webiste
                  </p>
                </div>
              </label>
            </div>

            {/* Option 2 */}
            <div className="pt-4 border-t">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">Thanh toán khi nhận phòng</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Bạn có thể chọn Thanh toán khi nhận phòng, khách sạn sẽ gọi điện trong vòng 1 tiếng.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Checkbox marketing */}
          <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-8 py-6 space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
               Tôi đồng ý nhận email marketing từ TravelBuddy, bao gồm khuyến mãi, đề xuất được cá nhân hóa, tặng thưởng, trải nghiệm du lịch và cập nhật về các sản phẩm và dịch vụ của TravelBuddy.
Với việc đăng kí nhận email marketing, bạn cho phép chúng tôi đề xuất các sản phẩm, dịch vụ, ưu đãi và nội dung theo sở thích của mình bằng việc theo dõi cách bạn sử dụng TravelBuddy thông qua công nghệ theo dõi. Hủy đăng kí bất cứ lúc nào thông qua phần cài đặt tài khoản hoặc đường dẫn trong bất kỳ email marketing nào. Tham khảo chính sách bảo mật của chúng tôi.
              </span>
            </label>

            {/* Điều kiện */}
            <p className="text-sm text-gray-700">
              Đặt phòng của bạn là đặt phòng trực tiếp với{" "}
              <span className="font-semibold">Khách sạn</span> và và bằng việc hoàn tất đặt phòng này, bạn đồng ý với điều kiện đặt phòng, điều khoản chung và chính sách bảo mật.
            </p>

            {/* Nút hoàn tất đặt chỗ */}
            <button
              disabled={!agree}
              onClick={handleBooking}
              className={`w-full cursor-pointer flex items-center justify-center px-6 py-2 rounded-md font-semibold text-white space-x-2 transition ${agree ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
              <LockSimple size={20} weight="fill" />
              <span>Hoàn tất đặt chỗ</span>
            </button>
          </div>
        </div>

        {/* Bảng tóm tắt */}
        <div className="flex flex-col space-y-6">
          <HotelSummaryCard hotelId={hotelId} />
          <BookingSummary
            room={room}
            checkInDate={checkIn}
            checkOutDate={checkOut}
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            specialRequest={specialRequest}
            hotelId={hotelId}
          />
        </div>
      </div>
    </div>
  );
}
