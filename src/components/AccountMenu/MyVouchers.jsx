import { useState, useEffect } from "react";
import {
    Ticket,
    Tag,
    CurrencyDollar,
    Spinner,
    Percent,
    Gift,
} from "phosphor-react";
import { fetchVouchers } from "../../services/Bookings/vouchersService";
import { useNavigate } from "react-router-dom"; 
export default function MyVouchers() {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchVouchers();
            setVouchers(data);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleSelectVoucher = (voucher) => {
        // Lưu voucher vào sessionStorage
        sessionStorage.setItem("selectedVoucher", JSON.stringify(voucher));

       navigate("/booking/hotel");
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-blue-500">
                <Spinner size={40} className="animate-spin mb-3" />
                <p>Đang tải voucher...</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-center mb-8 space-x-3">
                <Gift size={32} weight="fill" className="text-blue-600" />
                <h2 className="md:text-3xl text-2xl font-bold text-blue-600">
                    Ưu Đãi Dành Cho Bạn
                </h2>
            </div>

            {/* Nếu không có voucher */}
            {vouchers.length === 0 ? (
                <p className="text-center text-gray-500">
                    Hiện chưa có voucher nào khả dụng.
                </p>
            ) : (
                <div className="grid md:gap-6 gap-4  sm:grid-cols-2 lg:grid-cols-3">
                    {vouchers.map((v, i) => (
                        <div
                            key={i}
                            className="bg-white md:w-full w-5/6 mx-auto flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 md:px-4 md:py-5 p-4 pt-8 relative overflow-hidden"
                        >
                            {/* Icon góc trái */}
                            <div className="absolute top-0 left-0 w-11 h-11 bg-blue-500 flex justify-center items-center rounded-br-2xl">
                                <Ticket size={24} color="white" weight="fill" />
                            </div>

                            {/* Nội dung voucher */}
                            <div className="flex flex-col justify-between">
                                <div className="flex justify-between items-start mt-4">
                                    <h3 className="font-bold md:text-sm text-xs text-blue-600">{v.code}</h3>
                                    <span
                                        className={`flex items-center gap-1 md:text-xs text-[10px] font-medium px-1 py-1 rounded-full ${
                                            v.discountType === 1
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-green-100 text-green-600"
                                        }`}
                                    >
                                        {v.discountType === 1 ? (
                                            <Percent size={14} />
                                        ) : (
                                            <CurrencyDollar size={14} />
                                        )}
                                        {v.discountType === 1 ? "Phần trăm" : "Tiền mặt"}
                                    </span>
                                </div>

                                <p className="text-gray-700 mt-3 md:text-sm text-xs leading-relaxed">
                                    {v.description}
                                </p>

                                {/* Thông tin giảm giá */}
                                <div className="mt-4 border-t border-gray-200 pt-3 space-y-2 md:text-sm text-xs">
                                    <p className="flex items-center text-gray-700">
                                        <Tag size={18} className="mr-2 text-blue-500" />
                                        Giảm:{" "}
                                        <strong className="text-green-600 ml-1">
                                            {v.discountType === 1
                                                ? `${v.discountValue}%`
                                                : `${v.discountValue.toLocaleString()}₫`}
                                        </strong>
                                    </p>
                                    {v.minBookingAmount > 0 && (
                                        <p className="flex items-center text-gray-700">
                                            <CurrencyDollar
                                                size={18}
                                                className="mr-2 text-yellow-600"
                                            />
                                            Đơn tối thiểu:{" "}
                                            <strong className="ml-1">
                                                {v.minBookingAmount.toLocaleString()}₫
                                            </strong>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Nút chọn voucher */}
                            <button
                                onClick={() => handleSelectVoucher(v)}
                                className="md:w-4/5 w-3/5 mx-auto cursor-pointer mt-4 bg-blue-500 text-xs text-white md:py-2.5 py-2  rounded-full font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                            >
                                <Ticket size={16} weight="fill" />
                                Sử dụng ngay
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
