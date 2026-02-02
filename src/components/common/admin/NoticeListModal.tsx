import ModalLayout from "@/components/common/admin/ModalLayout"

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function NoticeListModal({ isOpen, onClose,}: ModalLayoutProps ){

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <h3>모달리스트</h3>

      <div className="modal_button_group">
        <button onClick={onClose}>취소</button>
      </div>
    </ModalLayout>
  );
}
