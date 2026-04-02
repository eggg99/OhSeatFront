import { useEffect } from "react";
import { locationStore } from "@/store/userLocation";

interface LocationProps {
  onClick?: () => void;
  autoFetch?: boolean;
  refreshOnClick?: boolean;
}

export default function Location({
  onClick,
  autoFetch = true,
  refreshOnClick = true,
}: LocationProps) {
  const currentLocation = locationStore((s) => s.currentLocation);
  const fetchLocation = locationStore((s) => s.fetchLocation);

  useEffect(() => {
    if (autoFetch && !currentLocation.city) {
      fetchLocation();
    }
  }, [autoFetch, currentLocation.city, fetchLocation]);

  const handleClick = () => {
    if (refreshOnClick) {
      fetchLocation();
    }
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
