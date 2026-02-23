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

  useEffect(() => {
    console.log('여기로오나요?')
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

  return (
    <>
      {/* header */}
      <div className="modal_header">
        <h3 className="modal_title">공지 상세: {noticeId}번 게시글</h3>
      </div>

      <div>
        <h3>제목 : {detailValue?.title}</h3>
        <div>내용 : {detailValue?.content}</div>
        <div>작성자 : {detailValue?.authorNickName}</div>
        <div>조회수 : {detailValue?.views}</div>
        <div>작성일 : {detailValue?.createdAtDate}</div>
        <div>작성시간 : {detailValue?.createdAtTime}</div>
      </div>

      <div className="modal_button_group">
        <button className="btn btn_primary" onClick={() => onEdit(noticeId)}>
          공지 수정
        </button>
        <button className="btn btn_primary" onClick={() => onDelete(noticeId)}>
          공지 삭제
        </button>
        <button className="btn btn_primary" onClick={onBack}>
          뒤로
        </button>
      </div>
    </>
  );
}
