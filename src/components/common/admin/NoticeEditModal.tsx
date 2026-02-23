import {updateNotice, getNotice} from "@/apis/api/admin";
import {useEffect, useState } from "react";

interface NoticeEditModalProps {
  noticeId: number;
  onBack: (noticeId: number) => void;
}
export default function NoticeEditModal({
                                          noticeId,
                                          onBack,
                                        }: NoticeEditModalProps) {

  useEffect(() => {
    if(noticeId) getData();
  }, [noticeId]);

  const [inputValue, setInputValue] = useState({
    targetBoard:'recommend',
    title:'',
    content:''
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const getData = async () => {
    try{
      const response = await getNotice(noticeId, {});
      setInputValue({
        ...response,
      });
    } catch (error) {
      console.error(error);
    }
  }


  const edit = async () => {
    if (!inputValue.title) {alert('제목을 입력해주세요'); return;}
    else if(!inputValue.content){alert('내용을 입력해주세요'); return;}
    const param = {'targetBoard':inputValue.targetBoard, 'title':inputValue.title, 'content':inputValue.content};
    const res = await updateNotice(noticeId, param);

    alert ('수정되었습니다');
    onBack(noticeId);
  }


  return (
    <>
      {/* header */}
      <div className="modal_header">
        <h3 className="modal_title">공지 수정</h3>
      </div>
      <div>
        <div>
          <input
            type="text"
            name="title"
            value={inputValue.title}
            onChange={handleInput}
            placeholder="제목을 입력해 주세요."
            className="post_title_input"
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={inputValue.content}
            onChange={handleInput}
            required
          />
        </div>
      </div>

      <div className="modal_button_group">
        <button className="btn btn_primary" onClick={() => edit()}>
          공지 수정하기
        </button>
        <button className="btn btn_primary" onClick={() => onBack(noticeId)}>
          뒤로
        </button>
      </div>
    </>
  );
}
