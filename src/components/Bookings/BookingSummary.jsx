import { useNavigate, useLocation } from "react-router-dom";

export default function BookingSummary({
  room,
  hotelId,
  checkInDate,
  checkOutDate,
  customerName,
  customerEmail,
  customerPhone,
  specialRequest,
  guests = 1,
  nextPath = "/booking/checkout",
}) {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  if (!room) return null;

  // Tính số đêm
  const nights = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  );

  // Chuyển đổi VNĐ -> USD
  const rate = 26500;
  const priceUSD = room.pricePerNight / rate;
  const totalPriceUSD = priceUSD * nights;

  // Thuế 8% áp dụng trên tổng tiền
  const taxUSD = totalPriceUSD * 0.08;
  const totalWithTaxUSD = totalPriceUSD + taxUSD;

  const formatUSD = (amount) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const roomSummary = `${room.roomType} - Phòng số ${room.roomNumber} (${room.capacity} khách)`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col space-y-4 w-[350px]">
      {/* Chi tiết đặt phòng */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">
        <h2 className="text-lg font-semibold">Chi tiết đặt phòng của bạn</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Nhận phòng</p>
            <p className="text-gray-700">{formatDate(checkInDate)}</p>
            <p className="text-gray-500">Từ 14:00</p>
          </div>
          <div>
            <p className="font-medium">Trả phòng</p>
            <p className="text-gray-700">{formatDate(checkOutDate)}</p>
            <p className="text-gray-500">11:00 – 12:00</p>
          </div>
        </div>

        <div className="text-sm">
          <p className="text-gray-700">Tổng thời gian lưu trú:</p>
          <p className="font-medium">{nights} đêm</p>
        </div>

        <hr />

        <div className="text-sm space-y-1">
          <p className="font-medium">Bạn đã chọn:</p>
          <span>{roomSummary}</span>

          <p className="font-medium mt-2">Khách chính:</p>
          <span>{customerName}</span>

          <p className="font-medium mt-2">Email:</p>
          <span>{customerEmail}</span>

          <p className="font-medium mt-2">SĐT:</p>
          <span>{customerPhone || "Chưa có"}</span>

          {specialRequest && (
            <>
              <p className="font-medium mt-2">Yêu cầu đặc biệt:</p>
              <span>{specialRequest}</span>
            </>
          )}
        </div>
      </div>

      {/* Bảng giá */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Giá phòng ({nights} đêm)</span>
            <span>{formatUSD(totalPriceUSD)}</span>
          </div>
          <div className="flex justify-between">
            <span>Thuế và phí (8%)</span>
            <span>{formatUSD(taxUSD)}</span>
          </div>
          <div className="flex justify-between text-green-600 font-medium">
            <span>Phí đặt trước</span>
            <span>MIỄN PHÍ</span>
          </div>
        </div>

        <hr />

        <div className="flex justify-between items-center text-base font-semibold">
          <span>Giá cuối cùng</span>
          <span className="text-lg">{formatUSD(totalWithTaxUSD)}</span>
        </div>
      </div>

      {/* Nút tiếp theo (ẩn nếu đang ở /booking/checkout) */}
      {location.pathname !== "/booking/checkout" && (
        <div
          onClick={() =>
            navigate(nextPath, {
              state: {
                customerName,
                customerEmail,
                customerPhone,
                specialRequest,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                totalPrice: totalWithTaxUSD,
                nights,
                guests,
                hotelId,
                room: room,
              },
            })
          }
          className="p-2 cursor-pointer bg-blue-400 text-white rounded-sm text-center uppercase font-bold"
        >
          Tiếp theo
          
        </div>
      )}
    </div>
  );
}
