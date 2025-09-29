export default function VerifyEmail() {
  return (
    <div className="w-full max-w-sm">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-gray-600 text-sm mt-2">
          Please enter the OTP sent to your email and set your password.
        </p>
      </div>

      <form className="space-y-5">
        {/* OTP */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            OTP Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-4 bg-blue-500 text-white rounded-md font-semibold text-sm hover:bg-blue-600 transition"
            >
              Verify
            </button>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
