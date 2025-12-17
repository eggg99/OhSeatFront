import { useEffect, useState, useRef } from "react"
import { userStore } from "@/store/userStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEventAnnouncementItem, deleteEventAnnouncement } from '@/apis/api/eventAnn'
import { CATEGORY_LABEL, AnnouncementDataDetail } from '@/types/EventAnn'

export default function EventAnnouncementDetail () {
    const navigate = useNavigate();
    const userId = userStore((state) => state.userId);  // 유저아이디
    const isLogin = userStore((state) => state.isLogin);
    const { eventId } = useParams<{ eventId: string }>();
    const [isMenuOn, setMenuOn] = useState(false);

    const [detailValue, setDetailValue] = useState<AnnouncementDataDetail>({
        eventId : 0,
        categoryId : 0,
        title : '',
        createdAtDate: '', // 날짜
        createdAtTime: '', // 시간
        content : '',
        likeCount:0,
        liked : false,
        prevSeq : 0,
        nextSeq : 0,
        views : 0
    });

    useEffect(() => {
        if (!eventId) return;
        const exec = async () => {
            await getData();
        };
        exec();
    }, [eventId]);

    const getData = async () => {
        try {
            const response = await getEventAnnouncementItem(eventId);
            const dateObj = new Date(response.createdAt);
            const date = dateObj.toISOString().slice(0, 10).replace(/-/g, "."); // YYYY.MM.DD
            const time = dateObj.toTimeString().slice(0, 5); // HH:mm

            setDetailValue({
                ...response,
                createdAtDate: date,
                createdAtTime: time,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // 수정 / 삭제 메뉴 버튼 클릭
    const handleInnerToggle = () => {
        setMenuOn((prev) => !prev);
    };

    const handleDelete = async () => {
        const result = confirm("삭제하시겠습니까?");
        if (result) {
            const response = await deleteEventAnnouncement(eventId);
            alert(response);
            navigate(`/event/announcement/browse`);
        }
    }

    const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked; // 체크 여부 (true / false)

        try {
            // 좋아요 추가하는 함수 필요함
        } catch (error) {
            console.error("좋아요 처리 실패", error);
        }
    }

    const moveToPost = (eventId:number, flag:string) => {
        if(!eventId){
            if(flag === 'bef') {
                alert('이전글이 존재하지 않습니다.');
                return false;
            }
            else if(flag === 'aft') {
                alert('다음글이 존재하지 않습니다.');
                return false;
            }
        }
        navigate(`/event/announcement/${eventId}`);
    }

    return (
        <div className="os_sub_contents">
                <div className="os_sub_navigation clear">
                    <h1>이벤트 당첨발표</h1>

                    <ul className="breadcrumbs_list clear">
                        <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                        <li><Link to="/event/browse">이벤트</Link></li>
                        <li><Link to="/event/announcement/browse">이벤트 당첨발표</Link></li>
                    </ul>
                </div>

                <div className="theater_total_board_wrap">
                    <div className="post_button_wrap clear">
                        <div className="left"></div>

                        <div className="right">
                            <a
                              href="#"
                              className="post_button before"
                              onClick={(e) => {
                                  e.preventDefault();
                                  moveToPost(detailValue?.prevSeq, 'bef')
                              }}>이전글</a>
                            <a
                              href="#"
                              className="post_button after"
                              onClick={(e) => {
                                  e.preventDefault();
                                  moveToPost(detailValue?.nextSeq, 'aft')
                              }}>다음글</a>
                            <Link to={`/event/announcement/browse`} className="post_button">목록</Link>
                        </div>
                    </div>

                    <div className="theater_detail_board_wrap">
                        <div className="detail_header">
                            <Link
                              to={`/event/announcement/browse?category=${detailValue?.categoryId}`}
                              className="category_go_button">
                                {CATEGORY_LABEL[detailValue.categoryId] ?? '기타'}
                            </Link>

                            <h3>{detailValue?.title}</h3>

                            <div className="post_user_wrap">
                                <p>관리자</p>
                                <span>
                                    {detailValue.createdAtDate} <i>{detailValue.createdAtTime}</i>
                                </span>
                            </div>

                            <div className="post_control_wrap clear">
                                <a href="#" className="post_hits_button">조회수 <span>{detailValue?.views}</span></a>
                                {/*TODO : 유저타입 admin일 때에만 열기*/}
                                {isLogin && (
                                  <a
                                    href="#"
                                    className={`post_setting_button ${isMenuOn ? "on" : ""}`}
                                    onClick={handleInnerToggle}
                                  >
                                      <span className="blind">더보기</span>
                                  </a>
                                )}

                                <div className="post_setting_wrap">
                                    <ul className="post_setting_list">
                                        <li><a onClick={handleDelete} className="cursor-pointer">게시글 삭제</a></li>
                                        <li><Link to={`/event/announcement/edit/${eventId}`}>게시글 수정</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="detail_contents">
                            <pre>{detailValue?.content}</pre>
                        </div>

                        <div className="detail_footer">
                            <div className="post_reaction_wrap clear">
                                <div className="post_like_button">
                                    <input
                                      type="checkbox"
                                      id="like"
                                      hidden
                                      checked={detailValue.liked}
                                      onChange={handleLike}
                                    />
                                    <label htmlFor="like" className="like-btn">
                                        좋아요 <span>{detailValue?.likeCount}</span></label>
                                </div>
                                <a href="#" className="post_hits_button">조회수 <span>{detailValue?.views}</span></a>
                            </div>
                        </div>
                    </div>                    

                    <div className="post_button_wrap clear">
                        <div className="left">
                            {isLogin && <Link to={`/event/announcement/reg`} className="post_button write">글쓰기</Link>}
                        </div>

                        <div className="right">
                            <Link to={`/event/announcement/browse`} className="post_button">목록</Link>
                            <a href="#" className="post_button top">TOP</a>                            
                        </div>
                    </div>                    
                </div>
            </div>
    )
}