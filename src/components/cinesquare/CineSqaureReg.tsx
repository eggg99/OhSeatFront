import { postCineSquare, fileUpload } from "@/apis/api/cinesquare";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import Location from "@/components/common/Location";
import { locationStore } from "@/store/userLocation";
import { FileUpload } from "@/components/common/file/FileUpload";
import { POST_CATEGORY } from '@/constants/category_cine';

export default function CineSquareReg() {
    const navigate = useNavigate();

    // 게시글 정보
    const location = locationStore((state) => state.currentLocation);
    const [inputValue, setInputValue] = useState({
        categoryId: "",
        title: "",
        content: "",
    });

    // 신규 업로드 파일
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);

    /** 파일 목록 업데이트 (신규 업로드만) */
    const handleFilesChange = (files: File[]) => {
        setUploadFiles(files);

        // 첫 파일 올라오면 대표 자동 지정
        if (files.length > 0 && representativeIndex === null) {
            setRepresentativeIndex(0);
        }

        // 파일 삭제 시 대표 index 벗어나면 대표 해제
        if (representativeIndex !== null && representativeIndex >= files.length) {
            setRepresentativeIndex(null);
        }
    };

    /** 대표 이미지 선택 */
    const handleRepresentativeChange = (rep: {
        type: "existing" | "new";
        index: number;
        fileId?: number;
    }) => {
        // 등록 화면에서는 existing이 올 일이 없지만, 타입 대응은 해둔다
        if (rep.type === "new") {
            setRepresentativeIndex(rep.index);
        }
    };

    /** 입력값 변경 */
    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /** 목록으로 이동 */
    const list = () => navigate(`/cinesquare/list?category=0`);

    /** 파일 업로드 */
    const handleFileUpload = async () => {
        const uploaded: { fileId: number; isRepresentative: "Y" | "N" }[] = [];

        for (let i = 0; i < uploadFiles.length; i++) {
            const formData = new FormData();
            formData.append("file", uploadFiles[i]);
            const response = await fileUpload(formData);
            if (response) {
                uploaded.push({
                    fileId: response.fileId,
                    isRepresentative: representativeIndex === i ? "Y" : "N",
                });
            }
        }

        return uploaded;
    };

    /** 등록하기 */
    const handleSubmit = async (e?: SyntheticEvent) => {
        e?.preventDefault();

        if (!inputValue.categoryId) return alert("카테고리를 선택해주세요");
        if (!inputValue.title) return alert("제목을 입력해주세요");
        if (!inputValue.content) return alert("내용을 입력해주세요");

        const data = {
            categoryId: inputValue.categoryId,
            title: inputValue.title,
            content: inputValue.content,
            city: location.city,
            district: location.district,
        };

        // 파일 업로드
        const uploadedFiles = uploadFiles.length > 0 ? await handleFileUpload() : [];
        const newFileIds = uploadedFiles.map(u => u.fileId);
        const representativeFile = uploadedFiles.find(u => u.isRepresentative === "Y");
        const representativeFileId = representativeFile ? representativeFile.fileId : null;

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("newFileIds", newFileIds.join(","));
        if (representativeFileId !== null) {
            formData.append("representativeFileId",String(representativeFileId));
        }

        const response = await postCineSquare(formData);
        if (response) {
            alert(response);
            navigate(`/cinesquare/list?category=1`);
        }
    };

    return (
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <button onClick={list} className="go_before_button">
                        목록으로 돌아가기
                    </button>

                    <h3>씨네광장 글쓰기</h3>
                    <div className="freetalk_button_wrap">
                        <a onClick={() => handleSubmit()} className="post_button write cursor-pointer">
                            등록
                        </a>
                    </div>
                </div>

                <div className="theater_detail_board_wrap2">
                    <div className="post_write_area_wrap">
                        <table className="basic_board2">
                            <tbody>
                            <tr>
                                <td colSpan={4}>
                                    <span className="my_place_span">
                                        <Location />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="categoryId" onChange={handleInput} value={inputValue.categoryId}>
                                        <option value="">게시글 종류 선택</option>
                                        {POST_CATEGORY.map((category) => (
                                          <option key={category.id} value={category.id}>
                                            {category.name}
                                          </option>
                                        ))}
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
    );
}
