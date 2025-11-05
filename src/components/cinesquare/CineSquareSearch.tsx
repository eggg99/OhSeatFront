import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { locationStore } from "@/store/userLocation";
import { searchLocation } from "@/apis/api/cinesquare";
import Location from "../common/Location";

export default function CinesquareSearch() {
  const navigate = useNavigate();

  // store 구독
  const recentSearches = locationStore((state) => state.recentSearches);
  const addRecentSearch = locationStore((state) => state.addRecentSearch);
  const currentLocation = locationStore((state) => state.currentLocation);
  const setCurrentLocation = locationStore((state) => state.setCurrentLocation);

//   const { recentSearches, addRecentSearch, currentLocation, setCurrentLocation } = locationStore(
//     (state) => ({
//       recentSearches: state.recentSearches,
//       addRecentSearch: state.addRecentSearch,
//       currentLocation: state.currentLocation,
//       setCurrentLocation: state.setCurrentLocation,
//     })
//   );

  const [inputValue, setInputValue] = useState('');
  const [resultSearch, setResultSearch] = useState<{ city: string; district: string }[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleInputSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') search();
  };

  const search = async () => {
    try {
      const response = await searchLocation({ searchValue: inputValue });
      if (response) setResultSearch(response);
    } catch (err) {
      console.error("위치 정보 검색 실패:", err);
    }
  };

  // 검색 결과 클릭 시
  const handleLocationClick = (item: { city: string; district: string }) => {
    addRecentSearch(item.city, item.district);
    setCurrentLocation({ city: item.city, district: item.district, timestamp: Date.now() });
    navigate(`/cinesquare/list?category=0`);
  };

  const list = () => navigate(`/cinesquare/list?category=0`);

  return (
    <div className="os_sub_contents">
      <div className="flex">
        <div><button onClick={list} className="btn btn-secondary">목록으로</button></div>
        <div><h2 className="text-2xl">지역 검색</h2></div>
      </div>
      <hr />

      <div className="mt-3">
        <input
          type="text"
          placeholder="도/시 단위로 입력하세요"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleInputSearch}
        />
        <button onClick={search} className="btn btn-primary">검색</button>
      </div>

      <div>
        {resultSearch.length > 0 ? (
          resultSearch.slice(0, 5).map((item, idx) => (
            <div className="mb-3" key={idx}>
              <button onClick={() => handleLocationClick(item)}>
                {item.city} {item.district}
              </button>
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다 🥲</div>
        )}
      </div>
<hr/>
      <div>
        내 위치 :: <Location />
      </div>
        <hr/>
      <div>
        <div>최근 이용 지역</div>
        <div>
          {recentSearches.length > 0 ? (
            recentSearches.map((item:any, idx:number) => (
                <div>
              <button key={idx} onClick={() => handleLocationClick(item)}>
                {item.city} {item.district}
              </button>
              </div>
            ))
          ) : (
            <div>최근 이용 지역이 없습니다 🥲</div>
          )}
        </div>
      </div>
    </div>
  );
}
