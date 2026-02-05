
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

  return (
    <>
      {/* header */}
      <div className="modal_header">
        <h3 className="modal_title">공지 상세</h3>
      </div>

      <div>
        <h3>제목</h3>
        <div>내용</div>
      </div>

      <div className="modal_button_group">
        <button className="btn btn_primary" onClick={() => onEdit(noticeId)}>
          공지 수정
        </button>
        <button className="btn btn_primary" onClick={onBack}>
          뒤로
        </button>
      </div>
    </>
  );
}
