
interface NoticeCreateModalProps {
  onBack: () => void;
}
export default function NoticeCreateModal({
                                          onBack,
                                        }: NoticeCreateModalProps) {

  const create = () => {
    alert ('등록되었습니다');
    onBack();
  }

  return (
    <>
      {/* header */}
      <div className="modal_header">
        <h3 className="modal_title">공지 상세</h3>
      </div>
      <div>
        <div>제목 적는 곳</div>
        <div>내용 적는 곳</div>
      </div>

      <div className="modal_button_group">
        <button className="btn btn_primary" onClick={() => create()}>
          공지 등록하기
        </button>
        <button className="btn btn_primary" onClick={onBack}>
          뒤로
        </button>
      </div>
    </>
  );
}
