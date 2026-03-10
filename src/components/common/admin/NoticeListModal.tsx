import { NoticePage } from "@/types/Notice";
import { useEffect, useState } from "react";
import { getNoticeList,updatePinned, updateActive } from "@/apis/api/admin";
import {Pagination} from "@/components/common/Pagination";

interface NoticeListModalProps {
  onSelect: (noticeId: number) => void;
  onCreate: () => void;
}

export default function NoticeListModal({
  onSelect,
  onCreate,
}: NoticeListModalProps) {
  const [noticeList, setNoticeList] = useState<NoticePage>();
  const [modalPage, setModalPage] = useState<number>(1);

  const getList = async () => {
    const response = await getNoticeList('RECOMMEND')
    setNoticeList(response);
  }

  // 페이지 변경
  const handlePageChange = (newPage: number) => {setModalPage(newPage);}

  useEffect(() => {
    getList();
  }, [modalPage]);

  // 고정여부
  const handlePinnedChange = async (
    id: number,
    currentPinned: number,
    currentActive: number
  ) => {
    if (currentActive !== 1) {
      alert("비활성 공지는 고정할 수 없습니다.");
      return;
    }

    const nextPinned = currentPinned === 1 ? 0 : 1;

    // 이미 다른 공지가 pinned 되어 있는지 체크
    const alreadyPinned = noticeList?.content.find(
      item => item.isPinned === 1 && item.noticeId !== id
    );

    if (nextPinned === 1 && alreadyPinned) {
      const confirmResult = window.confirm(
        `'${alreadyPinned.title}' 공지가 이미 고정되어 있습니다.\n다른 공지로 바꾸시겠습니까?`
      );

      if (!confirmResult) return; // 취소하면 아무 동작 안함
    }

    // UI 먼저 반영 (optimistic update)
    setNoticeList(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        content: prev.content.map(item => {
          if (item.noticeId === id) {
            return { ...item, isPinned: nextPinned };
          }

          // 다른 공지들은 자동 해제
          return nextPinned === 1
            ? { ...item, isPinned: 0 }
            : item;
        })
      };
    });

    // 2. 서버 반영
    try {
      await updatePinned(id, {});
    } catch (e) {
      console.error(e);
      alert("고정 변경 실패");
      await getList();
    }
  }

  const handleActiveChange = async (id: number, currentActive: number) => {
    const nextActive = currentActive === 1 ? 0 : 1;

    // 🔹 1. UI 먼저 반영
    setNoticeList(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        content: prev.content.map(item =>
          item.noticeId === id
            ? {
              ...item,
              isActive: nextActive,
              isPinned: nextActive === 0 ? 0 : item.isPinned // 🔥 핵심
            }
            : item
        )
      };
    });

    // 🔹 2. 서버 반영
    try {
      await updateActive(id, {
        isActive: nextActive === 1
      });
      // 🔹 3. 비활성으로 바뀐 경우, 서버에도 고정 해제 반영 필요하면
      if (nextActive === 0) {
        await updatePinned(id);
        // ⚠️ updatePinned가 toggle 방식이면 이게 맞고,
        // 명시적으로 pin 해제 API면 그에 맞게 수정
      }
    } catch (e) {
      console.error(e);

      // 🔹 3. 실패 시 롤백
      setNoticeList(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          content: prev.content.map(item =>
            item.noticeId === id
              ? { ...item, isActive: currentActive }
              : item
          )
        };
      });

      alert("활성화 변경 실패");
    }
  };

  return (
    <>
      {/* body */}
      <div className="modal_table_wrap">
        <table className="modal_table1">
          <colgroup>
            <col style={{width: '13%'}}/>
            <col style={{width: '59%'}}/>
            <col style={{width: '13%'}}/>
            <col style={{width: '15%'}}/>
          </colgroup>
          <thead>
          <tr>
            <th>고정 여부</th>
            <th>제목</th>
            <th>활성화</th>
            <th>작성일</th>
          </tr>
          </thead>
          <tbody>
          {noticeList ? (
            // noticeList가 존재할 때
            noticeList.content.length > 0 ? (
              noticeList.content.map((item) => (
                <tr
                  key={item.noticeId}
                  className="notice_row"
                >
                  <td className="txtc">
                    <input
                      type="checkbox"
                      className="modal_num1"
                      id={`modal_check_${item.noticeId}`}
                      checked={item.isPinned === 1}
                      disabled={item.isActive !== 1}
                      onChange={() => handlePinnedChange(item.noticeId, item.isPinned, item.isActive)}
                    />
                    <label htmlFor={`modal_check_${item.noticeId}`} style={{ color: item.isActive !== 1 ? "#a1a1a1" : "" }}>고정</label>
                  </td>
                  <td><a href="#" onClick={() => onSelect(item.noticeId)}>{item.title}</a></td>
                  <td className="txtc">
                    <input
                      type="checkbox"
                      className="modal_toggle"
                      id={`modal_toggle_${item.noticeId}`}
                      checked={item.isActive === 1}
                      onChange={() => handleActiveChange(item.noticeId, item.isActive)}
                    />
                    <label htmlFor={`modal_toggle_${item.noticeId}`}>
                      <span className="mt_off">OFF</span>
                      <span className="mt_on">ON</span>
                    </label>
                  </td>
                  <td className="txtc">{item.createdAt?.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              // noticeList는 있지만 content가 비었을 때
              <tr className="notice_row"><td className={'txtc'} colSpan={5}>공지 내역이 없습니다.</td></tr>
            )
          ) : (
            // 데이터 로딩 중이거나 noticeList가 없을 때
            <tr className="notice_row"><td colSpan={5}>불러오는 중...</td></tr>
          )}
          </tbody>
        </table>
        <div className="post_button_wrap clear">
          <div className="left">
            {noticeList &&
                <Pagination
                    currentPage={noticeList.number}
                    totalPages={noticeList.totalPages}
                    onPageChange={handlePageChange}
                />
            }
          </div>
          <div className="right">
            <a href="#" className="post_button write" onClick={onCreate}>공지 글쓰기</a>
          </div>
        </div>
      </div>
    </>
  );
}