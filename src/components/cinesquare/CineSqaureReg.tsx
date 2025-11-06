import { postCineSquare } from "@/apis/api/cinesquare";
import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import Location from "@/components/common/Location";
import { locationStore } from "@/store/userLocation";
import { FileUpload } from "../common/file/FileUpload";


export default function CineSquareReg(){
    const navigate = useNavigate();
    const location = locationStore((state) => state.currentLocation);
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

    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }


    // 파일 업로드
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // input 클릭 트리거
    };

    // 파일 추가
    const handleFilesChange = (files: File[]) => {
        setUploadedFiles(files);
    };

    const handleSubmit = async (e?: SyntheticEvent): Promise<void> => {
        e?.preventDefault();

    if (!inputValue.categoryId) {
        alert("카테고리를 선택해주세요");
        return;
    } else if (!inputValue.title) {
        alert("제목을 입력해주세요");
        return;
    } else if (!inputValue.content) {
        alert("내용을 입력해주세요");
        return;
    }

    const formData:FormData = new FormData();

    if (uploadedFiles) {
        uploadedFiles.forEach ((file) => {
            formData.append("files", file);
        })
    }

    const data = {
        categoryId: inputValue.categoryId,
        title: inputValue.title,
        content: inputValue.content,
        city: location.city,
        district: location.district,
    };
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    const response = await postCineSquare(formData);
    alert(response);
    navigate(`/cinesquare/list?category=1`);
}
    
    return(
        <div className="os_sub_contents">
            <div className="flex gap-8">
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
                    rows={5} />
            </div>
            
            <FileUpload onFilesChange={handleFilesChange} />

            <div>
                <button onClick={list}>취소</button>
                <button onClick={() => handleSubmit()}>등록</button>
            </div>
        </div>
    )
}