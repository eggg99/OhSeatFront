import { deleteCineSquare, getCineSqaureItem } from "@/apis/api/cinesquare";
import { PostData } from "@/types/Post";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CineSquareDetail(){
    const navigate = useNavigate();
    const [detailValue, setDetailValue] = useState<PostData>();
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
            console.log(response);
            //alert(response);
            // navigate(`/cinesquare?categoryId=1`);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className="detail-form shadow rounded-xl border bg-card flex flex-col">
            <div>
                <h2 className="text-2xl">{detailValue?.title}</h2>
            </div>
            <div className="flex gap-3">
                <span>작성자</span>
                <span>{detailValue?.authorNickname}</span>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <span>작성일자</span>
                    <span>{detailValue?.createdAt}</span>
                </div>
                <div className="flex">
                    <div className="flex gap-3 ml-3">
                        <span>조회수</span>
                        <span>{detailValue?.views}회</span>
                    </div>
                    <div className="ml-3">
                        <button><Link to={`/cinesquare/edit/${postId}`}>수정</Link></button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>

            <div>
                {detailValue?.content}
            </div>
        </div>
    )
}