// HotelDescription.jsx
import {
  FaWifi,
  FaCar,
  FaCoffee,
  FaTv,
  FaFan,
  FaUtensils,
  FaSpa,
  FaSwimmingPool,
  FaDumbbell,
  FaBeer,
  FaCocktail,
  FaBaby,
  FaUsers,
  FaBreadSlice,
  FaMountain,
  FaTree,
  FaBinoculars,
  FaBicycle,
  FaBriefcase,
  FaChalkboardTeacher,
  FaBuilding,
  FaPlane,
  FaUmbrellaBeach,
  FaHome,
  FaTshirt,
  FaMusic,
} from "react-icons/fa";

// Mapping icon + màu
const facilityIcons = {
  "Spa": { icon: <FaSpa />, color: "bg-pink-100 text-pink-600" },
  "Pool": { icon: <FaSwimmingPool />, color: "bg-cyan-100 text-cyan-600" },
  "Gym": { icon: <FaDumbbell />, color: "bg-green-100 text-green-600" },
  "Restaurant": { icon: <FaUtensils />, color: "bg-red-100 text-red-600" },
  "Bar": { icon: <FaBeer />, color: "bg-amber-100 text-amber-600" },
  "Rooftop Bar": { icon: <FaBeer />, color: "bg-orange-100 text-orange-600" },
  "Coffee Shop": { icon: <FaCoffee />, color: "bg-yellow-100 text-yellow-600" },
  "Fine Dining": { icon: <FaUtensils />, color: "bg-orange-100 text-orange-600" },
  "Cocktail Bar": { icon: <FaCocktail />, color: "bg-orange-100 text-orange-600" },
  "Kids Club": { icon: <FaBaby />, color: "bg-pink-100 text-pink-600" },
  "Family Rooms": { icon: <FaUsers />, color: "bg-indigo-100 text-indigo-600" },
  "Breakfast Buffet": { icon: <FaBreadSlice />, color: "bg-yellow-100 text-yellow-600" },
  "Hiking Tours": { icon: <FaMountain />, color: "bg-green-100 text-green-700" },
  "Hiking Trails": { icon: <FaMountain />, color: "bg-green-100 text-green-700" },
  "Garden": { icon: <FaTree />, color: "bg-emerald-100 text-emerald-600" },
  "Garden View": { icon: <FaTree />, color: "bg-emerald-100 text-emerald-600" },
  "Lake View": { icon: <FaBinoculars />, color: "bg-blue-100 text-blue-700" },
  "Organic Farm": { icon: <FaTree />, color: "bg-green-100 text-green-600" },
  "Yoga Classes": { icon: <FaDumbbell />, color: "bg-pink-100 text-pink-600" },
  "Bicycle Rental": { icon: <FaBicycle />, color: "bg-lime-100 text-lime-600" },
  "Meeting Rooms": { icon: <FaBriefcase />, color: "bg-gray-100 text-gray-700" },
  "Conference Room": { icon: <FaChalkboardTeacher />, color: "bg-sky-100 text-sky-600" },
  "Coworking Space": { icon: <FaBuilding />, color: "bg-sky-100 text-sky-600" },
  "Ballroom": { icon: <FaBuilding />, color: "bg-slate-100 text-slate-600" },
  "Parking": { icon: <FaCar />, color: "bg-gray-100 text-gray-600" },
  "Free Wi-Fi": { icon: <FaWifi />, color: "bg-blue-100 text-blue-600" },
  "Airport Shuttle": { icon: <FaPlane />, color: "bg-indigo-100 text-indigo-600" },
  "Private Beach": { icon: <FaUmbrellaBeach />, color: "bg-yellow-100 text-yellow-500" },
  "Private Villas": { icon: <FaHome />, color: "bg-rose-100 text-rose-600" },
  "Infinity Pool": { icon: <FaSwimmingPool />, color: "bg-cyan-100 text-cyan-600" },
  "Outdoor Pool": { icon: <FaSwimmingPool />, color: "bg-cyan-100 text-cyan-600" },
  "Shared Lounge": { icon: <FaUsers />, color: "bg-indigo-100 text-indigo-600" },
  "Laundry": { icon: <FaTshirt />, color: "bg-gray-100 text-gray-600" },
  "Water Sports": { icon: <FaDumbbell />, color: "bg-blue-100 text-blue-600" },
  "Cultural Shows": { icon: <FaMusic />, color: "bg-fuchsia-100 text-fuchsia-600" },
};

export default function HotelDescription({ options = [], description = "" }) {
  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-md shadow-sm px-8 py-6 space-y-4">
      <h2 className="text-lg font-bold">About this property</h2>
      <p className="text-sm text-gray-700">{description}</p>

      {/* Facilities */}
      <div className="bg-white rounded-md shadow-sm p-6">
        <h2 className="text-base font-semibold mb-4">Perfect for your stay</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          {options.map((name, idx) => {
            const facility = facilityIcons[name];
            return (
              <div key={idx} className="flex items-center space-x-2">
                {facility ? (
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${facility.color}`}
                  >
                    {facility.icon}
                  </span>
                ) : (
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                    ?
                  </span>
                )}
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
