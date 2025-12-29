import { getNotice, updateNotice} from "@/apis/api/admin";
import { useEffect, useState, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CineSquareEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [inputValue, setInputValue] = useState({
        targetBoard : "",
        categoryId: "1",
        title: "",
        content: "",
    });

    const getData = async () => {
        try {
            const res = await getNotice(id);
            setInputValue(res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e?: SyntheticEvent) => {
        e?.preventDefault();

        const data = {
            targetBoard: inputValue.targetBoard,
            title: inputValue.title,
            content: inputValue.content,
        };

        const response = await updateNotice(id, data);
        alert('수정되었습니다');
        navigate(`/cinesquare/admin/${id}`);
    };

    useEffect(() => {
        if (id) getData();
    }, [id]);

    const handleInput = (e: any) =>
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }));

    return (
        <div className="os_sub_contents">
            <div className="os_freetalk_wrap clear">
                <div className="os_freetalk_subtitle">
                    <button onClick={() => navigate(`/cinesquare/list?category=0`)} className="go_before_button">
                        목록으로 돌아가기
                    </button>

                    <h3>공지사항 수정하기</h3>
                    <div className="freetalk_button_wrap">
                        <a onClick={handleSubmit} className="post_button write cursor-pointer">
                            수정
                        </a>
                    </div>
                </div>

                <div className="theater_detail_board_wrap2">
                    <div className="post_write_area_wrap">
                        <table className="basic_board2">
                            <tbody>
                            <tr>
                                <td>
                                    <select name="categoryId" value={inputValue.categoryId} onChange={handleInput}>
                                        <option value="1">공지사항</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="targetBoard" onChange={handleInput} value={inputValue.targetBoard}>
                                        <option value={''}>선택</option>
                                        <option value={'RECOMMEND'}>좌석추천</option>
                                        <option value={'CINESQUARE'}>씨네광장</option>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
