import { postCineSquareAdmin, fileUpload } from "@/apis/api/cinesquare";
import { insertPostAdmin } from "@/apis/api/recommend";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import Location from "@/components/common/Location";
import { locationStore } from "@/store/userLocation";
import { FileUpload } from "@/components/common/file/FileUpload";

export default function CineSqaureAdminReg() {
    const navigate = useNavigate();

    // 게시글 정보
    const location = locationStore((state) => state.currentLocation);
    const [inputValue, setInputValue] = useState({
        menuId : "",
        categoryId: "1",
        title: "",
        content: "",
    });

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

    /** 등록하기 */
    const handleSubmit = async (e?: SyntheticEvent) => {
        e?.preventDefault();

        if (!inputValue.categoryId) return alert("카테고리를 선택해주세요");
        if (!inputValue.title) return alert("제목을 입력해주세요");
        if (!inputValue.content) return alert("내용을 입력해주세요");
        if (!inputValue.menuId) return alert('공지를 올릴 메뉴를 선택해주세요');
        
        const data = {
            categoryId: inputValue.categoryId,
            title: inputValue.title,
            content: inputValue.content,
        };

        if (inputValue.menuId === "recm") {
            try{
                const response = await insertPostAdmin(data);
                if (response)alert(response);
                navigate(`/cinesquare/list?category=1`);
            } catch (error) {
                console.error(error)
            }
        } else if (inputValue.menuId === "cine") {
            try{
                const response = await postCineSquareAdmin(data);
                if (response)alert(response);
                navigate(`/cinesquare/list?category=1`);
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <button onClick={list} className="go_before_button">
                        목록으로 돌아가기
                    </button>

                    <h3>씨네광장 관리자 글쓰기</h3>
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
                                <td>
                                    <select name="categoryId" onChange={handleInput} value={inputValue.categoryId} disabled>
                                        <option value="1">공지사항</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="menuId" onChange={handleInput} value={inputValue.menuId}>
                                        <option value={''}>선택</option>
                                        <option value={'recm'}>좌석추천</option>
                                        <option value={'cine'}>씨네광장</option>
                                    </select>
                                </td>
                                <td colSpan={2}>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
