import { useEffect, useState, useCallback } from "react";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import useEmblaCarousel from "embla-carousel-react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostPage } from "@/types/Post";
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { AREA_LIST } from "@/constants/area";
import { userStore } from "@/store/userStore";
import { PaginationComponent } from "@/components/common/Pagination";

const ALL_CINEMA = { cinemaId: 'all_c', cinemaName: '전체' };
const ALL_SCREEN = { screenId: 'all_s', screenName: '전체' };

export default function BrandIndex() {
    const navigate = useNavigate();
    
    const isLogin = userStore((state) => state.isLogin);
    const [emblaRef1] = useEmblaCarousel({ loop: false });
    const [emblaRef2] = useEmblaCarousel({ loop: false });
    const [emblaRef3] = useEmblaCarousel({ loop: false });
    
    const { brand } = useParams<{ brand: string }>();
    const multiplexId = MULTIPLEX_LIST.find((m) => m.brand === brand)?.id;
    const [selectedAreaId, setSelectedAreaId] = useState<string>("00");
    const [cinemaList, setCinemaList] = useState<any[]>([]);
    const [selectedCinema, setSelectedCinema] = useState<any | null>(ALL_CINEMA);
    const [screenList, setScreenList] = useState<any[]>([]);
    const [selectedScreen, setSelectedScreen] = useState<any | null>(ALL_SCREEN);

    const [postList, setPostList] = useState<PostPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [orderType, setOrderType] = useState<string>("latest");
    const size = 10;

    // 지역 선택
    const handleAreaChange = async (areaId: string) => {
        setSelectedAreaId(areaId);                                                  // 선택한 지역 설정
        const response = await getCinemaList(multiplexId, areaId);                  // 영화관 리스트 조회 api
        setCinemaList(response?.length ? [ALL_CINEMA, ...response] : [ALL_CINEMA]); // 영화관 리스트 설정
        setSelectedCinema(ALL_CINEMA);                                              // 영화관 '전체'로 설정
    };

    // 영화관 선택
    const handleCinemaChange = async (cinema: any) => {
        setSelectedCinema(cinema);                                                  // 선택한 영화관 설정
        const response = await getScreenList(multiplexId, cinema.cinemaId);         // 상영관 리스트 조회 api
        setScreenList(response?.length ? [ALL_SCREEN, ...response] : [ALL_SCREEN])  // 상영관 리스트 설정
        setSelectedScreen(ALL_SCREEN);                                              // 상영관 '전체'로 설정
    };

    // 상영관 선택
    const handleScreenChange = async (screen: any) => {
        setSelectedScreen(screen);                                                  // 선택한 상영관 설정
    }

    // 게시글 리스트 조회
    const handlePostList = async() => {
        const response = await getPostList(multiplexId, selectedAreaId, selectedCinema.cinemaId, selectedScreen.screenId, orderType, page, size);
        setPostList(response);
    }

    // 페이지 변경
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    // 첫 진입 시, 지역 전체로 선택
    useEffect(() => {
        handleAreaChange("00");
    }, [brand]);

     // 페이지/정렬 변경 시 데이터 재요청
    useEffect(() => {
        if (selectedAreaId && selectedCinema && selectedScreen) {
            handlePostList();
        }
    }, [brand, selectedAreaId, selectedCinema, selectedScreen, page, orderType]);

    return (
        <div className="os_sub_contents">
            <div className="os_sub_navigation clear">
                {/* 브랜드 이름 한글로 바꾸기 (메가박스랑 롯데시네마) */}
                <h1>{brand}</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/recommend/browse">영화관 좌석 추천</Link></li>
                    <li><Link to={`/recommend/${brand}`}>{brand}</Link></li>
                </ul>
            </div>

            <section className="os_category_wrap">
                {/* 지역 선택 */}
                <div className="os_area">
                    <div className="embla" ref={emblaRef1}>
                        <div className="embla__container">
                            <ul className="os_area_list clear">
                            {AREA_LIST.map(({ id, label }) => {
                                const isChecked = selectedAreaId === id;
                                return (
                                    <li key={id} className={`embla__slide ${isChecked ? "on" : ""}`}>
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
                    </div>
                </div>
                {/* 영화관 선택 */}
                <div className="os_branch">
                    <div className="inner">
                        <div className="embla overflow-hidden" ref={emblaRef2}>
                            <div className="embla__container">
                                <ul className="os_brunch_list clear flex flex-nowrap">
                                {cinemaList.map((cinema) => {
                                    const isChecked = selectedCinema?.cinemaId === cinema.cinemaId;
                                    return (
                                        <li key={cinema.cinemaId} className={`embla__slide flex-none ${isChecked ? "on" : ""}`}>
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
                        </div>
                    </div>
                </div>

                {/* 영화관 정보 */}
                <div className="os_branch_info_wrap">
                    { (selectedCinema.cinemaId !== 'all_c') &&
                    <div className="info_banner">
                        <h2>{selectedCinema.cinemaName}</h2>
                        <p>{selectedCinema.cinemaAddr}</p>
                    </div>
                    }
                </div>
                
                {/* 상영관 선택 */}
                <div className="branch_screen">
                    <div className="embla" ref={emblaRef3}>
                        <div className="embla__container">
                            <ul className="branch_screen_list clear flex flex-nowrap">
                            {screenList.map((screen) => {
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

                {/* 게시글 리스트 */}
                <div className="theater_total_board_wrap">
                    {isLogin &&<button><Link to={`/recommend/${brand}/reg`}>등록</Link></button>}
                    <h2>1관</h2>
                    <div className="board_control_wrap clear">
                        <p>25개의 글</p>

                        <select>
                            <option>10개씩</option>
                            <option>20개씩</option>
                        </select>
                        {/* 정렬 UI */}
                        <select>
                            <option onClick={() =>handleOrderChange('latest')}>최신순</option>
                            <option onClick={() =>handleOrderChange('views')}>조회순</option>
                            <option onClick={() =>handleOrderChange('comments')}>댓글순</option>
                        </select>
                    </div>
                
                    {/* 게시글 테이블 */}
                    <table className="basic_board1">
                        <colgroup>
                            <col style={{ width: '8%' }}/>
                            <col style={{ width: '8%' }}/>
                            <col style={{ width: '47%' }}/>
                            <col style={{ width: '8%' }}/>
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
                                <th>좋아요</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 공지, 필독 넣기 */}
                            <tr>
                                <th><span className="notice">필독</span></th>
                                <th colSpan={2} className="txtl"><a href="#">필독 게시글 제목 <span>[4]</span></a></th>
                                <th>작성자 아이디</th>
                                <th>2025.09.17</th>
                                <th>0,000</th>
                                <th>0</th>
                            </tr>
                            <tr>
                                <th><span className="notice">공지</span></th>
                                <th colSpan={2} className="txtl"><a href="#">공지 게시글 제목</a></th>
                                <th>작성자 아이디</th>
                                <th>2025.09.17</th>
                                <th>0,000</th>
                                <th>0</th>
                            </tr>
                            <tr>
                                <th><span className="notice">공지</span></th>
                                <th colSpan={2} className="txtl"><a href="#">공지 게시글 제목</a></th>
                                <th>작성자 아이디</th>
                                <th>2025.09.17</th>
                                <th>0,000</th>
                                <th>0</th>
                            </tr>
                            {postList && postList.content.length > 0 ? (
                                postList.content.map((item: any) => (
                                <tr
                                    key={item.postId}
                                    onClick={() => navigate(`/recommend/${brand}/${item.postId}`)}
                                >
                                    <td className="txtc">{item.multiplexName}</td>
                                    <td className="board_fix">{item.cinemaName}</td>
                                    <td>{item.title}</td>
                                    <td className="txtc">{item.authorNickname}</td>
                                    <td className="txtc">{item.createdAt}</td>
                                    <td className="txtc">{item.views}회</td>
                                    <td className="txtc">{item.commentCount}개</td>
                                </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan={5}>
                                        추천 내용이 없습니다 🥲
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                    {postList &&
                        <PaginationComponent
                            currentPage={postList.number}
                            totalPages={postList.totalPages}
                            onPageChange={handlePageChange}
                        />
                    }
                </div>
            </section>
        </div>
    )
};