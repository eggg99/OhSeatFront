import { NoticePage } from "@/types/Notice";
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
  const [noticeList, setNoticeList] = useState<NoticePage>();

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
        {noticeList ? (
          // noticeList가 존재할 때
          noticeList.content.length > 0  ? (
            noticeList.content.map((item) => (
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
                ))
          ) : (
            // noticeList는 있지만 content가 비었을 때
            <div className="modal_empty">공지 내역이 없습니다.</div>
          )
        ) : (
          // 데이터 로딩 중이거나 noticeList가 없을 때
          <div className="modal_loading">불러오는 중...</div>
        )}
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