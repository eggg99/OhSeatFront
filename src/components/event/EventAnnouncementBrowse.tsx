import { getEventAnnouncementList } from "@/apis/api/eventAnn";
import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "@/components/common/Pagination";
import { userStore } from "@/store/userStore";
import { CATEGORY_LABEL, AnnouncementData, AnnouncementPage } from '@/types/EventAnn'

export default function EventAnnouncementBrowse () {
    const navigate = useNavigate();
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);

    const [searchParams, setSearchParams] = useSearchParams();

    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [announcementList, setAnnouncementList] = useState<AnnouncementPage | null>(null);

    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [orderType, setOrderType] = useState<string>('latest');

    useEffect(() => {
        const fetchData = async () => {
            await getList();
        }
        fetchData();
    }, [categoryId, orderType]);

    // 페이지 로드 시 URL에 있는 쿼리로 초기화
    useEffect(() => {
        const param = Number(searchParams.get('categoryId') || null);
        setCategoryId(param);
    }, [searchParams]);

    const handleClick = (value: number|null) => (e: React.MouseEvent) => {
        e.preventDefault(); // a 태그 기본 동작 방지
        setCategoryId(value);

        // URL 쿼리 반영
        if (value) {
            searchParams.set('categoryId', String(value));
        } else {
            searchParams.delete('categoryId');
        }
        setSearchParams(searchParams);
    };

    const handleSearch = async () => {
        if (!searchValue.trim()) return; // 빈값 방지
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
            const param = {
                'categoryId' : categoryId,
                'searchType' : searchType ,
                'searchValue' : searchValue,
                'page' : page,
                'size' : size,
                'orderType' : orderType,
            }
            const response = await getEventAnnouncementList(param);
            if(!response) {
                console.log('게시글 조회 실패');
            }
            setAnnouncementList(response);
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
                    <li><Link to="/event/announcement/browse">이벤트</Link></li>
                    <li><Link to="/event/announcement/browse">이벤트 당첨발표</Link></li>
                </ul>
            </div>

            {/* 카테고리영역 */}
            <section className="os_board_category_wrap">
                <ul className="os_board_list clear">
                    <li className={categoryId === 0 ? 'on' : ''}>
                        <a href="#" onClick={handleClick(0)}>전체</a>
                    </li>
                    <li className={categoryId === 1 ? 'on' : ''}>
                        <a href="#" onClick={handleClick(1)}>시사회</a>
                    </li>
                    <li className={categoryId === 2 ? 'on' : ''}>
                        <a href="#" onClick={handleClick(2)}>예매권</a>
                    </li>
                </ul>
            </section>

            {/* 검색영역 */}
            <div className="os_search_wrap">
                <ul className="os_search_list">
                    <li>
                        <select
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value=''>전체</option>
                            <option value='1'>시사회</option>
                            <option value='2'>예매권</option>
                        </select>
                    </li>
                    <li>
                        <input
                            type="text" value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="이벤트 당첨 발표를 확인해보세요"/>
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
                        <select
                            value={size}
                            onChange={(e) => handleSizeChange(Number(e.target.value))}
                        >
                            <option value={10}>10개씩</option>
                            <option value={20}>20개씩</option>
                        </select>
                        <select
                            value={orderType}
                            onChange={(e)=>handleOrderChange(e.target.value)}
                        >
                            <option value='latest'>최신순</option>
                            <option value='views'>조회순</option>
                            <option value='recommend'>추천순</option>
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
                        
                    {announcementList && announcementList?.content?.length > 0 ? (
                        announcementList.content.map((item: any) => (
                            <tr
                                key={item.eventId}
                                onClick={() => navigate(`/event/announcement/${item?.eventId}`)}
                                className="cursor-pointer"
                            >
                                <td className="txtc">{CATEGORY_LABEL[item.categoryId] ?? '기타'}</td>
                                <td colSpan={2}>
                                    <Link to={`/event/announcement/${item?.eventId}`}>
                                        {item?.title}
                                    </Link>
                                </td>
                                <td className="txtc">관리자</td>
                                <td className="txtc">{item.createdAt ? item.createdAt.split("T")[0].replace(/-/g, ".") : ""}</td>
                                <td className="txtc">{item?.views}</td>
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
                        {isLogin && isAdmin && <Link to={`/event/announcement/reg`} className="post_button write">글쓰기</Link>}
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