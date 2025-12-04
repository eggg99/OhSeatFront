import { postCineSquare, fileUpload } from "@/apis/api/cinesquare";
import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom";
import Location from "@/components/common/Location";
import { locationStore } from "@/store/userLocation";
import { FileUpload } from "@/components/common/file/FileUpload";

export default function CineSquareReg(){
    const navigate = useNavigate();

    // 게시글 정보
    const location = locationStore((state) => state.currentLocation);
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        content : ''
    });

    // 업로드 파일 + 대표 이미지
	const [uploadFiles, setUploadFiles] = useState<File[]>([]);
	const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);


    // 파일 상태 업데이트 함수
    const handleFilesChange = (files: File[]) => {
		setUploadFiles(files);
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

    // 등록 내용
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

    const handleFileUpload = async () => {
        try {
            const formData:FormData = new FormData();
            if (uploadFiles) {
                for (const file of uploadFiles) {
                    formData.append("file", file);
                    const response = await fileUpload(formData);

                    return response?.fileId;
                }
            }

        } catch (e) {
            console.error(e);
        }
    }


    // 등록하기
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
        }

        const data = {
            categoryId: inputValue.categoryId,
            title: inputValue.title,
            content: inputValue.content,
            city: location.city,
            district: location.district,
        };

        formData.append(
            "data", 
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );



        const response = await postCineSquare(formData);
        alert(response);
        navigate(`/cinesquare/list?category=1`);
}
    
    return(
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <button onClick={list} className="go_before_button">목록으로 돌아가기</button>

                    <h3>씨네광장 글쓰기</h3>
                    <div className="freetalk_button_wrap">
                        <a onClick={() => handleSubmit()} className="post_button write cursor-pointer">등록</a>
                    </div>
                </div>

                <div className="theater_detail_board_wrap2">
                    <div className="post_write_area_wrap">
                        <table className="basic_board2">
                            <colgroup>
                                <col style={{width: '25%'}}/>
                                <col style={{width: '25%'}}/>
                                <col style={{width: '25%'}}/>
                                <col style={{width: '25%'}}/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td colSpan={4}><span className="my_place_span"><Location/></span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <select name="categoryId" onChange={handleInput} value={inputValue.categoryId}>
                                            <option value="">게시글 종류 선택</option>
                                            <option value="1">공지사항</option>
                                            <option value="2">자유수다</option>
                                            <option value="3">구인구직</option>
                                        </select>
                                    </td>
                                    <td colSpan={3}>
                                        <input
                                            type="text"
                                            name="title"
                                            value={inputValue.title}
                                            onChange={handleInput}
                                            className="post_title_input"
                                            placeholder="제목을 입력하세요"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div className="post_textarea_wrap">
                                             <textarea
                                                 name="content"
                                                 placeholder="내용을 입력하세요"
                                                 value={inputValue.content}
                                                 onChange={handleInput}
                                             />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <FileUpload
                                            onFilesChange={handleFilesChange}
                                            onRepresentativeChange={handleRepresentativeChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}