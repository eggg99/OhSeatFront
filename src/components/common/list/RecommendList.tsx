import { Link, useNavigate } from "react-router-dom";
import { PostData, PostPage } from "@/types/Post";
import { getMultiplexBrandSafe } from "@/utils/recommend";
import { NoticeData } from "@/types/Notice";
import { NoticeList } from "@/components/common/list/NoticeList";

interface PostListProps {
  noticeList: NoticeData[];
  postList: PostPage;
  isEditMode?: boolean; // 추가: 수정 모드인지 알려주는 boolean 값
  selectedPostIds?: number[];
  onSelectPost?: (postId: number) => void;
}

const editCols = ['3%', '6%', '9%', '53%', '8%', '8%', '8%'];
const normalCols = ['8%', '8%', '47%', '8%', '8%', '8%', '8%'];

export const RecommendList:React.FC<PostListProps> = ({
  noticeList,
  postList,
  isEditMode = false,
  selectedPostIds = [],
  onSelectPost = () => {},
  }) => {
    const navigate = useNavigate();

    if (!postList?.content) {
      return (
        <tr>
          <td colSpan={7} className="txtc">
            추천 내용이 없습니다 🥲
          </td>
        </tr>
      )
    }
  return (
    <>
      <table className="basic_board1">
        <colgroup>
          {(isEditMode ? editCols : normalCols).map((width, idx) => (
            <col key={idx} style={{ width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th colSpan={isEditMode ? 4 : 3}>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            {!isEditMode && <th>좋아요</th>}
          </tr>
        </thead>
        <tbody>
          <NoticeList
            noticeList={noticeList}
            isEdit={isEditMode}
          />

          {postList.content.map((item: PostData) => {
            const isSelected = selectedPostIds.includes(item.postId);

            // 1. 수정 모드일 때의 행 (체크박스 포함)
            if (isEditMode) {
              return (
                <tr key={`edit-${item.postId}`}>
                  <td className="txtc">
                    <input
                      id={`post_cb_${item.postId}`}
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectPost?.(item.postId)}
                      className="post_cbx"
                    />
                    <label htmlFor={`post_cb_${item.postId}`}></label>
                  </td>
                  <td className="txtc">{item.multiplexName}</td>
                  <td className="txtl">{item.cinemaName}</td>
                  <td>{item.title} [편집모드]</td>
                  <td className="txtc">{item.authorNickname}</td>
                  <td colSpan={3} className="txtc">편집 모드에서는 상세보기가 비활성화됩니다.</td>
                </tr>
              );
            }

            // 2. 일반 모드일 때의 행 (기존 로직)
            return (
              <tr
                key={`view-${item.postId}`}
                onClick={() => navigate(`/recommend/${getMultiplexBrandSafe(item.multiplexId, item.multiplexName)}/${item.postId}`)}
                style={{ cursor: 'pointer' }}
              >
                <td className="txtc">{item.multiplexName}</td>
                <td className="txtl">{item.cinemaName}</td>
                <td>{item.title}</td>
                <td className="txtc">{item.authorNickname}</td>
                <td className="txtc">{item.createdAt}</td>
                <td className="txtc">{item.views}회</td>
                <td className="txtc">{item.commentCount}개</td>
              </tr>
            );
          })}
        </tbody>
      </table>





    </>
  );
};
