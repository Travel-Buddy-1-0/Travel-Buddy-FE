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

      {/* Header */}
      <header className="relative z-10 text-white flex flex-wrap justify-between items-center px-4 py-3 rounded-b-xl">
        {/* Logo */}
        <div className="flex items-center mb-2 sm:mb-0">
          <img src={LogoWhite} alt="Logo" className="h-14 sm:h-16 md:h-18" />
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/register"
            className="bg-none px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black flex items-center text-sm"
          >
            <div className="italic text-sm mr-1">for</div>
            <div className="text-base">Traveler</div>
          </Link>

          <Link
            to="/ErrorPage"
            className="bg-none ml-2 px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black flex items-center text-sm"
          >
            <div className="italic text-sm mr-1">for</div>
            <div className="text-base">Business</div>
          </Link>

          <Link
            to="/"
            className="bg-none px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black text-sm"
          >
            Travel local
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex space-x-2">
          <Link
            to="/login"
            className="text-sm px-3 py-1 rounded-full hover:bg-blue-400 hover:text-black border border-transparent"
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
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-4 py-10 md:py-20">
        {/* Left: Outlet form */}
        <div className="w-full md:w-2/5 flex items-center justify-center bg-white rounded-xl shadow-lg p-6 sm:p-10 md:py-20">
          <Outlet />
        </div>

        {/* Right: images */}
        <div className="hidden md:block w-2/5 relative min-h-[700px]">
          <img
            src="https://mindtrip.ai/cdn-cgi/image/format=webp,w=640/https://images.mindtrip.ai/web/London.png"
            className="absolute left-[80px] top-20 w-48 md:w-60 drop-shadow-xl animate-london transition-transform duration-500 hover:scale-105"
            alt="London"
          />
          <img
            src={Anh2}
            className="absolute right-[-80px] top-5 w-40 md:w-56 drop-shadow-xl animate-paris transition-transform duration-500 hover:scale-110"
            alt="Paris"
          />
          <img
            src={Anh1}
            className="absolute right-[10px] bottom-[80px] w-64 md:w-80 drop-shadow-xl animate-rome transition-transform duration-500 hover:scale-105"
            alt="Rome"
          />
        </div>
      </div>

      {/* Mobile menu (ẩn trên desktop) */}
      <div className="flex md:hidden justify-center space-x-3 text-white mt-4 pb-4">
        <Link to="/register" className="text-sm hover:text-blue-300">
          Traveler
        </Link>
        <span>|</span>
        <Link to="/ErrorPage" className="text-sm hover:text-blue-300">
          Business
        </Link>
        <span>|</span>
        <Link to="/" className="text-sm hover:text-blue-300">
          Travel local
        </Link>
      </div>
    </div>
  );
}
