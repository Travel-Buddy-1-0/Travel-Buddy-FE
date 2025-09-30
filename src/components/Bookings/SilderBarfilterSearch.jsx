import { useState } from "react";
import { CaretUp, CaretDown } from "phosphor-react";
import { useSearchParams } from "react-router-dom";

export default function SidebarFilter() {
  const [openSections, setOpenSections] = useState({
    type: true,
    stars: true,
    wellness: false,
    dining: false,
    family: false,
    activities: false,
    business: false,
    general: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (groupId, opt) => {
  let paramKey = groupId;

  // tất cả group ngoài type & stars sẽ gom vào amenities
  if (groupId !== "type" && groupId !== "stars") {
    paramKey = "amenities";
  }

  // lấy danh sách hiện tại
  const current = searchParams.get(paramKey)
    ? searchParams.get(paramKey).split(",")
    : [];

  let updated;
  if (groupId === "type") {
    // chỉ cho phép chọn 1 option duy nhất
    updated = current.includes(opt) ? [] : [opt];
  } else {
    // các group khác: toggle bình thường
    updated = current.includes(opt)
      ? current.filter((f) => f !== opt)
      : [...current, opt];
  }

  if (updated.length > 0) {
    searchParams.set(paramKey, updated.join(","));
  } else {
    searchParams.delete(paramKey);
  }

  setSearchParams(searchParams);
};


  const filterGroups = [
    {
      id: "type",
      title: "Accommodation Type",
      options: [
        "Luxury", "Resort", "Lodge", "Business", "Boutique",
        "Eco Resort", "City Hotel", "Chalet", "Family",
        "Seaside", "Capsule"
      ]
    },
    {
      id: "stars",
      title: "Star Rating",
      options: ["5 stars", "4 stars", "3 stars", "2 stars"]
    },
    {
      id: "wellness",
      title: "Wellness & Relaxation",
      options: ["Spa", "Pool", "Rooftop Pool", "Infinity Pool", "Outdoor Pool", "Gym", "Yoga Classes"]
    },
    {
      id: "dining",
      title: "Dining & Entertainment",
      options: ["Restaurant", "Bar", "Rooftop Bar", "Coffee Shop", "Fine Dining", "Cocktail Bar", "Seafood Restaurant"]
    },
    {
      id: "family",
      title: "Family & Comfort",
      options: ["Kids Club", "Family Rooms", "Breakfast Buffet", "Garden", "Garden View", "Lake View"]
    },
    {
      id: "activities",
      title: "Nature & Activities",
      options: ["Hiking Tours", "Hiking Trails", "Organic Farm", "Bicycle Rental", "Water Sports", "Cultural Shows"]
    },
    {
      id: "business",
      title: "Business & Events",
      options: ["Meeting Rooms", "Conference Room", "Coworking Space", "Ballroom"]
    },
    {
      id: "general",
      title: "General Facilities",
      options: ["Parking", "Free Wi-Fi", "Airport Shuttle", "Private Beach", "Private Villas", "Shared Lounge", "Laundry"]
    }
  ];

  return (
    <div className="space-y-4">
      {filterGroups.map((group) => (
        <div
          key={group.id}
          className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(group.id)}
          >
            <h3 className="text-sm font-bold">{group.title}</h3>
            {openSections[group.id] ? (
              <CaretUp size={18} className="text-gray-500" />
            ) : (
              <CaretDown size={18} className="text-gray-500" />
            )}
          </div>

          {/* Options */}
          {openSections[group.id] && (
            <div className="space-y-2 mt-2 max-h-48 overflow-y-auto pr-1">
              {group.options.map((opt) => {
                let paramKey =
                  group.id === "type" || group.id === "stars"
                    ? group.id
                    : "amenities";

                const current = searchParams.get(paramKey)
                  ? searchParams.get(paramKey).split(",")
                  : [];

                return (
                  <label
                    key={opt}
                    className="flex items-center cursor-pointer gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={current.includes(opt)}
                      onChange={() => toggleFilter(group.id, opt)}
                      className="h-4 w-4 border-gray-400 rounded-md text-blue-600 focus:ring-0"
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
