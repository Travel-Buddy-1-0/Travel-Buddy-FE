import BookingSteps from "./BookingSteps";
import { LockSimple } from "phosphor-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HotelSummaryCard from "../Hotel/HotelSummaryCard";
import BookingSummary from "./BookingSummary";
import { bookingHotel } from "../../services/Bookings/bookHotel";

export default function BookingCheckout() {
  const [agree, setAgree] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(2); // ✅ Mặc định chọn Ví TravelBuddy
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ state
  const {
    customerFirstName,
    customerLastName,
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
 

  const handleBooking = async () => {
    if (!userId || !room) {
      alert("Thiếu thông tin đặt phòng hoặc người dùng!");
      return;
    }

    // ✅ Chuẩn hóa dữ liệu gửi về backend
    const bookingData = {
  
      checkIn,
      checkOut,
      totalPrice: totalPrice || 0,
      nights: nights || 1,
      guests: guests || 1,
      hotelId: hotelId || 0,
      roomId: room?.roomId || 0,
      
      firstName: customerFirstName || "",
      lastName: customerLastName || "",
      email: customerEmail || "",
      country: "Vietnam",
      phone: customerPhone || "",
      note: specialRequest || "Không có yêu cầu đặc biệt",
      typePayment: paymentMethod 
    };

    try {
      const result = await bookingHotel(bookingData);

      localStorage.removeItem("searchQuery");

      navigate("/booking/success", {
        state: {
          hotelId,
          room,
          totalPrice,
          checkIn,
          checkOut,
          nights
        }
      });
    } catch (error) {
      console.error("❌ Booking failed:", error);
      navigate("/booking/failed", {
        state: {
          errorMessage: error?.message || "Đặt phòng thất bại. Vui lòng thử lại!"
        }
      });
    }
  };

  return (
    <div className="w-full mx-auto px-6">
      <BookingSteps currentStep={3} />

      <div className="my-10 gap-8 w-3/4 mx-auto flex">
        <div className="my-6 flex space-x-8 flex-col w-full">
          {/* Thanh toán và checkbox */}
          <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6 space-y-6">
            <h2 className="text-lg font-semibold">Chọn cách thanh toán</h2>

            {/* ✅ Option 1: Ví TravelBuddy */}
            <div className="space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 2}
                  onChange={() => setPaymentMethod(2)}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">
                    Thanh toán ngay bằng tài khoản{" "}
                    <span className="font-semibold text-lg text-blue-600">
                      Travel Buddy
                    </span>
                  </div>
                  <ul className="text-sm text-green-600 space-y-1 mt-1">
                    <li>✔ KHÔNG SỢ RỦI RO! Không thanh toán hôm nay</li>
                    <li>✔ Hủy miễn phí trước 30 Tháng 9, 2025</li>
                  </ul>
                  <p className="text-sm text-blue-600 hover:underline">
                    Tiền sẽ được trừ trực tiếp từ tài khoản cá nhân trên website.
                  </p>
                </div>
              </label>
            </div>

            {/* ✅ Option 2: Thanh toán khi nhận phòng */}
            <div className="pt-4 border-t">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 1}
                  onChange={() => setPaymentMethod(1)}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">Thanh toán khi nhận phòng</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Khách sạn sẽ liên hệ xác nhận trong vòng 1 tiếng.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Checkbox đồng ý */}
          <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-8 py-6 space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Tôi đồng ý nhận email marketing từ TravelBuddy, bao gồm khuyến
                mãi, đề xuất được cá nhân hóa, và thông tin du lịch hữu ích.
              </span>
            </label>

            <p className="text-sm text-gray-700">
              Đặt phòng này đồng nghĩa với việc bạn đồng ý với{" "}
              <span className="font-semibold">điều khoản và chính sách</span> của
              TravelBuddy.
            </p>

            {/* ✅ Nút hoàn tất */}
            <button
              disabled={!agree}
              onClick={handleBooking}
              className={`w-full flex items-center justify-center px-6 py-2 rounded-md font-semibold text-white space-x-2 transition ${
                agree
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
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
            customerFirstName={customerFirstName}
            customerLastName={customerLastName}
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
