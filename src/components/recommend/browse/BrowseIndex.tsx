import { getTrendingCinema, getPostList } from "@/apis/api/recommend";
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PostPage } from "@/types/Post";
import { PaginationComponent } from "@/components/common/Pagination";
import WeekString from '@/components/common/WeekString';

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
    const [postList, setPostList] = useState<PostPage | null>(null);
    const [page, setPage] = useState<number>(1);
    const [orderType, setOrderType] = useState<string>("latest");
    const size = 10;

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

    // 마운트 될 때 데이터 가져오기
    useEffect(() => {
        getData(); 
        getPostData();
    }, []);

    // 페이지/정렬 변경 시 데이터 재요청
    useEffect(() => {
        getPostData();
    }, [page, orderType, size]);

    // ✅ multiplexId를 label로 변환
    const getMultiplexLabel = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

        // ✅ multiplexId를 label로 변환
    const getMultiplexBrand = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.brand || "Unknown";

    // 1위 영화관
    const firstCinema = topCinemas[0];

    // 페이지 변경
    const handlePageChange = (newPage: number) => {
        console.log(newPage); setPage(newPage);}

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    return (
        <div className="os_sub_contents">
            <section className="hot_theater_weekly">
                {/* TODO : 언급된 영화관으로 링크 추가 */}
                {firstCinema && (
                <Link to="/">
                    <span>최근 언급 많이 되는 영화관은?</span>
                        <h1 className={`theater${firstCinema.multiplexId}`}>
                            {getMultiplexLabel(firstCinema.multiplexId)} {firstCinema?.cinemaName}점
                        </h1>
                        <i>{firstCinema?.cinemaAddr}</i>
                        <div className="post_like_wrap">
                            <ul className="post_like_list clear">
                                <li className="post">
                                    <span>주간 게시글</span>
                                    <i>{firstCinema?.postCount}</i>
                                </li>
                                <li className="like">
                                    <span>게시글 통합 좋아요</span>
                                    <i>{firstCinema?.totalLike}</i>
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
                                {/* 해당하는 영화관 링크 걸기 */}
                                <Link to="#">
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
                                <li>
                                    <a href="#">
                                        <div>
                                            <span>시사회</span>
                                            <h3>보스 룩 시사회 이벤트</h3>
                                            <img src=""/>
                                            <p>예고편을 감상하고 기대평을 남겨주세요!<br/>추첨을 통해 시사회에 초대합니다.</p>
                                            <ul>
                                                <li><b>이벤트 일정</b>9/8(월) ~ 9/21(일)</li>
                                                <li><b>당첨 인원</b>30명 (1인 2석, 총 60석)</li>
                                            </ul>
                                        </div>
                                        <img src=""/>
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

                    {/* TODO : 게시글 불러오는 개수 변경 함수 붙이기 */}
                    <select>
                        <option>10개씩</option>
                        <option>20개씩</option>
                    </select>
                    <select>
                        <option onClick={() =>handleOrderChange('latest')}>최신순</option>
                        <option onClick={() =>handleOrderChange('views')}>조회순</option>
                        <option onClick={() =>handleOrderChange('comments')}>댓글순</option>
                    </select>
                </div>
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
                                onClick={() => navigate(`/recommend/${getMultiplexBrand(item.multiplexId)}/${item.postId}`)}
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
                                <td colSpan={7} className="txtc">
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
                {/* 페이지네이션 */}
                {/* <Pagination className="pagination_wrap">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="before"
                                href="#"
                                onClick={() => postList && postList.number > 0 && handlePageChange(postList.number - 1)}
                            />
                        </PaginationItem>
                        {postList &&
                            Array.from({ length: postList.totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={i === postList.number} // 0 기반
                                        onClick={() => handlePageChange(i+1)}
                                    >{i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => postList && postList.number < postList.totalPages - 1 && handlePageChange(postList.number + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination> */}
            </section>
        </div>
    )
}

