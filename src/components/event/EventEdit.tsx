import {type SyntheticEvent, useEffect, useState} from "react"
import {updateEvent, getEventItem} from "@/apis/api/event";
import {userStore} from "@/store/userStore";
import {useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker"; // date-picker 설정
import "react-datepicker/dist/react-datepicker.css"; // date-picker 설정
import { FileUpload2 } from "@/components/common/file/FileUpload2";
import type {fileData} from "@/types/CineSquare"

type UploadFileState = {
    existing: fileData | null; // 서버 파일
    newFile: File | null;      // 새로 선택한 파일
};

export default function EventEdit () {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isLogin = userStore((state) => state.isLogin);
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const [poster, setPoster] = useState<UploadFileState>({
        existing: null,
        newFile: null,
    });
    const [thumbnail, setThumbnail] = useState<UploadFileState>({
        existing: null,
        newFile: null,
    });
    const [banner, setBanner] = useState<UploadFileState>({
        existing: null,
        newFile: null,
    });
    const [content, setContent] = useState<UploadFileState>({
        existing: null,
        newFile: null,
    });

    useEffect(() => {
        if (!id) return;
        const exec = async () => {
            await getData();
        }
        exec();
    }, [id]);

    // 이벤트 게시글 내용
    const [inputValue, setInputValue] = useState({
        categoryId : '',
        title : '',
        annCount: 0,
        startDt : today,
        endDt : oneMonthLater,
        file : [],
    });

    // 게시글 내용 불러오기
    const getData = async () => {
        try {
            const response = await getEventItem(id);
            setInputValue(response);
            const posterData = response?.files.find((file: { fileRole: string; }) => file.fileRole === 'POSTER') ?? null;
            const thumbnailData = response?.files.find((file: { fileRole: string; }) => file.fileRole === 'THUMB') ?? null;
            const bannerData = response?.files.find((file: { fileRole: string; }) => file.fileRole === "BANNER") ?? null;
            const contentData = response?.files.find((file: { fileRole: string; }) => file.fileRole === "CONTENT") ?? null;

            setPoster((prev) => ({
                ...prev,          // 기존의 newFile 등 다른 상태를 유지
                existing: posterData, // existing 부분만 업데이트
            }));
            setThumbnail((prev) => ({
                ...prev,          // 기존의 newFile 등 다른 상태를 유지
                existing: thumbnailData, // existing 부분만 업데이트
            }));
            setBanner((prev) => ({
                ...prev,          // 기존의 newFile 등 다른 상태를 유지
                existing: bannerData, // existing 부분만 업데이트
            }));
            setContent((prev) => ({
                ...prev,          // 기존의 newFile 등 다른 상태를 유지
                existing: contentData, // existing 부분만 업데이트
            }));
        } catch (error) {
            console.error(error);
        }
    }

    // 변경 내용
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

        const formData:FormData = new FormData();

        if(!isLogin) {alert('로그인을 해주세요'); return;}
        else if(!inputValue.categoryId){alert('이벤트 종류를 선택해주세요'); return;}
        else if(!inputValue.startDt){alert('이벤트 시작기간을 입력해주세요'); return;}
        else if(!inputValue.endDt){alert('이벤트 종료기간을 입력해주세요'); return;}
        else if (!inputValue.annCount) {alert('당첨 인원을 입력해주세요');return;}
        else if (inputValue.annCount <= 0) {alert('당첨 인원은 1명 이상이어야 합니다');return;}
        else if(!inputValue.title){alert('제목을 입력해주세요'); return;}
        else if (!poster.existing && !poster.newFile){alert('포스터 이미지를 등록해주세요'); return;}
        else if (!thumbnail.existing && !thumbnail.newFile){alert('썸네일 이미지를 등록해주세요'); return;}
        else if (!banner.existing && !banner.newFile){alert('배너 이미지를 등록해주세요'); return;}
        else if (!content.existing && !content.newFile){alert('내용 이미지를 등록해주세요'); return;}

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
        if (poster.newFile) {
            const id = poster.existing?.fileId;
            if (id) formData.append("delete_poster_ids", `[${id}]`);
            formData.append("new_poster", poster.newFile);
        }
        if (thumbnail.newFile) {
            const id = thumbnail.existing?.fileId;
            if (id) formData.append("delete_thumbnail_ids", `[${id}]`);
            formData.append("new_thumbnail", thumbnail.newFile);
        }
        if (banner.newFile) {
            const id = banner.existing?.fileId;
            if (id) formData.append("delete_banner_ids", `[${id}]`);
            formData.append("new_banner", banner.newFile);
        }
        if (content.newFile) {
            const id = content.existing?.fileId;
            if (id) formData.append("delete_content_ids", `[${id}]`);
            formData.append("new_content", content.newFile);
        }

        const response = await updateEvent(id, formData);
        alert(response.msg);
        navigate(`/event/${id}`);
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

    const handleFilesChange = (file:File, type:string) => {

    }

    return (
      <div className="os_sub_contents">
          <div className="theater_total_board_wrap">
              <div className="post_write_title_wrap clear">
                  <h2>이벤트 둘러보기 수정하기</h2>

                  <a href="#" className="post_button write" onClick={() => handleSubmit()}>수정</a>
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
                                    value={inputValue.annCount}
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
                                            mode="edit"
                                            existingFile={poster.existing}
                                            newFile={poster.newFile}
                                            onChange={(file) =>
                                              setPoster(prev => ({ ...prev, newFile: file }))
                                            }
                                            onDeleteExisting={() =>
                                              setPoster(prev => ({ ...prev, existing: null }))
                                            }
                                          />
                                      </li>
                                      <li>
                                          <p><i>2</i>이벤트 정사각형 썸네일 <span>(350*350)</span></p>
                                          <FileUpload2
                                            mode="edit"
                                            existingFile={thumbnail.existing}
                                            newFile={thumbnail.newFile}
                                            onChange={(file) =>
                                              setThumbnail(prev => ({ ...prev, newFile: file }))
                                            }
                                            onDeleteExisting={() =>
                                              setThumbnail(prev => ({ ...prev, existing: null }))
                                            }
                                          />
                                      </li>
                                      <li>
                                          <p><i>3</i>이벤트 배너 배경 <span>(630*500)</span></p>

                                          <FileUpload2
                                            mode="edit"
                                            existingFile={banner.existing}
                                            newFile={banner.newFile}
                                            onChange={(file) =>
                                              setBanner(prev => ({ ...prev, newFile: file }))
                                            }
                                            onDeleteExisting={() =>
                                              setBanner(prev => ({ ...prev, existing: null }))
                                            }
                                          />
                                      </li>
                                      <li>
                                          <p><i>4</i>이벤트 게시글 내용 <span>(800*제한없음)</span></p>

                                          <FileUpload2
                                            mode="edit"
                                            existingFile={content.existing}
                                            newFile={content.newFile}
                                            onChange={(file) =>
                                              setContent(prev => ({ ...prev, newFile: file }))
                                            }
                                            onDeleteExisting={() =>
                                              setContent(prev => ({ ...prev, existing: null }))
                                            }
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
                      <a href="#" className="post_button write" onClick={() => handleSubmit()}>수정</a>
                  </div>
              </div>
          </div>
      </div>
    )
}