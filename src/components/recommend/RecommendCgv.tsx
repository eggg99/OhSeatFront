import { useEffect, useState } from "react";
import AreaSelector from "./AreaSelector";
import CinemaSelector from "./CinemaSelector";
import CinemaInfo from "./CinemaInfo";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import ScreenSelector from "./ScreenSelector";
import PostList from "../Post/PostList";

export default function RecommendCgv() {
    const multiplexId = "1";    // multiplexId 초기값 : cgv
    const [areaId, setAreaId] = useState<string | null>(null);
    const [cinemaList, setCinemaList] = useState<any[]>([]);
    const [selectedCinema, setSelectedCinema] = useState<any | null>(null); // 선택된 극장 리스트
    const [screenList, setScreenList] = useState<any | null>([]);
    const [selectedScreen, setSelectedScreen] = useState<any | null>(null);
    const [postList, setPostList] = useState<any[]>([]);
    const [pageData, setPageData] = useState<PostPage | null>(null);
    const [page, setPage] = useState(0);
    const size = 10;


    const handleAreaChange = async (newAreaId: string) => {
        setAreaId(newAreaId);
        const response = await getCinemaList(multiplexId, newAreaId);
        if (response && response.length > 0) {
            setCinemaList(response);
        } else {
            setCinemaList([]); // 없으면 빈 배열
        }
        setScreenList([]);
        setPostList([]);
    }

    const handleCinemaChange = async (cinema: any) => {
        setSelectedCinema(cinema);
        const response = await getScreenList(multiplexId, cinema.cinemaId);
        if(response && response.length > 0) {
            setScreenList([{ screenId: 'all', screenName: '전체' }, ...response]);
        } else {
            setScreenList([{ screenId: 'all', screenName: '전체' }]);
        }
    }

    const handleScreenChange = async(screen: any) => {
        setSelectedScreen(screen)
        const response = await getPostList(selectedCinema.cinemaId,screen.screenId,"latest", page, size);
        console.log(response);
        if(response && response.length > 0) {
            setPostList(response);
        } else {
            setPostList([]);
        }
    }

    return(
        <section className="flex flex-col">
            <AreaSelector onAreaChange={handleAreaChange} />
            <CinemaSelector cinemaList={cinemaList} selectedCinema={selectedCinema} onCinemaChange={handleCinemaChange} />
            <CinemaInfo selectedCinema={selectedCinema} />
            <ScreenSelector screenList={screenList} selectedScreen={selectedScreen} onScreenChange={handleScreenChange}/>
            <PostList pageData={pageData} onPageChange={setPage}/>
        </section>
    )
}