import { useState } from "react";
import { loginApi } from "../../services/Authen/Login";
import { useNavigate } from "react-router-dom";
import { getGoogleLoginUrl } from "../../services/Authen/getGoogleLoginUrl";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginApi({ email, password });

      // Nếu login thành công
      alert("Login thành công!");
      console.log("Tokens:", result);
      navigate("/"); // chuyển hướng về home
    } catch (err) {
      console.error("Login error:", err);
      setError("Email hoặc mật khẩu không đúng!");
    }
  };
  const handleGoogleLogin = async () => {
  try {
    let url = await getGoogleLoginUrl();
    // loại bỏ quotes nếu backend trả về string dạng "https://..."
    url = url.replace(/^"|"$/g, "");
    window.location.href = url; // redirect ra Google
  } catch (err) {
    console.error("Google login failed:", err);
  }
};


  return (
    <div className="w-full max-w-sm">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Login to your account
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Not a member?{" "}
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Start a 14 day free trial
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded border-gray-300" />
            Remember me
          </label>
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold text-sm hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-3 text-gray-400 text-xs">Or continue with</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google login */}
     <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full cursor-pointer border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    className="h-5 w-5"
    alt="Google"
  />
  <span className="text-sm text-gray-700 font-medium">
    Continue with Google
  </span>
</button>

    </div>
  );
}
