import BookingSteps from "./BookingSteps";
import { LockSimple } from "phosphor-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HotelSummaryCard from "../Hotel/HotelSummaryCard";
import BookingSummary from "./BookingSummary";
import { bookingHotel } from "../../services/Bookings/bookHotel";

export default function BookingCheckout() {
  const [agree, setAgree] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

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
    voucher,
    room
  } = location.state || {};

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const handleBooking = async () => {
    if (!userId || !room) {
      alert("Thiếu thông tin đặt phòng hoặc người dùng!");
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      totalPrice: totalPrice * 26300 || 0,
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
      voucherCode: voucher?.code || null,
      typePayment: paymentMethod
    };

    try {
      await bookingHotel(bookingData);
      localStorage.removeItem("searchQuery");
      navigate("/booking/success", {
        state: { hotelId, room, totalPrice, checkIn, checkOut, nights }
      });
    } catch (error) {
      console.error("❌ Booking failed:", error);
      navigate("/booking/failed", {
        state: { errorMessage: error?.message || "Đặt phòng thất bại. Vui lòng thử lại!" }
      });
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6">
      <BookingSteps currentStep={3} />

      <div className="my-10 mx-auto w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Left Side: Payment Options */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold">Chọn cách thanh toán</h2>

            <div className="space-y-2">
              <label className="flex items-start space-x-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 2}
                  onChange={() => setPaymentMethod(2)}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-semibold text-base">
                    Thanh toán ngay bằng tài khoản{" "}
                    <span className="font-bold text-blue-600">
                      Travel Buddy
                    </span>
                  </div>
                  <ul className="text-sm text-green-600 space-y-1 mt-2">
                    <li>✔ KHÔNG SỢ RỦI RO! Không thanh toán hôm nay</li>
                    <li>✔ Hủy miễn phí trước 30 Tháng 9, 2025</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-1">
                    Tiền sẽ được trừ trực tiếp từ tài khoản cá nhân trên website.
                  </p>
                </div>
              </label>
            </div>

            <div className="pt-4 border-t">
              <label className="flex items-start space-x-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 1}
                  onChange={() => setPaymentMethod(1)}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-semibold text-base">Thanh toán khi nhận phòng</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Khách sạn sẽ liên hệ xác nhận trong vòng 1 tiếng.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
              />
              <span className="text-sm text-gray-700">
                Tôi đồng ý nhận email marketing từ TravelBuddy, bao gồm khuyến
                mãi, đề xuất được cá nhân hóa, và thông tin du lịch hữu ích.
              </span>
            </label>

            <p className="text-sm text-gray-700">
              Đặt phòng này đồng nghĩa với việc bạn đồng ý với{" "}
              <span className="font-semibold text-blue-600 hover:underline cursor-pointer">điều khoản và chính sách</span> của
              TravelBuddy.
            </p>

            <button
              disabled={!agree}
              onClick={handleBooking}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white space-x-2 transition ${
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

        {/* Right Side: Summary */}
        <div className="w-full lg:w-1/3 space-y-6">
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
