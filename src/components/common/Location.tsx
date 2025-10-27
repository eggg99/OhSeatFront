import { getLocation } from "@/apis/api/cinesquare";
import { useEffect, useState } from "react";
import { locationStore } from "@/store/userLocation";
import { useNavigate } from "react-router-dom";

export default function Location() {
  const navigate = useNavigate();

  const [location, setLocation] = useState<{ city: string; district: string } | null>(null);
  const { city: storeCity, district: storeDistrict, timestamp, setLocationStore } = locationStore();

  useEffect(() => {
    const maxAge = 1000 * 60 * 10; // 10분 (예시)
    const now = Date.now();
    const isRefresh = (now - timestamp) > maxAge;

    if ( storeCity && storeDistrict && timestamp &&  isRefresh) {
      // 아직 유효하면 저장된 값 사용
      setLocation({ city: storeCity, district: storeDistrict });
      return;
    }

    // 유효하지 않거나 없으면 새로 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  const success = async (position: { coords: { latitude: number; longitude: number } }) => {
    const { latitude, longitude } = position.coords;
    const param = { x: longitude, y: latitude };

    try {
      // 백엔드로 위도, 경도 전송
      const response = await getLocation(param);

      // 상태 업데이트
      setLocation(response);

      // store에도 업데이트 (persist를 쓰기 때문에 자동으로 로컬스토리지에 저장됨)
      setLocationStore({
        city: response.city,
        district: response.district
      });

    } catch (err) {
      console.error("위치 정보 요청 실패:", err);
    }
  };

  const error = (err: any) => {
    console.error(err);
    alert("위치 정보를 가져오지 못했습니다.");
  };

  const search = () => {
    navigate("/cinesquare/search")
  }

  return (
    <div>
      {/* TODO : search 다른 곳으로 빼고, Location.tsx에서는 받아온 값을 부모로 전달하는 역할만하는 곳으로 만들기 */}
      <button onClick={search}>{location ? `${location.city} ${location.district}` : "불러오는 중..."}</button>
    </div>
  );
}
