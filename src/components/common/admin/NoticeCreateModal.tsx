import {insertNotice} from "@/apis/api/admin";
import { useState } from "react";

interface NoticeCreateModalProps {
  onBack: () => void;
}
export default function NoticeCreateModal({
                                          onBack,
                                        }: NoticeCreateModalProps) {

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

  const create = () => {
    if (!inputValue.title) {alert('제목을 입력해주세요'); return;}
    else if(!inputValue.content){alert('내용을 입력해주세요'); return;}
    const param = {'targetBoard':inputValue.targetBoard, 'title':inputValue.title, 'content':inputValue.content};
    const res = insertNotice(param);

    alert ('등록되었습니다');
    onBack();
  }

  return (
    <>
      <div className="modal_contents">
        <table className="basic_board2">
          <colgroup>
            <col style={{width: '25%'}}/>
            <col style={{width: '25%'}}/>
            <col style={{width: '25%'}}/>
            <col style={{width: '25%'}}/>
          </colgroup>
          <tbody>
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
        <div className="post_button_wrap clear">
          <div className="left">
            <a href="#" className="post_button" onClick={onBack}>목록</a>
          </div>

          <div className="right">
            <a href="#" className="post_button write" onClick={() => create()}>등록</a>
          </div>
        </div>

      </div>
    </>
  );
}
