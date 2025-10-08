import { useEffect, useState, useCallback } from "react";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import useEmblaCarousel from "embla-carousel-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import "@/styles/custom.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostPage } from "@/types/Post";
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { AREA_LIST } from "@/constants/area";
import { userStore } from "@/store/userStore";

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
    const handlePageChange = (newPage: number) => setPage(newPage);

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
        <div className="flex flex-col">
            {/* 지역 선택 */}
            <section className="content-wrapper py-4">
                <div className="flex justify-center gap-4 flex-wrap">
                    <div className="embla" ref={emblaRef1}>
                        <div className="embla__container">
                            {AREA_LIST.map(({ id, label }) => {
                                const isChecked = selectedAreaId === id;
                                return (
                                    <div className="embla__slide" key={id}>
                                        <div className="checkbox-item">
                                            <input
                                                type="radio"
                                                id={id}
                                                name="area"
                                                className="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleAreaChange(id)}
                                            />
                                            <label
                                                htmlFor={id}
                                                className={`terms-label ${isChecked ? "checked" : ""}`}
                                            >{label}</label>
                                            
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* 영화관 선택 */}
            <section className="content-wrapper py-4">
                <div className="flex justify-center gap-4 flex-wrap">
                    <div className="embla" ref={emblaRef2}>
                        <div className="embla__container">
                            {cinemaList.map((cinema) => {
                                const isChecked = selectedCinema?.cinemaId === cinema.cinemaId;
                                return (
                                    <div className="embla__slide" key={cinema.cinemaId}>
                                        <div className="checkbox-item">
                                            <input
                                                type="radio"
                                                id={cinema.cinemaId}
                                                name="cinema"
                                                className="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleCinemaChange(cinema)} // ✅ 객체 전체 전달
                                            />
                                            <label
                                                htmlFor={cinema.cinemaId}
                                                className={`terms-label ${isChecked ? "checked" : ""}`}
                                                >
                                                {cinema.cinemaName}
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* 영화관 정보 */}
            { (selectedCinema.cinemaId !== 'all_c') &&
                <section className="content-wrapper py-4">
                    <div className="flex flex-col items-center gap-4 flex-wrap">
                        <p>
                            <span>지점명 : </span>
                            <span>{selectedCinema.cinemaName}</span>
                        </p>
                        <p>
                            <span>지점 주소 : </span>
                            <span>{selectedCinema.cinemaAddr}</span>
                        </p>
                    </div>
                </section>
            }
            {/* 상영관 선택 */}
            <section className="content-wrapper py-4">
                <div className="flex justify-center gap-4 flex-wrap">
                    <div className="embla" ref={emblaRef3}>
                        <div className="embla__container">
                            {screenList.map((screen) => {
                                const isChecked = selectedScreen?.screenId === screen.screenId;
                                return(
                                    <div className="embla__slide" key={screen.screenId}>
                                        <div className="checkbox-item">
                                            <input
                                                type="radio"
                                                id={screen.screenId}
                                                name="screen"
                                                className="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleScreenChange(screen)} // ✅ 객체 전체 전달
                                            />
                                            <label
                                                htmlFor={screen.screenId}
                                                className={`terms-label ${isChecked ? "checked" : ""}`}
                                            >{ screen.screenName }</label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* 게시글 리스트 */}
            <section>
                <div className="flex-[6] flex p-4 flex-col content-wrapper vtcal gap-4">
                    {/* 정렬 UI */}
                    <div className="self-end p-2">
                        <button onClick={() =>handleOrderChange('latest')}>최신순</button> | 
                        <button onClick={() =>handleOrderChange('views')}>조회순</button> | 
                        <button onClick={() =>handleOrderChange('comments')}>댓글순</button>
                    </div>
                    {isLogin &&
                    <button><Link to={`/recommend/${brand}/reg`}>등록</Link></button>
                    }

                    {/* 게시글 테이블 */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>제목</TableHead>
                                <TableHead>작성자</TableHead>
                                <TableHead>작성일</TableHead>
                                <TableHead>조회수</TableHead>
                                <TableHead>댓글</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {postList && postList.content.map((item:any) => (
                                <TableRow key={item.postId}  
                                    onClick={() => navigate(`/recommend/${brand}/${item.postId}`)} 
                                    className="cursor-pointer hover:bg-gray-100">
                                    <TableCell>
                                        <Link to={`/recommend/${brand}/${item.postId}`}>{item.title}</Link>
                                    </TableCell>
                                    <TableCell>{item.authorNickname}</TableCell>
                                    <TableCell>{item.createdAt}</TableCell>
                                    <TableCell>{item.views}회</TableCell>
                                    <TableCell>{item.commentCount}개</TableCell>
                                </TableRow>
                            ))}
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
                                            onClick={() => handlePageChange(i)}
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
        </div>
    )
};