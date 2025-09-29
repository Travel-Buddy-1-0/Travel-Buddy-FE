import BookingSteps from "./BookingSteps";
import { LockSimple } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function BookingCheckout() {
    const [agree, setAgree] = useState(true);
  const navigate = useNavigate();
    return (
        <div className="w-full mx-auto px-6">
            {/* Step bar */}
            <BookingSteps currentStep={3} />

            {/* Nội dung chi tiết */}
            <div className="my-10 gap-8 w-3/4 mx-auto flex">
                <div className="   my-6 flex  space-x-8 ">
                    <div className="flex space-y-6  flex-col w-full">

                        <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-10 py-6 space-y-6">
                            {/* Tiêu đề */}
                            <h2 className="text-lg font-semibold">Chọn cách thanh toán</h2>

                            {/* Option 1: Thanh toán sau */}
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
                                        <a href="#" className="text-sm text-blue-600 hover:underline">
                                            <p> Tiền sẽ được trực tiếp trừ vào tài khoản cá nhân trên webiste</p>
                                        </a>
                                    </div>
                                </label>
                            </div>

                            {/* Option 2: Thanh toán ngay */}
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
                                            Bạn  có thể chọn Thanh toán khi nhận phòng, khách sạn sẽ gọi điện trong vòng 1 tiếng bạn vui lòng xác nhận đặt phòng.
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">

                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-8 py-6 space-y-4">
                            {/* Checkbox marketing */}
                            <label className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={() => setAgree(!agree)}
                                    className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">
                                    Tôi đồng ý nhận email marketing từ Booking.com, bao gồm khuyến mãi, đề
                                    xuất được cá nhân hóa, tặng thưởng, trải nghiệm du lịch và cập nhật về
                                    các sản phẩm và dịch vụ của Booking.com.
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        Với việc đăng kí nhận email marketing, bạn cho phép chúng tôi đề
                                        xuất các sản phẩm, dịch vụ, ưu đãi và nội dung theo sở thích của
                                        mình bằng việc theo dõi cách bạn sử dụng Booking.com thông qua công
                                        nghệ theo dõi. Hủy đăng kí bất cứ lúc nào thông qua phần cài đặt tài
                                        khoản hoặc đường dẫn trong bất kỳ email marketing nào. Tham khảo{" "}
                                        <a href="#" className="text-blue-600 underline">
                                            chính sách bảo mật
                                        </a>{" "}
                                        của chúng tôi.
                                    </span>
                                </span>
                            </label>

                            {/* Điều kiện */}
                            <p className="text-sm text-gray-700">
                                Đặt phòng của bạn là đặt phòng trực tiếp với{" "}
                                <span className="font-semibold">Dalat Wind Hotel</span> và bằng việc
                                hoàn tất đặt phòng này, bạn đồng ý với{" "}
                                <a href="#" className="text-blue-600 font-semibold underline">
                                    điều kiện đặt phòng
                                </a>
                                ,{" "}
                                <a href="#" className="text-blue-600 font-semibold underline">
                                    điều khoản chung
                                </a>{" "}
                                và{" "}
                                <a href="#" className="text-blue-600 font-semibold underline">
                                    chính sách bảo mật
                                </a>
                                .
                            </p>

                            {/* Nút Hoàn tất đặt chỗ */}
                            <button
                                disabled={!agree}
                                  onClick={() => navigate("/booking/sucesss")}
                                className={`w-full cursor-pointer flex items-center justify-center px-6 py-2    rounded-md font-semibold text-white space-x-2 transition ${agree
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                <LockSimple size={20} weight="fill" />
                                <span>Hoàn tất đặt chỗ</span>
                            </button>
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

                    </div>


                </div>
            </div>
        </div>
    );
}
