import { putCineSquare,getCineSqaureItem, fileUpload } from "@/apis/api/cinesquare";
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

    const handleFileUpload = async () => {
        const regFiles: number[] = [];
        try {
            const formData:FormData = new FormData();
            if (newFiles) {
                for (const file of newFiles) {
                    console.log(file);
                    formData.append("file", file);
                    const response = await fileUpload(formData);
                    if (response) {
                        regFiles.push(response?.fileId)
                    }
                }
                return {
                    newFileIds: regFiles,
                };
            }
        } catch (e) {
            console.error(e);
        }
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

        const uploadResult = await handleFileUpload();
        const newFileIds = uploadResult?.newFileIds ?? [];

        let representativeFileId: number | null = null;
        if (representativeIndex !== null && newFileIds.length > representativeIndex) {
            representativeFileId = newFileIds[representativeIndex];
        }

        formData.append("data", JSON.stringify(data));
        formData.append("newFileIds", JSON.stringify(newFileIds));
        formData.append("delete_files_ids", JSON.stringify(delete_files_ids));
        // 대표이미지 아이디 넣어야함


        const response = await putCineSquare(postId,formData);
        alert('저장되었습니다.');
        navigate(`/cinesquare/${postId}`);
    }

    useEffect(() => {
        if(postId) getData();
    }, [postId]);

    return(
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">

                <div className="os_freetalk_subtitle">
                    <button onClick={list} className="go_before_button">목록으로 돌아가기</button>

                    <h3>씨네광장 수정하기</h3>
                    <div className="freetalk_button_wrap">
                        <a onClick={() => handleSubmit()} className="post_button write cursor-pointer">수정</a>
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
                                <FileUpload
                                    onFilesChange={handleFilesChange}
                                    onRepresentativeChange={handleRepresentativeChange}
                                    initialFiles={existingFiles}
                                    onDeleteExisting={(fileId) => {
                                        setExistingFiles(prev => prev.filter(f => f.fileId !== fileId));
                                        delete_files_ids.push(fileId);
                                    }}
                                />
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}