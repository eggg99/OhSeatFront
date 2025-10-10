import { getTrendingCinema } from "@/apis/api/recommend";
import { useEffect, useState } from "react";

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
    const [trendingCinema, setTrendingCinema] = useState<Cinema>({
        multiplexId: 0,
        areaId: 0,
        cinemaId: '',
        cinemaName: '',
        cinemaAddr: '',
        postCount: 0,
        totalLike: 0, 
    });

    const getData = async () => {
        try {
            const response = await getTrendingCinema();
            console.log(response)
            setTrendingCinema(response);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getData(); // 마운트 될 때 데이터 가져오기
    }, []);

    return (
        <div>
            <section className="flex flex-col">
                <div>최근 언급 많이 되는 영화관(최근 일주일 기준)</div>

                <div className="flex flex-row">
                    <div className="border">브랜드명</div>
                    <div className="border">영화관 지점명</div>
                    <div className="border">영화관 주소</div>
                    <div className="border">게시글 수</div>
                    <div className="border">좋아요 수(관련게시글통합)</div>
                </div>
            </section>

            <section>
                <div>하위 메뉴 연결 버튼들</div>
            </section>
        </div>
    )
}

