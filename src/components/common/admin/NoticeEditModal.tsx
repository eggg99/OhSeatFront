
interface NoticeEditModalProps {
  noticeId: number;
  onBack: (noticeId: number) => void;
}
export default function NoticeEditModal({
                                          noticeId,
                                          onBack,
                                        }: NoticeEditModalProps) {

  const edit = () => {
    alert ('등록되었습니다');
    onBack(noticeId);
  }

  return (
    <>
      {/* header */}
      <div className="modal_header">
        <h3 className="modal_title">공지 수정</h3>
      </div>
      <div>
        <div>제목 수정하는 곳</div>
        <div>내용 수정하는 곳</div>
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
