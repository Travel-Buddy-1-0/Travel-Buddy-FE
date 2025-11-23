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
  CaretDown,
  X,
} from "phosphor-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarBuddy from "../../assets/AvatarBuddy.jpg";
import LogoPhotoroom from "../../assets/logo-Photoroom.png";

export default function HeaderLeft({ collapsed, toggle, isMobileMenuOpen, toggleMobileMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openBooking, setOpenBooking] = useState(false);

  const isActive = (path) => location.pathname === path;
  const iconResponsive = "w-5 h-5";

  const sidebarMenuContent = (isMobile = false) => (
    <nav className="mt-4 flex flex-col space-y-3 font-medium relative">
      {/* Home */}
      <button
        onClick={() => {
          navigate("/");
          if (isMobile) toggleMobileMenu();
        }}
        className={`flex items-center py-2 px-2 rounded transition-all duration-300 cursor-pointer ${
          isActive("/")
            ? "bg-white text-blue-500 font-semibold"
            : "text-black hover:text-blue-500 hover:bg-white"
        }`}
      >
        <House className={iconResponsive} />
        <span className="ml-3 text-sm">Home</span>
      </button>

      {/* Plan */}
      <button
        onClick={() => {
          navigate("/ErrorPage");
          if (isMobile) toggleMobileMenu();
        }}
        className={`flex items-center py-2 px-2 rounded transition-all duration-300 cursor-pointer ${
          isActive("/tour")
            ? "bg-white text-blue-500 font-semibold"
            : "text-black hover:text-blue-500 hover:bg-white"
        }`}
      >
        <Binoculars className={iconResponsive} />
        <span className="ml-3 text-sm">Plan</span>
      </button>

      {/* Bookings (has submenu) */}
      <div className="relative">
        <button
          onClick={() => setOpenBooking(!openBooking)}
          className={`flex items-center justify-between py-2 px-2 rounded cursor-pointer transition-all duration-300 w-full ${
            location.pathname.includes("/booking")
              ? "bg-white text-blue-500 font-semibold"
              : "text-black hover:text-blue-500 hover:bg-white"
          }`}
        >
          <div className="flex items-center">
            <Book className={iconResponsive} />
            <span className="ml-3 text-sm">Booking</span>
          </div>
          <CaretDown
            size={14}
            className={`transition-transform duration-300 ml-1 ${
              openBooking ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Submenu */}
        {openBooking && (
          <ul className="pl-6 mt-1 space-y-1">
            <li
              onClick={() => {
                navigate("/booking/hotel");
                if (isMobile) toggleMobileMenu();
              }}
              className={`px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100 rounded-md ${
                isActive("/booking/hotel") ? "text-blue-500" : ""
              }`}
            >
              <PaperPlaneTilt className="w-4 h-4 mr-2" />
              <span className="text-sm">Hotel</span>
            </li>
            <li
              onClick={() => {
                navigate("/ErrorPage");
                if (isMobile) toggleMobileMenu();
              }}
              className={`px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100 rounded-md ${
                isActive("/booking/restaurant") ? "text-blue-500" : ""
              }`}
            >
              <ForkKnife className="w-4 h-4 mr-2" />
              <span className="text-sm">Restaurant</span>
            </li>
          </ul>
        )}
      </div>

      {/* Contact */}
      <button
        onClick={() => {
          navigate("/contact");
          if (isMobile) toggleMobileMenu();
        }}
        className={`flex items-center py-2 px-2 cursor-pointer rounded transition-all duration-300 ${
          isActive("/contact")
            ? "bg-white text-blue-500 font-semibold"
            : "text-black hover:text-blue-500 hover:bg-white"
        }`}
      >
        <Envelope className={iconResponsive} />
        <span className="ml-3 text-sm">Contact</span>
      </button>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        id="sidebar"
        className={`hidden md:flex flex-col sticky top-0 h-screen z-40
          ${collapsed ? "w-20 bg-white" : "w-52 bg-blue-400"}
          border-r border-gray-200 p-4 transition-all duration-300`}
      >
        <div
          className={`absolute top-4 ${collapsed ? "right-3" : "right-4"} cursor-pointer`}
          onClick={toggle}
        >
          {collapsed ? (
            <ArrowsOut size={20} weight="bold" />
          ) : (
            <CornersIn size={20} weight="bold" />
          )}
        </div>
        <img
          src={collapsed ? AvatarBuddy : LogoPhotoroom}
          alt="Logo"
          className={`mb-6 mt-10 object-contain transition-all duration-300 ${
            collapsed ? "h-10 mx-auto" : "h-16"
          }`}
        />
        {!collapsed ? sidebarMenuContent(false) : (
          <div className="mt-4 flex flex-col space-y-3 font-medium relative">
            <button onClick={() => navigate("/")}><House className={`${iconResponsive} mx-auto`} /></button>
            <button onClick={() => navigate("/ErrorPage")}><Binoculars className={`${iconResponsive} mx-auto`} /></button>
            <button onClick={() => navigate("/booking/hotel")}><Book className={`${iconResponsive} mx-auto`} /></button>
            <button onClick={() => navigate("/contact")}><Envelope className={`${iconResponsive} mx-auto`} /></button>
          </div>
        )}
        <button
          onClick={() => navigate("/user/MyAccount")}
          className="mt-auto flex justify-center items-center h-14 w-full cursor-pointer transition-all duration-300 hover:text-blue-500 rounded"
        >
          <Gear className={iconResponsive} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={toggleMobileMenu}
        ></div>

        {/* Sidebar Content */}
        <aside
          className={`fixed top-0 left-0 bottom-0 flex flex-col w-64 bg-blue-400 p-4 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-6 mt-4">
            <img src={LogoPhotoroom} alt="Logo" className="h-14 object-contain" />
            <button onClick={toggleMobileMenu} className="text-black">
              <X size={20} weight="bold" />
            </button>
          </div>
          {sidebarMenuContent(true)}
          <button
            onClick={() => {
              navigate("/user/MyAccount");
              toggleMobileMenu();
            }}
            className="mt-auto flex items-center h-14 w-full cursor-pointer transition-all duration-300 hover:text-blue-500 rounded p-2"
          >
            <Gear className={iconResponsive} />
            <span className="ml-3 text-sm">Settings</span>
          </button>
        </aside>
      </div>
    </>
  );
}
