import { getEventItem,postLikeEvent,deleteEvent, postUnlikeEvent } from "@/apis/api/event";
import { userStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import type {EventDataDetail} from "@/types/Event";
import {CATEGORY_LABEL} from "@/types/EventAnn";
import { FilePreview } from "@/components/common/file/FilePreview";

export default function EventDetail () {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const userId = userStore((state) => state.userId);  // 유저아이디
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);

    const [detail, setDetail] = useState<EventDataDetail>({
        eventId: 0,
        categoryId: 0,
        authorId: 0,
        title: '',
        annCount: 0,
        startDt: '',
        endDt: '',
        views: 0,
        likeCount: 0,
        liked: false,
        prevSeq: 0,
        nextSeq: 0,
        end: false,
        files : [],
    });
    const [isMenuOn, setMenuOn] = useState(false);

    const hasViewed = useRef(false);

    useEffect(() => {
        if (!id) return;
        const exec = async () => {
            await getData();
        }
        exec();
    }, [id]);

    // 게시글 내용 불러오기
    const getData = async () => {
        try {
            const response = await getEventItem(id);
            setDetail(response);
        } catch (error) {
            console.error(error);
        }
    }

    // 수정 / 삭제 메뉴 버튼 클릭
    const handleInnerToggle = () => {
        setMenuOn((prev) => !prev);
    };

    // 게시글 삭제
    const handleDelete = async () => {
        const result = confirm("삭제하시겠습니까?");
        if(result){
            const response = await deleteEvent(id, {});
            alert("삭제되었습니다");
            navigate('/event/browse');
        }
    }

    // 게시글 좋아요
    // postLikeEvent
    // postUnlikeEvent
    const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked; // 체크 여부 (true / false)
        try {
            if(isChecked) {
                const response = await postLikeEvent(id, {});

                setDetail((prev) => ({
                    ...prev,
                    liked: isChecked,
                    likeCount: prev.likeCount + 1
                }))
            } else {
                const response = await postUnlikeEvent(id, {});

                setDetail((prev) => ({
                    ...prev,
                    liked: isChecked,
                    likeCount: Math.max(prev.likeCount - 1, 0)
                }))
            }
        } catch (error) {
            console.error("좋아요 처리 실패", error);
        }
    }

    const contentFiles =
      detail.files?.filter(file => file.fileRole === 'CONTENT') ?? [];
    return (
        <div className="os_sub_contents">
            <div className="os_sub_navigation clear">
                <h1>이벤트 둘러보기</h1>

                <ul className="breadcrumbs_list clear">
                    <li className="home"><Link to="/"><i className="blind">홈</i></Link></li>
                    <li><Link to="/event/browse">이벤트</Link></li>
                    <li><Link to="/event/browse">이벤트 둘러보기</Link></li>
                </ul>
            </div>

                <div className="theater_total_board_wrap">
                    <div className="post_button_wrap clear">
                        <div className="left"></div>

                        <div className="right">
                            {detail.prevSeq ? (
                              <Link
                                to={`/event/${detail.prevSeq}`}
                                className="post_button before cursor-pointer"
                              >
                                  이전글
                              </Link>
                            ) : (
                              <span className="post_button before cursor-pointer">이전글</span>
                            )}
                            {detail.nextSeq ? (
                              <Link
                                to={`/event/${detail.nextSeq}`}
                                className="post_button after cursor-pointer"
                              >
                                  다음글
                              </Link>
                            ) : (
                              <span className="post_button before after cursor-pointer">다음글</span>
                            )}
                            <Link to="/event/browse" className="post_button cursor-pointer">목록</Link>
                        </div>
                    </div>

                    <div className="theater_detail_board_wrap">
                        <div className="detail_header">
                            {/* 지금은 시사회를 넣어놨지만 예매권으로도 쓰임 해당 버튼을 누를 시 시사회라고 한다면 시사회 이벤트들만 필터링되어 있는 이벤트 목록 화면으로 */}
                            <a href="#" className="category_go_button">{CATEGORY_LABEL[detail.categoryId]}</a>

                            <h3>{detail.title}</h3>

                            <div className="event_overview_wrap">
                                <ul className="event_overview_list clear">
                                    <li className="date"><p>{detail.startDt} ~ {detail.endDt}</p></li>
                                    <li className="draw"><span>당첨인원 <i>{detail.annCount}명</i></span></li>
                                    <li className="state">
                                        {detail.end
                                          ? <i className="closed">종료</i>
                                          : <i className="on_going">진행중</i>
                                        }
                                    </li>
                                </ul>
                            </div>

                            <div className="post_control_wrap clear">
                                <a href="#" className="post_hits_button">조회수 <span>{detail.views}</span></a>
                                {isLogin && detail.authorId == userId && (
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
                                        <li><Link to={`/event/edit/${id}`} className="cursor-pointer">게시글 수정</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="detail_contents">
                            <pre>
                                {contentFiles.length > 0 && (
                                  <FilePreview
                                    key={contentFiles[0].fileId}
                                    file={contentFiles[0]}
                                    previewType="ALL"
                                  />
                                )}
                            </pre>
                        </div>

                        <div className="detail_footer">
                            <div className="post_reaction_wrap clear">
                                <div className="post_like_button">
                                    <input
                                      type="checkbox"
                                      id="like"
                                      hidden
                                      checked={detail?.liked}
                                      onChange={handleLike}
                                    />
                                    <label htmlFor="like" className="like-btn">
                                        좋아요 <span>{detail.likeCount ?? 0}</span>
                                    </label>
                                </div>
                                <a href="#" className="post_hits_button">조회수 <span>{detail.views}</span></a>
                            </div>
                        </div>
                    </div>                    

                    <div className="post_button_wrap clear">
                        <div className="left">
                            <Link to={`/event/reg`} className="post_button write">글쓰기</Link>
                        </div>

                        <div className="right">
                            <Link to="/event/browse" className="post_button">목록</Link>
                            <a
                              href="#"
                              className="post_button top"
                              onClick={(e) => {
                                  e.preventDefault();
                                  window.scrollTo({
                                      top: 0,
                                      behavior: 'smooth',
                                  });
                              }}
                            >TOP</a>
                        </div>
                    </div>                    
                </div>
            </div>
    )
}