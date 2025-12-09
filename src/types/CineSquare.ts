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
  city: string;
  district:string;
  files : fileData[];
  representativeFile : fileData;
  totalFiles : fileData[];
  likeCount:number;
  liked : boolean;
  commentCount: number;
  createdAtDate?: string;
  createdAtTime?: string;
}

export interface fileData {
  fileId : number;
  fileName : string;
  fileUrl : string;
  fileSize : number;
  fileType : string;
  isRepresentative :"Y" | "N";
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