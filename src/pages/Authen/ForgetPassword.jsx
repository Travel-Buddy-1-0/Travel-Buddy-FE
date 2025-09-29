export default function ForgetPassword() {
  return (
    <div className="w-full max-w-sm">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900">Forgot Password</h2>
        <p className="text-gray-600 text-sm mt-2">
          Already remember your account?{" "}
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold text-sm hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
}
