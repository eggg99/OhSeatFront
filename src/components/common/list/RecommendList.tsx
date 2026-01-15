import { Link, useNavigate } from "react-router-dom";
import { PostData, PostPage } from "@/types/Post";
import { getMultiplexBrand } from "@/utils/recommend";

interface PostListProps {
  postList: PostPage;
  isEditMode?: boolean; // 추가: 수정 모드인지 알려주는 boolean 값
  selectedPostIds?: number[];
  onSelectPost?: (postId: number) => void;
}

export const RecommendList:React.FC<PostListProps> = ({
  postList,
  isEditMode,
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
      {postList.content.map((item: PostData) => {
        const isSelected = selectedPostIds.includes(item.postId);

        // 1. 수정 모드일 때의 행 (체크박스 포함)
        if (isEditMode) {
          return (
            <tr key={`edit-${item.postId}`} className="edit_row">
              <td>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSelectPost?.(item.postId)}
                />
              </td>
              <td className="txtc">{item.multiplexId}</td>
              <td>{item.title} (수정중)</td>
              <td className="txtc">{item.authorNickname}</td>
              <td colSpan={3} className="txtc">수정 모드에서는 상세보기가 비활성화됩니다.</td>
            </tr>
          );
        }

        // 2. 일반 모드일 때의 행 (기존 로직)
        return (
          <tr
            key={`view-${item.postId}`}
            onClick={() => navigate(`/recommend/${getMultiplexBrand(item.multiplexId)}/${item.postId}`)}
            style={{ cursor: 'pointer' }}
          >
            <td className="txtc">{item.multiplexName}</td>
            <td className="txtc">{item.cinemaName}</td>
            <td>{item.title}</td>
            <td className="txtc">{item.authorNickname}</td>
            <td className="txtc">{item.createdAt}</td>
            <td className="txtc">{item.views}회</td>
            <td className="txtc">{item.commentCount}개</td>
          </tr>
        );
      })}
    </>
  );
};