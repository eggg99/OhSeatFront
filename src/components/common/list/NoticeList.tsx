import { Link, useNavigate } from "react-router-dom";
import { NoticeData } from "@/types/Notice";

interface NoticeListProps {
  noticeList: NoticeData[];
  isEdit: boolean;
}

export const NoticeList:React.FC<NoticeListProps> = ({noticeList, isEdit}) => {
  if (!noticeList || noticeList.length === 0) {
    return null;
  }
  return (
    <>
      {noticeList.map((item: any) => (
        <tr key={`notice-${item.noticeId}`}>
          <th colSpan={isEdit ? 2 : 1}>
            <span className="notice">공지</span></th>
          <th colSpan={2} className="txtl">
            <Link to={`/cinesquare/admin/${item.noticeId}`}>{item.title}</Link>
          </th>
          <th>{item.authorNickName}</th>
          <th>{item.createdAt ? item.createdAt.split("T")[0].replace(/-/g, ".") : ""}</th>
          <th>{item.views}회</th>
          <th></th>
        </tr>
      ))}
    </>
  )
}