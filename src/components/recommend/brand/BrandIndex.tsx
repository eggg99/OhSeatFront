import { useEffect, useState, useCallback } from "react";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import useEmblaCarousel from "embla-carousel-react";
import { getRecommendNotice, deleteAdminPost } from "@/apis/api/admin";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { PostPage } from "@/types/Post";
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { AREA_LIST } from "@/constants/area";
import { userStore } from "@/store/userStore";
import { Pagination } from "@/components/common/Pagination";
import { NoticeData, NoticePage } from "@/types/Notice";
import { RecommendList } from "@/components/common/list/RecommendList";
import NoticeModal from "@/components/common/admin/NoticeModal";

const ALL_CINEMA = { cinemaId: 'all_c', cinemaName: '전체' };
const ALL_SCREEN = { screenId: 'all_s', screenName: '전체' };

export default function BrandIndex() {
    const navigate = useNavigate();
    
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);        // 편집모드 상태
    const [isModalOpen, setIsModalOpen] = useState(false);      // 모달 상태
    const [emblaRef2] = useEmblaCarousel({ loop: false });
    const [emblaRef3] = useEmblaCarousel({ loop: false });
    
    const { brand } = useParams<{ brand: string }>();
    const [searchParams] = useSearchParams();
    const multiplexId = MULTIPLEX_LIST.find((m) => m.brand === brand)?.id;
    const multiplexName = MULTIPLEX_LIST.find((m) => m.brand === brand)?.label;
    const [selectedAreaId, setSelectedAreaId] = useState<string>("00");
    const [cinemaList, setCinemaList] = useState<any[]>([]);
    const [selectedCinema, setSelectedCinema] = useState<any | null>(ALL_CINEMA);
    const [screenList, setScreenList] = useState<any[]>([]);
    const [selectedScreen, setSelectedScreen] = useState<any | null>(ALL_SCREEN);
    const [isInnerOn, setIsInnerOn] = useState(false);

    const [postList, setPostList] = useState<PostPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [orderType, setOrderType] = useState<string>("latest");
    const [size, setSize] = useState<number>(10);
    const [noticeList, setNoticeList] = useState<NoticeData[]>([]);
    const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);       // 관리자용 삭제할 게시글 배열
    const initialAreaId = searchParams.get("areaId") ?? "00";
    const initialCinemaId = searchParams.get("cinemaId");

    // 지역 선택
    const handleAreaChange = async (areaId: string) => {
        setSelectedAreaId(areaId);                                                  // 선택한 지역 설정
        const response = await getCinemaList(multiplexId, areaId);           // 영화관 리스트 조회 api
        setCinemaList(response?.length ? [ALL_CINEMA, ...response] : [ALL_CINEMA]); // 영화관 리스트 설정
        setSelectedCinema(ALL_CINEMA);                                              // 영화관 '전체'로 설정
        setSelectedScreen(ALL_SCREEN);                                              // 상영관 '전체'로 설정
        setIsInnerOn(false);                                                 // 영화관 전체보기 닫기
    };

    // 영화관 선택
    const handleCinemaChange = async (cinema: any) => {
        setSelectedCinema(cinema);                                                  // 선택한 영화관 설정
        const response = await getScreenList(multiplexId, cinema.cinemaId);  // 상영관 리스트 조회 api
        setScreenList(response?.length ? [ALL_SCREEN, ...response] : [ALL_SCREEN])  // 상영관 리스트 설정
        setSelectedScreen(ALL_SCREEN);                                              // 상영관 '전체'로 설정
        setIsInnerOn(false);                                                 // 영화관 전체보기 닫기
    };

    // 상영관 선택
    const handleScreenChange = async (screen: any) => {
        setSelectedScreen(screen);                                                  // 선택한 상영관 설정
        setIsInnerOn(false);                                                 // 영화관 전체보기 닫기
    }

    // 게시글 리스트 조회
    const handlePostList = async() => {
        const response = await getPostList(multiplexId, selectedAreaId, selectedCinema.cinemaId, selectedScreen.screenId, orderType, page, size);
        setPostList(response);
    }

    // 페이지 변경
    const handlePageChange = (newPage: number) => setPage(newPage);

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    // 사이즈 변경
    const handleSizeChange = (newSize: number) => setSize(newSize);

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
            alert ('선택된 행이 없습니다');
            return false;
        }
        try {
            const param = {
                boardType : 'RECOMMEND',
                postIds : selectedPostIds,
            }
            const response = await deleteAdminPost(param);
            if (response) {
                await handleAreaChange("00");
                await handlePostList();
                setIsEditMode(false);
                alert ('삭제되었습니다');
            } else {
                alert ('삭제에 실패햇습니다.')
            }


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const initializeFilters = async () => {
            if (!multiplexId) {
                return;
            }

            setPage(0);
            setSelectedAreaId(initialAreaId);

            const response = await getCinemaList(multiplexId, initialAreaId);
            const nextCinemaList = response?.length ? [ALL_CINEMA, ...response] : [ALL_CINEMA];
            setCinemaList(nextCinemaList);

            if (!initialCinemaId) {
                setSelectedCinema(ALL_CINEMA);
                setScreenList([]);
                setSelectedScreen(ALL_SCREEN);
                setIsInnerOn(false);
                return;
            }

            const matchedCinema = nextCinemaList.find((cinema) => cinema.cinemaId === initialCinemaId);

            if (!matchedCinema) {
                setSelectedCinema(ALL_CINEMA);
                setScreenList([]);
                setSelectedScreen(ALL_SCREEN);
                setIsInnerOn(false);
                return;
            }

            setSelectedCinema(matchedCinema);

            const screens = await getScreenList(multiplexId, matchedCinema.cinemaId);
            setScreenList(screens?.length ? [ALL_SCREEN, ...screens] : [ALL_SCREEN]);
            setSelectedScreen(ALL_SCREEN);
            setIsInnerOn(false);
        };

        initializeFilters();
        getNoticeData();
    }, [brand, multiplexId, initialAreaId, initialCinemaId]);

     // 페이지/정렬 변경 시 데이터 재요청
    useEffect(() => {
        if (selectedAreaId && selectedCinema && selectedScreen) {
            handlePostList();
            getNoticeData();
        }
    }, [brand, selectedAreaId, selectedCinema, selectedScreen, page, orderType, size]);

    // 영화관 전체보기 버튼 클릭
    const handleInnerToggle = () => {
        setIsInnerOn((prev) => !prev);
    };

    // 공지사항 조회 - 좌석추천
    const getNoticeData = async () => {
        const response = await getRecommendNotice('RECOMMEND');
        setNoticeList(response);
    }

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

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    }
    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="os_sub_contents">
            <div className="os_sub_navigation clear">
                <h1>{multiplexName}</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/recommend/browse">영화관 좌석 추천</Link></li>
                    <li><Link to={`/recommend/${brand}`}>{multiplexName}</Link></li>
                </ul>
            </div>

            <section className="os_category_wrap">
                {/* 지역 선택 */}
                <div className="os_area">
                    <ul className="os_area_list clear">
                    {AREA_LIST.map(({ id, label }) => {
                        const isChecked = selectedAreaId === id;
                        return (
                            <li key={id} className={`${isChecked ? "on" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                    e.preventDefault(); 
                                    handleAreaChange(id);
                                    }}
                                >
                                    {label}
                                </a>
                            </li>
                        );
                    })}
                    </ul>
                </div>

                {/* 영화관 선택 */}
                <div className="os_branch">
                    {/* 여기가 밑으로 열리면 open 클래스 주기 */}
                    <div className={`inner ${isInnerOn ? "open" : ""}`}>
                        <div className="list_wrap">
                            <ul className="os_brunch_list">
                            {cinemaList.map((cinema) => {
                                const isChecked = selectedCinema?.cinemaId === cinema.cinemaId;
                                return (
                                    <li key={cinema.cinemaId} className={`flex-none ${isChecked ? "on" : ""}`}>
                                        <a
                                            href="#"
                                            onClick={() => handleCinemaChange(cinema)}
                                        >
                                            {cinema.cinemaName}
                                        </a>
                                    </li>
                                );
                            })}
                            </ul>
                        </div>
                        <a href="#" className="os_brunch_button" onClick={handleInnerToggle}></a>
                    </div>
                </div>
            </section>

            {/* 영화관 정보 */}
            <section className="os_branch_info_wrap">
                {(selectedCinema.cinemaId !== 'all_c') &&
                <div className={`info_banner theater${multiplexId}`}>
                    <h2>{selectedCinema.cinemaName}</h2>
                    <p>{selectedCinema.cinemaAddr}</p>
                </div>
                }

                {/* 상영관 선택 */}
                <div className="branch_screen">
                    <div className="embla" ref={emblaRef3}>
                        <div className="embla__container">
                            <ul className="branch_screen_list clear flex flex-nowrap">
                            {(selectedCinema.cinemaId !== 'all_c') &&
                              screenList.map((screen) => {
                                const isChecked = selectedScreen?.screenId === screen.screenId;
                                return(
                                    <li key={screen.screenId} className={`embla__slide flex-none ${isChecked ? "on" : ""}`}>
                                        <a
                                            href="#"
                                            onClick={() => handleScreenChange(screen)}
                                        >
                                            { screen.screenName }
                                        </a>
                                   </li>         
                                );
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
                
                

            {/* 게시글 리스트 */}
            <section className="theater_total_board_wrap">
                <h2>{selectedScreen.screenName}</h2>

                <div className="board_control_wrap clear">
                    <p>{postList?.totalElements ?? 0}개의 글</p>

                    <div className="post_filter_wrap clear">
                        <div className="post_edit_wrap clear">
                            {isAdmin && (
                              <>
                              {isEditMode && (
                                <>
                                <button
                                  type="button"
                                  className="del_select_button"
                                  onClick={() => deleteArray()}>
                                    선택 게시글 삭제
                                </button>

                                <button
                                  type="button"
                                  className="notice_set_button"
                                  onClick={() => openModal()}>
                                    공지사항 관리
                                </button>
                                </>
                                )}
                                <button
                                  type="button"
                                  className={`edit_button ${isEditMode ? 'on' : ''}`}
                                  onClick={toggleEditMode}
                                >
                                편집 모드
                                </button>
                              </>
                            )}
                        </div>

                        {/* 정렬 UI */}
                        <select
                          value={orderType}
                          onChange={(e) => handleOrderChange(e.target.value)}
                        >
                            <option value={'latest'}>최신순</option>
                            <option value={'views'}>조회순</option>
                            <option value={'comments'}>댓글순</option>
                        </select>
                        <select
                          value={size}
                          onChange={(e) => handleSizeChange(Number(e.target.value))}
                        >
                            <option value={'10'}>10개씩</option>
                            <option value={'20'}>20개씩</option>
                        </select>
                    </div>
                </div>

                {/* 게시글 테이블 */}
                {postList && (
                  <RecommendList
                    noticeList={noticeList}
                    postList={postList}
                    isEditMode={isEditMode}
                    selectedPostIds={selectedPostIds}
                    onSelectPost={handleSelectPost}
                  />
                )}

                <div className="post_button_wrap clear">
                        <div className="left"></div>

                        <div className="right">
                            {isLogin && <Link to={`/recommend/${brand}/reg`} className="post_button write">글쓰기</Link>}
                        </div>
                </div>
                <div className="post_button_wrap clear">
                    <div className="left">
                        {postList &&
                            <Pagination
                                currentPage={postList.number}
                                totalPages={postList.totalPages}
                                onPageChange={handlePageChange}
                            />
                        }
                    </div>
                </div>
            </section>

            {/*관리자 공지사항 모달*/}
            {isModalOpen &&
                <NoticeModal isOpen={isModalOpen} onClose={closeModal} />
            }
        </div>
    )
};
