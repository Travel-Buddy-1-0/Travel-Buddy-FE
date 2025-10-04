import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/Authen/resetPassword";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await resetPassword(email);
      setMessage(result); // ví dụ: "Password reset email sent"
    } catch (err) {
      setError("Failed to send reset email to your address. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900">Forgot Password</h2>
        <p className="text-gray-600 text-sm mt-2">
          Already remember your account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 font-medium hover:underline"
          >
            Login here
          </button>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white rounded-md py-2 font-semibold text-sm hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>

      {/* Messages */}
      {message && (
        <p className="mt-4 text-green-600 text-sm text-center">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
      )}
    </div>
  );
}
