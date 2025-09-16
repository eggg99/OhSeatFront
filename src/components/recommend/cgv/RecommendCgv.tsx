import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import { useRecommendStore } from "@/store/recommendStore";
import AreaSelector from "@/components/recommend/common/AreaSelector"
import CinemaSelector from "@/components/recommend/common/CinemaSelector";
import CinemaInfo from "@/components/recommend/common/CinemaInfo";
import ScreenSelector from "@/components/recommend/common/ScreenSelector";

export default function RecommendCgv() {
    const multiplexId = "1"; // cgv 초기값
    const {
        areaId, cinemaList, selectedCinema, screenList, selectedScreen,
        pageData, page, orderType, size,
        setAreaId, setCinemaList, setSelectedCinema, setScreenList, setSelectedScreen,
        setPageData, setPage, setOrderType
    } = useRecommendStore();
    const ALL_CINEMA = { cinemaId: 'all_c', cinemaName: '전체' };
    const ALL_SCREEN = { screenId: 'all_s', screenName: '전체' };

    // 지역 선택
    const handleAreaChange = async (newAreaId : string) => {
        setAreaId(newAreaId);   // 지역값 설정
        let response = [];
        try {
            response = await getCinemaList(multiplexId, newAreaId);  // 영화관 불러오기 api
        } catch (e) {
            console.error("영화관 불러오기 실패", e);
        }
        setCinemaList(response?.length ? [ALL_CINEMA, ...response] : [ALL_CINEMA]);        // 영화관 리스트 설정
        setScreenList([]);                                      // 상영관 리스트 초기화
        setSelectedCinema(null);                                // 선택된 영화관 초기화
        setSelectedScreen(null);                                // 선택된 상영관 초기화
        setPageData(null);                                      // 게시글 초기화
        setPage(0);                                             // 게시글 페이지 초기화
    };

    // 극장 선택
    const handleCinemaChange = async (cinema: any) => {
        let response = [];
        try {
            response = await getScreenList(multiplexId, cinema.cinemaId);  // 영화관 불러오기 api
        } catch (e) {
            console.error("상영관 불러오기 실패", e);
        }
        setSelectedCinema(cinema);
        setPage(0);
        setScreenList(response?.length ? [ALL_SCREEN, ...response] : [ALL_SCREEN]);
        setSelectedScreen(null);
        setPageData(null);
    };

    // 화면 선택 및 페이지 데이터 가져오기
    const handleScreenChange = async (screen: any, pageNumber: number = 0, orderType: string | undefined = 'latest') => {
        setSelectedScreen(screen);
        if (!selectedCinema) return;

        const response = await getPostList(
            selectedCinema.cinemaId,
            screen.screenId,
            orderType,
            pageNumber+1, // 0 기반 페이지+1 값 보내기
            size
        );

        setPageData(response?.content ? response : null);
    };

    // 페이지 변경
    const handlePageChange = (newPage: number) => setPage(newPage);

    // 정렬 변경
    const handleOrderChange = (newOrder: string) => setOrderType(newOrder);

    // 페이지/정렬 변경 시 데이터 재요청
    useEffect(() => {
        if (selectedCinema && selectedScreen) {
            handleScreenChange(selectedScreen, page, orderType);
        }
    }, [page,orderType]);

    return (
        <section className="flex flex-col">
            <AreaSelector onAreaChange={handleAreaChange} />
            <CinemaSelector cinemaList={cinemaList} selectedCinema={selectedCinema} onCinemaChange={handleCinemaChange} />
            <CinemaInfo selectedCinema={selectedCinema} />


            <ScreenSelector screenList={screenList} selectedScreen={selectedScreen} onScreenChange={handleScreenChange} />
            {/* Outlet에서 PostList / PostDetail 렌더링 */}
            <Outlet context={{ handlePageChange, handleOrderChange }} />
        </section>
    );
}
