import "@/styles/css/sub.scss";
import { deletePost, getCommentList, getPostDetail, postComment, deleteComment, postIncrementViews, updatePostLike } from "@/apis/api/recommend"
import { useEffect, useState, useRef } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import { userStore } from "@/store/userStore";
import { Link, useNavigate } from "react-router-dom";
import { MULTIPLEX_LIST } from "@/constants/multiplex";

interface PostDetail {
    postId: number;
    title: string;
    content: string;
    authorId : string;
    authorNickname: string;
    views: number;
    createdAt: string;
    createdAtDate?: string; // 날짜
    createdAtTime?: string; // 시간
    commentCount: number;
    likeCount:number;
    liked : boolean;
    cinemaName : string;
    cinemaAddr : string;
    multiplexId : number;
    prevId : number;
    nextId : number;
}

interface Comment {
  commentId: number;
  content: string;
  commenterId : string;
  authorNickname: string;
  createdAt: string;
}

export default function PostDetail(){
    const navigate = useNavigate();
    const { brand } = useParams<{ brand: string }>();
    const { postId } = useParams<{ postId: string }>(); 
    const userId = userStore((state) => state.userId);  // 유저아이디
    const isLogin = userStore((state) => state.isLogin);

    const [comment, setComment] = useState("");
    const [commentList, setcommentList] = useState<Comment[]>([]);

    const [isMenuOn, setMenuOn] = useState(false);
    
    const [detailValue, setDetailValue] = useState<PostDetail>({
        postId: 0,
        title: '',
        content: '',
        authorId: '',
        authorNickname: '',
        views: 0,
        createdAt: '-', 
        commentCount: 0,
        likeCount: 0,
        liked: false,
        cinemaName: '',
        cinemaAddr: '',
        multiplexId : 0,
        prevId : 0,
        nextId : 0,
    });

    const hasViewed = useRef(false);

    // 조회수 증가: postId 바뀌었을 때 1번만
    useEffect(() => {
        if (!postId) return;

        const exec = async () => {
            if (!hasViewed.current && userId) {
                hasViewed.current = true;
                await postIncrementViews(postId);
            }
        };

        exec();
    }, [postId, userId]);

    useEffect(() => {
        if (!postId) return;
        const exec = async () => {
            await getData();
            await getDataComment();
        };
        exec();
    }, [postId]);

    // ✅ multiplexId를 label로 변환
    const getMultiplexLabel = (multiplexId: number) =>
        MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

    const formatDateTime = (dateTime: string) => {
        const [date, time] = dateTime.split(" ");
        return {
            date,
            time: time?.slice(0, 5) ?? "",
        };
    };


    // 게시글 내용 불러오기
    const getData = async () => {
        try {
            const response = await getPostDetail(postId);
            const { date, time } = formatDateTime(response.createdAt);

            setDetailValue({
                ...response,
                createdAtDate: date,
                createdAtTime: time,
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getDataComment = async () => {
        try {
            const response = await getCommentList(postId); // 새로운 API
            setcommentList(response);
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    };

    // 댓글 내용 change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        else if (!isLogin) {alert('로그인해주세요'); navigate(`/user/login`);return;}

        try {
            await postComment(comment, postId, userId);
            setComment(""); // input 초기화
            await getData();     // 게시글 다시 불러오기 (commentCount 갱신)
            await getDataComment(); // 댓글 리스트 갱신
        } catch (error) {
            console.error("댓글 제출 실패", error);
        }
    };

    const handleDelete = async () => {
        const result = confirm("삭제하시겠습니까?");
        if(result){
            const response = await deletePost(detailValue.postId);
            alert(response);
            navigate(`/recommend/${brand}`);
        }
    }

    const handleDeleteComment = async(commentId:number) => {
        const result = confirm("삭제하시겠습니까?");
        if(result){
            const response = await deleteComment(commentId);
            alert(response);
            await getData();     // 게시글 다시 불러오기 (commentCount 갱신)
            await getDataComment(); // 댓글 리스트 갱신
        }
    }

    const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked; // 체크 여부 (true / false)

        try {
            const response = await updatePostLike(postId);

            setDetailValue((prev) => ({
                ...prev,
                liked: isChecked,
                likeCount: isChecked
                    ? prev.likeCount + 1
                    : Math.max(prev.likeCount - 1, 0),
            }));
        } catch (error) {
            console.error("좋아요 처리 실패", error);
        }
    };

    // 수정 / 삭제 메뉴 버튼 클릭
    const handleInnerToggle = () => {
        setMenuOn((prev) => !prev);
    };

    const moveToPost = (postId:number, flag:string) => {
        if(!postId){
            if(flag === 'bef') {
                alert('이전글이 존재하지 않습니다.'); 
                return false;
            }
            else if(flag === 'aft') {
                alert('다음글이 존재하지 않습니다.'); 
                return false;
            }
        }
        navigate(`/recommend/${brand}/${postId}`);
    }

    // 댓글 수정
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    // 댓글 수정 함수
    const handleEditComplete = (id:number) => {
        // TODO : 댓글 아이디를 넣어서 수정 api 만들어야함
        alert('준비중입니다!');
    }



    return (
        <div className="os_sub_contents">
            <div className="os_branch_info_wrap">
                <div className="info_banner theater3">
                    <h2>{getMultiplexLabel(detailValue?.multiplexId)} {detailValue?.cinemaName}점</h2>
                    <p>{detailValue?.cinemaAddr}</p>
                </div>
            </div>

            <div className="theater_total_board_wrap">
                <div className="post_button_wrap clear">
                    <div className="right">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                moveToPost(detailValue?.prevId, 'bef');
                                }} className="post_button before">이전글</a>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                moveToPost(detailValue?.nextId, 'aft');
                            }} className="post_button after">다음글</a>
                        <Link to={`/recommend/${brand}`} className="post_button">목록</Link>
                    </div>
                </div>

                <div className="theater_detail_board_wrap">
                    <div className="detail_header">
                        <h3>{detailValue?.title}</h3>

                        <div className="post_user_wrap">
                            <p>{detailValue?.authorNickname}</p>
                            <span>
                                {detailValue.createdAtDate} <i>{detailValue.createdAtTime}</i>
                            </span>
                        </div>

                        <div className="post_control_wrap clear">
                            <a href="#" className="post_hits_button">조회수 <span>{detailValue.views}</span></a>
                            <a href="#" className="post_comment_button">댓글 <span>{detailValue.commentCount}</span></a>

                            {isLogin && detailValue.authorId == userId && (
                                <a href="#" className={`post_setting_button ${isMenuOn ? "on" : ""}`} onClick={handleInnerToggle}>
                                    <span className="blind">더보기</span>
                                </a>
                            )}

                            <div className="post_setting_wrap">
                                {detailValue.authorId == userId &&
                                    <ul className="post_setting_list">
                                        <li><a onClick={handleDelete} className="cursor-pointer">게시글 삭제</a></li>
                                        <li><Link to={`/recommend/${brand}/edit/${postId}`}>게시글 수정</Link></li>
                                    </ul>
                                }
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
                                    좋아요 <span>{detailValue.likeCount}</span>
                                </label>
                            </div>
                            <a href="#" className="post_hits_button">조회수 <span>{detailValue.views}</span></a>
                            <a href="#" className="post_comment_button">댓글 <span>{detailValue.commentCount}</span></a>
                        </div>

                        <div className="post_comment_wrap">
                            {commentList.length > 0 && (
                                <ul className="post_comment_list">
                                    {commentList.length > 0 && commentList.map((c) => {
                                        const isEditing = editingCommentId === c.commentId;
                                        return (
                                            <li key={c.commentId}>
                                                {isEditing ? (
                                                    <>
                                                        <h4>{c.authorNickname}</h4>
                                                        <div className="comment_edit_wrap">
                                                        <textarea
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                        ></textarea>
                                                            <div className="comment_edit_button_wrap clear">
                                                                <button
                                                                    className="cancel"
                                                                    onClick={() => setEditingCommentId(null)}
                                                                >취소
                                                                </button>
                                                                <button
                                                                    className="complete"
                                                                    onClick={() => handleEditComplete(c.commentId)}
                                                                >등록
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <span>{c.createdAt} <i>수정됨</i></span>
                                                        <div className="comment_control_wrap clear">
                                                            <button disabled>수정</button>
                                                            {c.commenterId == userId && (
                                                                <button
                                                                    onClick={() => handleDeleteComment(c.commentId)}>
                                                                    삭제
                                                                </button>
                                                            )}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h4>{c.authorNickname}</h4>
                                                        <p>{c.content}</p>
                                                        <span>{c.createdAt} <i>수정됨</i></span>
                                                        <div className="comment_control_wrap clear">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingCommentId(c.commentId);
                                                                    setEditContent(c.content);
                                                                }}
                                                            >수정
                                                            </button>
                                                            {c.commenterId == userId && (
                                                                <button
                                                                    onClick={() => handleDeleteComment(c.commentId)}
                                                                >삭제</button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            <div className="comment_write_area">
                                <textarea
                                    id="user-comment"
                                    placeholder="댓글을 남겨보세요"
                                    value={comment}
                                    onChange={handleChange}></textarea>
                                <div className="register_wrap clear">
                                    <a className="post_button comment" onClick={handleSubmit} href="#">등록</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="post_button_wrap clear">
                    <div className="left">
                        <Link to={`/recommend/${brand}/reg`} className="post_button write">글쓰기</Link>
                    </div>

                    <div className="right">
                        <Link to={`/recommend/${brand}`} className="post_button">목록</Link>
                        <a href="#" className="post_button top">TOP</a>                            
                    </div>
                </div>
            </div>
        </div>
    )
}