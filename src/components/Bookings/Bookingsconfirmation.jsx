import BookingSteps from "./BookingSteps";
import {CalendarCheck } from "phosphor-react";
import { useNavigate } from "react-router-dom";
export default function Bookingsconfirmation() {
     const navigate = useNavigate();
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
                                    className="border-gray-400 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mb-1">
                                    Họ (vd: Nguyễn) <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
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
                                    <option>Hoa Kỳ</option>
                                    <option>Nhật Bản</option>
                                    <option>Hàn Quốc</option>
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
                                className="mt-2 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            ></textarea>
                        </div>
                    </div>
                     <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6 space-y-2">
                        {/* Tiêu đề */}
                        <h2 className="text-lg font-semibold">Thời gian đến của bạn</h2>

                        {/* Mô tả */}
                        <p className="text-sm text-gray-700 flex items-center">
                           <CalendarCheck className="text-lg mr-2"/>  Lễ tân 24 giờ - Luôn có trợ giúp mỗi khi bạn cần!
                        </p>

                        {/* Nhập yêu cầu */}
                        <div className="">
                            <div className="text-sm font-bold">Thêm thời gian đến dự kiến của bạn </div>
                            <div className="my-2">
                                <select className="border-gray-400 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-2/3"> 
                                    <option>Chọn giờ đến</option>
                                    <option>14:00</option>
                                    <option>15:00</option>  
                                </select>
                            </div>
                            <div className="text-xs"> Thời gian theo múi giờ của Việt Nam</div>
                           
                        </div>
                    </div>
                    </div>
                    
                    <div className="flex flex-col space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-[350px]">

                            {/* Ảnh khách sạn */}
                            <img
                                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/402605354.jpg?k=ae420689441bae26e7875787e2285cffe5246d9cfb6ade1be6c3022d7a9fd17e&o="
                                alt="Dalat Wind Hotel"
                                className="w-full h-48 object-cover"
                            />

                            {/* Nội dung */}
                            <div className="p-4 space-y-2">
                                {/* Stars + Icon */}
                                <div className="flex items-center space-x-1 text-yellow-500">
                                    <span>★★</span>
                                    <span className="bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5 rounded">
                                        👍
                                    </span>
                                </div>

                                {/* Tên khách sạn */}
                                <h2 className="text-lg font-bold">Dalat Wind Hotel</h2>

                                {/* Địa chỉ */}
                                <p className="text-gray-600 text-sm">
                                    Lot R2 03-04. Golf Valley, Ward 2, Đà Lạt, Việt Nam
                                </p>

                                {/* Vị trí */}
                                <p className="text-green-600 text-sm">
                                    Vị trí xuất sắc — <span className="font-semibold">9.0</span>
                                </p>

                                {/* Điểm đánh giá */}
                                <div className="flex items-center space-x-2">
                                    <div className="bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
                                        8.8
                                    </div>
                                    <span className="text-gray-700 text-sm">
                                        Tuyệt vời • 981 đánh giá
                                    </span>
                                </div>


                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 w-[350px] space-y-4">
                            {/* Tiêu đề */}
                            <h2 className="text-lg font-semibold">Chi tiết đặt phòng của bạn</h2>

                            {/* Check-in / Check-out */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium">Nhận phòng</p>
                                    <p className="text-gray-700">T7, 18 tháng 10 2025</p>
                                    <p className="text-gray-500">Từ 14:00</p>
                                </div>
                                <div>
                                    <p className="font-medium">Trả phòng</p>
                                    <p className="text-gray-700">CN, 19 tháng 10 2025</p>
                                    <p className="text-gray-500">11:00 – 12:00</p>
                                </div>
                            </div>

                            {/* Tổng thời gian */}
                            <div className="text-sm">
                                <p className="text-gray-700">Tổng thời gian lưu trú:</p>
                                <p className="font-medium">1 đêm</p>
                            </div>

                            <hr />

                            {/* Phòng đã chọn */}
                            <div className="text-sm">
                                <p className="text-gray-700 mb-1">Bạn đã chọn</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">1 phòng cho 2 người lớn</span>
                                    <button className="text-gray-500 text-lg">⌄</button>
                                </div>
                            </div>

                            {/* Link đổi lựa chọn */}
                            <div>
                                <a href="#" className="text-blue-600 text-sm font-medium">
                                    Đổi lựa chọn của bạn
                                </a>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 w-[350px] space-y-4">
                            {/* Bảng giá chi tiết */}
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>Giá phòng (1 phòng x 1 đêm)</span>
                                    <span>2.592.593 ₫</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Thuế và phí</span>
                                    <span>207.407 ₫</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Phí đặt trước</span>
                                    <span>MIỄN PHÍ</span>
                                </div>
                            </div>

                            <hr />

                            {/* Giá cuối cùng */}
                            <div className="flex justify-between items-center text-base font-semibold">
                                <span>Giá cuối cùng</span>
                                <span className="text-lg">2.800.000 ₫</span>
                            </div>

                            {/* Ghi chú */}
                            <div className="text-xs text-gray-600 space-y-1">
                                <p>
                                    <span className="font-medium">Giá đã bao gồm:</span> VAT 207.407 ₫
                                </p>
                                <p>
                                    Bạn sẽ thanh toán tại{" "}
                                    <span className="font-medium">
                                        Wink Hotel Can Tho Ninh Kieu Wharf - 24hrs stay & Rooftop Pool Bar
                                    </span>{" "}
                                    bằng ngoại tệ (đ).
                                </p>
                            </div>
                        </div>
                        <div 
                           onClick={() => navigate("/booking/checkout")}
                           className="p-2 cursor-pointer bg-blue-400 text-white rounded-sm text-center uppercase font-bold">
                            Tiếp theo
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
