import { useState, useEffect, useRef } from "react";
import { data, Link } from "react-router-dom";
import {
  Heart, Bell, Ticket, Bank, CaretDown, MagnifyingGlass, X, User,
  Clock, CreditCard, SignOut, Plus,
} from "phosphor-react";
import BuildPackageSection from "./BuildPackageSection";
import DepositModal from "./DepositModal";
import { getUserApi } from "../../services/Authen/getUserApi";
import { useNavigate } from "react-router-dom";
export default function HeaderTop() {
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
      console.log("User fetched:", data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error("Failed to fetch user:", err);

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

  // điều hướng (có thể thay "/" bằng /search?query=... )
  navigate("/");

  // clear input
  setQuery(""); 
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
      <header className="flex justify-between items-center px-6 border-b border-gray-300 bg-white h-16 relative">
        {/* Search box */}
             {/* Search box */}
      {/* Search box */}
 <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-100 rounded-md px-4 py-2 w-1/2"
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



        {/* Actions */}
        <div className="flex mr-4 space-x-6 items-center  text-black">
          <button
            onClick={() => setShowBuildPackage(true)}
            className="border text-sm border-black px-4 py-2 cursor-pointer hover:border-none hover:bg-[#4584FF] hover:text-white rounded-md transition"
          >
            Build your package
          </button>

          <Bell size={20} weight="regular" className="cursor-pointer" />
        
          <Bank
            size={20}
            weight="regular"
            className="cursor-pointer"
            onClick={() => setShowDeposit(true)}
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
              <CaretDown size={18} weight="bold" />
            </div>

            {/* Dropdown menu */}
          {showDropdown && (
  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-1000">
    {/* Header user */}
   <div className="flex space-x-4 items-center px-4 py-3 border-b border-gray-200">
  <img
    src={
      user?.photo ||
      "https://static.vecteezy.com/system/resources/previews/043/900/708/large_2x/user-profile-icon-illustration-vector.jpg"
    }
    alt="avatar"
    className="h-10 w-12 object-cover rounded-full border"
  />
  <div className="flex flex-col justify-center space-y-1 w-full">
    {/* Full name */}
    <div className="text-sm font-semibold text-gray-800">
      {user?.fullName || "Guest"}
    </div>

    {/* Balance with plus button */}
    <div className="flex items-center justify-between text-sm">
      <span className="text-xs text-gray-500 font-semibold">
        {user?.balance ? `${user.balance}$` : "0$"}
      </span>
      <button className="p-1 rounded-full bg-white hover:bg-gray-200 transition cursor-pointer">
        <Plus size={14} weight="bold" className="text-green-400" />
      </button>
    </div>
  </div>
</div>


    {/* Balance */}
<div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 text-sm">
  {user?.email ? (
    <span className="font-semibold">{user.email}</span>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="flex justify-center items-center space-x-2 w-full mx-auto p-2 text-xs font-semibold text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition"
    >
      <User size={16} weight="bold" />
      <span>Login</span>
    </button>
  )}
</div>




    {/* Menu */}
    <ul className="py-2 text-sm text-gray-700">
      <li>
        <Link
          to="/user/MyAccount"
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <User size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Profile</span>
        </Link>
      </li>
      <li>
        <Link
          to="/user/MyBooking"
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <Clock size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">My Bookings</span>
        </Link>
      </li>
      <li>
        <Link
          to="/user/MyCards"
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <CreditCard size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">My payment</span>
        </Link>
      </li>
      <li>
        <Link
          to="/user/Saved"
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <Heart size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Saved</span>
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="w-full text-left cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition text-red-600"
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
  navigate("/login");            setUser(null);
          }}
        >
          <SignOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </li>
    </ul>
  </div>
)}

          </div>
        </div>
      </header>

      {/* Modal Deposit */}
      {showDeposit && <DepositModal  onClose={() => setShowDeposit(false)} />}

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
