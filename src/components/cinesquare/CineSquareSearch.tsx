import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { locationStore } from "@/store/userLocation";
import { searchLocation } from "@/apis/api/cinesquare";

export default function CinesquareSearch() {
    const navigate = useNavigate();

    // store 구독
    const recentSearches = locationStore((s) => s.recentSearches);
    const addRecentSearch = locationStore((s) => s.addRecentSearch);
    const currentLocation = locationStore((s) => s.currentLocation);
    const setCurrentLocation = locationStore((s) => s.setCurrentLocation);
    const removeRecentSearch = locationStore((s) => s.removeRecentSearch);
    const fetchLocation = locationStore((s) => s.fetchLocation);

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

    // 검색 결과 클릭
    const handleLocationClick = (item: { city: string; district: string }) => {
        addRecentSearch(item.city, item.district);
        setCurrentLocation({ city: item.city, district: item.district, timestamp: Date.now() });
        list();
    };

    const list = () => navigate(`/cinesquare/list?category=0`);

    // 내 위치로 게시글 모아보기 클릭
    const getMyLocation = async () => {
        await fetchLocation();
        await list();
    }

return (
<div className="os_sub_contents">
    <div className="os_freetalk_wrap clear">
        <div className="os_freetalk_subtitle">
            <a onClick={list} className="go_before_button cursor-pointer">목록으로 돌아가기</a>

            <h3>지역 검색</h3>
            <div className="os_freetalk_right_wrap"></div>
        </div>

        <div className="location_search_wrap">
            <input
              type="text"
              placeholder="도/시 단위로 입력하세요"
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleInputSearch}
            />

            <button onClick={search} className="location_search_button"><i className="blind">검색</i></button>
        </div>
        <ul className="location_list">
            {resultSearch.length > 0 ? (
                resultSearch.slice(0, 5).map((item, idx) => (
                    <li className="clear" key={idx}>
                        <a onClick={() => handleLocationClick(item)} className="cursor-pointer">
                            {item.city} {item.district}
                        </a>
                    </li>
                ))
            ) : (
                <>검색 결과가 없습니다 🥲</>
            )}
        </ul>

        <div className="location_contents">
            <a href="#" className="my_location_button" onClick={getMyLocation}>내 위치로 게시글 모아보기</a>

            <div className="location_list_wrap">
                <p>최근 이용 지역</p>

                <ul className="location_list">
                    {recentSearches.length > 0 ? (
                        recentSearches.map((item:any, idx:number) => (
                            <li className="clear" key={idx}>
                                <a onClick={() => handleLocationClick(item)} className="cursor-pointer">
                                    {item.city} {item.district}
                                </a>
                                <button type="button" onClick={() => removeRecentSearch(item.city, item.district)}><i className="blind">삭제</i></button>
                            </li>
                        ))
                    ) : (
                        <>최근 이용 지역이 없습니다 🥲</>
                    )}
                </ul>
            </div>
        </div>
    </div>
</div>
)}
