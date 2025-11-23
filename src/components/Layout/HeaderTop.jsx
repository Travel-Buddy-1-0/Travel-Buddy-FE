import { useState, useEffect, useRef } from "react";
import { data, Link } from "react-router-dom";
import {
  Heart, Bell, Ticket, Bank, CaretDown, MagnifyingGlass, X, User,
  Clock, CreditCard, SignOut, Plus, List
} from "phosphor-react";
import BuildPackageSection from "./BuildPackageSection";

import { getUserApi } from "../../services/Authen/getUserApi";
import { useNavigate } from "react-router-dom";
import DepositModal from "../Payments/DepositModal";
export default function HeaderTop({ toggleMobileMenu }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showBuildPackage, setShowBuildPackage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null); // <-- Thêm user state
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");

  // Load user khi có accessToken
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchUser() {
      if (!token) return; // không có token thì thôi

      try {
        const data = await getUserApi(token);
        setUser(data);
      
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
     

        // Nếu getUser fail => xóa token + về login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }

    fetchUser(); // gọi khi mount

    const interval = setInterval(fetchUser, 2500000); // 41 phút
    return () => clearInterval(interval);
  }, [navigate]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  // lưu query
  localStorage.setItem("searchQuery", query.trim());

  // reload lại trang
  window.location.reload();
};




  useEffect(() => {

    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center px-4 sm:px-6 border-b border-gray-300 bg-white h-16 z-40 relative">
        <div className="flex items-center flex-1">
          {/* Hamburger Icon */}
          <button onClick={toggleMobileMenu} className="md:hidden mr-4 text-gray-600">
            <List size={24} />
          </button>
        {/* Search box */}
        {/* Search box */}
        {/* Search box */}
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex items-center bg-gray-100 rounded-md px-4 py-2 w-full max-w-md"
          >
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
          <button type="submit">
            <MagnifyingGlass size={18} className="text-gray-500 cursor-pointer" />
          </button>
        </form>
        </div>


        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-black">
          <button
            onClick={() => setShowBuildPackage(true)}
            className="border border-black px-2 py-1 text-xs 
                       sm:px-4 sm:py-2 sm:text-sm
                       cursor-pointer hover:border-none hover:bg-[#4584FF] 
                       hover:text-white rounded-md transition"
          >
            Build
            <span className="hidden sm:inline"> your package</span>
          </button>


          <Bell size={20} weight="regular" className="cursor-pointer hidden sm:block" />

          <Bank
            size={20}
            weight="regular"
            className="cursor-pointer hidden sm:block"
            onClick={() => setShowDeposit(true)}
          />
          <Ticket
            size={20}
            weight="regular"
            className="cursor-pointer"
            onClick={() => navigate("/user/MyVouchers")}
          />

          {/* Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img
                src={user?.photo || "https://static.vecteezy.com/system/resources/previews/043/900/708/large_2x/user-profile-icon-illustration-vector.jpg"}
                alt="avatar"
                className="h-10 w-10 object-cover rounded-full border"
              />
              <CaretDown size={18} weight="bold"  className="md:block hidden"/>
            </div>

            {/* Dropdown menu */}
           {/* Dropdown menu */}
{showDropdown && (
  <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[90vw] bg-white border border-gray-200 rounded-md shadow-lg z-50">
    {/* Header user */}
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
      <img
        src={
          user?.photo ||
          "https://static.vecteezy.com/system/resources/previews/043/900/708/large_2x/user-profile-icon-illustration-vector.jpg"
        }
        alt="avatar"
        className="h-10 w-10 object-cover rounded-full border"
      />
      <div className="flex flex-col justify-center w-full">
        <div className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {user?.fullName || "Guest"}
        </div>

        {/* Balance */}
        {user?.email && (
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-500 font-semibold">
              {user?.walletBalance
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user.walletBalance / 26300)
                : "$0.00"}
            </span>

            <button
              className="p-1 rounded-full bg-white hover:bg-gray-100 transition"
              onClick={() => setShowDeposit(true)}
            >
              <Plus size={14} weight="bold" className="text-green-500" />
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Email / Login */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 text-xs sm:text-sm">
      {user?.email ? (
        <span className="font-semibold truncate">{user.email}</span>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex justify-center items-center gap-2 w-full p-2 text-xs sm:text-sm font-semibold text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition"
        >
          <User size={16} weight="bold" />
          <span>Login</span>
        </button>
      )}
    </div>

    {/* Menu */}
    {user?.email && (
      <ul className="py-2 text-xs sm:text-sm text-gray-700">
        <li>
          <Link
            to="/user/MyAccount"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <User size={18} className="text-gray-600" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user/MyBooking"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <Clock size={18} className="text-gray-600" />
            <span>My Bookings</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user/MyCards"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <CreditCard size={18} className="text-gray-600" />
            <span>My Payment</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user/Saved"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
          >
            <Heart size={18} className="text-gray-600" />
            <span>Saved</span>
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("user");
              setUser(null);
              navigate("/login");
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md transition"
          >
            <SignOut size={18} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    )}
  </div>
)}



          </div>
        </div>
      </header>

      {/* Modal Deposit */}
      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}

      {/* Modal Build Package */}
      {showBuildPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto ">
            <button
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 cursor-pointer"
              onClick={() => setShowBuildPackage(false)}
            >
              <X size={20} weight="bold" />
            </button>
            <BuildPackageSection />
          </div>
        </div>
      )}
    </>
  );
}
