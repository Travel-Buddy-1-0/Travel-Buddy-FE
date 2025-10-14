import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Clock,
  CurrencyCircleDollar,
  Users,
  Envelope,
  Gear,
  SignOut,
} from "phosphor-react";

export const AccountMenu = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-2 py-2 rounded-md cursor-pointer
     ${isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"}`;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser?.(null); // nếu truyền setUser từ context hoặc parent
    navigate("/login");
  };

  return (
    <div className="flex bg-[#F9F9F9] space-x-3  w-5/6 mx-auto">
      {/* Sidebar */}
      <div className="mt-4 w-1/4 p-4 bg-white rounded-lg m-4 h-fit shadow-lg border border-gray-200">
        {/* User info */}
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300 font-bold text-lg text-gray-700">
              {user?.email
                ? user.email
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-800">{user?.email || "Unknown User"}</div>
            <div className="text-sm text-gray-500">{user?.type || "Google"}</div>
          </div>
        </div>

        {/* Loyalty badge */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-medium px-3 py-2 rounded-md mt-3">
          🌱 You’re a <span className="font-bold">Travel Explorer</span>
        </div>

        {/* Menu items */}
        <ul className="mt-4 text-gray-700 text-sm space-y-1">
          <li>
            <NavLink to="/user/MyCards" className={linkClass}>
              <CreditCard size={18} className="text-blue-500" />
              <span>My Cards</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/MyBooking" className={linkClass}>
              <Clock size={18} className="text-blue-500" />
              <span>My Booking</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/Saved" className={linkClass}>
              <Users size={18} className="text-blue-500" />
              <span>Saved Passenger Posts</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/Notifications" className={linkClass}>
              <Envelope size={18} className="text-blue-500" />
              <span>Notification Settings</span>
            </NavLink>
          </li>
        </ul>

        {/* Bottom items */}
        <div className="border-t border-gray-200 mt-4 pt-3 space-y-1">
          <NavLink
            to="/user/MyAccount"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded-md cursor-pointer 
               ${isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"}`
            }
          >
            <Gear size={18} />
            <span>My Account</span>
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-red-500 w-full"
          >
            <SignOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className=" w-3/4 p-2 m-3 h-fit">
        <Outlet />
      </div>
    </div>
  );
};
