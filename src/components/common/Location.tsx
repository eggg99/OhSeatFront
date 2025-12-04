import { useEffect } from "react";
import { locationStore } from "@/store/userLocation";


export default function Location() {
  const currentLocation = locationStore((s) => s.currentLocation);
  const fetchLocation = locationStore((s) => s.fetchLocation);

  useEffect(() => {
    if (!currentLocation.city) {
      fetchLocation();
    }
  }, [currentLocation.city]);

  return (
    <a onClick={fetchLocation}>
      {currentLocation.city && currentLocation.district
        ? `${currentLocation.city} ${currentLocation.district}`
        : "불러오는 중..."}
    </a>
  );
}
