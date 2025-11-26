import { getEventAnnouncementList } from "@/apis/api/event";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/common/Pagination";
import { userStore } from "@/store/userStore";
import { useSearchParams } from 'react-router-dom';

interface AnnouncementData {
    id : number;            // 시퀀스
    category : string;      // 카테고리
    title : string;         // 제목
    createAt : Date;        // 작성일
    content : string;       // 내용
}

interface AnnouncementPage {
    content : AnnouncementData[];
    totalPages : number;
    totalElements : number;
    number: number;
    size : number;
    first : boolean;
    last : boolean;
}

export default function EventAnnouncementBrowse () {
    const navigate = useNavigate();

    const isLogin = userStore((state) => state.isLogin);
    const [category, setCategory] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [announcementList, setAnnouncementList] = useState<AnnouncementPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
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
            const response = await getEventAnnouncementList(param);
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

    // 사이즈 변경
    const handleSizeChange = (newSize: number) => setSize(newSize);

    return (
        <div className="os_sub_contents">
            <div className="os_sub_navigation clear">
                <h1>이벤트 당첨발표</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/event/browse">이벤트</Link></li>
                    <li><Link to={`/event/announcement/browse`}>이벤트 당첨발표</Link></li>
                </ul>
            </div>

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
            <div className="os_search_wrap">
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
            </div>
            {/* 검색영역 */}
            
            {/* 리스트영역 */}
            <section className="theater_total_board_wrap">
                <div className="board_control_wrap clear">
                    <p>{announcementList?.totalElements ?? 0}개의 글</p>

                    <div className="post_filter_wrap clear">
                        <select>
                            <option onClick={() =>handleSizeChange(10)}>10개씩</option>
                            <option onClick={() =>handleSizeChange(20)}>20개씩</option>
                        </select>
                        <select>
                            <option onClick={() =>handleOrderChange('latest')}>최신순</option>
                            <option onClick={() =>handleOrderChange('views')}>조회순</option>
                            <option onClick={() =>handleOrderChange('recommend')}>추천순</option>
                        </select>
                    </div>
                </div>

                {/* 게시글 테이블 */}
                <table className="basic_board1">
                    <colgroup>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '55%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '8%' }}/>
                        <col style={{ width: '8%' }}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th colSpan={3}>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th><span className="notice">필독</span></th>
                            <th colSpan={2} className="txtl"><a href="#">필독 게시글 제목 <span>[4]</span></a></th>
                            <th>작성자 아이디</th>
                            <th>2025.09.17</th>
                            <th>0,000</th>
                        </tr>
                        <tr>
                            <th><span className="notice">공지</span></th>
                            <th colSpan={2} className="txtl"><a href="#">공지 게시글 제목</a></th>
                            <th>작성자 아이디</th>
                            <th>2025.09.17</th>
                            <th>0,000</th>
                        </tr>
                        <tr>
                            <th><span className="notice">공지</span></th>
                            <th colSpan={2} className="txtl"><a href="#">공지 게시글 제목</a></th>
                            <th>작성자 아이디</th>
                            <th>2025.09.17</th>
                            <th>0,000</th>
                        </tr>
                    {announcementList && announcementList.content.length > 0 ? (
                        announcementList.content.map((item: any) => (
                            <tr
                                key={item.id}
                                onClick={() => navigate(`/event/announcement/${item?.id}`)}
                            >
                                <td className="txtc">{item?.title}</td>
                                <td className="txtc">{item?.title}</td>
                                <td className="txtc">{item?.title}</td>
                                <td className="txtc">{item?.title}</td>
                                <td className="txtc">{item?.title}</td>
                                <td className="txtc">{item.createdAt}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="txtc">
                                당첨 내용이 없습니다 🥲
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="post_button_wrap clear">
                    <div className="left"></div>

                    <div className="right">
                        {isLogin &&<Link to={`/event/announcement/reg`} className="post_button write">글쓰기</Link>}
                    </div>
                </div>
                {announcementList &&
                    <Pagination
                        currentPage={announcementList.number}
                        totalPages={announcementList.totalPages}
                        onPageChange={handlePageChange}
                    />
                }
            </section>
        </div>
    )
}