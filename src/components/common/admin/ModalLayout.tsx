import './temp.scss'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalLayout({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div
        className="modal_container"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}