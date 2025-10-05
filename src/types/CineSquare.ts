export interface CineSquareData {
  postId: number;
  categoryId: number;
  categoryName: string;
  title: string;
  content: string;
  views: number;
  createdAt: string;
  authorId: number;
  authorNickname : string;
}

export interface CineSquarePage {
  content: CineSquareData[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지 (1부터 시작)
  size: number;
  first: boolean;
  last: boolean;
}