import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { locationStore } from "@/store/userLocation";


export default function CinesquareSearch () {
    const navigate = useNavigate();
    const { addRecentSearch, recentSearches } = locationStore.getState();

    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }

    const search = () => {
        // TODO : 검색기능 - 카카오api써서, query로 날리는 값들 백엔드에서 받기 => 백엔드에서 api로 찌르기, 받아온 값 프론트로 전송하기
        // 프론트에서 받아온 값들을 보여주고, 사용자가 선택한 값을 로컬스토리지에 저장하기
        
        // 로컬스토리지에 저장하는 코드
        // addRecentSearch(city, district);
	    // console.log("최근 검색 기록:", recentSearches);
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
                <input type="text" placeholder="도/시 단위로 입력하세요"/>
                <button onClick={() => search()}>검색</button>
            </div>

            <div>
                <button onClick={findLocation}>내위치</button>
            </div>

            <div>
                <div>최근이용지역</div>
                <div>
                    리스트나오는곳
                </div>
                <div>
                    <span>ex) 경기도 수원시</span>
                    <button onClick={deleteRecentSearch}>삭제</button>
                </div>
            </div>
        </div>
    )
}