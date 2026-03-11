import '@/styles/css/main.scss'
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { getTrendingCinema, top3Post } from "@/apis/api/recommend";
import { getCineSquareRandom } from "@/apis/api/cinesquare";
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WeekString from '@/components/common/WeekString';
import { getBoxoffice } from '@/apis/api/movie';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { CRTF_MAP } from '@/constants/certifcate';
import {CineSquareData} from "../types/CineSquare";
import {formatNumberWithComma} from "../utils/format";
import {getEventMain} from "@/apis/api/event";
import {fileData} from "@/types/CineSquare";
import {CATEGORY_LABEL} from "@/types/EventAnn";
import { FilePreview } from "@/components/common/file/FilePreview";
import {userStore} from "@/store/userStore";
import { getMultiplexBrand, getMultiplexBrandSafe } from "@/utils/recommend";

interface Cinema {
    multiplexId: number;
    areaId: number;
    cinemaId: string;
    cinemaName: string;
    cinemaAddr: string;
    postCount: number;
    totalLike: number;
}

interface Movie {
    audiAcc : number;
    movieNm : string;
    openDt : Date;
    posterUrl : string;
    certification : string;
    rank : number;
}

interface RawEvent {
    annCount: number;
    categoryId: number;
    end: boolean;
    endDt: string;
    eventId: number;
    startDt: string;
    title: string;
    files: fileData[]; // 배열 형태로 들어옴
}

interface Event {
    annCount : number;
    categoryId : number;
    end : boolean;
    endDt : string;
    eventId : number;
    startDt : string;
    title : string;
    file: fileData | null
}

export default function PageMain(){
    const isLogin = userStore((state) => state.isLogin);
    const navigate = useNavigate();
    const [topCinemas, setTopCinemas] = useState<Cinema>();
    const [recentPost, setRecentPost] = useState<any[]>([]);
    const [cineSquareList, setCineSquareList] = useState<CineSquareData[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [active, setActive] = useState<'prev' | 'next' | null>('next')
    const [event, setEvent] = useState<Event[]>();
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [
            Autoplay({
            delay: 3000,          // 슬라이드 넘어가는 시간
            stopOnInteraction: true, // 사용자가 슬라이드 건드리면 멈춤
            stopOnMouseEnter: true   // 마우스 올라가면 멈춤
            })
        ]
    )
    const listWrapRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = useState(false);

    // 언급량 top1 조회
    const getData = async () => {
        try {
            const response: Cinema[] = await getTrendingCinema(); // Top1 반환
            setTopCinemas(response[0]);
        } catch (error) {
            console.error(error);
        }
    }

    // 게시글 최신순 3개 조회
    const getTop3Post = async () => {
        try {
            const response = await top3Post(); // 최신 3개
            setRecentPost(response);
        } catch (error) {
            console.error(error);
        }
    }

    // 어제 영화순위 가져오기
    const getMovieChart = async () => {
        const cached = localStorage.getItem("boxoffice");
        try {
            if (cached) {
                const parsed = JSON.parse(cached);

                // 저장된 날과 오늘을 비교
                const savedDate = new Date(parsed.timestamp);
                const today = new Date();

                const isSameDay =
                    savedDate.getFullYear() === today.getFullYear() &&
                    savedDate.getMonth() === today.getMonth() &&
                    savedDate.getDate() === today.getDate();

                if (isSameDay) {
                    // 같은 날이면 캐시 사용
                    setMovies(parsed.data);
                    return;
                }
            }

            // 캐시 없거나 날짜 다르면 API 호출
            const response = await getBoxoffice();
            if (response) {
                setMovies(response);
                localStorage.setItem(
                    "boxoffice",
                    JSON.stringify({
                        data: response,
                        timestamp: new Date().toISOString(),
                    })
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 메인 씨네광장 게시글 랜덤 불러오기
    const getRandomCineData = async () => {
        try {
            const response: CineSquareData[] = await getCineSquareRandom();
            setCineSquareList(response);
        } catch (error) {
            console.error(error);
        }
    }


    // ✅ multiplexId를 label로 변환
    const getMultiplexLabel = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

    // 마운트 될 때 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getData();
            await getTop3Post();
            await getMovieChart();
            await getRandomCineData();
            await getMainEvents();
            setLoading(false);
        };
        fetchData();
    }, []);

    // 씨네광장 이전/다음 버튼 클릭 함수
    const handlePrev = () => {
        if (!listWrapRef.current) return;
        setActive('prev')
        listWrapRef.current.scrollBy({
            left: -350,
            behavior: 'smooth',
        });

    };

    const handleNext = () => {
        if (!listWrapRef.current) return;
        setActive('next')
        listWrapRef.current.scrollBy({
            left: 350,
            behavior: 'smooth',
        });
    };

    const getMainEvents = async () => {
        const response:RawEvent[] = await getEventMain({ count : 2 });
        // 데이터 가공 (Mapping)
        const events: Event[] = response.map((item) => {
            // files 배열에서 POSTER 역할인 파일만 찾기
            const posterFile = item.files.find(f => f.fileRole === "THUMB");

            return {
                eventId: item.eventId,
                categoryId: item.categoryId,
                title: item.title,
                startDt: item.startDt,
                endDt: item.endDt,
                annCount: item.annCount,
                end: item.end,
                file: posterFile || null, // POSTER가 있으면 넣고, 없으면 null 처리
            };
        });
        setEvent(events);
    }


    const handleRecommendClick = () => {
        if (!isLogin) {
            alert("로그인 후 이용해주세요 🙂");
            navigate("user/login");
            return;
        }

        navigate("/recommend/cgv/reg");
    };

    return(
        <main className="os_main_contents">
            <div className="os_main_visual">
                <div className="mv_title">
                    <h1>지금 오싵에서 주목하는 영화관 좌석은?</h1>
                    <p>모두들 모여서 이야기하고 있는 좌석은 무슨 좌석일지 확인하기</p>
                    <Link to="/recommend/browse">더보기</Link>
                </div>

                <div className={`os_weekly_best_theater theater${topCinemas?.multiplexId}`}>
                    {topCinemas && (
                    <Link
                        to={{
                            pathname: `/recommend/${getMultiplexBrand(topCinemas.multiplexId)}`,
                            search: `?areaId=${topCinemas.areaId}&cinemaId=${topCinemas.cinemaId}`,
                        }}
                        className="weekly_best"
                    >
                        <div className="text_wrap">
                            <div className="inner clear">
                                <span>HOT</span>
                                <p>{getMultiplexLabel(topCinemas.multiplexId)} {topCinemas?.cinemaName}점</p>
                                <i>{topCinemas?.cinemaAddr}</i>
                            </div>                                
                        </div>
                    </Link>
                    )}

                    {/* 실제 최신 글 3개 가져오기 */}
                    <ul className="lately_post_list">
                        {recentPost && recentPost.length > 0 ? (
                            recentPost.map((item: any) => (
                                <li key={item.postId}>
                                    <Link to={`/recommend/${getMultiplexBrandSafe(item.multiplexId, item.multiplexName)}/${item.postId}`}>
                                        <span>{item.screenName}</span>
                                        <p>{item.multiplexName} {item.cinemaName}</p>
                                        <i>{item.content}</i>
                                    </Link>
                                </li>
                            ))
                            ) : (
                                <li onClick={handleRecommendClick}>
                                    <a href="#">
                                        <p>🥺</p>
                                        <p>추천이 아직 비어있어요!</p>
                                        <p>첫 번째 추천을 남겨주세요 👉👈</p>
                                    </a>
                                </li>
                            )}
                    </ul>
                </div>
            </div>

            <div className="os_movie_pick">
                <div className="mp_title">
                    <WeekString/>
                    <h2>오늘의 무비픽</h2>
                    <p>Today’s Movie Pick</p>
                    <i>오늘의 여러 극장가 예매 순위들을<br/>바로 이곳에서 한눈에 확인가능!</i>
                    <b>영화진흥위원회의 총 합산 순위로 알려드립니다</b>
                </div>

                <div className="mp_list_wrap embla__viewport" ref={emblaRef}>
                    <ul className="mp_list clear embla__container" style={{ display: 'flex', padding: 0, margin: 0 }}>
                    {loading ? (
                          <li className={`embla__slide rank`}>
                              <div className="inner"><p>로딩중입니다</p></div>
                          </li>
                    ) : movies && movies.length > 0 ? (
                        movies.map((item: any) => {
                            const gradeItem =
                                CRTF_MAP.find((c) => c.grade === item.certification) || CRTF_MAP[0];

                            return (
                                <li
                                    className={`embla__slide rank${item.rank}`}
                                    key={item.rank}
                                    style={{ minWidth: 200, flex: '0 0 auto', listStyle: 'none' }}
                                >
                                    <div className="inner">
                                        <i>{item.rank}</i>
                                        <p>{item.movieNm}</p>
                                        <span className={gradeItem.gradeClass}>
                                             {gradeItem.name}
                                        </span>
                                        <ul className="rate_list">
                                            <li><span>개봉일</span>{item.openDt}</li>
                                            <li><span>누적관객수</span>{formatNumberWithComma(item.audiAcc)}</li>
                                        </ul>
                                    </div>
                                    <img src={item.posterUrl} />
                                </li>
                            );
                        })
                    ) : (
                        <li>데이터가 없습니다.</li>
                    )}
                    </ul>
                </div>
            </div>
            <div className="os_square_event_wrap">                    
                <div className="os_cine_square">
                    <div className="square_title">
                        <h2>씨네광장</h2>
                        <p>Today’s Movie Pick</p>
                        <i>지금 모두들 무슨 이야기를<br/>하고 있을까?</i>

                        <div className="square_button_wrap">
                            <a href="#"
                               className={`square_before ${active === 'prev' ? 'on' : ''}`}
                               onClick={(e) => {
                                e.preventDefault();
                                handlePrev();
                            }}><i className="blind">이전</i></a>
                            <a href="#"
                               className={`square_after ${active === 'next' ? 'on' : ''}`}
                               onClick={(e) => {
                                e.preventDefault();
                                handleNext();
                            }}><i className="blind">다음</i></a>
                        </div>
                    </div>
                    <div className="square_latest_list_wrap" ref={listWrapRef}>
                        <ul className="square_latest_list clear">
                            {cineSquareList && cineSquareList.length > 0 ? (
                                cineSquareList.map((item: any, index : number)=> (
                                    <li key={`cine-${index}`}>
                                        <Link to={`/cinesquare/${item.postId}`} className='inner'>
                                            <span className="category">{item.categoryName}</span>
                                            <b className="more_button"><i className="blind">더보기</i></b>
                                            <p className="post_title">{item.title}</p>
                                            <i className="date">{item.createdAt ? item.createdAt.split("T")[0].replace(/-/g, ".") : ""}</i>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Link to={`/cinesquare/list`} className='inner'>
                                        <span className="category">게시글 등록하러가기</span>
                                        <b className="more_button"><i className="blind">더보기</i></b>
                                        <p className="post_title">게시글이 없습니다. <br/> 지금 등록해보세요!</p>
                                        <i className="date"></i>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>   
                </div>
                

                <div className="os_event">
                    <div className="inner">
                        <div className="event_title">
                            <h2>이벤트</h2>
                            <p>Event</p>
                            <i>오싵러들을 위해 준비한<br/>각종 이벤트들 지금 확인하세요!</i>
                        </div>

                        <ul className="os_m_event_list clear">
                            {event && event.length > 0 ? (
                              event.map((item:any, index:number) => (
                                <li key={`event-${index}`}>
                                    <Link to={`/event/${item.eventId}`}>
                                        <FilePreview
                                          key={item.file.fileId}
                                          file={item.file}
                                          previewType="ALL"
                                        />

                                        <div className="inner">
                                            <i>{CATEGORY_LABEL[item.categoryId] ?? ''}</i>
                                            <p>{item.title}</p>
                                            <span>{item.startDt}<br/>~{item.endDt}</span>
                                        </div>
                                    </Link>
                                </li>
                              ))
                            ) : (
                              <li>
                                  <a href="#">
                                      <div className="inner">
                                          <p>데이터가 없습니다.</p>
                                      </div>
                                  </a>
                              </li>
                            )}
                        </ul>
                    </div>                        
                </div>
            </div>
        </main>
    )
}
