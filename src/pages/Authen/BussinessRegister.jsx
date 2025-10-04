import { useState } from "react";

export default function BusinessRegister() {
  const [businessType, setBusinessType] = useState("");

  const descriptions = {
    "hotel-manager": `Hotel Manager: You’ll manage rooms, track availability, and handle check-ins and check-outs. 
Customers can book online, and you can also offer extra services like laundry or airport pickup.`,

    "restaurant-vendor": `Restaurant Vendor: You’ll manage your menu, table reservations, and customer orders. 
It also lets you organize staff schedules and keep track of daily revenue with ease.`,
  };

  return (
    <div className="w-full max-w-sm">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900">Register Business Account</h2>
      <p className="text-gray-600 text-sm mt-2">
        Already have an account?{" "}
        <a href="#" className="text-blue-500 font-medium hover:underline">
          Login here
        </a>
      </p>

      <form className="space-y-5 mt-10">
        {/* Company Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter your company name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type of Business */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type of Business
          </label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="hotel-manager">Hotel Manager</option>
            <option value="restaurant-vendor">Restaurant Vendor</option>
          </select>

          {businessType && (
            <p className="mt-2 text-gray-600 text-xs leading-relaxed">
              {descriptions[businessType]}
            </p>
          )}
        </div>

        {/* Company Address */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Company Address
          </label>
          <input
            type="text"
            placeholder="Enter your company address"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Business Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Business Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold text-sm transition hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
