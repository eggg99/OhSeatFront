import { useEffect } from "react";
import { locationStore } from "@/store/userLocation";
import { getLocation } from "@/apis/api/cinesquare";

export default function Location() {
    const currentLocation = locationStore((state) => state.currentLocation);
    const setCurrentLocation = locationStore((state) => state.setCurrentLocation);

  // 내 위치 버튼 클릭 시 geolocation 가져오기
  const handleGetPosition = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const response = await getLocation({ x: longitude, y: latitude });
        setCurrentLocation({ ...response, timestamp: Date.now() });
      } catch (err) {
        console.error("위치 정보 요청 실패:", err);
      }
    }, (err) => {
      console.error(err);
      alert("위치 정보를 가져오지 못했습니다.");
    });
  };

  useEffect(() => {
  if (!currentLocation.city) {
    handleGetPosition();
  }
}, [currentLocation.city]);

  return (
    <button onClick={handleGetPosition}>
      {currentLocation.city && currentLocation.district
        ? `${currentLocation.city} ${currentLocation.district}`
        : "불러오는 중..."}
    </button>
  );
}
