import { getTrendingCinema, getPostList } from "@/apis/api/recommend";
import { getRecommendNotice } from "@/apis/api/admin";
import { getMultiplexBrand, getMultiplexLabel } from "@/utils/recommend";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostPage } from "@/types/Post";
import WeekString from '@/components/common/WeekString';
import { Pagination } from "@/components/common/Pagination";
import { NoticeList } from "@/components/common/list/NoticeList";
import { RecommendList } from "@/components/common/list/RecommendList";
import { NoticeData } from "@/types/Notice";
import { userStore } from "@/store/userStore";

interface Cinema {
    multiplexId: number;
    areaId: number;
    cinemaId: string;
    cinemaName: string;
    cinemaAddr: string;
    postCount: number;
    totalLike: number;
}

export default function BrowseIndex() {
    const navigate = useNavigate();
    const [topCinemas, setTopCinemas] = useState<Cinema[]>([]);
    const [postList, setPostList] = useState<PostPage>();
    const [page, setPage] = useState<number>(1);
    const [orderType, setOrderType] = useState<string>("latest");
    const [size, setSize] = useState<number>(10);
    const [noticeList, setNoticeList] = useState<NoticeData[]>([]);

    // 언급량 top5 조회
    const getData = async () => {
        try {
            const response: Cinema[] = await getTrendingCinema(); // Top 5 반환
            setTopCinemas(response);
        } catch (error) {
            console.error(error);
        }
    }
    // 게시글 전체 리스트 조회
    const getPostData = async() => {
        const response = await getPostList(0, '00', 'all_c', 'all_s', orderType, page, size);
        setPostList(response);
    }

    // 공지사항 조회 - 좌석추천
    const getNoticeData = async () => {
        const response = await getRecommendNotice('RECOMMEND');
        setNoticeList(response);
    }

    // 마운트 될 때 데이터 가져오기
    useEffect(() => {
        getData(); 
        getPostData();
        getNoticeData();
    }, []);

    // 페이지/정렬 변경 시 데이터 재요청
    useEffect(() => {
        getPostData();
    }, [page, orderType, size]);

    // 1위 영화관
    const firstCinema = topCinemas[0];

    // 페이지 변경
    const handlePageChange = (newPage: number) => {
        console.log(newPage); setPage(newPage);}

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    // 사이즈 변경
    const handleSizeChange = (newSize: number) => setSize(newSize);

    return (
        <div className="os_sub_contents">
            <section className="hot_theater_weekly">
                {firstCinema && (
                <Link to={`/recommend/${getMultiplexBrand(firstCinema.multiplexId)}`} className={`theater${firstCinema.multiplexId}`}>
                    <span>최근 언급 많이 되는 영화관은?</span>
                    <h1>{getMultiplexLabel(firstCinema.multiplexId)} {firstCinema?.cinemaName}점</h1>
                    <i>{firstCinema?.cinemaAddr}</i>
                    <div className="post_like_wrap">
                        <ul className="post_like_list clear">
                            <li className="post">
                                <span>주간 게시글</span>
                                <i>{firstCinema?.postCount}개</i>
                            </li>
                            <li className="like">
                                <span>게시글 통합 좋아요</span>
                                <i>{firstCinema?.totalLike}개</i>
                            </li>
                        </ul>
                    </div>
                </Link>
                )}
            </section>

            <section className="sub_quick_menu">
                <ul className="sub_quick_menu_list">
                    <li className="sub1"><Link to={`/recommend/cgv`}>CGV</Link></li>
                    <li className="sub2"><Link to={`/recommend/megabox`}>메가박스</Link></li>
                    <li className="sub3"><Link to={`/recommend/lottecinema`}>롯데시네마</Link></li>
                </ul>
            </section>

            <section className="rank_banner_wrap clear">
                <div className="rank5_wrap">
                    <div className="inner">
                        <div className="rank5_title clear">
                            <h2>영화관 언급량 TOP5</h2>
                            <i><WeekString/></i> 
                        </div>

                        <ul className="rank5_list">
                            {topCinemas.map((cinema, idx) => (
                                <li key={cinema.cinemaId}>
                                    <Link to={`/recommend/${getMultiplexBrand(cinema.multiplexId)}`} >
                                        <span className="number">{idx + 1}</span>

                                        <p>{getMultiplexLabel(cinema.multiplexId)} {cinema.cinemaName}점</p>

                                        <i>{cinema.cinemaAddr}</i>

                                        <span className="total_post">게시글<b>{cinema.postCount}</b></span>
                                    </Link>                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="banner_wrap">
                        <div className="inner">
                            <ul className="banner_event_list">
                                <li className="n1 on">
                                    <a href="#">
                                        <div className="inner_info">
                                            <span>시사회</span>
                                            <h3>보스 룩 시사회 이벤트</h3>
                                            <img src="./img/event_banner_1.png" className="poster_img"/>
                                            <p>예고편을 감상하고 기대평을 남겨주세요!<br/>추첨을 통해 시사회에 초대합니다.</p>
                                            <ul className="inner_info_list">
                                                <li><b>이벤트 일정</b>9/8(월) ~ 9/21(일)</li>
                                                <li><b>당첨 인원</b>30명 (1인 2석, 총 60석)</li>
                                            </ul>
                                        </div>
                                        <img src="./img/event_banner_1_2.png" className="background_img"/>
                                    </a>
                                </li>
                                <li className="n2">
                                    <a href="#">
                                        <div className="inner_info">
                                            <span>예매권</span>
                                            <h3>위키드: 포 굿 예매권 증정</h3>
                                            <img src="./img/event_banner_2.png" className="poster_img"/>
                                            <p>이벤트에 참여해주시는 분들 중<br/>추첨을 통해 예매권을 증정합니다.</p>
                                            <ul className="inner_info_list">
                                                <li><b>이벤트 일정</b>11/3(월) ~ 11/9(일)</li>
                                                <li><b>당첨 인원</b>25명</li>
                                            </ul>
                                        </div>

                                        <p>이벤트 바로가기</p>
                                        
                                        <img src="./img/event_banner_2_2.png" className="background_img"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </section>

            <section className="theater_total_board_wrap">
                <h2>영화관 좌석 추천 전체글보기</h2>
                
                <div className="board_control_wrap clear">
                    <p>{postList?.totalElements ?? 0}개의 글</p>
                    
                    <div className="post_filter_wrap clear">
                        <select>
                            <option onClick={() =>handleSizeChange(10)}>10개씩</option>
                            <option onClick={() =>handleSizeChange(20)}>20개씩</option>
                        </select>
                        <select>
                            <option onClick={() =>handleOrderChange('latest')}>최신순</option>
                            <option onClick={() =>handleOrderChange('views')}>조회순</option>
                            <option onClick={() =>handleOrderChange('comments')}>댓글순</option>
                        </select>
                    </div>
                </div>

                {/* 게시글 테이블 */}
                {postList && (
                  <RecommendList
                    noticeList={noticeList}
                    postList={postList}
                    isEditMode={false}
                  />
                )}

                {/*페이징처리*/}
                {postList &&
                    <Pagination
                        currentPage={postList.number}
                        totalPages={postList.totalPages}
                        onPageChange={handlePageChange}
                    />
                }
            </section>
        </div>
    )
}

