import { getTrendingCinema, getPostList } from "@/apis/api/recommend";
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PostPage } from "@/types/Post";

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
        <div>
            <section className="flex flex-col">
                <div>최근 언급 많이 되는 영화관</div>

                {firstCinema && (
                    <div className="flex flex-row">
                        <div className="border">브랜드명 :  {getMultiplexLabel(firstCinema.multiplexId)}</div>
                        <div className="border">영화관 지점명 : {firstCinema?.cinemaName}</div>
                        <div className="border">영화관 주소 : {firstCinema?.cinemaAddr}</div>
                        <div className="border">게시글 수 : {firstCinema?.postCount}</div>
                        <div className="border">좋아요 수 : {firstCinema?.totalLike}</div>
                    </div>
                )}
            </section>

            <section>
                
                <div><Link to={`/recommend/cgv`}>CGV</Link></div>
                <div><Link to={`/recommend/megabox`}>메가박스</Link></div>
                <div><Link to={`/recommend/lottecinema`}>롯데시네마</Link></div>
            </section>
            <section>
                <h4>영화관 언급량 TOP5</h4>
                <ul>
                    {topCinemas.map((cinema, idx) => (
                    <li key={cinema.cinemaId}>
                        <strong>{idx + 1}. {getMultiplexLabel(cinema.multiplexId)}</strong> 
                        - {cinema.cinemaName} ({cinema.cinemaAddr}) - 게시글 {cinema.postCount}개
                    </li>
                    ))}
                </ul>
            </section>
            <section>
                <h4>영화관 좌석 추천 전체글 보기</h4>
                <p>전체 {postList?.totalElements ?? 0}개</p>
                {/* 게시글 리스트 */}
            <section>
                <div className="flex-[6] flex p-4 flex-col content-wrapper vtcal gap-4">
                    {/* 정렬 UI */}
                    <div className="self-end p-2">
                        <button onClick={() =>handleOrderChange('latest')}>최신순</button> | 
                        <button onClick={() =>handleOrderChange('views')}>조회순</button> | 
                        <button onClick={() =>handleOrderChange('comments')}>댓글순</button>
                    </div>

                    {/* 게시글 테이블 */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>제목</TableHead>
                                <TableHead>작성자</TableHead>
                                <TableHead>작성일</TableHead>
                                <TableHead>조회수</TableHead>
                                <TableHead>댓글</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {postList && postList.content.length > 0 ? (
                                postList.content.map((item: any) => (
                                <TableRow
                                    key={item.postId}
                                    onClick={() => navigate(`/recommend/${getMultiplexBrand(item.multiplexId)}/${item.postId}`)}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <TableCell>{item.multiplexName} {item.cinemaName}</TableCell>
                                    <TableCell>
                                        <Link to={`/recommend/${getMultiplexBrand(item.multiplexId)}/${item.postId}`}>{item.title}</Link>
                                    </TableCell>
                                    <TableCell>{item.authorNickname}</TableCell>
                                    <TableCell>{item.createdAt}</TableCell>
                                    <TableCell>{item.views}회</TableCell>
                                    <TableCell>{item.commentCount}개</TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                    추천 내용이 없습니다 🥲
                                </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* 페이지네이션 */}
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
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
                                        >
                                            {i + 1}
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
                    </Pagination>
                </div>
            </section>
            </section>
        </div>
    )
}

