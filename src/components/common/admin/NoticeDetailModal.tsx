import {getNotice, deleteNotice} from "@/apis/api/admin";
import { useEffect, useState } from "react";
import { NoticeDetailData } from "@/types/Notice";
import {formatDateTime} from "@/utils/format";

interface NoticeDetailModalProps {
  noticeId: number;
  onBack: () => void;
  onEdit: (noticeId: number) => void;
}
export default function NoticeDetailModal({
                                          noticeId,
                                          onBack,
                                          onEdit,
                                        }: NoticeDetailModalProps) {
  const [detailValue, setDetailValue] = useState<NoticeDetailData>({
    noticeId:0 ,
    targetBoard:'RECOMMEND' ,
    title:'' ,
    content: '',
    authorId:0 ,
    authorNickName:'' ,
    createdAt:'-' ,
    views:0 ,
  });
  const [isMenuOn, setMenuOn] = useState(false);

  useEffect(() => {
    if (!noticeId) return;
    getData();
  }, [noticeId]);

  const getData = async () => {
    try{
      const response = await getNotice(noticeId, {});
      const { date, time } = formatDateTime(response.createdAt);
      setDetailValue({
        ...response,
        createdAtDate: date,
        createdAtTime: time,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // 공지사항 삭제
  const onDelete = async(id:number) => {
    const result = confirm("삭제하시겠습니까?");
    try {
      if(result){
        const response = await deleteNotice(id, {});
        alert('삭제되었습니다');
      }
      onBack();
    } catch (error) {
      console.error(error);
    }
  }

  // 수정 / 삭제 메뉴 버튼 클릭
  const handleInnerToggle = () => {
    setMenuOn((prev) => !prev);
  };

  return (
    <>
      <div className="modal_contents">
        <div className="theater_detail_board_wrap">
          <div className="detail_header">
            <h3>{detailValue?.title}</h3>
            <div className="post_user_wrap">
              <p>{detailValue?.authorNickName}</p>
              <span>{detailValue?.createdAtDate} <i>{detailValue?.createdAtTime}</i></span>
            </div>
            <div className="post_control_wrap clear">
              <a href="#" className="post_hits_button">조회수
                <span>{detailValue?.views ?? 0}</span>
              </a>

              <a href="#" className={`post_setting_button ${isMenuOn ? "on" : ""}`} onClick={handleInnerToggle}>
                <span className="blind">더보기</span>
              </a>

              <div className="post_setting_wrap">
                <ul className="post_setting_list">
                  <li><a href="#" onClick={() => onDelete(noticeId)}>게시글 삭제</a></li>
                  <li><a href="#" onClick={() => onEdit(noticeId)}>게시글 수정</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="detail_contents">
            <pre>{detailValue?.content}</pre>
          </div>

          <div className="detail_footer">
            <div className="post_reaction_wrap clear">
              <a href="#" className="post_hits_button">조회수
                <span>{detailValue?.views ?? 0}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="post_button_wrap clear">
          <div className="left">
            <a href="#" className="post_button" onClick={onBack}>목록</a>
          </div>
        </div>
      </div>
    </>
  );
}
