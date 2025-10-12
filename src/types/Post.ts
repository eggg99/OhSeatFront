export interface PostData {
  multiplexId: number;
  postId: number;
  title: string;
  content: string;
  authorNickname: string;
  views: number;
  createdAt: string;
  commentCount: number;
}

export interface PostPage {
  content: PostData[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 (1부터 시작)
  size: number;
  first: boolean;
  last: boolean;
}