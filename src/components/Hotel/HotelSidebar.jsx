import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { getCoordinates } from "../../services/Map/Coordinates";


export default function HotelSidebar({ rating, locationText }) {
  const [coords, setCoords] = useState({ lat: null, lon: null });

  useEffect(() => {
    async function fetchCoords() {
      if (locationText) {
        const result = await getCoordinates(locationText);
        if (result) setCoords({ lat: result.latitude, lon: result.longitude });
      }
    }
    fetchCoords();
  }, [locationText]);

  const doubledRating =  (rating * 2).toFixed(1);

  const getLocationRatingLabel = (rating) => {
    if (!rating) return { label: "-", color: "text-gray-500" };
    const score = rating * 2;
    if (score < 7) return { label: "Trung bình", color: "text-gray-500" };
    if (score < 8) return { label: "Khá tốt", color: "text-yellow-600" };
    if (score < 9) return { label: "Tốt", color: "text-green-500" };
    if (score <= 10) return { label: "Xuất sắc", color: "text-blue-600" };
    return { label: "-", color: "text-gray-500" };
  };

  const locationRating = getLocationRatingLabel(rating);

  return (
    <div className="w-full md:w-1/3 bg-white border border-gray-200 rounded-md shadow-sm p-6 space-y-4 h-fit">
      {/* Map */}
      <div className="relative h-64 w-full rounded-md overflow-hidden">
        {coords.lat && coords.lon ? (
          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coords.lat, coords.lon]}>
              <Popup>{locationText}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-600 font-semibold">
            TRÊN BẢN ĐỒ
          </div>
        )}
      </div>

      {/* Điểm đánh giá */}
      <div className="text-center ">
        <div className="text-lg font-bold">{doubledRating} điểm đánh giá</div>
        <div className={`text-sm font-semibold ${locationRating.color}`}>
          Điểm đánh giá vị trí: {locationRating.label}
        </div>
        <div className="mt-4 text-sm text-green-700 font-semibold flex items-center mx-auto">Địa điểm : 
          
          {locationText}
        </div>
      </div>
    </div>
  );
}
