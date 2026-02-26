import { NoticePage } from "@/types/Notice";
import { useEffect, useState } from "react";
import { getNoticeList } from "@/apis/api/admin";
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
  const [page, setPage] = useState<number>(1);

  const getList = async () => {
    const response = await getNoticeList('RECOMMEND')
    setNoticeList(response);
  }

  // 페이지 변경
  const handlePageChange = (newPage: number) => {setPage(newPage);}

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <>
      {/* body */}
      <div className="modal_table_wrap">
        <table className="modal_table1">
          <colgroup>
            <col style={{width: '13%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '55%'}}/>
            <col style={{width: '10%'}}/>
            <col style={{width: '12%'}}/>
          </colgroup>
          <thead>
          <tr>
            <th>게시판</th>
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
                  <td>씨네광장</td>
                  <td className="txtc">
                    <input
                      type="checkbox"
                      className="modal_num1"
                      id={`modal_check_${item.noticeId}`}
                      checked={item.isPinned === 1}
                    />
                    <label htmlFor={`modal_check_${item.noticeId}`}>고정</label>
                  </td>
                  <td><a href="#" onClick={() => onSelect(item.noticeId)}>{item.title}</a></td>
                  <td className="txtc">
                    <input
                      type="checkbox"
                      className="modal_toggle"
                      id={`modal_toggle_${item.noticeId}`}
                      checked={item.isActive === 1}
                      readOnly
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
              <tr className="notice_row"><td colSpan={5}>공지 내역이 없습니다.</td></tr>
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