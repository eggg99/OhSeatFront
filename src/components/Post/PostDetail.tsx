import { getPostDetail, putComment } from "@/apis/api/recommend"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { userStore } from "@/store/userStore";

interface PostDetail {
    postId: number;
    title: string;
    content: string;
    authorNickname: string;
    views: number;
    createdAt: string; // Date 타입
    commentCount: number;
}

export default function PostDetail(){
     const userId = userStore((state) => state.userId);  // 유저아이디
    // useParams는 항상 객체 반환
    const { postId } = useParams<{ postId: string }>(); 
    const [comment, setComment] = useState("");
    
    const [detailValue, setDetailValue] = useState<PostDetail>({
        postId: 0,
        title: '',
        content: '',
        authorNickname: '',
        views: 0,
        createdAt: '-', // 초기값 null
        commentCount: 0,
    });

    useEffect(() => {
        if(postId) getData();
    }, [postId]);


    const getData = async () => {
        try {
            const response = await getPostDetail(postId);
            setDetailValue(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;

        try {
            await putComment(comment, postId, userId)
            setComment(""); // 제출 후 input 초기화
        } catch (error) {
        console.error("댓글 제출 실패", error);
        }
    };


    return (
        <div className="detail-form shadow rounded-xl border bg-card flex flex-row">
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
                    <div className="ml-3">
                        <button>메뉴버튼</button>
                    </div>
                </div>
            </div>

            <div>
                {detailValue.content}
            </div>

            <div className="flex">
                <div className="flex gap-3">
                    <span>좋아요</span>
                    <span>0개</span>
                </div>
                <div className="flex gap-3 ml-3">
                    <span>댓글</span>
                    <span>{detailValue.commentCount}개</span>
                </div>
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
        </div>
    )
}