import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { locationStore } from "@/store/userLocation";
import { getLocation, searchLocation } from "@/apis/api/cinesquare";
import Location from "@/components/common/Location";


export default function CinesquareSearch () {
    const navigate = useNavigate();
    const { addRecentSearch, recentSearches } = locationStore.getState();
    const [inputValue, setInputValue] = useState('');
    const [resultSearch, setResultSearch] = useState([]);

    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setInputValue(value);
    };

    const search = async () => {
        // TODO : 검색기능 - 카카오api써서, query로 날리는 값들 백엔드에서 받기 => 백엔드에서 api로 찌르기, 받아온 값 프론트로 전송하기
        // 프론트에서 받아온 값들을 보여주고, 사용자가 선택한 값을 로컬스토리지에 저장하기
        
        // 로컬스토리지에 저장하는 코드
        // addRecentSearch(city, district);
	    // console.log("최근 검색 기록:", recentSearches);

        const param = { searchValue :  inputValue};

        try {
        const response = await searchLocation(param);
        
        if(response) {
            setResultSearch(response);
        }
        } catch (err) {
            console.error("위치 정보 검색 실패:", err);
        }

    }

    const findLocation = () => {
        //TODO : 내 위치 찾기 버튼


    }

    const deleteRecentSearch = () => {
        //TODO : 최근검색삭제

    }

   


    return (
        <div className="detail-form shadow rounded-xl border bg-card flex flex-col">
            <div className="flex">
                <div><button onClick={list}>목록으로</button></div>
                <div><h2 className="text-2xl">지역 검색</h2></div>
            </div>

            <div>
                <input type="text" placeholder="도/시 단위로 입력하세요" 
                    name="inputValue"
                    value={inputValue}
                    onChange={handleInput}/>
                <button onClick={() => search()}>검색</button>
            </div>

            <div>
                {resultSearch && resultSearch.length > 0 ? (
                    resultSearch.slice(0, 5).map((item: any, idx: number) => (
                    <div key={idx} >
                        {item.city} {item.district}
                    </div>
                    ))
                ) : (
                    <div>
                    검색 결과가 없습니다 🥲
                    </div>
                )}
            </div>

            <div>
                내 위치 :: <Location></Location>
            </div>

            <div>
                <div>최근이용지역</div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}