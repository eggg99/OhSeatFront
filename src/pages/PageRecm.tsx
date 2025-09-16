import { useEffect, useState, useCallback } from "react";
import { getCinemaList, getPostList, getScreenList } from "@/apis/api/recommend";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/custom.scss";
import { useParams } from "react-router-dom";

const multiplexMap: Record<string, number> = {
  cgv: 1,
  megabox: 2,
  lotte: 3,
};

const areaList = [
    { id: "00", label: "전체" },
    { id: "11", label: "서울" },
    { id: "12", label: "경기" },
    { id: "13", label: "인천" },
    { id: "14", label: "강원" },
    { id: "15", label: "대전/충청" },
    { id: "16", label: "대구" },
    { id: "17", label: "부산/울산" },
    { id: "18", label: "경상" },
    { id: "19", label: "광주/전라/제주" },
]
const ALL_CINEMA = { cinemaId: 'all_c', cinemaName: '전체' };

export default function PageRecm() {
    const { brand } = useParams<{ brand: string }>();
    const multiplexId = brand ? multiplexMap[brand] : undefined;

    const [selectedAreaId, setSelectedAreaId] = useState<string>("00");
    const [cinemaList, setCinemaList] = useState<any[]>([]);
    const [selectedCinema, setSelectedCinema] = useState<any | null>(ALL_CINEMA);
    
    const [emblaRef] = useEmblaCarousel({ loop: false }); 

    // 지역 선택
    const handleAreaChange = async (id: string) => {
        setSelectedAreaId(id);
        let response = [];
        try {
            response = await getCinemaList(multiplexId, id);  // 영화관 불러오기 api
        } catch (e) {
            console.error("영화관 불러오기 실패", e);
        }
        setCinemaList(response?.length ? [ALL_CINEMA, ...response] : [ALL_CINEMA]);        // 영화관 리스트 설정
        setSelectedCinema(ALL_CINEMA);
    };

    // 극장 선택
    const handleCinemaChange = async (cinema: any) => {
        setSelectedCinema(cinema);
        let response = [];
        try {
            response = await getScreenList(multiplexId, cinema.cinemaId);  // 영화관 불러오기 api
        } catch (e) {
            console.error("상영관 불러오기 실패", e);
        }
    };

    useEffect(() => {
        handleAreaChange("00");
    }, []);


    return (
        <div className="flex flex-col">
            {/* 지역 선택 */}
            <section className="content-wrapper py-4">
                <div className="flex justify-center gap-4 flex-wrap">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container">
                            {/* 반복 렌더링 */}
                            {areaList.map(({ id, label }) => {
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
            {/* 상영관 선택 */}
            <section className="content-wrapper py-4">
                <div className="flex justify-center gap-4 flex-wrap">
                    <div className="embla" ref={emblaRef}>
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
        </div>
    )
};