import { postCineSquare } from "@/apis/api/cinesquare";
import { useState } from "react"
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import Location from "@/components/common/Location";
import { locationStore } from "@/store/userLocation";


export default function CineSquareReg(){
    const navigate = useNavigate();
    const location = locationStore();
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
        const response = await postCineSquare(
            inputValue.categoryId,
            inputValue.title,
            inputValue.content,
            location.city,
            location.district
        );
        alert('저장되었습니다.');
        navigate(`/cinesquare/list?category=1`);
    }

    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }
    return(
        <div className="detail-form shadow rounded-xl border bg-card flex flex-col w-5/6 m-auto mt-6">
            <div className="flex justify-between">
                <div><button onClick={list}>목록으로</button></div>
                <div><button onClick={() => handleSubmit()}>등록</button></div>
            </div>
            <div className="flex justify-between">
                <Location />
            </div>

            <div className="flex gap-3">
                <div>
                    <span>카테고리</span>
                    <select name="categoryId" onChange={handleInput} value={inputValue.categoryId}>
                        <option value="">카테고리를 선택하세요</option>
                        <option value="1">공지사항</option>
                        <option value="2">자유수다</option>
                        <option value="3">구인구직</option>
                    </select>
                </div>
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
                <button>이미지 첨부 버튼</button>
            </div>

            <div>
                <button onClick={list}>취소</button>
                <button onClick={() => handleSubmit()}>등록</button>
            </div>
        </div>
    )
}