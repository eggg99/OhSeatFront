import { putCineSquare,getCineSqaureItem  } from "@/apis/api/cinesquare";
import { useEffect, useState } from "react"
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";

export default function CineSquareEdit(){
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>(); 

    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        content : ''
    });

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setInputValue(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if(!inputValue.categoryId){alert('카테고리를 선택해주세요'); return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if(!inputValue.content){alert('내용을 입력해주세요'); return;}
        const response = await putCineSquare(
            postId,
            inputValue.categoryId,
            inputValue.title,
            inputValue.content
        );
        alert('저장되었습니다.');
        navigate(`/cinesquare/${postId}`);
    }

    const getData = async () => {
        try {
            const response = await getCineSqaureItem(postId);
            setInputValue(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(postId) getData();
    }, [postId]);

    return(
        <div className="os_sub_contents">
            <div className="flex gap-3">
                <span>카테고리</span>
                <select name="categoryId" onChange={handleInput} value={inputValue.categoryId}>
                    <option value="">카테고리를 선택하세요</option>
                    <option value="1">공지사항</option>
                    <option value="2">자유수다</option>
                    <option value="3">구인구직</option>
                </select>
            </div>
            <div className="flex gap-4">
                <div><span>제목</span></div>
                <div>
                    <Input
                        type="text"
                        name="title"
                        value={inputValue.title}
                        onChange={handleInput}
                        placeholder="제목을 입력하세요" 
                        required
                    />
                </div>
            </div>
            <div className="flex mt-3 mx-3">
                <textarea 
                    name="content"
                    placeholder="내용을 입력하세요" 
                    value={inputValue.content} 
                    onChange={handleInput} 
                    cols={6} 
                    rows={5} 
                    className="w-full"
                    required
                />
            </div>
            <div>
                <button onClick={() => handleSubmit()}>수정</button>
            </div>
        </div>
    )
}