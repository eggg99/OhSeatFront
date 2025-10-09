import { deletePost, getCommentList, getPostDetail, putComment, deleteComment, postIncrementViews, updatePostLike } from "@/apis/api/recommend"
import { useEffect, useState, useRef } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { userStore } from "@/store/userStore";
import { Link, useNavigate } from "react-router-dom";

interface PostDetail {
    postId: number;
    title: string;
    content: string;
    authorId : string;
    authorNickname: string;
    views: number;
    createdAt: string; // Date 타입
    commentCount: number;
    likeCount:number;
    liked : boolean;
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
    });
    
    const hasViewed = useRef(false);

    const handleViews = async () => {
        // 로그인한 유저만 조회수 증가 가능
        if(userId){
            await postIncrementViews(postId);
        }
    }

    useEffect(() => {
        if (postId && !hasViewed.current) {
            hasViewed.current = true; // ✅ 한 번만 실행되도록 막음
            getData();
            getDataComment();
            handleViews();
        }
    }, [postId]);


    const getData = async () => {
        try {
            const response = await getPostDetail(postId);
            console.log(response)
            setDetailValue(response);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        else if (!isLogin) {alert('로그인해주세요'); navigate(`/user/login`);return;}

        try {
            await putComment(comment, postId, userId);
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

    const handleLike = async () => {
    try {
        const response = await updatePostLike(postId);

        // response = { Liked: true or false }
        setDetailValue((prev) => ({
            ...prev,
            liked: response.Liked, // ✅ liked 값 업데이트
            likeCount: response.Liked 
                ? prev.likeCount + 1 
                : Math.max(prev.likeCount - 1, 0), // 좋아요 수 증감 처리
        }));
    } catch (error) {
        console.error("좋아요 처리 실패", error);
    }
};

    return (
        <div className="detail-form shadow rounded-xl border bg-card flex flex-col">
            <div>
                <h2 className="text-2xl">{detailValue.title}</h2>
            </div>
            <div className="flex gap-3">
                <span>작성자</span>
                <span>{detailValue.authorNickname}</span>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <span>작성일자</span>
                    <span>{detailValue.createdAt}</span>
                </div>
                <div className="flex">
                    <div className="flex gap-3">
                        <span>댓글</span>
                        <span>{detailValue.commentCount}개</span>
                    </div>
                    <div className="flex gap-3 ml-3">
                        <span>조회수</span>
                        <span>{detailValue.views}회</span>
                    </div>
                    {detailValue.authorId === userId &&
                    <div className="ml-3">
                        <button><Link to={`/recommend/${brand}/edit/${postId}`}>수정</Link></button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                    }
                </div>
            </div>

            <div>
                {detailValue.content}
            </div>

            <div className="flex">
                <div className="flex gap-3">
                    <button onClick={handleLike} className="text-2xl">
                        {detailValue.liked ? "♥" : "♡"}
                    </button>
                    <span>좋아요</span>
                    <span>{detailValue.likeCount}개</span>
                </div>
                <div className="flex gap-3 ml-3">
                    <span>댓글</span>
                    <span>{detailValue.commentCount}개</span>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="font-bold">댓글</h3>
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
            </div>
            <div>
                <Input 
                    type="text"
                    value={comment}
                    onChange={handleChange}
                    placeholder="댓글을 작성해주세요"
                />
                <button onClick={handleSubmit}>
                    작성
                </button>
            </div>
            <div className="text-right">
                <Link to={`/recommend/${brand}`}>목록</Link>
            </div>
        </div>
    )
}