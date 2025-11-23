import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  CreditCard,
  Clock,
  Ticket,
  Users,
  Envelope,
  Gear,
  SignOut,
  CaretDown,
} from "phosphor-react";

export const AccountMenu = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setLocalUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setLocalUser(JSON.parse(storedUser));
      } catch (e) { console.error("Failed to parse user from localStorage", e); }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    if(setUser) setUser(null);
    navigate("/login");
  };

  const menuItems = [
    { path: "/user/MyAccount", label: "My Account", icon: Gear },
    { path: "/user/MyCards", label: "My Cards", icon: CreditCard },
    { path: "/user/MyBooking", label: "My Booking", icon: Clock },
    { path: "/user/MyVouchers", label: "My Vouchers", icon: Ticket },
    { path: "/user/Saved", label: "Saved", icon: Users },
    { path: "/user/Notifications", label: "Notifications", icon: Envelope },
  ];

  const currentPage = menuItems.find(item => item.path === location.pathname);

  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-colors ${
      isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
    }`;
  
  const MenuLinks = ({ isMobile = false }) => (
    <ul className="text-gray-700 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              className={linkClass}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            >
              <Icon size={20} className="text-gray-500" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex justify-between items-center p-3 bg-white rounded-lg shadow border"
        >
          <span className="font-semibold">{currentPage?.label || "Account Menu"}</span>
          <CaretDown size={16} className={`transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        {isMobileMenuOpen && (
          <div className="bg-white rounded-lg shadow-lg mt-2 p-2">
            <MenuLinks isMobile={true} />
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-gray-100 cursor-pointer text-red-500 w-full text-sm"
              >
                <SignOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 h-fit">
          <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
            <img
              src={user?.photo || `https://ui-avatars.com/api/?name=${user?.email || 'G'}&background=random`}
              alt={user?.fullName || "User"}
              className="h-12 w-12 rounded-full object-cover border"
            />
            <div>
              <div className="font-semibold text-gray-800 truncate">{user?.fullName || "Guest"}</div>
              <div className="text-sm text-gray-500 truncate">{user?.email || ""}</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-medium px-3 py-2 rounded-md my-4 text-center">
            🌱 You’re a <span className="font-bold">Travel Explorer</span>
          </div>
          <MenuLinks />
          <div className="border-t border-gray-200 mt-4 pt-3">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-gray-100 cursor-pointer text-red-500 w-full text-sm"
            >
              <SignOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6 min-h-[300px]">
           <Outlet />
        </div>
      </div>
    </div>
  );
};
