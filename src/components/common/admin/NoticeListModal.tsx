import { NoticeData } from "@/types/Notice";
import { useEffect, useState } from "react";
import { getNoticeList } from "@/apis/api/admin";

interface NoticeListModalProps {
  onSelect: (noticeId: number) => void;
  onCreate: () => void;
}

export default function NoticeListModal({
  onSelect,
  onCreate,
}: NoticeListModalProps) {
  const [noticeList, setNoticeList] = useState<NoticeData[]>([]);

  const getList = async () => {
    const response = await getNoticeList('RECOMMEND')
    setNoticeList(response);
  }

  useEffect(() => {
    getList();
  }, []);



  return (
    <>
      {/* header */}
      <div className="modal_header">
        <h3 className="modal_title">공지 목록</h3>
      </div>

      {/* body */}
      <div className="modal_body">
        {noticeList.length === 0 && (
          <div className="modal_empty">공지 내역이 없습니다.</div>
        )}

        {noticeList.map((item) => (
          <div
            key={item.noticeId}
            className="notice_row"
            onClick={() => onSelect(item.noticeId)}
          >
            <span className="notice_id">{item.noticeId}</span>
            <span className="notice_title">{item.title}</span>
            <span className="notice_author">{item.authorNickName}</span>
            <span className="notice_date">
              {item.createdAt?.split("T")[0]}
            </span>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="modal_button_group">
        <button className="btn btn_primary" onClick={onCreate}>
          공지 등록
        </button>
      </div>
    </>
  );
}