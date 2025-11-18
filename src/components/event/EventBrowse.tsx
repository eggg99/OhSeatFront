import { getEventList } from "@/apis/api/event";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

interface EventData {
    category : string;      // 카테고리
    title : string;         // 제목
    startDt : Date;         // 시작기간
    endDt : Date;           // 종료기간
    imgUrl : string;        // 이미지url
}

interface EventDataPage {
    content : EventData[];
    totalPages : number;
    totalElements : number;
    size : number;
    first : boolean;
    last : boolean;
}

export default function EventList () {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const [eventList, setEventList] = useState<EventDataPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    useEffect(() => {
        const fetchData = async () => {
            await getList();
        }
        fetchData();
    }, []);

    const handleSearch = () => {
        if (!searchValue.trim()) return; // 빈값 방지
        // 실제 검색 로직 (API 호출 등)을 여기에 추가
        console.log('검색 실행:', searchValue);

        getList();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 게시글 리스트 조회
    const getList = async () => {
        try {
            const param = { 'searchType' : searchType , 'searchValue' : searchValue}
            const response = await getEventList(param);
            if(!response) {
                console.log('게시글 조회 실패');
            }
            // console.log('게시글 조회 완료');
            // setEventList(response);
        } catch (error) {
            console.error('게시글 조회 실패' , error);
        }
    }
    
    return (
        <div className="os_sub_contents">
            <div className="os_sub_navigation clear">
                <h1>이벤트</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/event/browse">이벤트</Link></li>
                    <li><Link to={`/event/browse`}>이벤트 둘러보기</Link></li>
                </ul>
            </div>

            {/* 카테고리영역 */}
            <section className="os_board_category_wrap">
                <ul className="os_board_list clear">
                    <li className={category === '' ? 'on' : ''}>
                        <a href="#" onClick={() => setCategory('')}>전체</a>
                    </li>
                    <li className={category === '1' ? 'on' : ''}>
                        <a href="#" onClick={() => setCategory('1')}>시사회</a>
                    </li>
                    <li className={category === '2' ? 'on' : ''}>
                        <a href="#" onClick={() => setCategory('2')}>예매권</a>
                    </li>
                </ul>
            </section>
            {/* 카테고리영역 */}
            
            {/* 검색영역 */}
            <div className="os_search_wrap">
                <ul className="os_search_list">
                    <li>
                        <select>
                            <option onClick={() => setSearchType('')}>전체</option>
                            <option onClick={() => setSearchType('1')}>시사회</option>
                            <option onClick={() => setSearchType('2')}>예매권</option>
                        </select>
                    </li>
                    <li>
                        <input
                            type="text" value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="검색어를 입력하세요"/>
                    </li>
                    <li>
                        <button onClick={handleSearch}>검색</button>
                    </li>
                    <button><Link to="/event/reg">등록</Link></button>
                </ul>
            </div>
            {/* 검색영역 */}

            {/* 리스트영역 */}
            <div className="theater_total_board_wrap">
                <div className="board_control_wrap clear">
                    <p>25개의 글</p>

                    <div className="post_filter_wrap clear">
                        <select>
                            <option>추천순</option>
                            <option>최신순</option>
                        </select>

                        <select>
                            <option>10개씩</option>
                            <option>20개씩</option>
                        </select>
                    </div>
                </div>

                <div className="basic_board3_wrap">
                    <table className="basic_board3">
                        <colgroup>
                            <col style={{width: '25%'}}/>
                            <col style={{width: '25%'}}/>
                            <col style={{width: '25%'}}/>
                            <col style={{width: '25%'}}/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <td>
                                <a href="#" className="event_post_wrap">
                                    <div className="event_category">
                                        <i>예매권</i>
                                    </div>
                                    <img src="./img/20250820_1755670295287387288.png"/>
                                    <p>영화 "컨저링: 마지막 의식" 예매권 증정 이벤트</p>
                                    <span>2025.09.26 ~ 2025.10.01</span>
                                </a>
                            </td>
                            <td>
                                <a href="#" className="event_post_wrap">
                                    <div className="event_category">
                                        <i>예매권</i>
                                    </div>
                                    <img src="./img/20250820_1755670295287387288.png"/>
                                    <p>영화 "컨저링: 마지막 의식" 예매권 증정 이벤트</p>
                                    <span>2025.09.26 ~ 2025.10.01</span>
                                </a>
                            </td>
                            <td>
                                <Link to="/event/1">
                                    <span>카테고리 : </span>
                                    <span>이미지 : </span>
                                    <span>게시글제목 : </span>
                                    <span>기간 : </span>
                                </Link>
                            </td>
                        </tr>
                    </tbody>

                    </table>
                </div>



            </div>
        </div>
)
}