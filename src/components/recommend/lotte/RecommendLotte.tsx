import { useEffect, useState } from "react";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import { PostPage } from "@/types/Post";
import AreaSelector from "@/components/recommend/common/AreaSelector"
import CinemaSelector from "@/components/recommend/common/CinemaSelector";
import CinemaInfo from "@/components/recommend/common/CinemaInfo";
import ScreenSelector from "@/components/recommend/common/ScreenSelector";
import PostList from "@/components/post/PostList";

export default function RecommendCgv() {
    const multiplexId = "3"; // cgv 초기값
    const [areaId, setAreaId] = useState<string | null>(null);
    const [cinemaList, setCinemaList] = useState<any[]>([]);
    const [selectedCinema, setSelectedCinema] = useState<any | null>(null);
    const [screenList, setScreenList] = useState<any[]>([]);
    const [selectedScreen, setSelectedScreen] = useState<any | null>(null);
    const [pageData, setPageData] = useState<PostPage | null>(null);
    const [page, setPage] = useState(0); // 0부터 시작
    const size = 10;

    // 지역 선택
    const handleAreaChange = async (newAreaId: string) => {
        setAreaId(newAreaId);
        const response = await getCinemaList(multiplexId, newAreaId);
        setCinemaList(response?.length ? response : []);
        setScreenList([]);
        setSelectedCinema(null);
        setSelectedScreen(null);
        setPageData(null);
        setPage(0); // 페이지 초기화
    };

    // 극장 선택
    const handleCinemaChange = async (cinema: any) => {
        setSelectedCinema(cinema);
        setPage(0);
        const response = await getScreenList(multiplexId, cinema.cinemaId);
        setScreenList(response?.length ? [{ screenId: 'all', screenName: '전체' }, ...response] : [{ screenId: 'all', screenName: '전체' }]);
        setSelectedScreen(null);
        setPageData(null);
    };

    // 화면 선택 및 페이지 데이터 가져오기
    const handleScreenChange = async (screen: any, pageNumber: number = 0) => {
        setSelectedScreen(screen);
        if (!selectedCinema) return;

        const response = await getPostList(
            selectedCinema.cinemaId,
            screen.screenId,
            "latest",
            pageNumber+1, // 0 기반 페이지+1 값 보내기
            size
        );

        setPageData(response?.content ? response : null);
    };

    // 페이지 변경
    const handlePageChange = (newPage: number) => {
        setPage(newPage); // 0 기반
    };

    // 페이지 변경 시 데이터 재요청
    useEffect(() => {
        if (selectedCinema && selectedScreen) {
            handleScreenChange(selectedScreen, page);
        }
    }, [page]);

    return (
        <section className="flex flex-col">
            <AreaSelector onAreaChange={handleAreaChange} />
            <CinemaSelector cinemaList={cinemaList} selectedCinema={selectedCinema} onCinemaChange={handleCinemaChange} />
            <CinemaInfo selectedCinema={selectedCinema} />
            <ScreenSelector screenList={screenList} selectedScreen={selectedScreen} onScreenChange={handleScreenChange} />
            <PostList pageData={pageData} onPageChange={handlePageChange} />
        </section>
    );
}
