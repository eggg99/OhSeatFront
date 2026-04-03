export interface PostData {
  likeCount: number;
  multiplexId: number;
  postId: number;
  title: string;
  content: string;
  authorNickname: string;
  views: number;
  createdAt: string;
  commentCount: number;
  multiplexName:string;
  cinemaName:string;

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