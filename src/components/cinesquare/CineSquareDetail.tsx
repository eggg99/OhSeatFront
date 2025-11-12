import { deleteCineSquare, getCineSqaureItem, getCommentList, postComment, deleteComment, likeCineSquare} from "@/apis/api/cinesquare";
import { CineSquareData } from "@/types/CineSquare";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userStore } from "@/store/userStore";
import { FileList } from "@/components/common/file/FileList";

interface Comment {
    commentId: number;
    content: string;
    commenterId : string;
    authorNickname: string;
    createdAt: string;
}

export default function CineSquareDetail(){
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>(); 
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);
    
    const [comment, setComment] = useState("");
    const [commentList, setcommentList] = useState<Comment[]>([]);

    const [detailValue, setDetailValue] = useState<CineSquareData>();
    const hasViewed = useRef(false);

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
            setDetailValue(response);
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };


    // 댓글 등록
    const handleSubmit = async () => {
        if (!comment.trim()) return;
        else if (!isLogin) {alert('로그인해주세요'); navigate(`/user/login`);return;}

        try {
            const param = {'content' : comment };
            await postComment(postId, param);
            setComment(""); // input 초기화
            await getData();     // 게시글 다시 불러오기 (commentCount 갱신)
            
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
    // const handleLike = async () => {
    //     try {
    //         const response = await likeCineSquare(postId);
    
    //         setDetailValue((prev) => ({
    //             ...prev,
    //             liked: response.Liked, // ✅ liked 값 업데이트
    //             likeCount: response.Liked 
    //                 ? prev.likeCount + 1 
    //                 : Math.max(prev.likeCount - 1, 0), // 좋아요 수 증감 처리
    //         }));
    //     } catch (error) {
    //         console.error("좋아요 처리 실패", error);
    //     }
    // };

    return(
        <div className="os_sub_contents">
            <div className="flex">
                <div><button onClick={list}>목록으로</button></div>
                <div><h2 className="text-2xl">씨네광장 소식</h2></div>
            </div>

            <div className="flex gap-3">
                <span>제목 : </span>
                <h2 className="text-2xl">{detailValue?.title}</h2>
            </div>

            <div className="flex gap-3">
                <span>카테고리 : </span>
                <span>{detailValue?.categoryName}</span>
            </div>

            <div className="flex gap-3">
                <span>작성자 : </span>
                <span>{detailValue?.authorNickname}</span>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <span>작성일자 : </span>
                    <span>{detailValue?.createdAt}</span>
                </div>
                <div className="flex">
                    <div className="flex gap-3 ml-3">
                        <span>조회수 : </span>
                        <span>{detailValue?.views}회</span>
                    </div>
                    <div className="ml-3">
                        <button><Link to={`/cinesquare/edit/${postId}`}>수정</Link></button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <span>작성위치 : </span>
                <span>{detailValue?.city} {detailValue?.district}</span>
            </div>

            <div>
                <span>작성내용 : </span>
                {detailValue?.content}
            </div>
            <div>
                <span>작성이미지 : </span>
                <FileList files={detailValue?.files ?? []} baseUrl="http://localhost:8000/" />
            </div>
            <div className="flex justify-between">
                <div>댓글 : ___개</div>
                <div>좋아요 : ___개</div>

                {/* <div>댓글 {detailValue?.commentCount} 개</div> */}
                {/* <div>좋아요 {detailValue?.likeCount}개</div> */}
            </div>
            
            {/* 댓글작성 */}
            <section>
                <div>
                    <input
                        type="text"
                        value={comment}
                        onChange={handleChange}
                        placeholder="댓글을 작성해주세요"
                    />
                    <button onClick={handleSubmit}>
                    작성
                </button>
                </div>
            </section>

            댓글 리스트
            <section>
                {commentList.length === 0 ? (
                    <p>아직 댓글이 없습니다.</p>
                ) : (
                    commentList.map((c) => (
                        <div key={c.commentId} className="border-b py-2">
                            <div className="flex justify-between">
                                <p>{c.content}</p>
                                { c.commenterId == userId && 
                                    <button onClick={() => handleDeleteComment(c.commentId)}>삭제</button>
                                }
                                
                            </div>
                            <small>{c.authorNickname} · {c.createdAt}</small>
                        </div>
                    ))
                )}
            </section>
            {/* <button onClick={handleLike} className="text-2xl">
                {detailValue.liked ? "♥" : "♡"}
            </button>
            <span>좋아요</span> */}

        </div>
    )
}