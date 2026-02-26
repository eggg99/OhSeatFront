import './temp.scss'
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalLayout({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div id="os_modal_wrap" onClick={(e) => e.stopPropagation()}>
        {children}
    </div>
  );
}