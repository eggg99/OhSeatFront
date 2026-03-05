import {type SyntheticEvent, useState} from "react"
import {postEvent} from "@/apis/api/event";
import {userStore} from "@/store/userStore";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker"; // date-picker 설정
import "react-datepicker/dist/react-datepicker.css"; // date-picker 설정
import { FileUpload2 } from "@/components/common/file/FileUpload2";

export default function EventReg () {
    const navigate = useNavigate();
    const isLogin = userStore((state) => state.isLogin);
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const [poster, setPoster] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [content, setContent] = useState<File | null>(null);

    // 이벤트 게시글 내용
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        annCount: 0,
        startDt : today,
        endDt : oneMonthLater,
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
        else if(!inputValue.categoryId){alert('이벤트 종류를 선택해주세요'); return;}
        else if(!inputValue.startDt){alert('이벤트 시작기간을 입력해주세요'); return;}
        else if(!inputValue.endDt){alert('이벤트 종료기간을 입력해주세요'); return;}
        else if (!inputValue.annCount) {alert('당첨 인원을 입력해주세요');return;}
        else if (inputValue.annCount <= 0) {alert('당첨 인원은 1명 이상이어야 합니다');return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if (!poster){alert('포스터 이미지를 등록해주세요'); return;}
        else if (!thumbnail){alert('썸네일 이미지를 등록해주세요'); return;}
        else if (!banner){alert('배너 이미지를 등록해주세요'); return;}
        else if (!content){alert('내용 이미지를 등록해주세요'); return;}

        const data = {
            categoryId : inputValue.categoryId,
            title : inputValue.title,
            annCount : inputValue.annCount,
            startDt : inputValue.startDt,
            endDt : inputValue.endDt,
        }

        formData.append(
            "data",
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        if (poster){formData.append('poster', poster);}
        if (thumbnail){formData.append('thumbnail', thumbnail);}
        if (banner){formData.append('banner', banner);}
        if (content){formData.append('content', content);}

        const response = await postEvent(formData);
        if (response.eventId) {
            alert(response.msg);
            navigate("/event/" + response.eventId);
        }
    }

    // 목록으로
    const list = () => {
        navigate(`/event/browse`);
    }

    // 날짜 변경
    const handleDateChange = (name: 'startDt' | 'endDt', date: Date | null) => {
        if (!date) return;

        setInputValue(prev => ({
            ...prev,
            [name]: date,
        }));
    };

    // 숫자만 가능
    const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');

        setInputValue(prev => ({
            ...prev,
            annCount: value === '' ? 0 : Number(value),
        }));
    };

    return (
        <div className="os_sub_contents">
            <div className="theater_total_board_wrap">
                <div className="post_write_title_wrap clear">
                    <h2>이벤트 둘러보기 글쓰기</h2>

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
                                    <option value=''>이벤트 종류 선택</option>
                                    <option value='1'>시사회</option>
                                    <option value='2'>예매권</option>
                                </select>
                            </td>
                            <td colSpan={2}>
                                <div className="calendar_wrap">
                                    <ul className="calendar_list">
                                        <li className="start">
                                            <span>시작일자</span>

                                            <DatePicker
                                              selected={inputValue.startDt}
                                              onChange={(date: Date | null) => handleDateChange('startDt', date)}
                                              dateFormat="yyyy-MM-dd"
                                              className={"calendar_input cursor-pointer"}
                                              placeholderText={"시작일자"}
                                              maxDate={inputValue.endDt}        // 종료일 이후 선택 방지
                                            />
                                        </li>
                                        <li className="arrow"></li>
                                        <li className="end">
                                            <span>종료일자</span>
                                            <DatePicker
                                              selected={inputValue.endDt}
                                              onChange={(date: Date | null) => handleDateChange('endDt', date)}
                                              dateFormat="yyyy-MM-dd"
                                              className={"calendar_input cursor-pointer"}
                                              placeholderText={"종료일자"}
                                              minDate={today}        // 오늘 일자 이전 선택 방지
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div className="event_draw_wrap">
                                    <input
                                      type="text"
                                      name="annCount"
                                      onChange={handleNumberInput}
                                      className="post_input_text"
                                      placeholder="이벤트 당첨 인원을 입력해주세요"
                                    />
                                </div>                                        
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
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
                                <div className="os_file_wrap">
                                    <ul className="os_file_list2">
                                        <li>
                                            <p><i>1</i>포스터 이미지 <span>(727*1036)</span></p>
                                            <FileUpload2
                                              mode="create"
                                              newFile={poster}
                                              onChange={setPoster}
                                            />
                                        </li>
                                        <li>
                                            <p><i>2</i>이벤트 정사각형 썸네일 <span>(350*350)</span></p>

                                            <FileUpload2
                                              mode="create"
                                              newFile={thumbnail}
                                              onChange={setThumbnail}
                                            />
                                        </li>
                                        <li>
                                            <p><i>3</i>이벤트 배너 배경 <span>(630*500)</span></p>

                                            <FileUpload2
                                              mode="create"
                                              newFile={banner}
                                              onChange={setBanner}
                                            />
                                        </li>
                                        <li>
                                            <p><i>4</i>이벤트 게시글 내용 <span>(800*제한없음)</span></p>

                                            <FileUpload2
                                              mode="create"
                                              newFile={content}
                                              onChange={setContent}
                                            />
                                        </li>
                                    </ul>
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