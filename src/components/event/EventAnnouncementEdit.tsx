import { postEventAnnouncement } from "@/apis/api/eventAnn";
import { useEffect, useState, type SyntheticEvent } from "react"
import { getEventAnnouncementItem, putEventAnnouncement } from '@/apis/api/eventAnn'
import { useNavigate, useParams } from "react-router-dom";
import { userStore } from "@/store/userStore";

export default function EventAnnouncementEdit () {
    const navigate = useNavigate();
    const userId = userStore((state) => state.userId);
    const isLogin = userStore((state) => state.isLogin);
    const isAdmin = userStore((state) => state.isAdmin);

    const { eventId } = useParams<{ eventId: string }>();
    // 이벤트 게시글 내용
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        content : ''
    });

    useEffect(() => {
        if (!eventId) return;
        const exec = async () => {
            await getData();
        };
        exec();
    }, [eventId]);


    const getData = async () => {
        try {
            const response = await getEventAnnouncementItem(eventId);
            console.log(response);
            setInputValue(response);
        } catch (error) {
            console.error(error);
        }
    }

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

    // 수정
    const handleSubmit = async (e?: SyntheticEvent): Promise<void> => {
        e?.preventDefault();

        if(!isLogin) {alert('로그인을 해주세요'); return;}
        else if(!inputValue.categoryId){alert('이벤트 종류를 선택해주세요'); return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if(!inputValue.content){alert('당첨내용을 입력해주세요'); return;}

        const data = {
            categoryId : inputValue.categoryId,
            title : inputValue.title,
            content : inputValue.content,
        }

        await putEventAnnouncement(eventId, data);
        alert('수정되었습니다.');
        navigate(`/event/announcement/${eventId}`);
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
                                  <option value="">이벤트 종류 선택</option>
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
                      {isLogin && isAdmin && <a href="#" className="post_button write" onClick={() => handleSubmit()}>수정</a>}
                  </div>
              </div>
            </div>
      </div>
    )
}