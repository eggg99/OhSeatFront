import ModalLayout from "@/components/common/admin/ModalLayout"
import NoticeListModal from "@/components/common/admin/NoticeListModal"
import NoticeDetailModal from "@/components/common/admin/NoticeDetailModal"
import NoticeCreateModal from "@/components/common/admin/NoticeCreateModal"
import NoticeEditModal from "@/components/common/admin/NoticeEditModal"
import { useState, useEffect } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
}
type NoticeModalView = 'list' | 'detail' | 'edit' | 'create';

export default function NoticeModal({ isOpen, onClose }: ModalLayoutProps) {
  const [view, setView] = useState<NoticeModalView>('list');
  const [noticeId, setNoticeId] = useState<number | null>(null);

  const goList = () => setView('list');
  const goDetail = (id: number) => {
    setNoticeId(id);
    setView('detail');
  };
  const goEdit = (id: number) => {
    setNoticeId(id);
    setView('edit');
  };
  const goCreate = () => setView('create');

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      {view === 'list' && (
        <NoticeListModal
          onSelect={goDetail}
          onCreate={goCreate}
        />
      )}

      {view === 'detail' && noticeId && (
        <NoticeDetailModal
          noticeId={noticeId}
          onBack={goList}
          onEdit={goEdit}
        />
      )}

      {view === 'edit' && noticeId && (
        <NoticeEditModal
          noticeId={noticeId}
          onBack={goDetail}
        />
      )}

      {view === 'create' && (
        <NoticeCreateModal
          onBack={goList}
        />
      )}
    </ModalLayout>
  );
}
