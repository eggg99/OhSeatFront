export default function NoticeModal({ onClose }){
  return (
    <div>
      <div>
        <h2>모달 제목</h2>
        <div>관리자용 공지사항 모달</div>

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}