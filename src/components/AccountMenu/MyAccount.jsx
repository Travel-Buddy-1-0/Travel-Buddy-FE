import { useState, useEffect } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { updateUserProfile } from "../../services/Authen/updateUserProfile"; 
import { updatePassword } from "../../services/Authen/updatePassword ";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("account"); // account | security
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  

const [confirmPassword, setConfirmPassword] = useState("");


  const [user, setUser] = useState({
    email: "",
    fullName: "",
    balance: 0,
    dateOfBirth: null,
    sex: "",
    phoneNumber: "",
    photo: "",
  });

  // Lấy dữ liệu user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSendOtp = () => {
    setOtpSent(true);
    setCooldown(60); // 60 giây cooldown
  };

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(pwd);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Confirm password does not match");
    return;
  }

  if (!validatePassword(password)) {
    alert(
      "Password must be at least 6 characters, start with a capital letter, include letters, numbers, and a special character."
    );
    return;
  }

  try {
    const res = await updatePassword(password); 
    alert(res);
    setPassword("");
    setConfirmPassword("");
  } catch (err) {
    alert("Failed to update password: " + err.message);
  }
};
  const handleSave = async () => {
 

  // Tạo object gửi lên API
  const updateData = {
    fullName: user.fullName,
    sex: user.sex,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
  };

  try {
    // Gọi API PUT
    const updatedUser = await updateUserProfile(user.id, updateData);

    // Cập nhật state và localStorage
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Failed to update profile", err);
    alert("Failed to update profile");
  }
};

  return (
    <div>
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

      {/* Account Information */}
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
              Your email will also appear as your profile name and can't be
              changed
            </p>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user.fullName || ""}
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
                value={user.sex || ""}
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
                value={
                  user.dateOfBirth
                    ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setUser({ ...user, dateOfBirth: e.target.value })
                }
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
              value={user.phoneNumber || ""}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              className="w-full px-3 py-2 border-gray-300 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md">
              Maybe later
            </button>
            <button
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
        {!validatePassword(password) && password.length > 0 && (
          <ul className="text-xs text-red-500 mt-1 list-disc list-inside space-y-1">
            <li>At least 6 characters</li>
            <li>Start with a capital letter</li>
            <li>Include lowercase letters</li>
            <li>Include numbers</li>
            <li>Include special characters</li>
          </ul>
        )}
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
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer text-sm rounded-md font-medium hover:bg-blue-600"
      >
        Save New Password
      </button>
    </form>
  </div>
)}

    </div>
  );
}
