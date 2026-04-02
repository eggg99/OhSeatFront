import { deleteCineSquare,deleteCineSquareAdmin, getCineSqaureItem, getCommentList, postComment, deleteComment, likeCineSquare, patchComment} from "@/apis/api/cinesquare";
import { CineSquareData } from "@/types/CineSquare";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userStore } from "@/store/userStore";
import { FilePreview } from "@/components/common/file/FilePreview";

interface Comment {
    commentId: number;
    content: string;
    commenterId : string;
    authorNickname: string;
    createdAt: string;
    updatedAt: string;
}

export default function CineSquareDetail(){
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>(); 
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);

    const [comment, setComment] = useState("");
    const [commentList, setcommentList] = useState<Comment[]>([]);

    const [detailValue, setDetailValue] = useState<CineSquareData>();
    const hasViewed = useRef(false);
    const [isMenuOn, setMenuOn] = useState(false);

    // 목록으로
    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }

    const handleViews = async () => {
        // 로그인한 유저만 조회수 증가 가능 => 민정이한테 만들어달라하기
        if(userId){
            // await postIncrementViews(postId);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if(postId && !hasViewed.current) {
                hasViewed.current = true; // 한 번만 실행되도록 막음
                await getData();
                await getDataComment();
            }
        };
        fetchData();
    }, [postId]);

    // 게시글 내용 불러오기
    const getData = async () => {
        try {
            const response = await getCineSqaureItem(postId);

            const dateObj = new Date(response.createdAt);
            const date = dateObj.toISOString().slice(0, 10).replace(/-/g, "."); // YYYY.MM.DD
            const time = dateObj.toTimeString().slice(0, 5); // HH:mm

            setDetailValue({
                ...response,
                createdAtDate: date,
                createdAtTime: time
            });
        } catch (error) {
            console.error(error);
        }
    }

    // 댓글 리스트 불러오기
    const getDataComment = async () => {
        try {
            const response = await getCommentList(postId);
            setcommentList(response);
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    }

    // 댓글 내용 change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };


    // 댓글 등록
    const handleSubmit = async () => {
        if (!comment.trim()) return;
        else if (!isLogin) {alert('로그인해주세요'); navigate(`/user/login`);return;}

        try {
            const param = {'content' : comment };
            const res = await postComment(postId, param);
            alert(res);
            setComment(""); // input 초기화
            await getData();     // 게시글 다시 불러오기 (commentCount 갱신)
            await getDataComment();     // 댓글 리스트 갱신
            
        } catch (error) {
            console.error("댓글 제출 실패", error);
        }
    };

    // 게시글 삭제
    const handleDelete = async() => {
        const result = confirm("삭제하시겠습니까?");
        try {
            if(result){
                const response = await deleteCineSquare(postId);
                alert(response);
                list();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 관리자 게시글 삭제
    const handleDeleteAdmin = async() => {
        const result = confirm("관리자 권한으로 삭제하시겠습니까?");
        try {
            if(result){
                const response = await deleteCineSquare(postId);
                alert(response);
                list();
            }
        } catch (error) {
            console.error(error);
        }
    }


    // 댓글 삭제
    const handleDeleteComment = async(commentId:number) => {
        const result = confirm("삭제하시겠습니까?");
        if(result){
            const response = await deleteComment(commentId);
            alert(response);
            await getData();            // 게시글 다시 불러오기 (commentCount 갱신)
            await getDataComment();     // 댓글 리스트 갱신
        }
    }

    // 좋아요 처리
    const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked; // 체크 여부 (true / false)

        try {
            await likeCineSquare(postId);

            setDetailValue((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    isLiked: isChecked,
                    likeCount: isChecked
                        ? (prev.likeCount ?? 0) + 1
                        : Math.max((prev.likeCount ?? 0) - 1, 0),
                };
            });
        } catch (error) {
            console.error("좋아요 처리 실패", error);
        }
    };

    // 수정 / 삭제 메뉴 버튼 클릭
    const handleInnerToggle = () => {
        setMenuOn((prev) => !prev);
    };

    // 댓글 수정
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    // 댓글 수정 함수
    const handleEditComplete = async (commentId:number) => {
        if (!editContent.trim()) return;
        else if (!isLogin) {alert('로그인해주세요'); navigate(`/user/login`);return;}

        try {
            const param = {'content' : editContent };
            const res = await patchComment(commentId, param);
            alert(res);

            setEditingCommentId(null);
            await getDataComment();     // 댓글 리스트 갱신
        } catch (error) {
            console.error(error);
        }
    }
    

    return(
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <a onClick={list} className="go_before_button cursor-pointer">목록으로 돌아가기</a>

                    <h3>씨네광장 소식</h3>
                    {isLogin && isAdmin &&
                      <div className="os_freetalk_right_wrap">
                          <a
                            href="#"
                            className="post_button del"
                            onClick={() => handleDeleteAdmin()}
                          >삭제</a>
                      </div>
                    }
                </div>

                <div className="theater_detail_board_wrap2">
                    <div className="detail_header">
                        <a href="#" className="category_go_button">{detailValue?.categoryName}</a>

                        <h3>{detailValue?.title}</h3>

                        <div className="post_user_wrap">
                            <p>{detailValue?.authorNickname}</p>
                            <span>{detailValue?.createdAtDate} <i>{detailValue?.createdAtTime}</i></span>

                            <span>{detailValue?.city} {detailValue?.district}</span>
                        </div>

                        <div className="post_control_wrap clear">
                            <a href="#" className="post_hits_button">조회수
                                <span>{detailValue?.views ?? 0}</span>
                            </a>

                            <a href="#" className="post_comment_button">댓글
                                <span>{detailValue?.commentCount ?? 0}</span>
                            </a>

                            {isLogin && detailValue?.authorId == userId && (
                              <a href="#" className={`post_setting_button ${isMenuOn ? "on" : ""}`}
                                 onClick={handleInnerToggle}>
                                  <span className="blind">더보기</span>
                              </a>
                            )}

                            <div className="post_setting_wrap">
                                {detailValue?.authorId == userId &&
                                  <ul className="post_setting_list">
                                      <li><a onClick={handleDelete} className="cursor-pointer">게시글 삭제</a></li>
                                      <li><Link to={`/cinesquare/edit/${postId}`}>게시글 수정</Link></li>
                                  </ul>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="detail_contents">
                        <pre>
                            {detailValue?.content}

                            {detailValue?.files?.length ? (
                              // 대표 이미지가 먼저 오도록 정렬
                              [...detailValue.files]
                                .sort((a, b) => {
                                    if (a.isRepresentative === 'Y') return -1;
                                    if (b.isRepresentative === 'Y') return 1;
                                    return 0;
                                })
                                .map((file) => (
                                  <FilePreview
                                    key={file.fileId} // key 추가
                                    file={file}
                                    previewType="ALL"
                                  />
                                ))
                            ) : null}
                        </pre>
                    </div>

                    <div className="detail_footer">
                        <div className="post_reaction_wrap clear">
                            <div className="post_like_button">
                                <input
                                  type="checkbox"
                                  id="like"
                                  hidden
                                  checked={detailValue?.isLiked}
                                  onChange={handleLike}
                                />
                                <label htmlFor="like" className="like-btn">
                                    좋아요 <span>{detailValue?.likeCount ?? 0}</span>
                                </label>
                            </div>
                            <a href="#" className="post_hits_button">조회수 <span>{detailValue?.views}</span></a>
                            <a href="#" className="post_comment_button">댓글 <span>{detailValue?.commentCount}</span></a>
                        </div>

                        <div className="post_comment_wrap" id="comment">
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
                                                  <span>
                                                            {c.createdAt
                                                              ? c.createdAt.replace("T", " ")
                                                                .substring(0, 16)
                                                                .replace(/-/g, ".")
                                                              : ""
                                                            }
                                                      {c.updatedAt && <i>수정됨</i>}
                                                        </span>
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
                                                  <p className='pre-line'>{c.content}</p>
                                                  <span>
                                                            {c.createdAt
                                                              ? c.createdAt.replace("T", " ")
                                                                .substring(0, 16)
                                                                .replace(/-/g, ".")
                                                              : ""
                                                            }
                                                      {c.updatedAt && <i>수정됨</i>}
                                                        </span>
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

                <div className="post_button_wrap2 clear">
                    <div className="left">
                        <Link
                          to="/cinesquare/reg"
                          className="post_button write"
                        >글쓰기</Link>
                    </div>

                    <div className="right">
                        {isLogin && isAdmin &&
                            <Link
                              to="/cinesquare/reg"
                              className="post_button del"
                            >삭제</Link>
                        }

                        <Link
                          to="/cinesquare/reg"
                          className="post_button"
                        >목록</Link>

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