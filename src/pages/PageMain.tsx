import '@/styles/css/main.scss'
import { MULTIPLEX_LIST } from "@/constants/multiplex";
import { getTrendingCinema, top3Post } from "@/apis/api/recommend";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeekString from '@/components/common/WeekString';

interface Cinema {
    multiplexId: number;
    areaId: number;
    cinemaId: string;
    cinemaName: string;
    cinemaAddr: string;
    postCount: number;
    totalLike: number;
}
function PageMain(){
    const [topCinemas, setTopCinemas] = useState<Cinema>();
    const [recentPost, setRecentPost] = useState<any[]>([]);

    // 언급량 top1 조회
    const getData = async () => {
        try {
            const response: Cinema[] = await getTrendingCinema(); // Top 5 반환
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
                getMultiplexBrand(response.multiplexName);
                
            }
            setRecentPost(response);
        } catch (error) {
            console.error(error);
        }
    }

    // ✅ multiplexId를 label로 변환
    const getMultiplexLabel = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

    // ✅ label을 multiplex의 brand로 변환
    const getMultiplexBrand = (multiplexName: string): string | undefined => {
        return MULTIPLEX_LIST.find(item => item.label === multiplexName)?.brand;
    };

    // 마운트 될 때 데이터 가져오기
    useEffect(() => {
        getData();
        getTop3Post();
    }, []);

    return(
        <main className="os_main_contents">
            <div className="os_main_visual">
                <div className="mv_title">
                        <h1>지금 오싵에서 주목하는 영화관 좌석은?</h1>
                        <p>모두들 모여서 이야기하고 있는 좌석은 무슨 좌석일지 확인하기</p>
                        <Link to="/recommend/browse">더보기</Link>
                    </div>
                <div className="os_weekly_best_theater">
                    {topCinemas && (
                    <Link to="/" className="weekly_best">
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
                                <li>
                                    <Link to={`/recommend/${getMultiplexBrand(item.multiplexName)}/${item.postId}`}>
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

                        <div className="mp_list_wrap">
                            <ul className="mp_list clear">
                                <li className="rank1">
                                    <div className="inner">
                                        <i>1</i>
                                        <p>좀비딸</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89676_320.png"/>
                                </li>
                                <li className="rank2">
                                    <div className="inner">
                                        <i>2</i>
                                        <p>F1 더 무비</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89706_320.png"/>
                                </li>
                                <li className="rank3">
                                    <div className="inner">
                                        <i>3</i>
                                        <p>발레리나</p>
                                        <span className="grade4">19</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89701_320.png"/>
                                </li>
                                <li className="rank4">
                                    <div className="inner">
                                        <i>4</i>
                                        <p>강령: 귀신놀이</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89847_320.png"/>
                                </li>
                                <li className="rank5">
                                    <div className="inner">
                                        <i>5</i>
                                        <p>극장판 체인소 맨: 레제편</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>
                                    
                                    <img src="./img/30000103_320.png"/>
                                </li>
                                <li className="rank6">
                                    <div className="inner">
                                        <i>6</i>
                                        <p>말할 수 없는 비밀-마지막 챕터</p>
                                        <span className="grade1">전</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000373_320.png"/>
                                </li>
                                <li className="rank7">
                                    <div className="inner">
                                        <i>7</i>
                                        <p>F1 더 무비</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89706_320.png"/>
                                </li>
                                <li className="rank8">
                                    <div className="inner">
                                        <i>8</i>
                                        <p>발레리나</p>
                                        <span className="grade4">19</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89701_320.png"/>
                                </li>
                                <li className="rank9">
                                    <div className="inner">
                                        <i>9</i>
                                        <p>강령: 귀신놀이</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89847_320.png"/>
                                </li>
                                <li className="rank10">
                                    <div className="inner">
                                        <i>10</i>
                                        <p>극장판 체인소 맨: 레제편</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000103_320.png"/>
                                </li>
                            </ul>
                        </div>                         
                    </li>
                    <li>
                        <a href="#" className="theater2"><span>메가박스</span></a>

                        <div className="mp_list_wrap">
                            <ul className="mp_list clear">
                                <li className="rank1">
                                    <div className="inner">
                                        <i>1</i>
                                        <p>좀비딸</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89676_320.png"/>
                                </li>
                                <li className="rank2">
                                    <div className="inner">
                                        <i>2</i>
                                        <p>F1 더 무비</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89706_320.png"/>
                                </li>
                                <li className="rank3">
                                    <div className="inner">
                                        <i>3</i>
                                        <p>발레리나</p>
                                        <span className="grade4">19</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89701_320.png"/>
                                </li>
                                <li className="rank4">
                                    <div className="inner">
                                        <i>4</i>
                                        <p>강령: 귀신놀이</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89847_320.png"/>
                                </li>
                                <li className="rank5">
                                    <div className="inner">
                                        <i>5</i>
                                        <p>극장판 체인소 맨: 레제편</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000103_320.png"/>
                                </li>
                                <li className="rank6">
                                    <div className="inner">
                                        <i>6</i>
                                        <p>말할 수 없는 비밀-마지막 챕터</p>
                                        <span className="grade1">전</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000373_320.png"/>
                                </li>
                                <li className="rank7">
                                    <div className="inner">
                                        <i>7</i>
                                        <p>F1 더 무비</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89706_320.png"/>
                                </li>
                                <li className="rank8">
                                    <div className="inner">
                                        <i>8</i>
                                        <p>발레리나</p>
                                        <span className="grade4">19</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89701_320.png"/>
                                </li>
                                <li className="rank9">
                                    <div className="inner">
                                        <i>9</i>
                                        <p>강령: 귀신놀이</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89847_320.png"/>
                                </li>
                                <li className="rank10">
                                    <div className="inner">
                                        <i>10</i>
                                        <p>극장판 체인소 맨: 레제편</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000103_320.png"/>
                                </li>
                            </ul>
                        </div>                        
                    </li>
                    <li >
                        <a href="#" className="theater3"><span>롯데시네마</span></a>

                        <div className="mp_list_wrap">
                            <ul className="mp_list clear">
                                <li className="rank1">
                                    <div className="inner">
                                        <i>1</i>
                                        <p>좀비딸</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89676_320.png"/>
                                </li>
                                <li className="rank2">
                                    <div className="inner">
                                        <i>2</i>
                                        <p>F1 더 무비</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89706_320.png"/>
                                </li>
                                <li className="rank3">
                                    <div className="inner">
                                        <i>3</i>
                                        <p>발레리나</p>
                                        <span className="grade4">19</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89701_320.png"/>
                                </li>
                                <li className="rank4">
                                    <div className="inner">
                                        <i>4</i>
                                        <p>강령: 귀신놀이</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89847_320.png"/>
                                </li>
                                <li className="rank5">
                                    <div className="inner">
                                        <i>5</i>
                                        <p>극장판 체인소 맨: 레제편</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000103_320.png"/>
                                </li>
                                <li className="rank6">
                                    <div className="inner">
                                        <i>6</i>
                                        <p>말할 수 없는 비밀-마지막 챕터</p>
                                        <span className="grade1">전</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000373_320.png"/>
                                </li>
                                <li className="rank7">
                                    <div className="inner">
                                        <i>7</i>
                                        <p>F1 더 무비</p>
                                        <span className="grade2">12</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89706_320.png"/>
                                </li>
                                <li className="rank8">
                                    <div className="inner">
                                        <i>8</i>
                                        <p>발레리나</p>
                                        <span className="grade4">19</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89701_320.png"/>
                                </li>
                                <li className="rank9">
                                    <div className="inner">
                                        <i>9</i>
                                        <p>강령: 귀신놀이</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/89847_320.png"/>
                                </li>
                                <li className="rank10">
                                    <div className="inner">
                                        <i>10</i>
                                        <p>극장판 체인소 맨: 레제편</p>
                                        <span className="grade3">15</span>

                                        <ul className="rate_list">
                                            <li><span>예매율</span>19.7%</li>
                                            <li><span>누적율</span>237.5만</li>
                                        </ul>
                                    </div>

                                    <img src="./img/30000103_320.png"/>
                                </li>
                            </ul>
                        </div>                            
                    </li>
                </ul>
            </div>
            <div className="os_square_event_wrap">                    
                <div className="os_cine_square">
                    <div className="square_title">
                        <h2>씨네광장</h2>
                        <p>Today’s Movie Pick</p>
                        <i>지금 모두들 무슨 이야기를<br/>하고 있을까?</i>
                    </div>
                    <div className="square_latest_list_wrap">
                        <ul className="square_latest_list clear">
                            <li>
                                <div className="inner">
                                    <span className="category">자유수다</span>
                                    <a href="#" className="more_button"><i className="blind">더보기</i></a>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </div>
                            </li>
                            <li>
                                <div className="inner">
                                    <span className="category">자유수다</span>
                                    <a href="#" className="more_button"><i className="blind">더보기</i></a>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </div>
                            </li>
                            <li>
                                <div className="inner">
                                    <span className="category">자유수다</span>
                                    <a href="#" className="more_button"><i className="blind">더보기</i></a>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </div>
                            </li>
                            <li>
                                <div className="inner">
                                    <span className="category">자유수다</span>
                                    <a href="#" className="more_button"><i className="blind">더보기</i></a>
                                    <p className="post_title">다들 마지막으로 영화관에 가서 본 영화가 뭔가요?</p>
                                    <i className="date">2025.08.01</i>
                                </div>
                            </li>
                        </ul>
                    </div>   
                </div>
                <div className="os_event"></div>
            </div>
        </main>
    )
}

export default PageMain;