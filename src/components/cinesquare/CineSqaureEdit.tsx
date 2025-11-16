import { putCineSquare,getCineSqaureItem  } from "@/apis/api/cinesquare";
import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Location from "@/components/common/Location";
import { FileUpload } from "@/components/common/file/FileUpload";


export default function CineSquareEdit(){
    const navigate = useNavigate();

    // 게시글정보
    const { postId } = useParams<{ postId: string }>(); 
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        content : '',
        city : '',
        district : '',
    });

    // 업로드 파일 + 대표 이미지
    const [delete_files_ids, setDelete_files_ids] = useState<any[]>([]);
    const [existingFiles, setExistingFiles] = useState<any[]>([]);
    const [newFiles, setNewFiles] = useState<any[]>([]);
	const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);

    // 데이터 불러오기
    const getData = async () => {
        try {
            const response = await getCineSqaureItem(postId);
            setInputValue(response);
            setExistingFiles(response?.files)
        } catch (error) {
            console.error(error);
        }
    }

    // 파일 상태 업데이트 함수
    const handleFilesChange = (files: File[]) => {
		setNewFiles(files);
		// 대표 이미지 초기화: 기존 인덱스가 벗어나면 null 처리
		if (representativeIndex !== null && representativeIndex >= files.length) {
			setRepresentativeIndex(null);
		}

         if (files.length > 0) {
            setRepresentativeIndex(0);
        } else {
            setRepresentativeIndex(null);
        }
	};

    // 대표이미지 선택
    const handleRepresentativeChange = (index: number) => {
		setRepresentativeIndex(index);
	};

    // 수정 내용
    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setInputValue(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // 목록으로
    const list = () => {
        navigate(`/cinesquare/list?category=0`);
    }

    // 수정하기
    const handleSubmit = async (e?: SyntheticEvent): Promise<void> => {
        e?.preventDefault();

        const formData:FormData = new FormData();

        if (!inputValue.categoryId) {
            alert("카테고리를 선택해주세요");
            return;
        } else if (!inputValue.title) {
            alert("제목을 입력해주세요");
            return;
        } else if (!inputValue.content) {
            alert("내용을 입력해주세요");
            return;
        } else if (!inputValue.content) {
            alert("내용을 입력해주세요");
            return;
        } else if (!inputValue.content) {
            alert("내용을 입력해주세요");
            return;
        }

        const data = {
            categoryId: inputValue.categoryId,
            title: inputValue.title,
            content: inputValue.content,
            city: inputValue.city,
            district: inputValue.district,
        }

        formData.append(
            "data", 
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        if (newFiles) {
            newFiles.forEach ((file) => {
                formData.append("new_files", file);
            })
        }

        formData.append(
            "delete_files_ids",
            new Blob([JSON.stringify(delete_files_ids)], { type: "application/json" })
        );


        const response = await putCineSquare(postId,formData);
        alert('저장되었습니다.');
        navigate(`/cinesquare/${postId}`);
    }

    useEffect(() => {
        if(postId) getData();
    }, [postId]);

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
                    <input
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

            <FileUpload
                onFilesChange={handleFilesChange}
                onRepresentativeChange={handleRepresentativeChange}
                initialFiles={existingFiles}
                onDeleteExisting={(fileId) => {
                    setExistingFiles(prev => prev.filter(f => f.fileId !== fileId));
                    delete_files_ids.push(fileId);
                }}
            />

            <div>
                <button onClick={list}>취소</button>
                <button onClick={() => handleSubmit()}>수정</button>
            </div>
        </div>
    )
}