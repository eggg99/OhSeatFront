import { putCineSquare, getCineSqaureItem, fileUpload } from "@/apis/api/cinesquare";
import { useEffect, useState, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Location from "@/components/common/Location";
import { FileUpload } from "@/components/common/file/FileUpload";
import { fileData } from "@/types/CineSquare";
import { POST_CATEGORY } from '@/constants/category_cine';

export default function CineSquareEdit() {
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>();

    const [inputValue, setInputValue] = useState({
        categoryId: "",
        title: "",
        content: "",
        city: "",
        district: "",
    });

    const [existingFiles, setExistingFiles] = useState<fileData[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [deleteFiles, setDeleteFiles] = useState<number[]>([]);
    const [representative, setRepresentative] = useState<{
        type: "existing" | "new";
        index: number;
        fileId?: number;
    } | null>(null);

    const getData = async () => {
        try {
            const res = await getCineSqaureItem(postId);
            setInputValue(res);
            setExistingFiles(res?.files);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFilesChange = (files: File[]) => setNewFiles(files);

    const handleRepresentativeChange = (rep: {
        type: "existing" | "new";
        index: number;
        fileId?: number;
    }) => {
        setRepresentative(rep);
    };

    const handleFileUpload = async () => {
        const uploadedIds: number[] = [];
        for (const file of newFiles) {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fileUpload(fd);
            if (res?.fileId) uploadedIds.push(res.fileId);
        }
        return uploadedIds;
    };

    const handleSubmit = async (e?: SyntheticEvent) => {
        e?.preventDefault();

        const uploadNewFileIds = await handleFileUpload();

        let representativeFileId: number | null = null;
        if (representative) {
            if (representative.type === "existing") {
                representativeFileId = representative.fileId ?? null;
            } else {
                representativeFileId = uploadNewFileIds[representative.index] ?? null;
            }
        }

        const data = {
            categoryId: inputValue.categoryId,
            title: inputValue.title,
            content: inputValue.content,
            city: inputValue.city,
            district: inputValue.district,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("newFileIds", uploadNewFileIds.join(","));
        formData.append("deleteFileIds", deleteFiles.join(","));
        if (representativeFileId) formData.append("representativeFileId", representativeFileId.toString());

        const response = await putCineSquare(postId, formData);
        if (response) {
            alert(response);
            navigate(`/cinesquare/${postId}`);
        }
    };

    useEffect(() => {
        if (postId) getData();
    }, [postId]);

    const handleInput = (e: any) =>
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }));

    return (
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <button onClick={() => navigate(`/cinesquare/list?category=0`)} className="go_before_button">
                        목록으로 돌아가기
                    </button>

                    <h3>씨네광장 수정하기</h3>
                    <div className="os_freetalk_right_wrap">
                        <div className="freetalk_button_wrap">
                            <a onClick={handleSubmit} className="post_button write cursor-pointer">
                                수정
                            </a>
                        </div>
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
                                    <select name="categoryId" value={inputValue.categoryId} onChange={handleInput}>
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
                                        initialFiles={existingFiles}
                                        onDeleteExisting={(fileId) => {
                                            setExistingFiles(prev => prev.filter(f => f.fileId !== fileId));
                                            setDeleteFiles(prev => [...prev, fileId]);
                                        }}
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
