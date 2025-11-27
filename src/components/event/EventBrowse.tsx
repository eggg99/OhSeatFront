import { getEventList } from "@/apis/api/event";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/common/Pagination";
import { userStore } from "@/store/userStore";
import { useSearchParams } from 'react-router-dom';

interface EventData {
    id : number;            // 시퀀스
    category : string;      // 카테고리
    title : string;         // 제목
    startDt : Date;         // 시작기간
    endDt : Date;           // 종료기간
    isEnd : Boolean;        // 종료여부
    imgUrl : string;        // 이미지url
}

interface EventDataPage {
    content : EventData[];
    totalPages : number;
    totalElements : number;
    number: number;
    first : boolean;
    last : boolean;
}

export default function EventList () {
    const navigate = useNavigate();

    const isLogin = userStore((state) => state.isLogin);
    const [category, setCategory] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [eventList, setEventList] = useState<EventDataPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [orderType, setOrderType] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            await getList();
        }
        fetchData();
    }, [category, orderType]);

    // 페이지 로드 시 URL에 있는 쿼리로 초기화
    useEffect(() => {
        const param = searchParams.get('category') || '';
        setCategory(param);
    }, [searchParams]);

    const handleClick = (value: string) => (e: React.MouseEvent) => {
        e.preventDefault(); // a 태그 기본 동작 방지
        setCategory(value);

        // URL 쿼리 반영
        if (value) {
            searchParams.set('category', value);
        } else {
            searchParams.delete('category');
        }
        setSearchParams(searchParams);
    };


    const handleSearch = async () => {
        if (!searchValue.trim()) return; // 빈값 방지
        // 실제 검색 로직 (API 호출 등)을 여기에 추가
        console.log('검색 실행:', searchValue);

        await getList();
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

    // 페이지 변경
    const handlePageChange = (newPage: number) => setPage(newPage);

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);


    return (
        <div className="os_sub_contents">
            <section className="os_sub_navigation clear">
                <h1>이벤트 둘러보기</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/event/browse">이벤트</Link></li>
                    <li><Link to="/event/browse">이벤트 둘러보기</Link></li>
                </ul>
            </section>

            {/* 카테고리영역 */}
            <section className="os_board_category_wrap">
                <ul className="os_board_list clear">
                    <li className={category === '' ? 'on' : ''}>
                        <a href="#" onClick={handleClick('')}>전체</a>
                    </li>
                    <li className={category === '1' ? 'on' : ''}>
                        <a href="#" onClick={handleClick('1')}>시사회</a>
                    </li>
                    <li className={category === '2' ? 'on' : ''}>
                        <a href="#" onClick={handleClick('2')}>예매권</a>
                    </li>
                </ul>
            </section>

            {/* 검색영역 */}
            <section className="os_search_wrap">
                <ul className="os_search_list">
                    <li>
                        <select>
                            <option onClick={() => setSearchType('')}>전체</option>
                            <option onClick={() => setSearchType('1')}>시사회</option>
                            <option onClick={() => setSearchType('2')}>예매권</option>
                        </select>
                    </li>
                    <li>
                        <input
                            type="text" value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="이벤트를 찾아보세요"/>
                    </li>
                    <li>
                        <button onClick={handleSearch}>검색</button>
                    </li>
                </ul>
            </section>

            {/* 리스트영역 */}
            <section className="theater_total_board_wrap">
                <div className="board_control_wrap clear">
                    <p>{eventList?.totalElements ?? 0}개의 글</p>

                    <div className="post_filter_wrap clear">
                        <select>
                            <option onClick={() =>handleOrderChange('latest')}>최신순</option>
                            <option onClick={() =>handleOrderChange('views')}>조회순</option>
                            <option onClick={() =>handleOrderChange('recommend')}>추천순</option>
                        </select>
                    </div>
                </div>

                <div className="basic_board3_wrap">
                    <ul className="os_event_list">
                            {eventList && eventList.content.length > 0 ? (
                                eventList.content.map((item, index) => (
                                    <li key={item?.id}
                                            onClick={() => navigate(`/event/${item?.id}`)}>
                                            <a href="#" className="event_post_wrap">
                                                <div className="event_category">
                                                    <i>{item?.category}</i>
                                                    {item.isEnd && <i className="end">종료</i>}
                                                </div>
                                                <img src={item?.imgUrl} alt={item?.title} />
                                                <p>{item?.title}</p>
                                                <span>
                                                    {item.startDt.toLocaleDateString()} ~ {item.endDt.toLocaleDateString()}
                                                </span>
                                            </a>
                                    </li>
                                ))
                            ) : (
                                <li><a href="#" className="event_post_wrap">이벤트가 없습니다 🥲</a></li>
                            )}
                    </ul>
                </div>

                <div className="post_button_wrap clear">
                    <div className="right">
                        {isLogin &&<Link to={`/event/reg`} className="post_button write">글쓰기</Link>}
                    </div>
                </div>

                {eventList &&
                    <Pagination
                        currentPage={eventList.number}
                        totalPages={eventList.totalPages}
                        onPageChange={handlePageChange}
                    />
                }
            </section>
        </div>
    )
}