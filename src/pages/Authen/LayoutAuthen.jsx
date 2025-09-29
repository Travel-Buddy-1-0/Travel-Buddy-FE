import { Outlet, Link } from "react-router-dom";
import background from "../../assets/background.png";
import LogoWhite from "../../assets/AvatarBuddyWhite.png";
import Anh1 from "../../assets/Anh1.png";
import Anh2 from "../../assets/anh2.png";

export default function LayoutAuthen() {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="bg-cover bg-center min-h-screen relative"
    >
      {/* Lớp phủ làm mờ ảnh nền */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Nội dung header */}
      <header className="relative z-10 text-white flex justify-between items-center px-2 py-1 rounded-b-xl">
        <div>
          <img src={LogoWhite} alt="Logo" className="h-18" />
        </div>

        {/* Menu */}
        <div className="space-x-4 flex">
          <Link
            to="/register"
            className="bg-none px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black flex items-center text-sm"
          >
            <div className="italic text-sm mr-1">for</div>
            <div className="text-base">Traveler</div>
          </Link>

          <Link
            to="/bussinessRegister"
            className="bg-none ml-2 px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black flex items-center text-sm"
          >
            <div className="italic text-sm mr-1">for</div>
            <div className="text-base">Business</div>
          </Link>

          <Link
            to="/"
            className="bg-none px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black flex items-center text-sm"
          >
            <div className="text-base">Travel local</div>
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex mr-4 space-x-2">
          <Link
            to="/login"
            className="text-sm px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black"
          >
            Login in
          </Link>

          <Link
            to="/"
            className="text-sm border-white border px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Left: Outlet thay cho form */}
        <div className="md:w-2/5   flex items-center justify-center bg-white rounded-xl shadow-lg py-20  ">
          <Outlet />
        </div>

        {/* Right: images with floating animation */}
        <div className="hidden md:block w-2/5 relative min-h-[800px]">
          {/* London */}
          <img
            src="https://mindtrip.ai/cdn-cgi/image/format=webp,w=640/https://images.mindtrip.ai/web/London.png"
            className="absolute left-[100px] top-20 w-60 drop-shadow-xl animate-london transition-transform duration-500 hover:scale-105"
            alt="London"
          />
          {/* Paris */}
          <img
            src={Anh2}
            className="absolute right-[-100px] top-5 w-50 drop-shadow-xl animate-paris transition-transform duration-500 hover:scale-110"
            alt="Paris"
          />
          {/* Rome */}
          <img
            src={Anh1}
            className="absolute right-[10px] bottom-[100px] w-80 drop-shadow-xl animate-rome transition-transform duration-500 hover:scale-105"
            alt="Rome"
          />
        </div>
      </div>
    </div>
  );
}
