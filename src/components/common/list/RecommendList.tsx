import { useNavigate } from "react-router-dom";
import { PostData, PostPage } from "@/types/Post";
import { getMultiplexBrandSafe } from "@/utils/recommend";
import { NoticeData } from "@/types/Notice";
import { NoticeList } from "@/components/common/list/NoticeList";

interface PostListProps {
  noticeList: NoticeData[];
  postList: PostPage;
  isEditMode?: boolean;
  selectedPostIds?: number[];
  onSelectPost?: (postId: number) => void;
}

const editCols = ['3%', '8%', '9%', '53%', '10%', '8%', '8%'];
const normalCols = ['8%', '8%', '47%', '8%', '8%', '8%', '8%'];

export const RecommendList: React.FC<PostListProps> = ({
  noticeList,
  postList,
  isEditMode = false,
  selectedPostIds = [],
  onSelectPost = () => {},
}) => {
  const navigate = useNavigate();
  const hasPostContent = Array.isArray(postList?.content) && postList.content.length > 0;

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

          {!hasPostContent ? (
            <tr>
              <td colSpan={7} className="txtc">
                추천내용이 없습니다.
              </td>
            </tr>
          ) : (
            postList.content.map((item: PostData) => {
              const isSelected = selectedPostIds.includes(item.postId);

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
                    <td className="txtc">{String(item.createdAt).split(/[ T]/)[0].replace(/-/g, '.')}</td>
                    <td className="txtc">{item.views}</td>
                  </tr>
                );
              }

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
                  <td className="txtc">{String(item.createdAt).split(/[ T]/)[0].replace(/-/g, '.')}</td>
                  <td className="txtc">{item.views}</td>
                  <td className="txtc">{item.likeCount}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};
