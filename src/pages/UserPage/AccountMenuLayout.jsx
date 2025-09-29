import { Outlet, NavLink } from "react-router-dom";
import {
  CreditCard,
  Clock,
  ShoppingCart,
  CurrencyCircleDollar,
  Users,
  Envelope,
  Gear,
  SignOut,
} from "phosphor-react";

export const AccountMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-2 py-2 rounded-md cursor-pointer
     ${isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"}`;

  return (
    <div className="flex bg-[#F9F9F9] space-x-3 w-3/4 mx-auto">
      {/* Sidebar */}
      <div className="mt-4 w-1/4 p-4 bg-white rounded-lg m-4 h-fit shadow-lg border border-gray-200">
        {/* User info */}
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300 font-bold text-lg text-gray-700">
            HQ
          </div>
          <div>
            <div className="font-semibold text-gray-800">
              Ho Quoc Hung (K17 DN)
            </div>
            <div className="text-sm text-gray-500">Google</div>
          </div>
        </div>

        {/* Loyalty badge */}
        <div className="bg-gradient-to-r from-amber-300 to-amber-500 text-white text-sm font-medium px-3 py-2 rounded-md mt-3">
          🐻 You’re our <span className="font-bold">Bronze Priority</span>
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
            <NavLink to="/user/PurchaseList" className={linkClass}>
              <ShoppingCart size={18} className="text-blue-500" />
              <span>Purchase List</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/Refunds" className={linkClass}>
              <CurrencyCircleDollar size={18} className="text-blue-500" />
              <span>Refunds</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/SavedPassengers" className={linkClass}>
              <Users size={18} className="text-blue-500" />
              <span>Saved Passenger Details</span>
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

          <div className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-red-500">
            <SignOut size={18} />
            <span>Log Out</span>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="mt-4 w-3/4 p-4  m-4 h-fit ">
        <Outlet />
      </div>
    </div>
  );
};
