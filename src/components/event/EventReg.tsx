import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { postEvent } from "@/apis/api/event";
import { userStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../common/file/FileUpload";

export default function EventReg () {
    const navigate = useNavigate();
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);

    // 이벤트 게시글 내용
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        startDt : '',
        endDt : ''
    });

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

    // 등록
    const handleSubmit = async (e?: SyntheticEvent): Promise<void> => {
        e?.preventDefault();

        const formData:FormData = new FormData();

        if(!isLogin) {alert('로그인을 해주세요'); return;}
        else if(!inputValue.categoryId){alert('카테고리를 입력해주세요'); return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if(!inputValue.startDt){alert('이벤트 시작기간을 입력해주세요'); return;}
        else if(!inputValue.endDt){alert('이벤트 종료기간을 입력해주세요'); return;}

        const data = {
            categoryId : inputValue.categoryId,
            title : inputValue.title,
            startDt : inputValue.startDt,
            endDt : inputValue.endDt,
        }

        formData.append(
            "data",
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        if (uploadFiles) {
            uploadFiles.forEach ((file) => {
                formData.append("files", file);
            })
        }

        // 대표 이미지 배열 생성
        const representatives = uploadFiles.map((_, idx) =>
            idx === representativeIndex ? "Y" : "N"
        );
        formData.append(
            "representatives",
            new Blob([JSON.stringify(representatives)], { type: "application/json" })
        );

        const response = postEvent(formData);
        alert(response);
        // TODO : 백엔드에서 상세아이디값 받으면 detail 화면으로 넘어가게 만들기
        list();
    }

    /* 파일 */
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

    // 목록으로
    const list = () => {
        navigate(`/event/browse`);
    }

    return (
        <div className="os_sub_contents">
            <div className="theater_total_board_wrap">
                <div className="post_write_title_wrap clear">
                    <h2>이벤트 글쓰기</h2>

                    <a href="#" className="post_button write" onClick={() => handleSubmit()}>등록</a>
                </div>

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
                            <td>
                                <select name="categoryId" onChange={handleInput} value={inputValue.categoryId}>
                                    <option value=''>카테고리를 선택하세요</option>
                                    <option value='1'>시사회</option>
                                    <option value='2'>예매권</option>
                                </select>
                            </td>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    name="title"
                                    value={inputValue.title}
                                    onChange={handleInput}
                                    placeholder="제목을 입력해 주세요."
                                    className="post_title_input"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    name="startDt"
                                    value={inputValue.startDt}
                                    onChange={handleInput}
                                    placeholder="시작기간"
                                    className="post_title_input"
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="endDt"
                                    value={inputValue.endDt}
                                    onChange={handleInput}
                                    placeholder="종료기간"
                                    className="post_title_input"
                                    required
                                />
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
                <div className="post_button_wrap clear">
                    <div className="left">
                        <a href="#" className="post_button" onClick={() => list()}>목록</a>
                    </div>

                    <div className="right">
                        <a href="#" className="post_button write" onClick={() => handleSubmit()}>등록</a>
                    </div>
                </div>
            </div>
        </div>
    )
}