import BookingSteps from "./BookingSteps";
import { CalendarCheck } from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";
import HotelSummaryCard from "../Hotel/HotelSummaryCard";
import BookingSummary from "./BookingSummary";
import { useState } from "react";
export default function Bookingsconfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [customerFirstName, setCustomerFirstName] = useState("");
    const [customerLastName, setCustomerLastName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [specialRequest, setSpecialRequest] = useState("");

    const { hotelId, room, checkIn, checkOut } = location.state || {};



    return (
        <div className="w-full mx-auto px-6">
            {/* Step bar */}
            <BookingSteps currentStep={2} />

            {/* Nội dung chi tiết */}
            <div className="my-10 gap-8 w-3/4 mx-auto flex">
                <div className="   my-6 flex  space-x-8 ">
                    <div className="flex space-y-6  flex-col w-full">
                        <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6 space-y-6">
                            {/* Tiêu đề */}
                            <div>
                                <h2 className="text-lg font-semibold">Ai là khách chính?</h2>
                                <p className="text-red-600 text-sm mt-1">*Mục bắt buộc</p>
                            </div>

                            {/* Họ tên */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm mb-1">
                                        Tên <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={customerLastName}
                                        onChange={(e) => setCustomerLastName(e.target.value)}
                                        className="border-gray-400 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm mb-1">
                                        Họ (vd: Nguyễn) <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={customerFirstName}
                                        onChange={(e) => setCustomerFirstName(e.target.value)}
                                        className="border-gray-400 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Email + Quốc gia */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm mb-1">
                                        Email ID <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        className="border-gray-400 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Vui lòng đảm bảo địa chỉ thư điện tử của quý khách là chính xác.
                                        Chúng tôi sẽ sử dụng thông tin này để gửi xác nhận đơn đặt phòng và
                                        mọi thông báo nhắc nhở để hỗ trợ quý khách hoàn tất đặt phòng.
                                    </p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm mb-1">
                                        Quốc gia cư trú <span className="text-red-600">*</span>
                                    </label>
                                    <select className="border-gray-400 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option>Việt Nam</option>

                                    </select>
                                </div>
                            </div>

                            {/* Số điện thoại */}
                            <div className="flex flex-col">
                                <label className="text-sm mb-1">
                                    Số điện thoại (không bắt buộc)
                                </label>
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    className="border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6 space-y-4">
                            {/* Tiêu đề */}
                            <h2 className="text-lg font-semibold">Các Yêu Cầu Đặc Biệt</h2>

                            {/* Mô tả */}
                            <p className="text-sm text-gray-700">
                                Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy nhiên, chỗ nghỉ sẽ cố gắng hết sức để thực hiện.
                                Bạn luôn có thể gửi yêu cầu đặc biệt sau khi hoàn tất đặt phòng của mình!
                            </p>

                            {/* Nhập yêu cầu */}
                            <div>
                                <label className="text-sm font-medium">
                                    Vui lòng ghi yêu cầu của bạn tại đây.{" "}
                                    <span className="text-gray-500">(không bắt buộc)</span>
                                </label>
                                <textarea
                                    rows="4"
                                    value={specialRequest}
                                    onChange={(e) => setSpecialRequest(e.target.value)}
                                    className="mt-2 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    
                    </div>

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
        </div>
    );
}
