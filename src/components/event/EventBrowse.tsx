import { getEventList } from "@/apis/api/event";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

interface EventData {
    category : string;      // 카테고리
    title : string;         // 제목
    startDt : Date;         // 시작기간
    endDt : Date;           // 종료기간
    imgUrl : string;        // 이미지url
}

interface EventDataPage {
    content : EventData[];
    totalPages : number;
    totalElements : number;
    size : number;
    first : boolean;
    last : boolean;
}

export default function EventList () {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const [eventList, setEventList] = useState<EventDataPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    useEffect(() => {
        const fetchData = async () => {
            await getList();
        }
        fetchData();
    }, []);

    const handleSearch = () => {
        if (!searchValue.trim()) return; // 빈값 방지
        // 실제 검색 로직 (API 호출 등)을 여기에 추가
        console.log('검색 실행:', searchValue);

        getList();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 게시글 리스트 조회
    const getList = async () => {
        try {
            const param = { 'searchType' : searchType , 'searchValue' : searchValue}
            const response = await getEventList(param);
            if(!response) {
                console.log('게시글 조회 실패');
            }
            // console.log('게시글 조회 완료');
            // setEventList(response);
        } catch (error) {
            console.error('게시글 조회 실패' , error);
        }
    }
    
    return (
        <div>
            {/* 카테고리영역 */}
            <div>
                <ul className="flex gap-3">
                    <li onClick={() =>setCategory('')}>전체</li>
                    <li onClick={() =>setCategory('1')}>시사회</li>
                    <li onClick={() =>setCategory('2')}>예매권</li>
                </ul>
            </div>
            {/* 카테고리영역 */}
            
            {/* 검색영역 */}
            <div className="flex gap-3">
                <select >
                    <option onClick={() =>setSearchType('')}>전체</option>
                    <option onClick={() =>setSearchType('1')}>시사회</option>
                    <option onClick={() =>setSearchType('2')}>예매권</option>
                </select>
                <input 
                    type="text" value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="검색어를 입력하세요"/>
                <button onClick={handleSearch}>검색</button>
                <button><Link to="/event/reg">등록</Link></button>
            </div>
            {/* 검색영역 */}
            
            {/* 리스트영역 */}
            <div>
                <div>
                    <Link to="/event/1">
                        <span>카테고리 : </span>
                        <span>이미지 : </span>
                        <span>게시글제목 : </span>
                        <span>기간 : </span>
                    </Link>
                </div>
            </div>

        </div>
    )
}