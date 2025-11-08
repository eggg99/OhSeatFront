import '@/styles/css/main.scss'
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { getTrendingCinema, top3Post } from "@/apis/api/recommend";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeekString from '@/components/common/WeekString';
import { getBoxoffice } from '@/apis/api/movie';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

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
    rank : number;
}

function PageMain(){
    const [topCinemas, setTopCinemas] = useState<Cinema>();
    const [recentPost, setRecentPost] = useState<any[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
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
            if(response){
                getMultiplexBrand(response.multiplexId);
                
            }
            setRecentPost(response);
        } catch (error) {
            console.error(error);
        }
    }

    // 한주 영화순위 가져오기
    const getMovieChart = async () => {
        try {
            const response = await getBoxoffice();
            if(response){
                setMovies(response);
            }
        } catch (error) {
            console.error(error);
        }
    }


    // ✅ multiplexId를 label로 변환
    const getMultiplexLabel = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

        // ✅ multiplexId를 브랜드로 변환
    const getMultiplexBrand = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.brand || "Unknown";

    // 마운트 될 때 데이터 가져오기
    useEffect(() => {
        getData();
        getTop3Post();
        getMovieChart();
    }, []);

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
                    <Link to={`/recommend/${getMultiplexBrand(topCinemas.multiplexId)}`}  className="weekly_best">
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
                                    <Link to={`/recommend/${getMultiplexBrand(item.multiplexId)}/${item.postId}`}>
                                        <span>{item.screenName}</span>
                                        <p>{item.multiplexName} {item.cinemaName}</p>
                                        <i>{item.content}</i>
                                    </Link>
                                </li>
                            ))
                            ) : (
                                <li>
                                    데이터가 없습니다.
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
                </div>

                <ul className="theater_rank_list">
                    <li className="on">
                        <a href="#" className="theater1"><span>CGV</span></a>
                        <div className="mp_list_wrap embla__viewport" ref={emblaRef}>
                            <ul className="mp_list clear embla__container" style={{ display: 'flex', padding: 0, margin: 0 }}>
                            {movies && movies.length > 0 ? (
                                movies.map((item: any) => (
                                    <li className={`embla__slide rank${item.rank}`} key={item.rank} style={{ minWidth: 200, flex: '0 0 auto', listStyle: 'none' }}>
                                        <div className="inner">
                                            <i>{item.rank}</i>
                                            <p>{item.movieNm}</p>
                                            <span className="grade2">12</span>

                                            <ul className="rate_list">
                                                <li><span>개봉일</span>{item.openDt}</li>
                                                <li><span>누적율</span>{item.audiAcc}명</li>
                                            </ul>
                                        </div>
                                        <img src={item.posterUrl}/>
                                    </li>
                                ))
                                ) : (
                                    <li>
                                        데이터가 없습니다.
                                    </li>
                                )}
                            </ul>
                        </div>                         
                    </li>
                    <li>
                        <a href="#" className="theater2"><span>메가박스</span></a>
                    </li>
                    <li >
                        <a href="#" className="theater3"><span>롯데시네마</span></a>
                    </li>
                </ul>
            </div>
            <div className="os_square_event_wrap">                    
                <div className="os_cine_square">
                    <div className="square_title">
                        <h2>씨네광장</h2>
                        <p>Today’s Movie Pick</p>
                        <i>지금 모두들 무슨 이야기를<br/>하고 있을까?</i>

                        <div className="square_button_wrap">
                            <a href="#" className="square_before"><i className="blind">이전</i></a>
                            <a href="#" className="square_after"><i className="blind">다음</i></a>
                        </div>
                    </div>
                    <div className="square_latest_list_wrap">
                        <ul className="square_latest_list clear">
                            <li>
                                <a href="#" className='inner'>
                                    <span className="category">자유수다</span>
                                    <b className="more_button"><i className="blind">더보기</i></b>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="inner">
                                    <span className="category">공지사항</span>
                                    <b className="more_button"><i className="blind">더보기</i></b>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="inner">
                                    <span className="category">구인구직</span>
                                    <b className="more_button"><i className="blind">더보기</i></b>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="inner">
                                    <span className="category">자유수다</span>
                                    <b className="more_button"><i className="blind">더보기</i></b>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </a>
                            </li>
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

                        <ul className="os_event_list clear">
                            <li>
                                <a href="#">
                                    <img src="./img/20250820_1755670295287387288.png"/>

                                    <div className="inner">
                                        <i>예매권</i>
                                        <p>영화 "컨저링: 마지막 의식" 예매권 증정 이벤트 3줄 이상 긴 제목 테스트</p>
                                        <span>2025.08.20<br/>~ 2025.08.26</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="./img/20250801_1754015676706814821.png"/>

                                    <div className="inner">
                                        <i>예매권</i>
                                        <p>영화 "컨저링: 마지막 의식" 예매권 증정 이벤트</p>
                                        <span>2025.08.20<br/>~ 2025.08.26</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>                        
                </div>
            </div>
        </main>
    )
}

export default PageMain;