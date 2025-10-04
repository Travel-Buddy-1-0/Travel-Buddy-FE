import {
  Binoculars,
  House,
  Book,
  ForkKnife,
  PaperPlaneTilt,
  Envelope,
  Gear,
  ArrowsOut,
  CornersIn,
} from "phosphor-react";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarBuddy from "../../assets/AvatarBuddy.jpg";
import LogoPhotoroom from "../../assets/logo-Photoroom.png";

export default function HeaderLeft({ collapsed, toggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
   <aside
  id="sidebar"
  className={`flex flex-col sticky top-0 h-screen z-1000 ${
    collapsed ? "w-16 bg-white" : "w-40 bg-blue-400"
  } border-r border-gray-200 p-4 transition-all duration-300`}
>

      {/* Toggle */}
      <div
        className={`absolute top-4 ${
          collapsed ? "right-2" : "right-4"
        } cursor-pointer`}
        onClick={toggle}
        id="sidebarToggle"
      >
        {collapsed ? (
          <ArrowsOut size={16} weight="bold" />
        ) : (
          <CornersIn size={20} weight="bold" />
        )}
      </div>

      {/* Logo */}
      <img
        id="sidebarLogo"
        src={collapsed ? AvatarBuddy : LogoPhotoroom}
        alt="Logo"
        className={`mb-6 mt-10 object-cover transition-all duration-300 ${
          collapsed ? "h-8 mx-auto" : "h-14"
        }`}
      />

      {/* Menu */}
      <nav className="Navigation mt-4 flex flex-col space-y-3 font-medium relative">
        {/* Home */}
<button
  onClick={() => navigate("/")}
  className={`flex items-center py-2 px-2 rounded transition-all duration-300 cursor-pointer
    ${
      isActive("/")
        ? "bg-white text-blue-500 font-semibold"
        : "text-black hover:text-blue-500 hover:bg-white"
    }`}
>
  <House size={20} className="min-w-[20px]" />
  {!collapsed && <span className="ml-3 text-sm">Home</span>}
</button>


        {/* Tour */}
        <button
          onClick={() => navigate("/ErrorPage")} 
          className={`flex items-center py-2 px-2 rounded transition-all duration-300 cursor-pointer
            ${
              isActive("/tour")
                ? "bg-white text-blue-500 font-semibold"
                : "text-black hover:text-blue-500 hover:bg-white"
            }`}
        >
          <Binoculars size={20} className="min-w-[20px]" />
          {!collapsed && <span className="ml-3 text-sm">Plan</span>}
        </button>

        {/* Bookings */}
        <div className="relative group">
          <button
            className={`flex items-center py-2 px-2 rounded  cursor-pointer transition-all duration-300 w-full
              ${
                location.pathname.includes("/booking")
                  ? "bg-white text-blue-500 font-semibold"
                  : "text-black hover:text-blue-500 hover:bg-white"
              }`}
          >
            <Book size={20} className="min-w-[20px] cursor-pointer" />
            {!collapsed && <span className="ml-3 text-sm">Bookings</span>}
          </button>

          {/* Submenu */}
         {!collapsed && (
  <ul className="absolute left-0 top-full mt-[2px] z-50 hidden group-hover:block bg-white shadow-lg rounded-md py-1 w-full border border-gray-200">
    <li
      onClick={() => navigate("/booking/hotel")}
      className={`px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100 ${
        isActive("/booking/hotel") ? "text-blue-500 " : ""
      }`}
    >
      <PaperPlaneTilt size={12} className="mr-2 " /> 
      <span className="text-xs">Hotel</span>
    </li>
    <li
      onClick={() => navigate("/ErrorPage")}
      className={`px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100 ${
        isActive("/booking/restaurant")
          ? "text-blue-500 font-semibold"
          : ""
      }`}
    >
      <ForkKnife size={12} className="mr-2" /> 
      <span className="text-xs">Restaurent</span>
    </li>
  </ul>
)}

        </div>

        {/* Contact */}
        <button
          onClick={() => navigate("/contact")}
          className={`flex items-center py-2 px-2 cursor-pointer rounded transition-all duration-300
            ${
              isActive("/contact")
                ? "bg-white text-blue-500 font-semibold"
                : "text-black hover:text-blue-500 hover:bg-white"
            }`}
        >
          <Envelope size={20} className="min-w-[20px]" />
          {!collapsed && <span className="ml-3 text-sm">Contact </span>}
        </button>
      </nav>

      {/* Setting */}
      <button
         onClick={() => navigate("/user/MyAccount")}
        id="sidebarSetting"
        className="mt-auto flex  justify-center items-center h-14 w-full cursor-pointer transition-all duration-300"
      >
        <Gear size={22} />
      </button>
    </aside>
  );
}
