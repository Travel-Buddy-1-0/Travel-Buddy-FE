import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Ticket, Spinner } from "phosphor-react";

import { fetchVouchers } from "../../services/Bookings/vouchersService";
import { getVoucherByCode } from "../../services/Bookings/getVoucherByCode";


export default function BookingSummary({
  room,
  hotelId,
  checkInDate,
  checkOutDate,
  customerFirstName,
  customerLastName,
  customerEmail,
  customerPhone,
  specialRequest,
  guests = 1,
  nextPath = "/booking/checkout",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [loadingVoucher, setLoadingVoucher] = useState(true);
  const [voucherCode, setVoucherCode] = useState("");
  const [loadingCode, setLoadingCode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!room) return null;

  // --- Tính toán cơ bản ---
  const nights = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  );
  const rate = 26500; // VNĐ/USD
  const priceUSD = room.pricePerNight / rate;
  const totalPriceUSD = priceUSD * nights;
  const taxUSD = totalPriceUSD * 0.08;
  const baseTotal = totalPriceUSD + taxUSD;

  // --- Tính giảm giá ---
  let discountUSD = 0;
  let discountVND = 0;

  if (selectedVoucher) {
    if (selectedVoucher.discountType === 1) {
      // Giảm theo %
      discountUSD = baseTotal * (selectedVoucher.discountValue / 100);
      discountVND = discountUSD * rate;
    } else {
      // Giảm theo số tiền VNĐ
      discountVND = selectedVoucher.discountValue;
      discountUSD = discountVND / rate;
    }
  }

  const totalWithDiscount = baseTotal - discountUSD;

  const formatUSD = (amount) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const formatVND = (amount) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // --- Lấy danh sách voucher ---
  useEffect(() => {
    const stored = sessionStorage.getItem("selectedVoucher");
    if (stored) {
      setSelectedVoucher(JSON.parse(stored));
      setLoadingVoucher(false);
    } else {
      const loadVoucher = async () => {
        const data = await fetchVouchers();
        const active = data.filter((v) => v.isActive);
        setVouchers(active);
        setLoadingVoucher(false);
      };
      loadVoucher();
    }
  }, []);

  const handleSelectVoucher = (v) => {
    setSelectedVoucher(v);
    sessionStorage.setItem("selectedVoucher", JSON.stringify(v));
  };

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
    sessionStorage.removeItem("selectedVoucher");
  };

  // --- Nhập mã voucher thủ công ---
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    setLoadingCode(true);
    setErrorMsg("");
    try {
      const res = await getVoucherByCode(voucherCode.trim());

      if (res ) {
        handleSelectVoucher(res);
      } else {
        setErrorMsg("Voucher này đã hết hạn hoặc không khả dụng.");
      }
    } catch (error) {
      setErrorMsg("Không tìm thấy voucher với mã này.");
    }
    setLoadingCode(false);
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
          <p className="font-medium">Khách chính:</p>
          <span>{`${customerFirstName} ${customerLastName}`}</span>

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

          {selectedVoucher && (
            <div className="flex justify-between text-blue-600 font-medium">
              <span>
                Giảm ({selectedVoucher.code} -{" "}
                {selectedVoucher.discountType === 1
                  ? `${selectedVoucher.discountValue}%`
                  : `${selectedVoucher.discountValue.toLocaleString()}₫`}
                )
              </span>
              <span>-{formatUSD(discountUSD)}</span>
            </div>
          )}

          <div className="flex justify-between text-green-600 font-medium">
            <span>Phí đặt trước</span>
            <span>MIỄN PHÍ</span>
          </div>
        </div>

        <hr />

        <div className="flex justify-between items-center text-base font-semibold">
          <span>Tổng cộng sau giảm</span>
          <span className="text-lg text-blue-600">{formatUSD(totalWithDiscount)}</span>
        </div>

        {selectedVoucher && (
          <div className="text-xs text-gray-500">
            (Đã giảm {formatVND(discountVND)} tương đương {formatUSD(discountUSD)})
          </div>
        )}

        {selectedVoucher && (
          <button
            onClick={handleRemoveVoucher}
            className="text-xs text-red-500 mt-2 hover:underline"
          >
            Bỏ chọn voucher
          </button>
        )}
      </div>

      {/* Nhập hoặc chọn voucher */}
      {!selectedVoucher && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <h3 className="font-semibold mb-3">Chọn hoặc nhập voucher:</h3>

          {/* Nhập mã thủ công */}
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Nhập mã voucher..."
              className="flex-1 border rounded-md px-2 py-1 text-sm"
            />
            <button
              onClick={handleApplyVoucher}
              disabled={loadingCode}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50"
            >
              {loadingCode ? "Đang kiểm tra..." : "Áp dụng"}
            </button>
          </div>

          {errorMsg && <p className="text-red-500 text-xs mb-2">{errorMsg}</p>}

          {/* Danh sách voucher khả dụng */}
          {loadingVoucher ? (
            <div className="flex justify-center text-blue-500">
              <Spinner className="animate-spin" />
            </div>
          ) : vouchers.length > 0 ? (
            <ul className="space-y-2">
              {vouchers.map((v) => (
                <li
                  key={v.id}
                  onClick={() => handleSelectVoucher(v)}
                  className="cursor-pointer p-2 rounded-md border hover:border-blue-400 hover:bg-blue-50 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2">
                    <Ticket size={16} className="text-blue-500" />
                    <span className="text-sm">{v.code}</span>
                  </div>
                  <span className="text-xs text-gray-600">
                    {v.discountType === 1
                      ? `-${v.discountValue}%`
                      : `-${v.discountValue.toLocaleString()}₫`}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Không có voucher khả dụng</p>
          )}
        </div>
      )}

      {/* Nút Tiếp theo */}
      {location.pathname !== "/booking/checkout" && (
        <div
          onClick={() =>
            navigate(nextPath, {
              state: {
                customerFirstName,
                customerLastName,
                customerEmail,
                customerPhone,
                specialRequest,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                totalPrice: totalWithDiscount,
                nights,
                guests,
                hotelId,
                room: room,
                voucher: selectedVoucher,
                discount: discountUSD,
              },
            })
          }
          className="p-2 cursor-pointer bg-blue-500 text-white rounded-sm text-center uppercase font-bold hover:bg-blue-600 transition"
        >
          Tiếp theo
        </div>
      )}
    </div>
  );
}
