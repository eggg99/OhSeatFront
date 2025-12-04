export interface CineSquareData {
  postId: number;
  categoryId: number;
  categoryName: string;
  title: string;
  city: string;
  district:string;
  content: string;
  views: number;
  createdAt: string;
  authorId: number;
  authorNickname : string;
  files : [];
  likeCount:number;
  liked : boolean;
  commentCount: number;
  createdAtDate?: string;
  createdAtTime?: string;
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