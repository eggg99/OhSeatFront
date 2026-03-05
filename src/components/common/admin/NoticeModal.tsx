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
        <div className="modal_inner">
          <div className="modal_top clear">
            <p>공지사항 관리<span>공지사항 목록</span></p>
            <button className="modalClose" onClick={() => onClose()}></button>
          </div>
          <div className="modal_contents">
            <NoticeListModal
              onSelect={goDetail}
              onCreate={goCreate}
            />
          </div>
        </div>
      )}

      {view === 'detail' && noticeId && (
        <div className="modal_inner write">
          <div className="modal_top clear">
            <p>공지사항 관리<span>공지사항 글보기</span></p>
            <button className="modalClose" onClick={() => onClose()}></button>
          </div>
          <NoticeDetailModal
            noticeId={noticeId}
            onBack={goList}
            onEdit={goEdit}
          />
        </div>
      )}

      {view === 'edit' && noticeId && (
        <div className="modal_inner write">
          <div className="modal_top clear">
            <p>공지사항 관리<span>공지사항 글수정</span></p>
            <button className="modalClose" onClick={() => onClose()}></button>
          </div>
          <NoticeEditModal
            noticeId={noticeId}
            onBack={goDetail}
          />
        </div>
      )}

      {view === 'create' && (
        <div className="modal_inner write">
          <div className="modal_top clear">
            <p>공지사항 관리<span>공지사항 글쓰기</span></p>
            <button className="modalClose" onClick={() => onClose()}></button>
          </div>
          <NoticeCreateModal
            onBack={goList}
            onSelect={goDetail}
          />
        </div>
      )}
    </ModalLayout>
  );
}
