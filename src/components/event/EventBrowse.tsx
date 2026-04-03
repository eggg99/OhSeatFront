import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/common/Pagination";
import { userStore } from "@/store/userStore";
import { useSearchParams } from 'react-router-dom';
import { EVENT_CATE } from '@/constants/category_event';
import { getEventList } from "@/apis/api/event";
import { deleteAdminPost } from "@/apis/api/admin";
import { EventItem } from "@/components/common/item/EventItem";
import type  {EventDataPage, EventData} from "@/types/Event";

export default function EventList () {
    const navigate = useNavigate();
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);
    const [isEditMode, setIsEditMode] = useState(false);        // 편집모드 상태
    const [category, setCategory] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [eventList, setEventList] = useState<EventDataPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const size = 20;
    const [orderType, setOrderType] = useState<string>('');
    const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);       // 관리자용 삭제할 게시글 배열

    useEffect(() => {
        const fetchData = async () => {
            await getList();
        }
        fetchData();
    }, [category, orderType, page]);

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
                'categoryId' : category,
                'searchType' : searchType ,
                'searchValue' : searchValue,
                'orderType' : orderType,
                'page' : page,
                'size' : size,
            }
            const response = await getEventList(param);
            if(!response) {
                console.error('게시글 조회 실패');
            }
            setEventList(response);
        } catch (error) {
            console.error('게시글 조회 실패' , error);
        }
    }

    // 페이지 변경
    const handlePageChange = (newPage: number) => setPage(newPage);

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => {
        setOrderType(newOrder);
        setPage(0);
    };

    // 편집모드 변경
    const toggleEditMode = () => {
        setIsEditMode(prev => {
            const next = !prev;

            // edit mode 끄는 순간 → 선택 초기화
            if (!next) {
                setSelectedPostIds([]);
            }

            return next;
        });
    };

    // 관리자용 체크박스 선택/해제 핸들러
    const handleSelectPost = (postId: number) => {
        setSelectedPostIds((prev) =>
          prev.includes(postId)
            ? prev.filter((id) => id !== postId) // 이미 있으면 제거
            : [...prev, postId]                  // 없으면 추가
        );
    };

    // 관리자용 체크박스 선택한 게시글 삭제
    const deleteArray = async () => {
        if (selectedPostIds.length === 0) {
            alert ('선택된 게시글이 없습니다');
            return false;
        }
        try {
            const param = {
                boardType : 'EVENT',
                postIds : selectedPostIds,
            }
            await deleteAdminPost(param);
            alert ('삭제되었습니다');

            setSelectedPostIds([]);
            setIsEditMode(false);

            // list 불러오기
            await getList();
        } catch (error) {
            console.error(error);
        }
    }
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
                    {EVENT_CATE.map((cate) => (
                      <li
                        key={cate.id}
                        className={category === cate.id ? 'on' : ''}
                      >
                          <a
                            href="#"
                            onClick={handleClick(cate.id)}
                          >
                              {cate.name}
                          </a>
                      </li>
                    ))}
                </ul>
            </section>

            {/* 검색영역 */}
            <section className="os_search_wrap">
                <ul className="os_search_list">
                    <li>
                        <select
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                        >
                            {EVENT_CATE.map((cate) => (
                              <option
                                key={cate.id}
                                value={cate.id}
                              >
                                  {cate.name}
                              </option>
                            ))}
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
                        <div className="post_edit_wrap clear">
                            {isAdmin && (
                              <>
                                {isEditMode && (
                                    <button
                                      type="button"
                                      className="del_select_button"
                                      onClick={() => deleteArray()}
                                    >선택 게시글 삭제</button>
                                )}
                                <button
                                  type="button"
                                  className={`edit_button ${isEditMode ? 'on' : ''}`}
                                  onClick={toggleEditMode}
                                >편집 모드</button>
                              </>
                            )}
                        </div>
                        <select
                          value={orderType}
                          onChange={(e) => handleOrderChange(e.target.value)}
                        >
                            <option value="latest">최신순</option>
                            <option value="views">조회순</option>
                            <option value="likes">추천순</option>
                        </select>
                    </div>
                </div>

                <div className="basic_board3_wrap">
                    <ul className="os_event_list">
                        {eventList &&
                          <>
                            <EventItem
                              eventList = {eventList.content}
                              isEdit = {isEditMode}
                              selectedIds = {selectedPostIds}
                              onSelectEvent = {handleSelectPost}
                            />
                          </>
                        }
                    </ul>
                </div>

                <div className="post_button_wrap clear">
                    <div className="right">
                        {isLogin && isAdmin && <Link to={`/event/reg`} className="post_button write">글쓰기</Link>}
                    </div>
                </div>

                <div className="post_button_wrap clear">
                    <div className="left">
                        {eventList &&
                          <Pagination
                            currentPage={page}
                            totalPages={eventList.totalPages}
                            onPageChange={handlePageChange}
                            pageBase={0}
                          />
                        }
                    </div>
                </div>

            </section>
        </div>
    )
}
