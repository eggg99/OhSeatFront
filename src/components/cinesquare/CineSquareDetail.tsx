import { deleteCineSquare, getCineSqaureItem, postComment, getCommentList } from "@/apis/api/cinesquare";
import { CineSquareData } from "@/types/CineSquare";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { userStore } from "@/store/userStore";



export default function CineSquareDetail(){
    const navigate = useNavigate();
    const userId = userStore((state) => state.userId);  // 유저아이디
    const isLogin = userStore((state) => state.isLogin);
    const [detailValue, setDetailValue] = useState<CineSquareData>();
    const [comment, setComment] = useState("");
    const { postId } = useParams<{ postId: string }>(); 
    const getData = async () => {
        try {
            const response = await getCineSqaureItem(postId);
            setDetailValue(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(postId){
            getData();
        }
    }, [postId]);

    const handleDelete = async() => {
        try {
            const response = await deleteCineSquare(postId);
        } catch (error) {
            console.error(error);
        }
    }

    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        else if (!isLogin) {alert('로그인해주세요'); navigate(`/user/login`);return;}

        try {
            await postComment(comment, postId, userId);
            setComment(""); // input 초기화
            await getData();     // 게시글 다시 불러오기 (commentCount 갱신)
            await getCommentList(); // 댓글 리스트 갱신
        } catch (error) {
            console.error("댓글 제출 실패", error);
        }
    };
    
    return(
        <div className="detail-form shadow rounded-xl border bg-card flex flex-col">
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
                이미지이미지
            </div>
            <div className="flex justify-between">
                <div>댓글 : ___개</div>
                <div>좋아요 : ___개</div>
            </div>
            
            {/* 댓글작성 */}
            <section>
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
            </section>
        </div>
    )
}