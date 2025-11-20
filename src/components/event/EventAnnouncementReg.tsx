import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { postEventWinner } from "@/apis/api/event";
import { userStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../common/file/FileUpload";

export default function EventAnnouncementReg () {
    const navigate = useNavigate();
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);

    // 이벤트 게시글 내용
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        content : ''
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

        if(!isLogin) {alert('로그인을 해주세요'); return;}
        else if(!inputValue.categoryId){alert('카테고리를 입력해주세요'); return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if(!inputValue.content){alert('당첨내용을 입력해주세요'); return;}

        const data = {
            categoryId : inputValue.categoryId,
            title : inputValue.title,
            content : inputValue.content,
        }

        const response = postEventWinner(data);
        alert(response);
        // TODO : 백엔드에서 상세아이디값 받으면 detail 화면으로 넘어가게 만들기
        list();
    }

    // 목록으로
    const list = () => {
        navigate(`/event/announcement/browse`);
    }

    return (
        <div className="os_sub_contents">
            <div className="theater_total_board_wrap">
                <div className="post_write_title_wrap clear">
                    <h2>이벤트 당첨발표 글쓰기</h2>

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
                                <td colSpan={4}>
                                    <div className="post_textarea_wrap">
                                        <textarea
                                            name="content"
                                            placeholder="내용을 입력하세요"
                                            value={inputValue.content}
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
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