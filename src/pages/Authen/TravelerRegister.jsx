import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { registerTraveler } from "../../services/Authen/TravelerRegister";

export default function TravelerRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long.";
    if (!upperCase.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!lowerCase.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!number.test(password))
      return "Password must contain at least one number.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      const data = await registerTraveler(formData.email, formData.password);
      console.log("Register success:", data);
      alert("Register success! Please check your email to confirm.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Register Traveler Account
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5 mt-10" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeSlash size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold text-sm hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
