import '@/styles/css/main.scss'
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { getTrendingCinema, top3Post } from "@/apis/api/recommend";
import { getCineSquareRandom } from "@/apis/api/cinesquare";
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WeekString from '@/components/common/WeekString';
import { getBoxoffice } from '@/apis/api/movie';
import { CRTF_MAP } from '@/constants/certifcate';
import { CineSquareData } from "../types/CineSquare";
import { formatDateDot, formatNumberWithComma } from "../utils/format";
import { getEventMain } from "@/apis/api/event";
import { fileData } from "@/types/CineSquare";
import { CATEGORY_LABEL } from "@/types/EventAnn";
import { FilePreview } from "@/components/common/file/FilePreview";
import { userStore } from "@/store/userStore";
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
  audiAcc: number;
  movieNm: string;
  openDt: Date;
  posterUrl: string;
  certification: string;
  rank: number;
}

interface RawEvent {
  annCount: number;
  categoryId: number;
  end: boolean;
  endDt: string;
  eventId: number;
  startDt: string;
  title: string;
  files: fileData[];
}

interface Event {
  annCount: number;
  categoryId: number;
  end: boolean;
  endDt: string;
  eventId: number;
  startDt: string;
  title: string;
  file: fileData | null
}

export default function PageMain() {
  const isLogin = userStore((state) => state.isLogin);
  const navigate = useNavigate();
  const [topCinemas, setTopCinemas] = useState<Cinema>();
  const [recentPost, setRecentPost] = useState<any[]>([]);
  const [cineSquareList, setCineSquareList] = useState<CineSquareData[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [active, setActive] = useState<'prev' | 'next' | null>('next')
  const [event, setEvent] = useState<Event[]>();
  const movieWrapRef = useRef<HTMLDivElement | null>(null);
  const listWrapRef = useRef<HTMLDivElement | null>(null);
  const squarePauseRef = useRef(false);
  const squareResetRef = useRef(false);
  const squareCurrentScrollRef = useRef(0);
  const squareResetTimeoutRef = useRef<number | null>(null);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const response: Cinema[] = await getTrendingCinema();
      setTopCinemas(response?.[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const getTop3Post = async () => {
    try {
      const response = await top3Post();
      setRecentPost(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error(error);
      setRecentPost([]);
    }
  }

  const getMovieChart = async () => {
    const cached = localStorage.getItem("boxoffice");
    try {
      if (cached) {
        const parsed = JSON.parse(cached);

        const savedDate = new Date(parsed.timestamp);
        const today = new Date();

        const isSameDay =
          savedDate.getFullYear() === today.getFullYear() &&
          savedDate.getMonth() === today.getMonth() &&
          savedDate.getDate() === today.getDate();

        if (isSameDay) {
          setMovies(parsed.data);
          return;
        }
      }

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

  const getRandomCineData = async () => {
    try {
      const response: CineSquareData[] = await getCineSquareRandom();
      setCineSquareList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error(error);
      setCineSquareList([]);
    }
  }

  const getMultiplexLabel = (multiplexId: number) =>
    MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getData();
        await getTop3Post();
        await getMovieChart();
        await getRandomCineData();
        await getMainEvents();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const wrap = movieWrapRef.current;

    if (!wrap) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const autoScrollSpeed = 0.8;
    let animationId = 0;
    let pauseAuto = false;
    let isResetting = false;
    let currentScroll = wrap.scrollLeft;
    let resetTimeout: number | null = null;
    let touchStartX = 0;
    let touchScrollLeft = 0;

    const getMaxScroll = () => wrap.scrollWidth - wrap.clientWidth;

    const clearResetTimeout = () => {
      if (resetTimeout !== null) {
        window.clearTimeout(resetTimeout);
        resetTimeout = null;
      }
    };

    const smoothReset = () => {
      if (isResetting) return;

      isResetting = true;

      wrap.scrollTo({
        left: 0,
        behavior: 'smooth'
      });

      window.setTimeout(() => {
        wrap.scrollLeft = 0;
        currentScroll = 0;
        isResetting = false;
        pauseAuto = false;
      }, 700);
    };

    const autoScroll = () => {
      if (!pauseAuto && !isResetting) {
        currentScroll += autoScrollSpeed;
        wrap.scrollLeft = Math.round(currentScroll);

        if (Math.ceil(wrap.scrollLeft) >= getMaxScroll() - 1) {
          pauseAuto = true;

          clearResetTimeout();
          resetTimeout = window.setTimeout(() => {
            smoothReset();
          }, 500);
        }
      }

      animationId = window.requestAnimationFrame(autoScroll);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      pauseAuto = true;
      wrap.classList.add('dragging');

      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;

      clearResetTimeout();
    };

    const handleMouseUp = () => {
      isDown = false;
      wrap.classList.remove('dragging');
      currentScroll = wrap.scrollLeft;
      if (!isResetting) pauseAuto = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown || isResetting) return;
      e.preventDefault();

      const x = e.pageX - wrap.offsetLeft;
      const walk = (x - startX) * 1.2;
      wrap.scrollLeft = scrollLeft - walk;

      if (wrap.scrollLeft < 0) wrap.scrollLeft = 0;
      if (wrap.scrollLeft > getMaxScroll()) wrap.scrollLeft = getMaxScroll();

      currentScroll = wrap.scrollLeft;
    };

    const handleMouseEnter = () => {
      pauseAuto = true;
    };

    const handleMouseLeave = () => {
      isDown = false;
      wrap.classList.remove('dragging');
      currentScroll = wrap.scrollLeft;
      if (!isResetting) pauseAuto = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      pauseAuto = true;
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = wrap.scrollLeft;

      clearResetTimeout();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isResetting) return;

      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.2;
      wrap.scrollLeft = touchScrollLeft - walk;

      if (wrap.scrollLeft < 0) wrap.scrollLeft = 0;
      if (wrap.scrollLeft > getMaxScroll()) wrap.scrollLeft = getMaxScroll();

      currentScroll = wrap.scrollLeft;
    };

    const handleTouchEnd = () => {
      currentScroll = wrap.scrollLeft;
      if (!isResetting) pauseAuto = false;
    };

    wrap.addEventListener('mousedown', handleMouseDown);
    wrap.addEventListener('mouseup', handleMouseUp);
    wrap.addEventListener('mouseleave', handleMouseLeave);
    wrap.addEventListener('mousemove', handleMouseMove);
    wrap.addEventListener('mouseenter', handleMouseEnter);
    wrap.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrap.addEventListener('touchmove', handleTouchMove, { passive: true });
    wrap.addEventListener('touchend', handleTouchEnd);

    animationId = window.requestAnimationFrame(autoScroll);

    return () => {
      window.cancelAnimationFrame(animationId);
      clearResetTimeout();
      wrap.removeEventListener('mousedown', handleMouseDown);
      wrap.removeEventListener('mouseup', handleMouseUp);
      wrap.removeEventListener('mouseleave', handleMouseLeave);
      wrap.removeEventListener('mousemove', handleMouseMove);
      wrap.removeEventListener('mouseenter', handleMouseEnter);
      wrap.removeEventListener('touchstart', handleTouchStart);
      wrap.removeEventListener('touchmove', handleTouchMove);
      wrap.removeEventListener('touchend', handleTouchEnd);
    };
  }, [movies.length]);

  useEffect(() => {
    const wrap = listWrapRef.current;

    if (!wrap) return;

    const autoSpeed = 0.4;
    let animationId = 0;
    squarePauseRef.current = false;
    squareResetRef.current = false;
    squareCurrentScrollRef.current = wrap.scrollLeft;

    const getMaxScroll = () => wrap.scrollWidth - wrap.clientWidth;

    const clearResetTimeout = () => {
      if (squareResetTimeoutRef.current !== null) {
        window.clearTimeout(squareResetTimeoutRef.current);
        squareResetTimeoutRef.current = null;
      }
    };

    const smoothReset = () => {
      if (squareResetRef.current) return;

      squareResetRef.current = true;

      wrap.scrollTo({
        left: 0,
        behavior: 'smooth'
      });

      window.setTimeout(() => {
        squareCurrentScrollRef.current = 0;
        squareResetRef.current = false;
      }, 700);
    };

    const autoSlide = () => {
      if (!squarePauseRef.current && !squareResetRef.current) {
        squareCurrentScrollRef.current += autoSpeed;
        wrap.scrollLeft = Math.round(squareCurrentScrollRef.current);

        if (wrap.scrollLeft >= getMaxScroll() - 1) {
          squarePauseRef.current = true;
          clearResetTimeout();
          squareResetTimeoutRef.current = window.setTimeout(() => {
            smoothReset();

            window.setTimeout(() => {
              squareCurrentScrollRef.current = 0;
              squarePauseRef.current = false;
            }, 800);
          }, 500);
        }
      }

      animationId = window.requestAnimationFrame(autoSlide);
    };

    const handleMouseEnter = () => {
      squarePauseRef.current = true;
    };

    const handleMouseLeave = () => {
      if (!squareResetRef.current) {
        squareCurrentScrollRef.current = wrap.scrollLeft;
        squarePauseRef.current = false;
      }
    };

    wrap.addEventListener('mouseenter', handleMouseEnter);
    wrap.addEventListener('mouseleave', handleMouseLeave);

    animationId = window.requestAnimationFrame(autoSlide);

    return () => {
      window.cancelAnimationFrame(animationId);
      clearResetTimeout();
      wrap.removeEventListener('mouseenter', handleMouseEnter);
      wrap.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cineSquareList.length]);

  const handlePrev = () => {
    if (!listWrapRef.current) return;
    squarePauseRef.current = true;
    if (squareResetTimeoutRef.current !== null) {
      window.clearTimeout(squareResetTimeoutRef.current);
      squareResetTimeoutRef.current = null;
    }
    setActive('prev')
    listWrapRef.current.scrollBy({
      left: -306,
      behavior: 'smooth',
    });
    window.setTimeout(() => {
      if (!listWrapRef.current) return;
      squareCurrentScrollRef.current = listWrapRef.current.scrollLeft;
      squarePauseRef.current = false;
    }, 500);
  };

  const handleNext = () => {
    if (!listWrapRef.current) return;
    squarePauseRef.current = true;
    if (squareResetTimeoutRef.current !== null) {
      window.clearTimeout(squareResetTimeoutRef.current);
      squareResetTimeoutRef.current = null;
    }
    setActive('next')
    listWrapRef.current.scrollBy({
      left: 306,
      behavior: 'smooth',
    });
    window.setTimeout(() => {
      if (!listWrapRef.current) return;
      squareCurrentScrollRef.current = listWrapRef.current.scrollLeft;
      squarePauseRef.current = false;
    }, 500);
  };

  const getMainEvents = async () => {
    try {
      const response: RawEvent[] = await getEventMain({ count: 2 });
      const events: Event[] = (Array.isArray(response) ? response : []).map((item) => {
        const posterFile = item.files?.find(f => f.fileRole === "THUMB");

        return {
          eventId: item.eventId,
          categoryId: item.categoryId,
          title: item.title,
          startDt: item.startDt,
          endDt: item.endDt,
          annCount: item.annCount,
          end: item.end,
          file: posterFile || null,
        };
      });
      setEvent(events);
    } catch (error) {
      console.error(error);
      setEvent([]);
    }
  }


  const handleRecommendClick = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      navigate("user/login");
      return;
    }

    navigate("/recommend/cgv/reg");
  };

  return (
    <main className="os_main_contents">
      <div className="os_main_visual">
        <div className={`os_weekly_best_theater theater${topCinemas?.multiplexId}`}>
          {topCinemas && (
            <Link
              to={{
                pathname: `/recommend/${getMultiplexBrand(topCinemas.multiplexId)}`,
                search: `?areaId=${topCinemas.areaId}&cinemaId=${topCinemas.cinemaId}`,
              }}
              className="weekly_best"
            >
              <div className="mv_title">
                <h1>지금 오싵에서 가장 많이 언급되는 좌석은?</h1>
                <p>사람들이 주목하는 그 자리, 지금 바로 확인해보세요</p>
              </div>

              <div className="text_wrap">
                <div className="inner clear">
                  <span>HOT</span>
                  <p>{getMultiplexLabel(topCinemas.multiplexId)} {topCinemas.cinemaName}</p>
                  <i>{topCinemas.cinemaAddr}</i>
                </div>
              </div>
            </Link>
          )}

          <ul className="lately_post_list">
            {recentPost && recentPost.length > 0 ? (
              recentPost.map((item: any) => (
                <li key={item.postId}>
                  <Link to={`/recommend/${getMultiplexBrandSafe(item.multiplexId, item.multiplexName)}/${item.postId}`}>
                    <span>{item.screenName}</span>
                    <p>{item.seatName ?? (`${item.rowName ?? ''}${item.colName ?? ''}`.trim() || `${item.multiplexName} ${item.cinemaName}`)}</p>
                    <i>{item.content}</i>
                  </Link>
                </li>
              ))
            ) : (
              <li onClick={handleRecommendClick}>
                <a href="#">
                  <span>좌석 추천</span>
                  <p>추천이 아직 비어있어요</p>
                  <i>첫 번째 추천을 남겨주세요</i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="os_movie_pick">
        <div className="mp_title">
          <WeekString />
          <h2>오늘의 무비픽</h2>
          <p>Today&apos;s Movie Pick</p>
          <i>오늘의 극장가 예매 순위를<br />한눈에 확인해보세요</i>
          <b>영화진흥위원회의 총 합산 순위로 알려드립니다</b>
        </div>

        <div className="mp_mask">
          <div className="mp_list_wrap embla__viewport" ref={movieWrapRef}>
            <ul className="mp_list clear embla__container" style={{ display: 'flex', padding: 0, margin: 0 }}>
              {loading ? (
                <li className="embla__slide rank">
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

                        <div className="info_box">
                          <p>{item.movieNm}</p>

                          <div className="meta_row">
                            <ul className="rate_list">
                              <li><span>개봉일</span>{item.openDt}</li>
                              <li><span>누적관객수</span>{formatNumberWithComma(item.audiAcc)}</li>
                            </ul>

                            <span className={gradeItem.gradeClass}>{gradeItem.name}</span>
                          </div>
                        </div>
                      </div>

                      <img src={item.posterUrl} alt={item.movieNm} />
                    </li>
                  );
                })
              ) : (
                <li>데이터가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="os_square_event_wrap">
        <div className="os_cine_square">
          <div className="square_title">
            <h2>씨네광장</h2>
            <p>Cine Square</p>
            <i>지금, 다들 무슨 이야기를 하고 있을까?<br />실시간 인기 글을 확인해보세요</i>

            <div className="square_button_wrap">
              <a
                href="#"
                className={`square_before ${active === 'prev' ? 'on' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePrev();
                }}
              >
                <i className="blind">이전</i>
              </a>
              <a
                href="#"
                className={`square_after ${active === 'next' ? 'on' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                <i className="blind">다음</i>
              </a>
            </div>
          </div>

          <div className="square_mask">
            <div className="square_latest_list_wrap" ref={listWrapRef}>
              <ul className="square_latest_list clear">
                {cineSquareList && cineSquareList.length > 0 ? (
                  cineSquareList.map((item: any, index: number) => (
                    <li key={`cine-${index}`}>
                      <Link to={`/cinesquare/${item.postId}`} className="inner">
                        <span className="category">{item.categoryName}</span>
                        <b className="more_button"><i className="blind">더보기</i></b>
                        <p className="post_title">{item.title}</p>
                        <i className="date">{item.createdAt ? item.createdAt.split("T")[0].replace(/-/g, ".") : ""}</i>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link to="/cinesquare/list" className="inner">
                      <span className="category">게시글 등록하러가기</span>
                      <b className="more_button"><i className="blind">더보기</i></b>
                      <p className="post_title">게시글이 없습니다. <br />지금 등록해보세요!</p>
                      <i className="date"></i>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="os_event">
          <div className="inner">
            <div className="event_title">
              <h2>이벤트</h2>
              <p>Event</p>
              <i>오싵러들을 위해 준비한 다양한 이벤트<br />지금 바로 확인해보세요</i>
            </div>

            <ul className="os_m_event_list clear">
              {event && event.length > 0 ? (
                event.map((item: any, index: number) => (
                  <li key={`event-${index}`}>
                    <Link to={`/event/${item.eventId}`}>
                      {item.file && (
                        <FilePreview
                          key={item.file.fileId}
                          file={item.file}
                          previewType="ALL"
                        />
                      )}

                      <div className="inner">
                        <i>{CATEGORY_LABEL[item.categoryId] ?? ''}</i>
                        <p>{item.title}</p>
                        <span>{formatDateDot(item.startDt)}<br />~ {formatDateDot(item.endDt)}</span>
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
