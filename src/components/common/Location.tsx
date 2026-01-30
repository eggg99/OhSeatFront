import { useEffect } from "react";
import { locationStore } from "@/store/userLocation";

interface LocationProps {
  onClick?: () => void;
}

export default function Location({ onClick }: LocationProps) {
  const currentLocation = locationStore((s) => s.currentLocation);
  const fetchLocation = locationStore((s) => s.fetchLocation);

  useEffect(() => {
    if (!currentLocation.city) {
      fetchLocation();
    }
  }, [currentLocation.city, fetchLocation]);

  const handleClick = () => {
    fetchLocation();   // 위치 최신화
    onClick?.();       // 부모에서 내려준 search 실행
  };

  return (
    <a
      className="cursor-pointer"
      onClick={handleClick}
    >
      {currentLocation.city && currentLocation.district
        ? `${currentLocation.city} ${currentLocation.district}`
        : "불러오는 중..."}
    </a>
  );
}
