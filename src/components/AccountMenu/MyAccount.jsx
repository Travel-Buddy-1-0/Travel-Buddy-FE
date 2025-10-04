import { useState, useEffect } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { updateUserProfile } from "../../services/Authen/updateUserProfile"; 
import { updatePassword } from "../../services/Authen/updatePassword "; 
import Notification from "../Layout/Notification";


export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notification, setNotification] = useState(null); // ✅ quản lý thông báo

  const [user, setUser] = useState({
    email: "",
    fullName: "",
    balance: 0,
    dateOfBirth: "",
    sex: "",
    phoneNumber: "",
    photo: "",
  });

  // Load user từ localStorage
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      const parsed = JSON.parse(storedUser);
      setUser({
        email: parsed.email || "",
        fullName: parsed.fullName || "",
        balance: parsed.balance || 0,
        dateOfBirth: parsed.dateOfBirth || "",
        sex: parsed.sex || "",
        phoneNumber: parsed.phoneNumber || "",
        photo: parsed.photo || "",
      });
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }
}, []);


  // Validate password
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(pwd);
  };

  // Xử lý đổi mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ type: "error", message: "Confirm password does not match" });
      return;
    }

    if (!validatePassword(password)) {
      setNotification({
        type: "error",
        message: "Password must be at least 6 characters, include uppercase, lowercase, number, and special character",
      });
      return;
    }

    try {
      const res = await updatePassword(password);
      setNotification({ type: "success", message: res || "Password updated successfully!" });
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setNotification({ type: "error", message: "Failed to update password: " + err.message });
    }
  };

  // Xử lý lưu thông tin user
  const handleSave = async () => {
    const updateData = {
      username: user.username || "",
      email: user.email || "",
      fullName: user.fullName || "",
      phoneNumber: user.phoneNumber || "",
      image: user.photo || "",
      dateOfBirth: user.dateOfBirth || "",
      sex: user.sex || "",
    };

    try {
      const updatedUser = await updateUserProfile(updateData);

      const newUser = {
        ...user,
        ...updatedUser.profile,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      setNotification({ type: "success", message: "Profile updated successfully!" });
    } catch (err) {
      setNotification({ type: "error", message: "Failed to update profile: " + err.message });
    }
  };

  return (
    <div className="p-4">
      {/* Hiện thông báo */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="font-bold text-2xl mb-4">Settings</div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("account")}
          className={`pb-3 text-sm font-semibold mx-2 ${
            activeTab === "account"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "border-b border-transparent hover:border-blue-400"
          }`}
        >
          Account Information
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 text-sm font-semibold mx-2 ${
            activeTab === "security"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "border-b border-transparent hover:border-blue-400"
          }`}
        >
          Password & Security
        </button>
      </div>

      {/* Account Info */}
      {activeTab === "account" && (
        <div className="px-3 py-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Personal Data
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border-gray-300 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your email will appear as your profile name and can't be changed
            </p>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full px-3 py-2 border-gray-300 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            />
          </div>

          {/* Gender + Birthdate */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <select
                value={user.sex}
                onChange={(e) => setUser({ ...user, sex: e.target.value })}
                className="w-full px-3 py-2 border-gray-300 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Birthdate
              </label>
              <input
                type="date"
                value={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : ""}
                onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                className="w-full px-3 py-2 border-gray-300 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              className="w-full px-3 py-2 border-gray-300 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md">
              Maybe later
            </button>
            <button
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Password & Security */}
      {activeTab === "security" && (
        <div className="px-3 py-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Password & Security
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border-gray-300 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border-gray-300 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showConfirm ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500  text-white px-4 py-2 cursor-pointer text-sm rounded-md font-medium hover:bg-blue-600"
            >
              Save New Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
